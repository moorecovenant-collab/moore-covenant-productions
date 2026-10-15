"""Headless Blender: 3D gold Metro-sign logo for Moore Covenant Productions.
Outer pill band + inner pill band + slab M, brushed gold, slow turn with a light sweep.
Run: Blender -b -P logo3d.py -- <out_dir> [frames] [size]
"""
import bpy, bmesh, math, sys, os
from mathutils import Vector

argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
OUT = argv[0] if argv else "/tmp/logo3d"
FRAMES = int(argv[1]) if len(argv) > 1 else 72
SIZE = int(argv[2]) if len(argv) > 2 else 900
os.makedirs(OUT, exist_ok=True)

# ---------- clean scene ----------
bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene
scene.render.resolution_x = SIZE
scene.render.resolution_y = int(SIZE * 9 / 16)
scene.render.resolution_percentage = 100
scene.frame_start, scene.frame_end = 1, FRAMES
scene.render.fps = 24
scene.render.film_transparent = False
scene.render.image_settings.file_format = "PNG"
scene.render.image_settings.color_mode = "RGB"
scene.render.filepath = os.path.join(OUT, "f_")

# engine: Eevee (name differs across versions)
for eng in ("BLENDER_EEVEE_NEXT", "BLENDER_EEVEE"):
    try:
        scene.render.engine = eng
        break
    except TypeError:
        continue
try:
    scene.eevee.taa_render_samples = 48
except Exception:
    pass

# ---------- materials ----------
def gold_material(name="Gold", rough=0.28):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    bsdf = m.node_tree.nodes["Principled BSDF"]
    bsdf.inputs["Base Color"].default_value = (0.77, 0.59, 0.29, 1)
    bsdf.inputs["Metallic"].default_value = 1.0
    bsdf.inputs["Roughness"].default_value = rough
    return m

gold = gold_material()

# ---------- geometry: stadium (pill) band ----------
def stadium_points(w, h, n=24):
    """Outline of a vertical stadium: width w, height h, semicircle ends."""
    r = w / 2.0
    straight = max(h - w, 0) / 2.0
    pts = []
    # right side going up, top cap, left side going down, bottom cap
    for i in range(n + 1):
        a = math.pi * i / n                          # 0 -> 180: right side, over the top, to the left
        pts.append((r * math.cos(a), straight + r * math.sin(a)))
    for i in range(n + 1):
        a = math.pi + math.pi * i / n                # 180 -> 360: left side, under the bottom, to the right
        pts.append((r * math.cos(a), -straight + r * math.sin(a)))
    # drop near-duplicate points so the closed spline has no seam
    out = []
    for p in pts:
        if not out or abs(out[-1][0] - p[0]) + abs(out[-1][1] - p[1]) > 1e-6:
            out.append(p)
    if len(out) > 1 and abs(out[0][0] - out[-1][0]) + abs(out[0][1] - out[-1][1]) < 1e-6:
        out.pop()
    pts = out
    return pts

def add_spline(curve, pts):
    sp = curve.splines.new("POLY")
    sp.points.add(len(pts) - 1)
    for i, (x, y) in enumerate(pts):
        sp.points[i].co = (x, y, 0, 1)
    sp.use_cyclic_u = True
    sp.use_smooth = True
    return sp

def band(name, w_out, h_out, thickness, depth, z=0.0):
    """Flat stadium ring built as a 2D curve (outer + inner loop = filled ring), extruded and bevelled."""
    cu = bpy.data.curves.new(name, "CURVE")
    cu.dimensions = "2D"
    cu.fill_mode = "BOTH"
    cu.extrude = depth / 2.0
    cu.bevel_depth = min(thickness, depth) * 0.18
    cu.bevel_resolution = 4
    cu.resolution_u = 2
    add_spline(cu, stadium_points(w_out, h_out, 48))
    add_spline(cu, stadium_points(w_out - 2 * thickness, h_out - 2 * thickness, 48))
    ob = bpy.data.objects.new(name, cu)
    bpy.context.collection.objects.link(ob)
    ob.location.z = z
    cu.materials.append(gold)
    return ob

# proportions from the brand monogram (391 x 467): outer band thick, inner band thin
outer = band("OuterPill", 3.91, 4.67, 0.30, 0.45, z=0.0)
inner = band("InnerPill", 2.40, 3.15, 0.09, 0.30, z=0.0)

# ---------- the M ----------
bpy.ops.object.text_add(location=(0, 0, 0))
m = bpy.context.object
m.name = "M"
m.data.body = "M"
m.data.extrude = 0.18
m.data.bevel_depth = 0.02
m.data.bevel_resolution = 3
m.data.align_x = "CENTER"
m.data.align_y = "CENTER"
for fpath in ("/System/Library/Fonts/Supplemental/Rockwell.ttc",
              "/System/Library/Fonts/Supplemental/Copperplate.ttc",
              "/System/Library/Fonts/Supplemental/Georgia Bold.ttf",
              "/Library/Fonts/Arial Bold.ttf"):
    if os.path.exists(fpath):
        try:
            m.data.font = bpy.data.fonts.load(fpath)
            break
        except Exception:
            pass
m.data.size = 1.55
m.data.materials.append(gold)
m.location = (0, -0.05, 0.0)

# group
bpy.ops.object.empty_add(location=(0, 0, 0))
rig = bpy.context.object
rig.name = "Rig"
rig.rotation_euler = (math.radians(90), 0, 0)
for ob in (outer, inner, m):
    ob.parent = rig

# ---------- camera ----------
bpy.ops.object.camera_add(location=(0, -11.5, 0), rotation=(math.radians(90), 0, 0))
cam = bpy.context.object
cam.data.lens = 70
scene.camera = cam

# ---------- lights ----------
def area(name, loc, energy, size=4.0, color=(1, 1, 1)):
    bpy.ops.object.light_add(type="AREA", location=loc)
    l = bpy.context.object
    l.name = name
    l.data.energy = energy
    l.data.size = size
    l.data.color = color
    # aim at origin
    d = Vector((0, 0, 0)) - Vector(loc)
    l.rotation_euler = d.to_track_quat("-Z", "Y").to_euler()
    return l

key = area("Key", (-5, -7, 4), 900, 3.5, (1.0, 0.93, 0.80))
fill = area("Fill", (6, -8, -2), 250, 6.0, (0.85, 0.9, 1.0))
rim = area("Rim", (0, 6, 5), 600, 3.0, (1.0, 0.85, 0.6))

# dark world
scene.world = bpy.data.worlds.new("World")
scene.world.use_nodes = True
bg = scene.world.node_tree.nodes["Background"]
bg.inputs[0].default_value = (0.02, 0.02, 0.02, 1)
bg.inputs[1].default_value = 0.6

# ---------- animation: Scene 01 hold + orbit, Scene 02 push through the emblem ----------
def ease(t):
    return 0.5 - 0.5 * math.cos(math.pi * t)
def smooth(t):
    return t * t * (3 - 2 * t)

HOLD = int(FRAMES * 0.6)
for f in range(1, FRAMES + 1):
    t = (f - 1) / (FRAMES - 1)
    if f <= HOLD:
        u = (f - 1) / max(HOLD - 1, 1)
        yaw = math.radians(10) * math.sin(math.pi * u)             # gentle orbit, returns to front
        rig.rotation_euler = (math.radians(90), 0, yaw)
        cy = -13.5 + 2.0 * ease(u)                                  # slow creep in
        cz = 0.0
        lens = 70
    else:
        u = (f - HOLD) / max(FRAMES - HOLD, 1)
        v = smooth(u)
        rig.rotation_euler = (math.radians(90), 0, 0)
        cy = -11.5 + 13.0 * v                                       # push through to y=+1.5
        cz = 1.05 * v                                               # rise into the gap above the M
        lens = 70 - 38 * v                                          # widen as we enter
    cam.location = (0, cy, cz)
    cam.rotation_euler = (math.radians(90), 0, 0)
    cam.data.lens = lens
    cam.keyframe_insert("location", frame=f)
    cam.data.keyframe_insert("lens", frame=f)
    rig.keyframe_insert("rotation_euler", frame=f)
    # key light sweeps across the face during the hold
    kx = -7 + 14 * ease((math.sin(2 * math.pi * t - math.pi / 2) + 1) / 2)
    key.location = (kx, -7, 4)
    d = Vector((0, 0, 0)) - Vector(key.location)
    key.rotation_euler = d.to_track_quat("-Z", "Y").to_euler()
    key.keyframe_insert("location", frame=f)
    key.keyframe_insert("rotation_euler", frame=f)

# ---------- render ----------
bpy.ops.render.render(animation=True)
print("LOGO3D_DONE", OUT)
