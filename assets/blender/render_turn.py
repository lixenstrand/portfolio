"""Render the truck's three-point turn, the side road it backs into, and the truck facing left.

blender --factory-startup -b -t 8 --python assets/blender/render_turn.py -- /tmp/magnus-turn
Append --test for a few quick frames, or --road for the side road alone.
Reads truck.blend and leaves it unchanged.

The turn is planned for the trailer's axle centre P: a curve built from straights, clothoid
ramps and arcs. The fifth wheel H, the trailer's heading and the tractor's heading follow
from P without sideways slip, so the rig moves like a real articulated truck.
"""
import json
import math
from pathlib import Path
import sys

import bpy
from bpy_extras.object_utils import world_to_camera_view
from mathutils import Vector

BASE = Path(__file__).resolve().parent
args = sys.argv[sys.argv.index('--') + 1:]
OUT = Path(args[0])
TEST = '--test' in args
ROAD_ONLY = '--road' in args  # just the side road, when only it has changed
OUT.mkdir(parents=True, exist_ok=True)

HITCH_X = -0.815      # fifth wheel, between the tractor's rear axles
TRAILER_AXLE = -10.91 # middle of the trailer's three axles
L2 = HITCH_X - TRAILER_AXLE
MID = -4.625          # halfway between the cab front (4.0) and the trailer's tail (-13.25)
WHEEL = 0.52          # tyre radius
RADIUS, RAMP, SPUR = 6.0, 4.0, 7.0
FPS = 24
FRAMES_A, PAUSE, FRAMES_B = 28, 3, 30


def path(x, y, psi, sign, straight_before=0.0, straight_after=0.0, step=0.02):
    """Straight, curvature ramp, arc, ramp back, straight: a quarter turn. [(x, y, psi, kappa)]"""
    k = sign / RADIUS
    arc = math.pi / 2 * RADIUS - RAMP
    segments = [(straight_before, lambda s: 0.0), (RAMP, lambda s: k * s / RAMP),
                (arc, lambda s: k), (RAMP, lambda s: k * (1 - s / RAMP)),
                (straight_after, lambda s: 0.0)]
    out = [(x, y, psi, 0.0)]
    for length, kappa in segments:
        n = max(1, round(length / step))
        h = length / n
        for i in range(n):
            km = kappa((i + 0.5) * h)
            pm = psi + km * h / 2
            x, y, psi = x + h * math.cos(pm), y + h * math.sin(pm), psi + km * h
            out.append((x, y, psi, kappa((i + 1) * h)))
    return out


def poses(samples, reverse):
    """P, H, trailer and tractor headings, and the distance each axle has rolled."""
    out, sp, sh, prev = [], 0.0, 0.0, None
    sgn = -1 if reverse else 1
    for x, y, psi, k in samples:
        u = Vector((math.cos(psi), math.sin(psi)))
        n = Vector((-u.y, u.x))
        h = Vector((x, y)) + sgn * L2 * u
        dh = u + sgn * L2 * k * n
        if prev:
            sp += sgn * (Vector((x, y)) - prev[0]).length
            sh += sgn * (h - prev[1]).length
        prev = (Vector((x, y)), h)
        out.append(dict(P=Vector((x, y)), H=h, sp=sp, sh=sh,
                        trailer=psi + (math.pi if reverse else 0),
                        tractor=math.atan2(dh.y, dh.x) + (math.pi if reverse else 0)))
    return out


# A: reverse, swinging the trailer left into a side road behind the truck.
a = path(TRAILER_AXLE, 0, math.pi, -1, straight_after=SPUR)
A = poses(a, reverse=True)
# B: forward out of the side road, turning right onto the road and facing -X.
drop = -path(0, 0, -math.pi / 2, -1)[-1][1]
x, y = a[-1][0], a[-1][1]
B = poses(path(x, y, -math.pi / 2, -1, straight_before=y - drop), reverse=False)
for p in B:
    p['sp'] += A[-1]['sp']
    p['sh'] += A[-1]['sh']
SPUR_X = x
SHIFT = MID - (B[-1]['P'].x - (MID - TRAILER_AXLE))  # how far left the truck's midpoint ends
assert abs(B[-1]['P'].y) < 1e-6 and abs(B[-1]['trailer'] % math.tau - math.pi) < 1e-6


def unwrap(values):
    out = [values[0]]
    for v in values[1:]:
        out.append(out[-1] + (v - out[-1] + math.pi) % math.tau - math.pi)
    return out


def along(phase, t):
    """The pose a fraction t (0..1) along a phase, by P's travelled distance."""
    total = phase[-1]['sp'] - phase[0]['sp']
    target = phase[0]['sp'] + total * t
    lo, hi = 0, len(phase) - 1
    while hi - lo > 1:
        mid = (lo + hi) // 2
        if (phase[mid]['sp'] - target) * math.copysign(1, total) <= 0:
            lo = mid
        else:
            hi = mid
    f = 0 if phase[hi]['sp'] == phase[lo]['sp'] else (target - phase[lo]['sp']) / (phase[hi]['sp'] - phase[lo]['sp'])
    mix = lambda key: phase[lo][key] * (1 - f) + phase[hi][key] * f
    return dict(H=phase[lo]['H'].lerp(phase[hi]['H'], f), sp=mix('sp'), sh=mix('sh'),
                trailer=mix('trailer'), tractor=mix('tractor'))


for phase in (A, B):
    for key in ('trailer', 'tractor'):
        for p, v in zip(phase, unwrap([p[key] for p in phase])):
            p[key] = v
    # B continues from A's angles without a jump
B_offset = {k: A[-1][k] - B[0][k] for k in ('trailer', 'tractor')}
for p in B:
    for k, d in B_offset.items():
        p[k] += round(d / math.tau) * math.tau


# A backs exactly as far as B drives, so every wheel ends where it started for the left-facing frames
assert abs(B[-1]['sp']) < 1e-3 and abs(B[-1]['sh']) < 1e-3


def ease(t):
    return t * t * (3 - 2 * t)


timeline = ([along(A, ease(i / FRAMES_A)) for i in range(FRAMES_A + 1)]
            + [along(A, 1)] * PAUSE
            + [along(B, ease(i / FRAMES_B)) for i in range(1, FRAMES_B + 1)])

# Scene: the rig from truck.blend, split into tractor and trailer around the fifth wheel.
bpy.ops.wm.open_mainfile(filepath=str(BASE / 'truck.blend'))
scene = bpy.context.scene
camera = scene.camera
TRACTOR = {'bool_obj', 'SCANIA wordmark', 'Front axle', 'Drive axle', 'Rear axle'}
STATIC = {'CAMERA', 'LIGHT'}
rigs = {}
for name in ('Tractor', 'Trailer'):
    rig = bpy.data.objects.new(f'{name} rig', None)
    scene.collection.objects.link(rig)
    rig.location = (HITCH_X, 0, 0)
    rigs[name] = rig
bpy.context.view_layer.update()
for obj in [o for o in scene.objects if o.parent is None]:
    if obj.type in STATIC or obj.name == 'Contact shadow catcher' or obj in rigs.values():
        continue
    rig = rigs['Tractor' if obj.name.split('.')[0] in TRACTOR else 'Trailer']
    world = obj.matrix_world.copy()
    obj.parent = rig
    obj.matrix_world = world
wheels = {o.name: o for o in scene.objects if o.type == 'EMPTY' and o.name.split('.')[0] in
          {'Front axle', 'Drive axle', 'Rear axle', 'Trailer axle'}}
assert len(wheels) == 6
for obj in wheels.values():
    obj.animation_data_clear()


lights = {o: o.location.copy() for o in scene.objects if o.type == 'LIGHT'}


def pose(H, tractor, trailer, sh, sp):
    rigs['Tractor'].location = (H.x, H.y, 0)
    rigs['Tractor'].rotation_euler = (0, 0, tractor)
    rigs['Trailer'].location = (H.x, H.y, 0)
    rigs['Trailer'].rotation_euler = (0, 0, trailer)
    for name, obj in wheels.items():
        obj.rotation_euler.y = (sp if name.startswith('Trailer') else sh) / WHEEL
    bpy.context.view_layer.update()
    # The studio lights follow the truck, so it is lit as in the drive frames wherever it is
    front = rigs['Tractor'].matrix_world @ Vector((4.0 - HITCH_X, 0, 0))
    rear = rigs['Trailer'].matrix_world @ Vector((-13.25 - HITCH_X, 0, 0))
    offset = (front + rear) / 2 - Vector((MID, 0, 0))
    for light, location in lights.items():
        light.location = location + Vector((offset.x, offset.y, 0))
    bpy.context.view_layer.update()


# The side road: asphalt from the road's far edge into the scene, with rounded corners.
asphalt = bpy.data.materials.new('Fine asphalt')
asphalt.use_nodes = True
nodes, links = asphalt.node_tree.nodes, asphalt.node_tree.links
nodes.clear()
shader = nodes.new('ShaderNodeBsdfPrincipled')
output = nodes.new('ShaderNodeOutputMaterial')
links.new(shader.outputs['BSDF'], output.inputs['Surface'])
shader.inputs['Base Color'].default_value = (.085, .10, .115, 1)
shader.inputs['Roughness'].default_value = .92
noise = nodes.new('ShaderNodeTexNoise')
noise.inputs['Scale'].default_value = 110
bump = nodes.new('ShaderNodeBump')
bump.inputs['Strength'].default_value, bump.inputs['Distance'].default_value = .22, .012
links.new(noise.outputs['Fac'], bump.inputs['Height'])
links.new(bump.outputs['Normal'], shader.inputs['Normal'])

ROAD_EDGE, HALF, CORNER = 3.5, 3.5, 5.0
# Past the trailer's tail, so it reads as a road leading somewhere; pack-turn.mjs fades its far end
spur_end = max(p['P'].y for p in A) + (TRAILER_AXLE + 13.4) + 11.5
# Counterclockwise from the bottom left, inside the road so the far edge line breaks at the junction
right_corner = Vector((SPUR_X + HALF + CORNER, ROAD_EDGE + CORNER))
left_corner = Vector((SPUR_X - HALF - CORNER, ROAD_EDGE + CORNER))
quarter = [math.pi / 2 * i / 12 for i in range(13)]
loop = ([(left_corner.x, ROAD_EDGE - .5), (right_corner.x, ROAD_EDGE - .5)]
        + [(right_corner.x - CORNER * math.sin(a), right_corner.y - CORNER * math.cos(a)) for a in quarter]
        + [(SPUR_X + HALF, spur_end), (SPUR_X - HALF, spur_end)]
        + [(left_corner.x + CORNER * math.cos(a), left_corner.y - CORNER * math.sin(a)) for a in quarter])
mesh = bpy.data.meshes.new('Side road')
mesh.from_pydata([(px, py, 0.004) for px, py in loop], [], [list(range(len(loop)))])
spur = bpy.data.objects.new('Side road', mesh)
scene.collection.objects.link(spur)
mesh.materials.append(asphalt)
# Centre dashes as on the road tile: 3 m of paint every 6 m
paint = bpy.data.materials.new('Warm white road paint')
paint.use_nodes = True
paint.node_tree.nodes['Principled BSDF'].inputs['Base Color'].default_value = (.72, .73, .69, 1)
paint.node_tree.nodes['Principled BSDF'].inputs['Roughness'].default_value = .92
dashes = []


def strip(name, points, width=.12):
    """A painted line along points, as flat as the road's own lines."""
    vertices = []
    for i, (px, py) in enumerate(points):
        ax, ay = points[max(i - 1, 0)]
        bx, by = points[min(i + 1, len(points) - 1)]
        dx, dy = bx - ax, by - ay
        n = math.hypot(dx, dy)
        vertices += [(px - dy / n * width / 2, py + dx / n * width / 2, .007),
                     (px + dy / n * width / 2, py - dx / n * width / 2, .007)]
    faces = [(2 * i, 2 * i + 1, 2 * i + 3, 2 * i + 2) for i in range(len(points) - 1)]
    mesh = bpy.data.meshes.new(name)
    mesh.from_pydata(vertices, [], faces)
    obj = bpy.data.objects.new(name, mesh)
    scene.collection.objects.link(obj)
    mesh.materials.append(paint)
    dashes.append(obj)


# Edge lines carry on from the road's own (0.35 m in from its edge) round both corners
inset = .35
strip('Right edge line', [(right_corner.x - (CORNER + inset) * math.sin(a), right_corner.y - (CORNER + inset) * math.cos(a))
                          for a in quarter] + [(SPUR_X + HALF - inset, spur_end)])
strip('Left edge line', [(left_corner.x + (CORNER + inset) * math.sin(a), left_corner.y - (CORNER + inset) * math.cos(a))
                         for a in quarter] + [(SPUR_X - HALF + inset, spur_end)])
for y0 in range(round(ROAD_EDGE + 2), round(spur_end) - 2, 6):
    bpy.ops.mesh.primitive_plane_add(size=1, location=(SPUR_X, y0 + 1.5, .007))
    dash = bpy.context.object
    dash.scale = (.14, 3, 1)
    dash.data.materials.append(paint)
    dashes.append(dash)

# One camera view for the whole turn, at the drive sprite's scale: 720 px per 18.8 m.
def view(points):
    return [world_to_camera_view(scene, camera, Vector(p)) for p in points]


seen = []
for p in timeline:
    pose(p['H'], p['tractor'], p['trailer'], p['sh'], p['sp'])
    for name, rig in rigs.items():
        lo, hi = (-2.35, 4.05) if name == 'Tractor' else (-13.4, 0.4)
        corners = [(x, y, z) for x in (lo - HITCH_X, hi - HITCH_X) for y in (-1.3, 1.3) for z in (0, 3.95)]
        seen += view([rig.matrix_world @ Vector(c) for c in corners])
seen += view([(px, py, 0) for px, py in loop])
margin = 0.03
u0, u1 = min(v.x for v in seen) - margin, max(v.x for v in seen) + margin
v0, v1 = min(v.y for v in seen) - margin * 3, max(v.y for v in seen) + margin * 3
width, height = round((u1 - u0) * 720 / 2) * 2, round((v1 - v0) * 240 / 2) * 2
u1, v1 = u0 + width / 720, v0 + height / 240
assert width > height
right = camera.matrix_world.to_quaternion() @ Vector((1, 0, 0))
up = camera.matrix_world.to_quaternion() @ Vector((0, 1, 0))
base_location, base_scale = camera.location.copy(), camera.data.ortho_scale


def frame_canvas():
    camera.location = (base_location + right * ((u0 + u1) / 2 - .5) * base_scale
                       + up * ((v0 + v1) / 2 - .5) * base_scale / 3)
    camera.data.ortho_scale = base_scale * (u1 - u0)
    scene.render.resolution_x, scene.render.resolution_y = width, height


def drive_canvas():
    camera.location, camera.data.ortho_scale = base_location, base_scale
    scene.render.resolution_x, scene.render.resolution_y = 720, 240


# The low cab fill would draw a long streak across the ground once the truck faces the camera
catcher = bpy.data.objects['Contact shadow catcher']
ground_only = bpy.data.collections.new('Ground')
ground_only.objects.link(catcher)
fill = bpy.data.objects['Cab fill']
fill.light_linking.receiver_collection = ground_only
ground_only.collection_objects[0].light_linking.link_state = 'EXCLUDE'

scene.cycles.samples = 8 if TEST else 48
scene.render.resolution_percentage = 100
truck_parts = [o for o in scene.objects if o.parent in rigs.values() or o.parent in wheels.values()]


def render(name):
    scene.render.filepath = str(OUT / name)
    bpy.ops.render.render(write_still=True)


# The side road alone, lit like the road tile where it meets the road.
frame_canvas()
for obj in truck_parts:
    obj.hide_render = True
catcher.hide_render = True
for light, location in lights.items():
    light.location = location + Vector((SPUR_X + 4.4, 0, 0))
render('spur.png')
for obj in truck_parts:
    obj.hide_render = False
catcher.hide_render = False
for obj in [spur, *dashes]:
    obj.hide_render = True

if ROAD_ONLY:
    sys.exit()

# The turn, on a transparent ground that keeps the truck's shadow.
frames = range(0, len(timeline), 6) if TEST else range(len(timeline))
for i in frames:
    p = timeline[i]
    pose(p['H'], p['tractor'], p['trailer'], p['sh'], p['sp'])
    render(f'turn-{i + 1:04d}.png')

# Driving both ways with the same light: facing left is the rig turned half a lap around its midpoint.
drive_canvas()
for side, H, heading in (('right', Vector((HITCH_X, 0)), 0), ('left', Vector((2 * MID - HITCH_X, 0)), math.pi)):
    for i in range(0, 24, 6) if TEST else range(24):
        roll = i / 24 * math.tau * WHEEL
        pose(H, heading, heading, roll, roll)
        render(f'{side}-{i + 1:04d}.png')

json.dump({
    'frames': len(timeline), 'fps': FPS,
    # The turn's canvas, in widths of the drive sprite, from the drive sprite's top left corner
    'left': u0, 'top': (1 - v1) / 3, 'width': u1 - u0, 'height': (v1 - v0) / 3,
    # How far left the truck's midpoint ends, in widths of the drive sprite
    'shift': SHIFT * right.x / base_scale,
    'pixels': [width, height],
}, open(OUT / 'turn.json', 'w'), indent=1)
print('turn', json.load(open(OUT / 'turn.json')), flush=True)
