"""Headless Blender: the Moore Covenant opening.
Scene 01  dark -> the gold Metro emblem lights up and settles (pop + orbit).
Scene 02  camera pushes into the inner oval. Behind the emblem, masked by the oval,
          the Higgsfield DC night aerial is revealed and pulls closer and closer.
Scene 03  the camera passes through the oval; the city fills the frame and keeps pushing in,
          then a quick dissolve to black (the site cuts to the train interior / ride from here).

Run: Blender -b -P opening.py -- <out_dir> <city_image> [frames] [width]
"""
import bpy, math, sys, os
from mathutils import Vector

argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
OUT = argv[0]
CITY = argv[1]
FRAMES = int(argv[2]) if len(argv) > 2 else 168        # 7 s @ 24
W = int(argv[3]) if len(argv) > 3 else 1280
os.makedirs(OUT, exist_ok=True)

bpy.ops.wm.read_factory_settings(use_empty=True)
sc = bpy.context.scene
sc.render.resolution_x, sc.render.resolution_y = W, int(W * 9 / 16)
sc.render.fps = 24
sc.frame_start, sc.frame_end = 1, FRAMES
sc.render.image_settings.file_format = "PNG"
sc.render.image_settings.color_mode = "RGB"
sc.render.film_transparent = False
for eng in ("BLENDER_EEVEE_NEXT", "BLENDER_EEVEE"):
    try:
        sc.render.engine = eng
        break
    except TypeError:
        pass
try:
    sc.eevee.taa_render_samples = 48
except Exception:
    pass
try:
    sc.view_settings.view_transform = "AgX"
except Exception:
    pass

# ---------- materials ----------
def gold_material(rough=0.28):
    m = bpy.data.materials.new("Gold")
    m.use_nodes = True
    b = m.node_tree.nodes["Principled BSDF"]
    b.inputs["Base Color"].default_value = (0.77, 0.59, 0.29, 1)
    b.inputs["Metallic"].default_value = 1.0
    b.inputs["Roughness"].default_value = rough
    return m

def image_material(path, strength=1.0):
    """Emissive plane material so the plate reads exactly as the image, independent of lights."""
    m = bpy.data.materials.new("City")
    m.use_nodes = True
    nt = m.node_tree
    for n in list(nt.nodes):
        nt.nodes.remove(n)
    out = nt.nodes.new("ShaderNodeOutputMaterial")
    em = nt.nodes.new("ShaderNodeEmission")
    tex = nt.nodes.new("ShaderNodeTexImage")
    tex.image = bpy.data.images.load(path)
    em.inputs["Strength"].default_value = strength
    nt.links.new(tex.outputs["Color"], em.inputs["Color"])
    nt.links.new(em.outputs["Emission"], out.inputs["Surface"])
    return m

gold = gold_material()
city_mat = image_material(CITY, 1.0)

# ---------- emblem (same build as logo3d.py) ----------
def stadium_points(w, h, n=48):
    r = w / 2.0
    straight = max(h - w, 0) / 2.0
    pts = []
    for i in range(n + 1):
        a = math.pi * i / n
        pts.append((r * math.cos(a), straight + r * math.sin(a)))
    for i in range(n + 1):
        a = math.pi + math.pi * i / n
        pts.append((r * math.cos(a), -straight + r * math.sin(a)))
    out = []
    for p in pts:
        if not out or abs(out[-1][0] - p[0]) + abs(out[-1][1] - p[1]) > 1e-6:
            out.append(p)
    if len(out) > 1 and abs(out[0][0] - out[-1][0]) + abs(out[0][1] - out[-1][1]) < 1e-6:
        out.pop()
    return out

def add_spline(curve, pts):
    sp = curve.splines.new("POLY")
    sp.points.add(len(pts) - 1)
    for i, (x, y) in enumerate(pts):
        sp.points[i].co = (x, y, 0, 1)
    sp.use_cyclic_u = True
    sp.use_smooth = True

def band(name, w_out, h_out, thickness, depth):
    cu = bpy.data.curves.new(name, "CURVE")
    cu.dimensions = "2D"
    cu.fill_mode = "BOTH"
    cu.extrude = depth / 2.0
    cu.bevel_depth = min(thickness, depth) * 0.18
    cu.bevel_resolution = 4
    add_spline(cu, stadium_points(w_out, h_out))
    add_spline(cu, stadium_points(w_out - 2 * thickness, h_out - 2 * thickness))
    ob = bpy.data.objects.new(name, cu)
    bpy.context.collection.objects.link(ob)
    cu.materials.append(gold)
    return ob

outer = band("OuterPill", 3.91, 4.67, 0.30, 0.45)
inner = band("InnerPill", 2.40, 3.15, 0.09, 0.30)

bpy.ops.object.text_add(location=(0, -0.05, 0))
m = bpy.context.object
m.name = "M"
m.data.body = "M"
m.data.extrude = 0.18
m.data.bevel_depth = 0.02
m.data.bevel_resolution = 3
m.data.align_x = "CENTER"
m.data.align_y = "CENTER"
for fpath in ("/System/Library/Fonts/Supplemental/Rockwell.ttc", "/System/Library/Fonts/Supplemental/Georgia Bold.ttf"):
    if os.path.exists(fpath):
        try:
            m.data.font = bpy.data.fonts.load(fpath)
            break
        except Exception:
            pass
m.data.size = 1.55
m.data.materials.append(gold)

bpy.ops.object.empty_add(location=(0, 0, 0))
rig = bpy.context.object
rig.name = "Rig"
rig.rotation_euler = (math.radians(90), 0, 0)
for ob in (outer, inner, m):
    ob.parent = rig

# ---------- the city behind the oval ----------
# A large emissive plane far behind the emblem. It is only visible through the inner oval
# because a black "mask" plane with an oval hole sits just behind the emblem.
img = bpy.data.images.load(CITY)
aspect = img.size[0] / img.size[1]
bpy.ops.mesh.primitive_plane_add(size=1, location=(0, 60, 0), rotation=(math.radians(90), 0, 0))
city = bpy.context.object
city.name = "City"
city.scale = (60 * aspect, 60, 1)
city.data.materials.append(city_mat)

# black mask with an oval hole matching the inner pill opening, 0.4 m behind the emblem
mask_cu = bpy.data.curves.new("Mask", "CURVE")
mask_cu.dimensions = "2D"
mask_cu.fill_mode = "BOTH"
add_spline(mask_cu, [(-40, -25), (40, -25), (40, 25), (-40, 25)])
add_spline(mask_cu, stadium_points(2.40 - 0.18, 3.15 - 0.18))
mask = bpy.data.objects.new("Mask", mask_cu)
bpy.context.collection.objects.link(mask)
black = bpy.data.materials.new("Black")
black.use_nodes = True
bb = black.node_tree.nodes["Principled BSDF"]
bb.inputs["Base Color"].default_value = (0, 0, 0, 1)
bb.inputs["Roughness"].default_value = 1.0
mask_cu.materials.append(black)
# parented to the rig, which already stands the emblem up; "behind" is local -Z
mask.parent = rig
mask.location = (0, 0, -0.4)

# ---------- camera + lights ----------
bpy.ops.object.camera_add(location=(0, -13.5, 0), rotation=(math.radians(90), 0, 0))
cam = bpy.context.object
cam.data.lens = 70
sc.camera = cam

def area(name, loc, energy, size=4.0, color=(1, 1, 1)):
    bpy.ops.object.light_add(type="AREA", location=loc)
    l = bpy.context.object
    l.name = name
    l.data.energy = energy
    l.data.size = size
    l.data.color = color
    d = Vector((0, 0, 0)) - Vector(loc)
    l.rotation_euler = d.to_track_quat("-Z", "Y").to_euler()
    return l

key = area("Key", (-5, -7, 4), 900, 3.5, (1.0, 0.93, 0.80))
area("Fill", (6, -8, -2), 250, 6.0, (0.85, 0.9, 1.0))
area("Rim", (0, 6, 5), 600, 3.0, (1.0, 0.85, 0.6))

sc.world = bpy.data.worlds.new("World")
sc.world.use_nodes = True
bg = sc.world.node_tree.nodes["Background"]
bg.inputs[0].default_value = (0.01, 0.01, 0.012, 1)
bg.inputs[1].default_value = 0.6

# ---------- animation ----------
def smooth(t):
    t = max(0.0, min(1.0, t))
    return t * t * (3 - 2 * t)

def ease_out(t):
    t = max(0.0, min(1.0, t))
    return 1 - (1 - t) ** 3

POP_END = int(FRAMES * 0.22)       # emblem pops/lights up
HOLD_END = int(FRAMES * 0.42)      # slow orbit, city starts to breathe behind
PUSH_END = int(FRAMES * 0.86)      # push through the oval, city pulls closer
# after PUSH_END: inside the city, keep pushing, fade to black (handled on the site)

for f in range(1, FRAMES + 1):
    if f <= POP_END:
        u = (f - 1) / max(POP_END - 1, 1)
        s = 0.6 + 0.4 * ease_out(u)                          # scale up as it appears
        rig.scale = (s, s, s)
        rig.rotation_euler = (math.radians(90), 0, math.radians(-25) * (1 - ease_out(u)))
        cy, cz, lens = -13.5, 0.0, 70
        city_scale = 60.0
        key_e = 900 * ease_out(u)
    elif f <= HOLD_END:
        u = (f - POP_END) / max(HOLD_END - POP_END, 1)
        rig.scale = (1, 1, 1)
        rig.rotation_euler = (math.radians(90), 0, math.radians(8) * math.sin(math.pi * u))
        cy, cz, lens = -13.5 + 1.5 * smooth(u), 0.0, 70
        city_scale = 60.0 - 6.0 * smooth(u)                  # city starts to pull closer (plane moves nearer)
        key_e = 900
    elif f <= PUSH_END:
        u = (f - HOLD_END) / max(PUSH_END - HOLD_END, 1)
        v = smooth(u)
        rig.scale = (1, 1, 1)
        rig.rotation_euler = (math.radians(90), 0, 0)
        cy = -12.0 + 13.2 * v                                 # through the oval to y=+1.2
        cz = 0.0
        lens = 70 - 36 * v
        city_scale = 54.0 - 30.0 * v                          # city rushes closer
        key_e = 900
    else:
        u = (f - PUSH_END) / max(FRAMES - PUSH_END, 1)
        rig.rotation_euler = (math.radians(90), 0, 0)
        cy = 1.2 + 6.0 * smooth(u)                            # keep pushing into the city
        cz = 0.0
        lens = 34 - 6 * smooth(u)
        city_scale = 24.0 - 6.0 * smooth(u)
        key_e = 900
    cam.location = (0, cy, cz)
    cam.data.lens = lens
    cam.keyframe_insert("location", frame=f)
    cam.data.keyframe_insert("lens", frame=f)
    rig.keyframe_insert("rotation_euler", frame=f)
    rig.keyframe_insert("scale", frame=f)
    # the city plane: keep it filling the view; move it closer as the scale shrinks
    city.location = (0, city_scale, 0)
    city.scale = (city_scale * aspect, city_scale, 1)
    city.keyframe_insert("location", frame=f)
    city.keyframe_insert("scale", frame=f)
    key.data.energy = key_e
    key.data.keyframe_insert("energy", frame=f)
    # light sweep
    t = (f - 1) / (FRAMES - 1)
    kx = -7 + 14 * (0.5 - 0.5 * math.cos(2 * math.pi * t))
    key.location = (kx, -7, 4)
    d = Vector((0, 0, 0)) - Vector(key.location)
    key.rotation_euler = d.to_track_quat("-Z", "Y").to_euler()
    key.keyframe_insert("location", frame=f)
    key.keyframe_insert("rotation_euler", frame=f)

MODE = os.environ.get("OPENING_MODE", "full")
if MODE == "test":
    for fr in (int(FRAMES * 0.1), int(FRAMES * 0.35), int(FRAMES * 0.6), int(FRAMES * 0.8), int(FRAMES * 0.95)):
        sc.frame_set(fr)
        sc.render.filepath = os.path.join(OUT, f"test_{fr:03d}.png")
        bpy.ops.render.render(write_still=True)
    print("OPENING_TEST_DONE")
else:
    sc.render.filepath = os.path.join(OUT, "o_")
    bpy.ops.render.render(animation=True)
    print("OPENING_FULL_DONE")
