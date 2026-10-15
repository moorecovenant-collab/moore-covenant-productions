"""Headless Blender: the Moore Covenant Metro ride.
POV from inside a DC-style Metro car. The train leaves a tunnel, slows into a lit station,
the doors open on a pylon sign naming a service, holds, closes, and pulls away. Repeats per stop.

Run:  Blender -b -P metro_train.py -- <out_dir> <mode> [width]
  mode = "test"  -> three stills (tunnel / arriving / doors open at stop 1)
  mode = "full"  -> the whole sequence as PNG frames
"""
import bpy, bmesh, math, sys, os
from mathutils import Vector

argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
OUT = argv[0] if argv else "/tmp/metro"
MODE = argv[1] if len(argv) > 1 else "test"
W = int(argv[2]) if len(argv) > 2 else 1280
os.makedirs(OUT, exist_ok=True)

FPS = 24
STOPS = [
    ("01", "Social Media Management"),
    ("02", "Video Production"),
    ("03", "Websites & Brand"),
    ("04", "Your Brand"),            # final destination / CTA
]
STATION_GAP = 140.0        # metres of tunnel between station centres
PLATFORM_LEN = 60.0
TRAIN_LEN = 22.0

# timing per stop (seconds): approach, hold with doors open, depart
T_APPROACH, T_HOLD, T_DEPART = 3.0, 3.0, 2.5
T_STOP = T_APPROACH + T_HOLD + T_DEPART
TOTAL = len(STOPS) * T_STOP
FRAMES = int(TOTAL * FPS)

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
    sc.eevee.taa_render_samples = 32
    sc.eevee.use_bloom = True
except Exception:
    pass
try:
    sc.view_settings.view_transform = "AgX"
    sc.view_settings.look = "AgX - Medium High Contrast"
except Exception:
    pass

# ---------- materials ----------
def mat(name, color, rough=0.5, metal=0.0, emit=None, strength=1.0):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    b = m.node_tree.nodes["Principled BSDF"]
    b.inputs["Base Color"].default_value = (*color, 1)
    b.inputs["Roughness"].default_value = rough
    b.inputs["Metallic"].default_value = metal
    if emit:
        b.inputs["Emission Color"].default_value = (*emit, 1)
        b.inputs["Emission Strength"].default_value = strength
    return m

M_CONCRETE = mat("Concrete", (0.32, 0.30, 0.27), rough=0.9)
M_COFFER = mat("Coffer", (0.22, 0.21, 0.19), rough=0.95)
M_PLATFORM = mat("Platform", (0.35, 0.21, 0.13), rough=0.8)          # terracotta-red tile
M_GRANITE = mat("Granite", (0.12, 0.12, 0.12), rough=0.6)
M_STEEL = mat("Steel", (0.62, 0.63, 0.66), rough=0.6, metal=0.8)   # train skin
M_GOLD = mat("Gold", (0.77, 0.59, 0.29), rough=0.3, metal=1.0)
M_GLASS = mat("Glass", (0.05, 0.06, 0.08), rough=0.05, metal=0.2)
M_INTERIOR = mat("Interior", (0.55, 0.45, 0.35), rough=0.7)
M_PYLON = mat("Pylon", (0.16, 0.10, 0.07), rough=0.6)
M_SIGN = mat("Sign", (0.02, 0.02, 0.02), rough=0.4, emit=(1.0, 0.96, 0.9), strength=0.15)
M_TEXT = mat("Text", (0.95, 0.95, 0.95), emit=(1, 1, 1), strength=2.0)
M_TEXTGOLD = mat("TextGold", (0.77, 0.59, 0.29), metal=1.0, rough=0.3, emit=(0.9, 0.7, 0.35), strength=1.2)
M_LIGHT = mat("Light", (1, 1, 1), emit=(1.0, 0.85, 0.6), strength=6.0)
M_TUNNELLIGHT = mat("TunnelLight", (1, 1, 1), emit=(1.0, 0.9, 0.7), strength=25.0)
M_SIGNAL = mat("Signal", (1, 1, 1), emit=(1.0, 0.1, 0.05), strength=30.0)

def box(name, size, loc, m, rot=(0, 0, 0)):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc, rotation=rot)
    o = bpy.context.object
    o.name = name
    o.scale = (size[0], size[1], size[2])
    o.data.materials.append(m)
    return o

def text(name, body, loc, size, m, rot=(math.radians(90), 0, 0), align="CENTER", extrude=0.01, font=None):
    bpy.ops.object.text_add(location=loc, rotation=rot)
    o = bpy.context.object
    o.name = name
    o.data.body = body
    o.data.size = size
    o.data.extrude = extrude
    o.data.align_x = align
    o.data.align_y = "CENTER"
    if font and os.path.exists(font):
        try:
            o.data.font = bpy.data.fonts.load(font)
        except Exception:
            pass
    o.data.materials.append(m)
    return o

HELV = "/System/Library/Fonts/HelveticaNeue.ttc"   # Metro signage is Helvetica
SERIF = "/System/Library/Fonts/Supplemental/Georgia Bold.ttf"

# ---------- the vault (DC coffered ceiling) ----------
# Vault: an arch 14 m wide, 9 m tall, running the whole route. Coffers = a grid of recessed
# panels suggested by raised ribs (cheap and reads instantly).
ROUTE_LEN = STATION_GAP * len(STOPS) + 200
Y0 = -120.0

def vault(y_start, length, radius=7.0, segs=14, rib=True):
    # half-tube made of flat strips so the ribs can sit on it
    for i in range(segs):
        a0 = math.pi * i / segs
        a1 = math.pi * (i + 1) / segs
        am = (a0 + a1) / 2
        w = 2 * radius * math.sin((a1 - a0) / 2) * 1.02
        x = radius * math.cos(am)
        z = radius * math.sin(am) + 1.0
        o = box(f"vault_{y_start}_{i}", (w, length, 0.3), (x, y_start + length / 2, z), M_CONCRETE,
                rot=(0, -(am + math.pi / 2), 0))
        o.data.materials[0] = M_COFFER if rib else M_CONCRETE
    if rib:
        # longitudinal ribs
        for i in range(segs + 1):
            a = math.pi * i / segs
            x = (radius - 0.15) * math.cos(a)
            z = (radius - 0.15) * math.sin(a) + 1.0
            box(f"ribL_{y_start}_{i}", (0.35, length, 0.35), (x, y_start + length / 2, z), M_CONCRETE,
                rot=(0, -(a + math.pi / 2), 0))
        # transverse ribs every 4 m
        n = int(length / 4)
        for j in range(n + 1):
            y = y_start + j * 4
            bpy.ops.mesh.primitive_torus_add(location=(0, y, 1.0), rotation=(math.radians(90), 0, 0),
                                             major_radius=radius - 0.15, minor_radius=0.18,
                                             major_segments=48, minor_segments=6)
            t = bpy.context.object
            t.name = f"ribT_{y_start}_{j}"
            t.data.materials.append(M_CONCRETE)
            # cut the bottom half off visually by sinking it: cheap, the floor hides it
            t.location.z = 1.0

# ---------- stations ----------
def station(idx, y_center, number, label):
    half = PLATFORM_LEN / 2
    # platform slabs either side of the track (track runs down the centre at x=0)
    for side in (-1, 1):
        box(f"plat_{idx}_{side}", (5.0, PLATFORM_LEN, 1.1), (side * 4.5, y_center, 0.55), M_PLATFORM)
        box(f"edge_{idx}_{side}", (0.6, PLATFORM_LEN, 1.12), (side * 2.3, y_center, 0.56), M_GRANITE)
        # the classic platform-edge lights: a strip of warm bulbs
        for k in range(int(PLATFORM_LEN / 2)):
            y = y_center - half + 1 + k * 2
            box(f"pl_{idx}_{side}_{k}", (0.25, 0.5, 0.08), (side * 2.0, y, 1.13), M_LIGHT)
    # uplights washing the vault
    for side in (-1, 1):
        for k in range(6):
            y = y_center - half + 5 + k * 10
            bpy.ops.object.light_add(type="AREA", location=(side * 5.5, y, 1.3))
            l = bpy.context.object
            l.data.energy = 900
            l.data.size = 3.0
            l.data.color = (1.0, 0.85, 0.62)
            l.rotation_euler = (math.radians(-35 * side), 0, 0)
    # pylons with the station sign (one each side, facing the track)
    for side in (-1, 1):
        px = side * 6.2
        box(f"pylon_{idx}_{side}", (0.9, 0.9, 3.6), (px, y_center, 2.9), M_PYLON)
        # sign face toward the track
        sx = px - side * 0.49
        box(f"sign_{idx}_{side}", (0.04, 2.6, 0.9), (sx, y_center, 3.9), M_SIGN)
        rot = (math.radians(90), 0, math.radians(-90 if side > 0 else 90))
        text(f"stopno_{idx}_{side}", f"STOP {number}", (sx - side * 0.04, y_center, 4.15), 0.22, M_TEXTGOLD, rot=rot, font=HELV)
        text(f"name_{idx}_{side}", label.upper(), (sx - side * 0.04, y_center, 3.75), 0.26, M_TEXT, rot=rot, font=HELV)
        # gold line stripe (our "line colour")
        box(f"stripe_{idx}_{side}", (0.05, 2.6, 0.08), (sx, y_center, 3.38), M_GOLD)
    # big wall mark: the station name on the far wall behind the platform
    for side in (-1, 1):
        rot = (math.radians(90), 0, math.radians(-90 if side > 0 else 90))
        text(f"wall_{idx}_{side}", label.upper(), (side * 8.6, y_center, 2.2), 0.9, M_TEXT, rot=rot, font=HELV)
        box(f"wallbar_{idx}_{side}", (0.06, 14, 0.12), (side * 8.6, y_center, 1.5), M_GOLD)

# ---------- tunnel between stations: dark with occasional tunnel lights + red signals ----------
def tunnel_lights(y_from, y_to):
    y = y_from
    k = 0
    while y < y_to:
        side = -1 if k % 2 else 1
        box(f"tl_{y:.0f}", (0.3, 0.3, 0.6), (side * 6.0, y, 3.0), M_TUNNELLIGHT)
        if k % 5 == 2:
            box(f"sig_{y:.0f}", (0.2, 0.2, 0.2), (-side * 6.0, y + 4, 2.4), M_SIGNAL)
        y += 12
        k += 1

# ---------- build the route ----------
vault(Y0, ROUTE_LEN, rib=True)
# track bed
box("trackbed", (4.0, ROUTE_LEN, 0.2), (0, Y0 + ROUTE_LEN / 2, -0.1), M_GRANITE)
for side in (-0.75, 0.75):
    box(f"rail_{side}", (0.08, ROUTE_LEN, 0.1), (side, Y0 + ROUTE_LEN / 2, 0.05), M_STEEL)
# tunnel walls between stations (so the dark reads as tunnel, not void)
box("wallL", (0.5, ROUTE_LEN, 8), (-7.2, Y0 + ROUTE_LEN / 2, 4), M_COFFER)
box("wallR", (0.5, ROUTE_LEN, 8), (7.2, Y0 + ROUTE_LEN / 2, 4), M_COFFER)

station_y = []
for i, (num, label) in enumerate(STOPS):
    yc = i * STATION_GAP
    station_y.append(yc)
    station(i, yc, num, label)
    if i < len(STOPS) - 1:
        tunnel_lights(yc + PLATFORM_LEN / 2 + 6, yc + STATION_GAP - PLATFORM_LEN / 2 - 6)
tunnel_lights(Y0 + 10, station_y[0] - PLATFORM_LEN / 2 - 6)

# ---------- the train (we ride inside it) ----------
bpy.ops.object.empty_add(location=(0, 0, 0))
train = bpy.context.object
train.name = "Train"

def part(o):
    o.parent = train
    return o

# body shell: floor, ceiling, two side walls with window cut-outs (built as panels + glass)
part(box("floor", (3.0, TRAIN_LEN, 0.1), (0, 0, 1.15), M_INTERIOR))
part(box("ceil", (3.0, TRAIN_LEN, 0.1), (0, 0, 3.45), M_INTERIOR))
for side in (-1, 1):
    x = side * 1.5
    # lower wall
    part(box(f"wallLo_{side}", (0.08, TRAIN_LEN, 0.9), (x, 0, 1.65), M_STEEL))
    # upper strip
    part(box(f"wallHi_{side}", (0.08, TRAIN_LEN, 0.35), (x, 0, 3.25), M_STEEL))
    # window mullions
    for k in range(-5, 6):
        if side > 0 and abs(k * 2.0) < 1.4:
            continue
        part(box(f"mull_{side}_{k}", (0.1, 0.12, 1.0), (x, k * 2.0, 2.6), M_STEEL))
    # brand stripe outside
    part(box(f"stripe_{side}", (0.1, TRAIN_LEN, 0.12), (x + side * 0.02, 0, 2.05), M_GOLD))
    # doors (two leaves) at y = -1.2 .. +1.2 on the right-hand side only; the left stays solid
# door leaves (right side, we look out of these)
def door_leaf(name, y):
    bpy.ops.object.empty_add(location=(1.52, y, 2.25))
    e = bpy.context.object
    e.name = name
    e.parent = train
    # lower panel, upper rail, two side posts: leaves an open window 2.3 .. 3.1
    for nm, size, loc in (("lo", (0.09, 1.2, 1.15), (0, 0, -0.675)),
                          ("hi", (0.09, 1.2, 0.25), (0, 0, 0.975)),
                          ("pa", (0.09, 0.16, 0.8), (0, -0.52, 0.45)),
                          ("pb", (0.09, 0.16, 0.8), (0, 0.52, 0.45))):
        bpy.ops.mesh.primitive_cube_add(size=1, location=(0, 0, 0))
        o = bpy.context.object
        o.name = f"{name}_{nm}"
        o.scale = size
        o.location = loc
        o.data.materials.append(M_STEEL)
        o.parent = e
    return e
doorL = door_leaf("doorL", -0.6)
doorR = door_leaf("doorR", 0.6)
# cut the wall where the door is by overlaying interior-coloured frame (visual only)
part(box("doorframe", (0.12, 2.6, 2.3), (1.49, 0, 2.25), M_INTERIOR)).hide_render = True
# interior ceiling lights
for k in range(-4, 5):
    part(box(f"ilight_{k}", (0.5, 1.2, 0.05), (0, k * 2.4, 3.4), M_LIGHT))
# seats (simple benches) along the left wall
for k in range(-4, 5):
    part(box(f"seat_{k}", (0.6, 1.6, 0.5), (-1.1, k * 2.4, 1.45), M_PYLON))
    part(box(f"seatback_{k}", (0.15, 1.6, 0.7), (-1.35, k * 2.4, 2.05), M_PYLON))
# a grab pole and the logo plaque on the inside wall
part(box("pole", (0.05, 0.05, 2.2), (0.6, 2.4, 2.3), M_STEEL))
plaque = part(box("plaque", (0.03, 0.9, 0.5), (-1.45, -3.2, 2.6), M_SIGN))
text("plaqueTxt", "MOORE COVENANT", (-1.42, -3.2, 2.66), 0.09, M_TEXTGOLD,
     rot=(math.radians(90), 0, math.radians(90)), font=HELV).parent = train
text("plaqueTxt2", "PRODUCTIONS", (-1.42, -3.2, 2.52), 0.07, M_TEXT,
     rot=(math.radians(90), 0, math.radians(90)), font=HELV).parent = train
# rider's POV camera: standing by the right-hand door, looking out and slightly forward
bpy.ops.object.camera_add(location=(-0.3, -0.2, 2.4), rotation=(math.radians(86), 0, math.radians(-78)))
cam = bpy.context.object
cam.data.lens = 24
cam.parent = train
sc.camera = cam
# interior fill light so the car reads
bpy.ops.object.light_add(type="POINT", location=(0, 0, 3.2))
il = bpy.context.object
il.data.energy = 12
il.data.color = (1.0, 0.9, 0.75)
il.parent = train

# world: near black with a little ambient
sc.world = bpy.data.worlds.new("World")
sc.world.use_nodes = True
bg = sc.world.node_tree.nodes["Background"]
bg.inputs[0].default_value = (0.01, 0.01, 0.012, 1)
bg.inputs[1].default_value = 1.0

# ---------- motion ----------
def smooth(t):
    t = max(0.0, min(1.0, t))
    return t * t * (3 - 2 * t)

def train_y_at(time):
    """Position along the route for a given time: for each stop, approach (decelerate),
    hold, depart (accelerate)."""
    i = min(int(time // T_STOP), len(STOPS) - 1)
    local = time - i * T_STOP
    yc = station_y[i]
    prev = yc - STATION_GAP
    if local < T_APPROACH:
        u = smooth(local / T_APPROACH)
        # arrive from the previous midpoint with an ease-out
        return prev + (STATION_GAP) * (0.45 + 0.55 * u) if i > 0 else yc - STATION_GAP * 0.55 * (1 - u)
    if local < T_APPROACH + T_HOLD:
        return yc
    u = smooth((local - T_APPROACH - T_HOLD) / T_DEPART)
    nxt = yc + STATION_GAP
    return yc + (nxt - yc) * 0.45 * u

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
    # tiny camera sway while moving
    moving = 1.0 if (train_y_at(t + 1 / FPS) - train_y_at(t)) > 0.01 else 0.0
    cam.location.z = 2.45 + 0.012 * moving * math.sin(t * 9.0)
    cam.location.x = 0.2 + 0.008 * moving * math.sin(t * 6.3)
    cam.keyframe_insert("location", frame=f)

# ---------- render ----------
if MODE == "test":
    for name, tm in (("tunnel", 1.0), ("arriving", T_APPROACH - 0.4), ("doors_open", T_APPROACH + 1.5), ("stop2_open", T_STOP + T_APPROACH + 1.5)):
        sc.frame_set(int(tm * FPS) + 1)
        sc.render.filepath = os.path.join(OUT, f"test_{name}.png")
        bpy.ops.render.render(write_still=True)
    print("TRAIN_TEST_DONE")
else:
    sc.render.filepath = os.path.join(OUT, "t_")
    bpy.ops.render.render(animation=True)
    print("TRAIN_FULL_DONE", FRAMES)
