"""Headless Blender: the Moore Covenant Metro ride, v2 (realism pass).
Matches the reference photo of a DC 7000-series interior: brushed stainless walls, blue cushioned
seats, chrome poles with the bent grab rails, ceiling light diffusers, rubber-gasket windows,
an ad panel and a route map. Stations get a true coffered concrete vault built from recessed
tiles, terracotta platform, granite edge with the warm bulb strip, brown pylon signs.

Run:  Blender -b -noaudio -P metro_train_v2.py -- <out_dir> <mode> [width] [step]
  mode = "test"  -> stills (tunnel / arriving / doors open)
  mode = "full"  -> every <step>th frame of the sequence (default step 3 -> 272 frames)
"""
import bpy, bmesh, math, sys, os
from mathutils import Vector

argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
OUT = argv[0] if argv else "/tmp/metro2"
MODE = argv[1] if len(argv) > 1 else "test"
W = int(argv[2]) if len(argv) > 2 else 1280
STEP = int(argv[3]) if len(argv) > 3 else 3
os.makedirs(OUT, exist_ok=True)

FPS = 24
STOPS = [("01", "Social Media Management"), ("02", "Video Production"), ("03", "Websites & Brand"), ("04", "Your Brand")]
STATION_GAP = 140.0
PLATFORM_LEN = 60.0
TRAIN_LEN = 22.0
T_APPROACH, T_HOLD, T_DEPART = 3.0, 3.0, 2.5
T_STOP = T_APPROACH + T_HOLD + T_DEPART
FRAMES = int(len(STOPS) * T_STOP * FPS)

# ---------- scene ----------
bpy.ops.wm.read_factory_settings(use_empty=True)
sc = bpy.context.scene
sc.render.resolution_x, sc.render.resolution_y = W, int(W * 9 / 16)
sc.render.fps = FPS
sc.frame_start, sc.frame_end = 1, FRAMES
sc.render.image_settings.file_format = "PNG"
sc.render.image_settings.color_mode = "RGB"
for eng in ("BLENDER_EEVEE_NEXT", "BLENDER_EEVEE"):
    try:
        sc.render.engine = eng
        break
    except TypeError:
        pass
try:
    sc.eevee.taa_render_samples = 48
    sc.eevee.use_shadows = True
    sc.eevee.use_raytracing = True
except Exception:
    pass
try:
    sc.view_settings.view_transform = "AgX"
    sc.view_settings.look = "AgX - Medium High Contrast"
    sc.view_settings.exposure = -0.2
except Exception:
    pass

# ---------- materials ----------
def mat(name, color, rough=0.5, metal=0.0, emit=None, strength=1.0, aniso=0.0):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    b = m.node_tree.nodes["Principled BSDF"]
    b.inputs["Base Color"].default_value = (*color, 1)
    b.inputs["Roughness"].default_value = rough
    b.inputs["Metallic"].default_value = metal
    if emit:
        b.inputs["Emission Color"].default_value = (*emit, 1)
        b.inputs["Emission Strength"].default_value = strength
    try:
        b.inputs["Anisotropic"].default_value = aniso
    except Exception:
        pass
    return m

def noisy(name, base, scale=40.0, detail=6.0, strength=0.08, rough=0.9):
    """Concrete-like material: base color with a soft noise variation and a bumped surface."""
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    nt = m.node_tree
    b = nt.nodes["Principled BSDF"]
    b.inputs["Roughness"].default_value = rough
    tex = nt.nodes.new("ShaderNodeTexNoise")
    tex.inputs["Scale"].default_value = scale
    tex.inputs["Detail"].default_value = detail
    ramp = nt.nodes.new("ShaderNodeValToRGB")
    ramp.color_ramp.elements[0].color = (base[0] * 0.8, base[1] * 0.8, base[2] * 0.8, 1)
    ramp.color_ramp.elements[1].color = (base[0] * 1.15, base[1] * 1.15, base[2] * 1.15, 1)
    nt.links.new(tex.outputs["Fac"], ramp.inputs["Fac"])
    nt.links.new(ramp.outputs["Color"], b.inputs["Base Color"])
    bump = nt.nodes.new("ShaderNodeBump")
    bump.inputs["Strength"].default_value = strength
    nt.links.new(tex.outputs["Fac"], bump.inputs["Height"])
    nt.links.new(bump.outputs["Normal"], b.inputs["Normal"])
    return m

M_CONCRETE = noisy("Concrete", (0.36, 0.34, 0.31), scale=30, strength=0.12)
M_CONCRETE_D = noisy("ConcreteDark", (0.22, 0.21, 0.19), scale=30, strength=0.1)
M_TERRACOTTA = noisy("Terracotta", (0.42, 0.22, 0.13), scale=120, detail=3, strength=0.05, rough=0.75)
M_GRANITE = noisy("Granite", (0.10, 0.10, 0.10), scale=300, detail=8, strength=0.03, rough=0.5)
M_STEEL = mat("Steel", (0.62, 0.63, 0.66), rough=0.32, metal=1.0, aniso=0.7)     # brushed stainless
M_CHROME = mat("Chrome", (0.9, 0.9, 0.92), rough=0.18, metal=1.0)
M_GOLD = mat("Gold", (0.77, 0.59, 0.29), rough=0.3, metal=1.0)
M_SEAT = noisy("SeatBlue", (0.07, 0.13, 0.42), scale=200, detail=4, strength=0.06, rough=0.95)
M_SEATFRAME = mat("SeatFrame", (0.55, 0.56, 0.58), rough=0.4, metal=1.0)
M_FLOOR = noisy("Floor", (0.09, 0.09, 0.10), scale=400, detail=8, strength=0.03, rough=0.45)
M_CEIL = mat("Ceiling", (0.55, 0.54, 0.52), rough=0.6)
M_WALLCREAM = mat("WallCream", (0.86, 0.85, 0.80), rough=0.5)
M_PYLON = noisy("Pylon", (0.17, 0.10, 0.06), scale=80, detail=3, strength=0.03, rough=0.55)
M_SIGN = mat("Sign", (0.02, 0.02, 0.02), rough=0.35, emit=(1.0, 0.96, 0.9), strength=0.12)
M_TEXT = mat("Text", (0.95, 0.95, 0.95), emit=(1, 1, 1), strength=2.2)
M_TEXTGOLD = mat("TextGold", (0.77, 0.59, 0.29), metal=1.0, rough=0.3, emit=(0.9, 0.7, 0.35), strength=1.0)
M_DIFFUSER = mat("Diffuser", (1, 1, 1), emit=(1.0, 0.88, 0.7), strength=2.2)
M_BULB = mat("Bulb", (1, 1, 1), emit=(1.0, 0.82, 0.55), strength=9.0)
M_TUNNELLIGHT = mat("TunnelLight", (1, 1, 1), emit=(1.0, 0.9, 0.7), strength=30.0)
M_SIGNAL = mat("Signal", (1, 1, 1), emit=(1.0, 0.1, 0.05), strength=40.0)
M_GASKET = mat("Gasket", (0.03, 0.03, 0.03), rough=0.7)
M_AD = mat("Ad", (0.12, 0.16, 0.28), rough=0.4, emit=(0.3, 0.45, 0.8), strength=0.25)
M_MAP = mat("Map", (0.92, 0.92, 0.90), rough=0.5, emit=(1, 1, 1), strength=0.15)

def box(name, size, loc, m, rot=(0, 0, 0), bevel=0.0, parent=None, smooth=False):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc, rotation=rot)
    o = bpy.context.object
    o.name = name
    o.scale = size
    o.data.materials.append(m)
    if bevel > 0:
        bv = o.modifiers.new("Bevel", "BEVEL")
        bv.width = bevel
        bv.segments = 3
    if smooth:
        for p in o.data.polygons:
            p.use_smooth = True
    if parent is not None:
        o.parent = parent
    return o

def cyl(name, r, length, loc, m, rot=(0, 0, 0), parent=None, verts=24):
    bpy.ops.mesh.primitive_cylinder_add(radius=r, depth=length, location=loc, rotation=rot, vertices=verts)
    o = bpy.context.object
    o.name = name
    o.data.materials.append(m)
    for p in o.data.polygons:
        p.use_smooth = True
    if parent is not None:
        o.parent = parent
    return o

def text(name, body, loc, size, m, rot=(math.radians(90), 0, 0), font=None, parent=None, extrude=0.01):
    bpy.ops.object.text_add(location=loc, rotation=rot)
    o = bpy.context.object
    o.name = name
    o.data.body = body
    o.data.size = size
    o.data.extrude = extrude
    o.data.align_x = "CENTER"
    o.data.align_y = "CENTER"
    if font and os.path.exists(font):
        try:
            o.data.font = bpy.data.fonts.load(font)
        except Exception:
            pass
    o.data.materials.append(m)
    if parent is not None:
        o.parent = parent
    return o

HELV = "/System/Library/Fonts/HelveticaNeue.ttc"

# ---------- coffered vault ----------
ROUTE_LEN = STATION_GAP * len(STOPS) + 200
Y0 = -120.0
R_VAULT = 7.2
Z_SPRING = 0.6         # vault springs from here

def coffer_tile_mesh():
    """One coffer: an outer square frame with a recessed inner panel, as a single mesh (local XY, depth -Z)."""
    bm = bmesh.new()
    s, inset, depth = 1.0, 0.16, 0.28
    # outer frame ring (flat, at z=0)
    o = [bm.verts.new(v) for v in ((-s/2,-s/2,0),(s/2,-s/2,0),(s/2,s/2,0),(-s/2,s/2,0))]
    i0 = [bm.verts.new((x*(1-2*inset/s) if False else (x if abs(x)<0 else x), y, 0)) for x,y,_ in [(-(s/2-inset),-(s/2-inset),0),((s/2-inset),-(s/2-inset),0),((s/2-inset),(s/2-inset),0),(-(s/2-inset),(s/2-inset),0)]]
    i1 = [bm.verts.new((v.co.x, v.co.y, -depth)) for v in i0]
    for k in range(4):
        bm.faces.new((o[k], o[(k+1)%4], i0[(k+1)%4], i0[k]))      # frame ring
        bm.faces.new((i0[k], i0[(k+1)%4], i1[(k+1)%4], i1[k]))    # recess walls
    bm.faces.new((i1[0], i1[1], i1[2], i1[3]))                   # recess floor
    me = bpy.data.meshes.new("CofferTile")
    bm.to_mesh(me)
    bm.free()
    return me

TILE = coffer_tile_mesh()

def vault(y_start, length, segs=16, tile=1.0):
    """Arch of coffer strips. Each strip: one tile mesh, arrayed along Y, rotated to sit on the arch."""
    n_tiles = int(length / tile)
    for i in range(segs):
        a0 = math.pi * i / segs
        a1 = math.pi * (i + 1) / segs
        am = (a0 + a1) / 2
        w = 2 * R_VAULT * math.sin((a1 - a0) / 2)
        x = R_VAULT * math.cos(am)
        z = R_VAULT * math.sin(am) + Z_SPRING
        ob = bpy.data.objects.new(f"vault_{y_start:.0f}_{i}", TILE)
        bpy.context.collection.objects.link(ob)
        ob.data.materials.append(M_CONCRETE) if not ob.data.materials else None
        ob.scale = (w, tile, 1.0)
        # tile faces -Z locally; rotate so -Z points outward... we want the recess to face the track (inward),
        # so the tile's +Z (front) must point toward the vault centre: rotate about Y by -(am + pi/2) then flip.
        ob.rotation_euler = (0, -(am + math.pi / 2), 0)
        ob.location = (x, y_start + length / 2, z)
        arr = ob.modifiers.new("Arr", "ARRAY")
        arr.count = n_tiles
        arr.relative_offset_displace = (0, 1, 0)
        ob.location.y = y_start
    # ribs between strips give the deep DC look
    for i in range(segs + 1):
        a = math.pi * i / segs
        x = (R_VAULT - 0.12) * math.cos(a)
        z = (R_VAULT - 0.12) * math.sin(a) + Z_SPRING
        box(f"rib_{y_start:.0f}_{i}", (0.22, length, 0.26), (x, y_start + length / 2, z), M_CONCRETE_D, rot=(0, -(a + math.pi / 2), 0))

# the tile mesh needs a material slot
TILE.materials.append(M_CONCRETE)

# ---------- stations ----------
station_y = []

def station(idx, yc, number, label):
    half = PLATFORM_LEN / 2
    for side in (-1, 1):
        box(f"plat_{idx}_{side}", (5.2, PLATFORM_LEN, 1.1), (side * 4.6, yc, 0.55), M_TERRACOTTA)
        box(f"edge_{idx}_{side}", (0.7, PLATFORM_LEN, 1.12), (side * 2.35, yc, 0.56), M_GRANITE, bevel=0.02)
        # the bulb strip set into the platform edge
        for k in range(int(PLATFORM_LEN / 1.5)):
            y = yc - half + 0.75 + k * 1.5
            cyl(f"bulb_{idx}_{side}_{k}", 0.06, 0.5, (side * 2.05, y, 1.14), M_BULB, rot=(math.radians(90), 0, 0), verts=10)
        # recessed uplights washing the vault
        for k in range(6):
            y = yc - half + 5 + k * 10
            bpy.ops.object.light_add(type="AREA", location=(side * 5.6, y, 1.35))
            l = bpy.context.object
            l.data.energy = 900
            l.data.size = 3.5
            l.data.color = (1.0, 0.86, 0.64)
            l.rotation_euler = (math.radians(-40 * side), 0, 0)
        # pylon + sign
        px = side * 6.4
        box(f"pylon_{idx}_{side}", (0.9, 0.9, 3.8), (px, yc, 3.0), M_PYLON, bevel=0.02)
        sx = px - side * 0.49
        box(f"sign_{idx}_{side}", (0.04, 2.7, 0.95), (sx, yc, 4.0), M_SIGN)
        rot = (math.radians(90), 0, math.radians(-90 if side > 0 else 90))
        text(f"stopno_{idx}_{side}", f"STOP {number}", (sx - side * 0.04, yc, 4.27), 0.2, M_TEXTGOLD, rot=rot, font=HELV)
        text(f"name_{idx}_{side}", label.upper(), (sx - side * 0.04, yc, 3.86), 0.25, M_TEXT, rot=rot, font=HELV)
        box(f"stripe_{idx}_{side}", (0.05, 2.7, 0.07), (sx, yc, 3.45), M_GOLD)
        # far wall with the station name and the gold bar
        box(f"wall_{idx}_{side}", (0.4, PLATFORM_LEN, 2.6), (side * 8.8, yc, 1.9), M_WALLCREAM)
        text(f"wallname_{idx}_{side}", label.upper(), (side * 8.58, yc, 2.3), 0.8, M_TEXT, rot=rot, font=HELV)
        box(f"wallbar_{idx}_{side}", (0.06, 14, 0.12), (side * 8.57, yc, 1.55), M_GOLD)

def tunnel_lights(y_from, y_to):
    y, k = y_from, 0
    while y < y_to:
        side = -1 if k % 2 else 1
        box(f"tl_{y:.0f}", (0.25, 0.25, 0.6), (side * 6.3, y, 3.2), M_TUNNELLIGHT)
        if k % 5 == 2:
            box(f"sig_{y:.0f}", (0.2, 0.2, 0.2), (-side * 6.3, y + 4, 2.5), M_SIGNAL)
        y += 12
        k += 1

vault(Y0, ROUTE_LEN)
box("trackbed", (4.0, ROUTE_LEN, 0.2), (0, Y0 + ROUTE_LEN / 2, -0.1), M_GRANITE)
for sx in (-0.75, 0.75):
    box(f"rail_{sx}", (0.08, ROUTE_LEN, 0.1), (sx, Y0 + ROUTE_LEN / 2, 0.05), M_CHROME)
box("wallL", (0.5, ROUTE_LEN, 7), (-7.4, Y0 + ROUTE_LEN / 2, 3.5), M_CONCRETE_D)
box("wallR", (0.5, ROUTE_LEN, 7), (7.4, Y0 + ROUTE_LEN / 2, 3.5), M_CONCRETE_D)
for i, (num, label) in enumerate(STOPS):
    yc = i * STATION_GAP
    station_y.append(yc)
    station(i, yc, num, label)
    if i < len(STOPS) - 1:
        tunnel_lights(yc + PLATFORM_LEN / 2 + 6, yc + STATION_GAP - PLATFORM_LEN / 2 - 6)
tunnel_lights(Y0 + 10, station_y[0] - PLATFORM_LEN / 2 - 6)

# ---------- the car (matches the reference photo) ----------
bpy.ops.object.empty_add(location=(0, 0, 0))
train = bpy.context.object
train.name = "Train"
P = train
FLOOR_Z, CEIL_Z = 1.15, 3.5
HALF_W = 1.5
box("floor", (3.0, TRAIN_LEN, 0.08), (0, 0, FLOOR_Z), M_FLOOR, parent=P)
box("ceil", (3.0, TRAIN_LEN, 0.08), (0, 0, CEIL_Z), M_CEIL, parent=P)
# ceiling light diffusers: two long strips either side of a centre spine
for sx in (-0.55, 0.55):
    box(f"diffuser_{sx}", (0.42, TRAIN_LEN - 1.0, 0.03), (sx, 0, CEIL_Z - 0.05), M_DIFFUSER, parent=P)
box("ceilspine", (0.25, TRAIN_LEN, 0.05), (0, 0, CEIL_Z - 0.04), M_STEEL, parent=P)
for side in (-1, 1):
    x = side * HALF_W
    # lower wall panel (brushed steel), window band, upper panel, cove
    box(f"wallLo_{side}", (0.08, TRAIN_LEN, 0.95), (x, 0, FLOOR_Z + 0.5), M_STEEL, parent=P)
    box(f"wallHi_{side}", (0.08, TRAIN_LEN, 0.45), (x, 0, CEIL_Z - 0.25), M_STEEL, parent=P)
    box(f"cove_{side}", (0.5, TRAIN_LEN, 0.06), (x - side * 0.22, 0, CEIL_Z - 0.03), M_WALLCREAM, parent=P)
    # window gaskets + mullions (window band 2.1 .. 3.05)
    for k in range(-5, 6):
        yk = k * 2.0
        if side > 0 and abs(yk) < 1.4:
            continue
        box(f"mull_{side}_{k}", (0.1, 0.14, 1.0), (x, yk, 2.58), M_STEEL, parent=P)
        if k < 5:
            box(f"gasketT_{side}_{k}", (0.1, 1.9, 0.05), (x, yk + 1.0, 3.06), M_GASKET, parent=P)
            box(f"gasketB_{side}_{k}", (0.1, 1.9, 0.05), (x, yk + 1.0, 2.09), M_GASKET, parent=P)
    # exterior brand stripe
    box(f"stripe_{side}", (0.1, TRAIN_LEN, 0.1), (x + side * 0.03, 0, 2.0), M_GOLD, parent=P)
    # ad panel and route map above the windows
    box(f"ad_{side}", (0.03, 1.6, 0.32), (x - side * 0.05, -5.0, CEIL_Z - 0.25), M_AD, parent=P)
    box(f"map_{side}", (0.03, 2.2, 0.32), (x - side * 0.05, 4.0, CEIL_Z - 0.25), M_MAP, parent=P)

# seats: pairs of blue cushions on a stainless frame along the left wall, plus a forward-facing pair
def seat_pair(name, y, x=-1.05, facing=1):
    for j in (-0.42, 0.42):
        box(f"{name}_cush{j}", (0.48, 0.78, 0.14), (x, y + j, FLOOR_Z + 0.42), M_SEAT, bevel=0.05, parent=P, smooth=True)
        box(f"{name}_back{j}", (0.12, 0.78, 0.62), (x - facing * 0.22, y + j, FLOOR_Z + 0.8), M_SEAT, bevel=0.05, parent=P, smooth=True)
    box(f"{name}_frame", (0.5, 1.7, 0.05), (x, y, FLOOR_Z + 0.33), M_SEATFRAME, parent=P)
    cyl(f"{name}_leg", 0.03, 0.3, (x, y, FLOOR_Z + 0.17), M_SEATFRAME, parent=P)
    # the chrome grab rail on the aisle side of the seat back
    cyl(f"{name}_rail", 0.022, 0.9, (x + facing * 0.3, y - 0.85, FLOOR_Z + 0.95), M_CHROME, parent=P)

for k in range(-4, 5):
    seat_pair(f"seatL_{k}", k * 2.4)
# a seat pair on the right side behind the door
seat_pair("seatR_a", 3.6, x=1.05, facing=-1)
seat_pair("seatR_b", -3.6, x=1.05, facing=-1)
# vertical chrome poles with the signature bend at the top
for yk in (2.6, -2.6):
    cyl(f"pole_{yk}", 0.025, CEIL_Z - FLOOR_Z, (0.45, yk, (FLOOR_Z + CEIL_Z) / 2), M_CHROME, parent=P)
cyl("handrail", 0.02, TRAIN_LEN - 2, (0.0, 0, CEIL_Z - 0.35), M_CHROME, rot=(math.radians(90), 0, 0), parent=P)

# the doors (right side): two leaves with window openings, gaskets, chrome handles
def door_leaf(name, y):
    bpy.ops.object.empty_add(location=(1.52, y, 2.25))
    e = bpy.context.object
    e.name = name
    e.parent = P
    for nm, size, loc, m in (("lo", (0.09, 1.2, 1.1), (0, 0, -0.7), M_STEEL),
                             ("hi", (0.09, 1.2, 0.22), (0, 0, 0.99), M_STEEL),
                             ("pa", (0.09, 0.14, 0.85), (0, -0.53, 0.44), M_STEEL),
                             ("pb", (0.09, 0.14, 0.85), (0, 0.53, 0.44), M_STEEL),
                             ("gk", (0.1, 0.96, 0.03), (0, 0, 0.02), M_GASKET),
                             ("gk2", (0.1, 0.96, 0.03), (0, 0, 0.87), M_GASKET)):
        bpy.ops.mesh.primitive_cube_add(size=1, location=(0, 0, 0))
        o = bpy.context.object
        o.name = f"{name}_{nm}"
        o.scale = size
        o.location = loc
        o.data.materials.append(m)
        o.parent = e
    return e
doorL = door_leaf("doorL", -0.6)
doorR = door_leaf("doorR", 0.6)
box("doorhead", (0.12, 2.6, 0.2), (1.5, 0, CEIL_Z - 0.3), M_STEEL, parent=P)
box("doorsill", (0.3, 2.6, 0.04), (1.42, 0, FLOOR_Z + 0.02), M_GASKET, parent=P)

# plaque with the company name (small, by the door)
box("plaque", (0.03, 0.9, 0.45), (-1.45, -3.2, 2.62), M_SIGN, parent=P)
text("plaqueTxt", "MOORE COVENANT", (-1.42, -3.2, 2.68), 0.085, M_TEXTGOLD, rot=(math.radians(90), 0, math.radians(90)), font=HELV, parent=P)
text("plaqueTxt2", "PRODUCTIONS", (-1.42, -3.2, 2.54), 0.065, M_TEXT, rot=(math.radians(90), 0, math.radians(90)), font=HELV, parent=P)

# camera: standing by the door, slightly left, looking at the doors with a forward lean
bpy.ops.object.camera_add(location=(-1.0, -2.3, 2.45), rotation=(math.radians(91), 0, math.radians(-50)))
cam = bpy.context.object
cam.data.lens = 19
cam.data.dof.use_dof = True
cam.data.dof.focus_distance = 3.5
cam.data.dof.aperture_fstop = 4.0
cam.parent = P
sc.camera = cam

for yk in (-6, -2, 2, 6):
    bpy.ops.object.light_add(type="AREA", location=(0, yk, CEIL_Z - 0.12), rotation=(0, 0, 0))
    il = bpy.context.object
    il.data.energy = 18
    il.data.size = 1.2
    il.data.size_y = 3.0
    il.data.color = (1.0, 0.84, 0.66)
    il.parent = P

sc.world = bpy.data.worlds.new("World")
sc.world.use_nodes = True
bg = sc.world.node_tree.nodes["Background"]
bg.inputs[0].default_value = (0.05, 0.04, 0.03, 1)
bg.inputs[1].default_value = 1.0

# ---------- motion (same as v1) ----------
def smooth(t):
    t = max(0.0, min(1.0, t))
    return t * t * (3 - 2 * t)

def train_y_at(time):
    i = min(int(time // T_STOP), len(STOPS) - 1)
    local = time - i * T_STOP
    yc = station_y[i]
    prev = yc - STATION_GAP
    if local < T_APPROACH:
        u = smooth(local / T_APPROACH)
        return prev + STATION_GAP * (0.45 + 0.55 * u) if i > 0 else yc - STATION_GAP * 0.55 * (1 - u)
    if local < T_APPROACH + T_HOLD:
        return yc
    u = smooth((local - T_APPROACH - T_HOLD) / T_DEPART)
    return yc + STATION_GAP * 0.45 * u

def door_open_at(time):
    i = min(int(time // T_STOP), len(STOPS) - 1)
    local = time - i * T_STOP
    a, b = T_APPROACH, T_APPROACH + T_HOLD
    if local < a - 0.2:
        return 0.0
    if local < a + 0.8:
        return smooth((local - (a - 0.2)) / 1.0)
    if local < b - 0.8:
        return 1.0
    if local < b + 0.2:
        return 1.0 - smooth((local - (b - 0.8)) / 1.0)
    return 0.0

for f in range(1, FRAMES + 1):
    t = (f - 1) / FPS
    train.location.y = train_y_at(t)
    train.keyframe_insert("location", frame=f)
    d = door_open_at(t)
    doorL.location.y = -0.6 - 1.15 * d
    doorR.location.y = 0.6 + 1.15 * d
    doorL.keyframe_insert("location", frame=f)
    doorR.keyframe_insert("location", frame=f)
    moving = 1.0 if (train_y_at(t + 1 / FPS) - train_y_at(t)) > 0.01 else 0.0
    cam.location.z = 2.45 + 0.012 * moving * math.sin(t * 9.0)
    cam.location.x = -1.0 + 0.008 * moving * math.sin(t * 6.3)
    cam.keyframe_insert("location", frame=f)

if MODE == "test":
    for name, tm in (("tunnel", 1.2), ("arriving", T_APPROACH - 0.5), ("doors_open", T_APPROACH + 1.6)):
        sc.frame_set(int(tm * FPS) + 1)
        sc.render.filepath = os.path.join(OUT, f"test_{name}.png")
        bpy.ops.render.render(write_still=True)
    print("TRAIN2_TEST_DONE")
else:
    sc.frame_step = STEP
    sc.frame_start = int(os.environ.get("FRAME_START", "1"))
    sc.render.filepath = os.path.join(OUT, "t_")
    bpy.ops.render.render(animation=True)
    print("TRAIN2_FULL_DONE", FRAMES // STEP)
