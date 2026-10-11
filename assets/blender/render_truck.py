"""Render PAndras's Scania with an original steel trailer. See LICENSE.md.

blender --factory-startup -b --python assets/blender/render_truck.py -- /tmp/magnus-truck-frames
Append --preview to render only the large still. +X is forward, units are metres.
"""
import math
from pathlib import Path
import sys

import bpy
from mathutils import Matrix, Vector

BASE = Path(__file__).resolve().parent
args = sys.argv[sys.argv.index('--') + 1:]
OUT = Path(args[0])
OUT.mkdir(parents=True, exist_ok=True)
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)


def material(name, color, metal=0, roughness=0.35):
    mat = bpy.data.materials.new(name)
    mat.diffuse_color = (*color, 1)
    mat.use_nodes = True
    mat.node_tree.nodes.clear()
    bsdf = mat.node_tree.nodes.new('ShaderNodeBsdfPrincipled')
    output = mat.node_tree.nodes.new('ShaderNodeOutputMaterial')
    mat.node_tree.links.new(bsdf.outputs['BSDF'], output.inputs['Surface'])
    bsdf.inputs['Base Color'].default_value = (*color, 1)
    bsdf.inputs['Metallic'].default_value = metal
    bsdf.inputs['Roughness'].default_value = roughness
    return mat


paint = material('Steel blue lacquer', (0.028, 0.095, 0.18), 0.48, 0.22)
paint.node_tree.nodes.get('Principled BSDF').inputs['Coat Weight'].default_value = 0.5
steel = material('Rolled steel', (0.35, 0.39, 0.43), 0.85, 0.35)
alloy = material('Satin aluminium', (0.58, 0.62, 0.66), 0.82, 0.24)
chrome = material('Chrome', (0.72, 0.75, 0.78), 0.95, 0.16)
dark = material('Chassis', (0.025, 0.03, 0.034), 0.25, 0.45)
rubber = material('Rubber', (0.012, 0.014, 0.017), 0, 0.8)
plastic = material('Black plastic', (0.02, 0.026, 0.03), 0, 0.4)
glass = material('Smoked windscreen', (0.022, 0.042, 0.055), 0.42, 0.095)
strap = material('Woven ochre straps', (0.64, 0.24, 0.045), 0, 0.68)
wood = material('Timber dunnage', (0.22, 0.13, 0.06), 0, 0.85)
red = material('Rear reflectors', (0.5, 0.016, 0.012), 0.25, 0.24)
lamp = material('Headlight lenses', (0.75, 0.82, 0.87), 0.32, 0.17)


def surface_grain(mat, stretch, scale, distance):
    nodes, links = mat.node_tree.nodes, mat.node_tree.links
    coords = nodes.new('ShaderNodeTexCoord')
    vector = nodes.new('ShaderNodeVectorMath')
    vector.operation = 'MULTIPLY'
    vector.inputs[1].default_value = stretch
    noise = nodes.new('ShaderNodeTexNoise')
    noise.inputs['Scale'].default_value = scale
    noise.inputs['Detail'].default_value = 2
    bump = nodes.new('ShaderNodeBump')
    bump.inputs['Strength'].default_value = 0.22
    bump.inputs['Distance'].default_value = distance
    links.new(coords.outputs['Generated'], vector.inputs[0])
    links.new(vector.outputs['Vector'], noise.inputs['Vector'])
    links.new(noise.outputs['Fac'], bump.inputs['Height'])
    links.new(bump.outputs['Normal'], nodes.get('Principled BSDF').inputs['Normal'])


surface_grain(steel, (1, 85, 85), 8, 0.009)
surface_grain(alloy, (1, 45, 45), 10, 0.004)
surface_grain(rubber, (1, 1, 1), 140, 0.006)
surface_grain(wood, (1, 35, 35), 5, 0.015)
surface_grain(strap, (1, 1, 1), 180, 0.004)


def box(name, loc, size, mat, bevel=0.018):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc)
    obj = bpy.context.object
    obj.name = name
    obj.dimensions = size
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    obj.data.materials.append(mat)
    if bevel:
        mod = obj.modifiers.new('Edge radius', 'BEVEL')
        mod.width, mod.segments = bevel, 3
        obj.modifiers.new('Weighted normals', 'WEIGHTED_NORMAL')
    return obj


def cylinder(name, loc, radius, depth, mat):
    bpy.ops.mesh.primitive_cylinder_add(vertices=64, radius=radius, depth=depth,
                                      location=loc, rotation=(math.pi / 2, 0, 0))
    obj = bpy.context.object
    obj.name = name
    obj.data.materials.append(mat)
    mod = obj.modifiers.new('Edge radius', 'BEVEL')
    mod.width, mod.segments = 0.01, 3
    obj.modifiers.new('Weighted normals', 'WEIGHTED_NORMAL')
    return obj


def pipe(name, points, radius, mat):
    curve = bpy.data.curves.new(name, 'CURVE')
    curve.dimensions = '3D'
    curve.bevel_depth, curve.bevel_resolution = radius, 2
    spline = curve.splines.new('POLY')
    spline.points.add(len(points) - 1)
    for point, co in zip(spline.points, points):
        point.co = (*co, 1)
    obj = bpy.data.objects.new(name, curve)
    bpy.context.collection.objects.link(obj)
    obj.data.materials.append(mat)
    return obj


def bounds(obj):
    points = [obj.matrix_world @ Vector(c) for c in obj.bound_box]
    return [Vector([fn(p[i] for p in points) for i in range(3)]) for fn in (min, max)]


# Preserve the artist's geometry and material assignments; the FBX references
# missing absolute Windows texture paths, so replace those shaders explicitly.
bpy.ops.import_scene.fbx(filepath=str(BASE / 'scania-source' / 'Export.fbx'))
tractor = [o for o in bpy.context.selected_objects if o.type == 'MESH']
assert len(tractor) == 10, 'Unexpected Scania source geometry'
for obj in list(bpy.context.scene.objects):
    if obj.type in {'LIGHT', 'CAMERA'}:
        bpy.data.objects.remove(obj, do_unlink=True)
transforms = {o: o.matrix_world.copy() for o in tractor}
rotation = Matrix.Rotation(0.867052257 + math.pi / 2, 4, 'Z')
for obj in tractor:
    obj.parent = None
    obj.matrix_world = Matrix.Scale(0.175, 4) @ rotation @ transforms[obj]
bpy.context.view_layer.update()
lo = Vector([min(bounds(o)[0][i] for o in tractor) for i in range(3)])
hi = Vector([max(bounds(o)[1][i] for o in tractor) for i in range(3)])
shift = Vector((4.0 - hi.x, -(lo.y + hi.y) / 2, -lo.z))
for obj in tractor:
    obj.location += shift
bpy.context.view_layer.update()

mapping = {
    'car_paint': paint, 'Car_Dirt_UP': paint, 'steel_painted': paint,
    'Black': plastic, 'Car_Mirror_Plastic': plastic, 'Car_Mirror': chrome,
    'CW-Iron': dark, 'Dark Glass': glass, 'lampa_belso': lamp,
    'Material.007': glass, 'Material.003': dark, 'Material.006': red,
    'Material.001': lamp, 'SimpleBake_Placeholder': plastic,
}
for obj in tractor:
    for slot in obj.material_slots:
        name = slot.material.name
        if 'Brushed Aluminum' in name:
            slot.material = alloy
        elif 'rubber' in name:
            slot.material = rubber
        else:
            slot.material = mapping.get(name, plastic)

# The source shares its painted-steel slot between the cab shell and underframe.
body = bpy.data.objects['bool_obj.004']
body.data.materials.append(dark)
for polygon in body.data.polygons:
    if polygon.material_index == 3 and (body.matrix_world @ polygon.center).z < 1.13:
        polygon.material_index = len(body.data.materials) - 1
assert any(p.material_index == 3 and (body.matrix_world @ p.center).z > 3 for p in body.data.polygons)

# Replace the flat, missing-texture wordmark with clean dimensional lettering.
logo = next(o for o in tractor if o.name == 'Scandia_wordmark.svg')
lower, upper = bounds(logo)
bpy.ops.object.text_add(location=((lower.x + upper.x) / 2 + 0.008,
                                  (lower.y + upper.y) / 2, (lower.z + upper.z) / 2))
wordmark = bpy.context.object
wordmark.name = 'SCANIA wordmark'
wordmark.data.body, wordmark.data.align_x, wordmark.data.align_y = 'SCANIA', 'CENTER', 'CENTER'
wordmark.data.size, wordmark.data.extrude = 0.16, 0.002
wordmark.rotation_euler = (math.pi / 2, 0, math.pi / 2)
wordmark.data.materials.append(chrome)
bpy.data.objects.remove(logo, do_unlink=True)
tractor.remove(logo)

wheel_roots = []
for axle, names in [
    ('Front axle', ['kerek_elso_gumi', 'kerek_elso_tarcsa', 'kerek_elso_csavarok']),
    ('Drive axle', ['kerek_kozeps_kulso', 'kerek_kozepso_belso']),
    ('Rear axle', ['kerek_hatso_kulso', 'kerek_hatso_belso']),
]:
    parts = [bpy.data.objects[name] for name in names]
    lower, upper = bounds(parts[0])
    centre = (lower + upper) / 2
    bpy.ops.object.empty_add(location=centre)
    root = bpy.context.object
    root.name = axle
    for obj in parts:
        world = obj.matrix_world.copy()
        obj.parent = root
        obj.matrix_world = world
    wheel_roots.append(root)

# Flatbed: 13.6 m deck, tapered rails, underrun protection and three axles.
front, rear = 0.35, -13.25
mid = (front + rear) / 2
box('Trailer deck', (mid, 0, 1.34), (13.6, 2.5, 0.12), steel)
for y in (-0.76, 0.76):
    box('Main chassis web', (mid, y, 1.1), (13.5, 0.075, 0.35), dark)
    for z in (0.925, 1.265):
        box('I beam flange', (mid, y, z), (13.5, 0.23, 0.045), dark)
for x in range(-13, 1):
    box('Crossmember', (x, 0, 1.21), (0.06, 2.4, 0.13), dark)
for side in (-1, 1):
    y = side * 1.25
    box('Aluminium side rail', (mid, y, 1.29), (13.6, 0.055, 0.23), alloy)
    box('Reflective side strip', (mid, y + side * 0.031, 1.34), (13.3, 0.007, 0.026), lamp, 0)
    for x in (-12.8, -10.8, -8.8, -6.8, -4.8, -2.8, -0.8):
        box('Lashing pocket', (x, y + side * 0.03, 1.26), (0.12, 0.015, 0.055), dark, 0.006)
        box('Amber marker', (x + 0.22, y + side * 0.035, 1.24), (0.11, 0.025, 0.047), strap, 0.012)
    for x in (-7.7, -4.5):
        box('Sideguard bracket', (x, side * 1.07, 0.79), (0.05, 0.08, 0.7), dark)
    for z in (0.62, 0.84):
        box('Underrun rail', (-6.1, side * 1.13, z), (4.25, 0.075, 0.11), alloy)
    box('Landing leg', (-2.1, side * 0.95, 0.91), (0.17, 0.17, 0.65), dark)
    box('Raised landing foot', (-2.1, side * 0.95, 0.57), (0.35, 0.3, 0.08), steel)
box('Headboard', (0.23, 0, 1.99), (0.09, 2.5, 1.22), paint)
for y in (-1.15, -0.58, 0, 0.58, 1.15):
    box('Headboard upright', (0.15, y, 1.99), (0.09, 0.075, 1.22), alloy)
box('Rear underrun bar', (-13.17, 0, 0.57), (0.12, 2.35, 0.17), alloy)
for y in (-0.9, 0.9):
    box('Tail lamp cluster', (-13.3, y, 1.18), (0.055, 0.48, 0.14), red)

# Reuse the artist's detailed tyre and wheel geometry on the trailer.
source_parts = [bpy.data.objects[n] for n in ('kerek_elso_gumi', 'kerek_elso_tarcsa', 'kerek_elso_csavarok')]
source_centre = wheel_roots[0].location.copy()
for x in (-9.6, -10.91, -12.22):
    bpy.ops.object.empty_add(location=(x, 0, 0.52))
    root = bpy.context.object
    root.name = 'Trailer axle'
    wheel_roots.append(root)
    for source in source_parts:
        obj = source.copy()
        obj.data = source.data.copy()
        bpy.context.collection.objects.link(obj)
        world = Matrix.Translation(Vector((x, 0, 0.52)) - source_centre) @ source.matrix_world
        obj.parent = root
        obj.matrix_world = world
    cylinder('Axle tube', (x, 0, 0.52), 0.075, 2.1, dark)
    for side in (-1, 1):
        # A thin semicircular mudguard follows the tyre instead of a square block.
        vertices, faces = [], []
        for i in range(33):
            a = math.pi * i / 32
            for y in (side * 0.88, side * 1.25):
                vertices.append((x + 0.595 * math.cos(a), y, 0.52 + 0.595 * math.sin(a)))
        for i in range(32):
            faces.append((2*i, 2*i+1, 2*i+3, 2*i+2))
        mesh = bpy.data.meshes.new('Mudguard mesh')
        mesh.from_pydata(vertices, [], faces)
        obj = bpy.data.objects.new('Mudguard', mesh)
        bpy.context.collection.objects.link(obj)
        mesh.materials.append(plastic)
        obj.modifiers.new('Sheet thickness', 'SOLIDIFY').thickness = 0.018
        box('Mud flap', (x - 0.59, side * 1.07, 0.49), (0.025, 0.37, 0.49), rubber)

# Plate bundle on timber, with visible separated edges and tiedown ratchets.
for x in (-11.8, -9.6, -7.4):
    box('Timber bearer', (x, 0, 1.49), (0.13, 2.05, 0.17), wood)
for i in range(12):
    box('Steel plate', (-9.6, 0, 1.602 + i * 0.026), (5.6, 1.95, 0.022), steel, 0.003)
for x in (-11.5, -9.6, -7.7):
    box('Plate tiedown', (x, 0, 1.907), (0.06, 2.02, 0.012), strap, 0.003)
    for side in (-1, 1):
        pipe('Plate webbing', [(x, side * 1.0, 1.9), (x, side * 1.23, 1.38)], 0.024, strap)
        box('Ratchet buckle', (x, side * 1.27, 1.35), (0.13, 0.04, 0.1), alloy)

# Coils have flat annular faces and a cylindrical band, rather than torus shapes.
for x in (-4.9, -2.4):
    centre_z, outer, inner, halfwidth = 2.28, 0.89, 0.3, 0.79
    vertices, faces = [], []
    for radius, y in ((outer, -halfwidth), (outer, halfwidth), (inner, -halfwidth), (inner, halfwidth)):
        for i in range(128):
            a = math.tau * i / 128
            vertices.append((x + radius * math.cos(a), y, centre_z + radius * math.sin(a)))
    for i in range(128):
        j = (i + 1) % 128
        faces.extend([(i,j,128+j,128+i), (256+i,384+i,384+j,256+j),
                      (i,256+i,256+j,j), (128+i,128+j,384+j,384+i)])
    mesh = bpy.data.meshes.new('Steel coil mesh')
    mesh.from_pydata(vertices, [], faces)
    obj = bpy.data.objects.new('Rolled steel coil', mesh)
    bpy.context.collection.objects.link(obj)
    mesh.materials.append(steel)
    for i, poly in enumerate(mesh.polygons):
        poly.use_smooth = i % 4 < 2
    edge = obj.modifiers.new('Coil edge', 'BEVEL')
    edge.width, edge.segments = 0.006, 2
    for side in (-1, 1):
        for radius in [inner + 0.025*i for i in range(1,24)]:
            pipe('Wound sheet edge', [(x + radius*math.cos(math.tau*i/128), side*(halfwidth+0.002),
                                      centre_z+radius*math.sin(math.tau*i/128)) for i in range(129)], 0.0016, alloy)
    for dx in (-0.65, 0.65):
        box('Coil chock', (x+dx, 0, 1.5), (0.24, 1.9, 0.2), wood)
    for y in (-0.5, 0.5):
        pipe('Coil band', [(x+0.897*math.cos(math.tau*i/128), y,
                            centre_z+0.897*math.sin(math.tau*i/128)) for i in range(129)], 0.019, dark)
    for side in (-1, 1):
        pipe('Coil tiedown', [(x - 0.7, side * 1.24, 1.36),
                              (x - 0.18, side * 0.82, centre_z),
                              (x + 0.18, side * 0.82, centre_z),
                              (x + 0.7, side * 1.24, 1.36)], 0.025, strap)
        for dx in (-0.7, 0.7):
            box('Coil ratchet', (x + dx, side * 1.27, 1.34), (0.12, 0.045, 0.11), alloy)

# Only the contact shadow survives the transparent render, not a background plane.
bpy.ops.mesh.primitive_plane_add(size=200, location=(-4.4, 0, -0.015))
ground = bpy.context.object
ground.name = 'Contact shadow catcher'
ground.is_shadow_catcher = True
ground.data.materials.append(material('Ground', (0.55, 0.55, 0.55), 0, 0.9))

scene = bpy.context.scene
scene.frame_start, scene.frame_end, scene.render.fps = 1, 24, 24
for root in wheel_roots:
    root.rotation_euler.y = 0
    root.keyframe_insert(data_path='rotation_euler', frame=1)
    root.rotation_euler.y = math.tau
    root.keyframe_insert(data_path='rotation_euler', frame=25)
    for layer in root.animation_data.action.layers:
        for strip in layer.strips:
            for channelbag in strip.channelbags:
                for curve in channelbag.fcurves:
                    for key in curve.keyframe_points:
                        key.interpolation = 'LINEAR'

# Long-lens, low three-quarter view keeps the cab recognisable without a toy-like overhead view.
target = Vector((-4.4, 0, 1.75))
bpy.ops.object.camera_add(location=(5.8, -31, 8.0))
cam = bpy.context.object
cam.name = 'Website camera'
direction = (target - cam.location).normalized()
up = Vector((1, 0, 0)).cross(direction).normalized()
right = direction.cross(up).normalized()
# Level the projected road so all near-side tyres meet the website's horizontal line.
cam.rotation_euler = Matrix((right, up, -direction)).transposed().to_euler()
cam.data.type, cam.data.ortho_scale = 'ORTHO', 18.8
scene.camera = cam
for name, loc, power, size in [('Large softbox', (-5,-3,14), 3400, 8),
                               ('Rim softbox', (-5,6,10), 5000, 9),
                               ('Cab fill', (8,-1,6), 1500, 4)]:
    bpy.ops.object.light_add(type='AREA', location=loc)
    obj=bpy.context.object
    obj.name=name
    obj.data.energy, obj.data.shape, obj.data.size=power, 'DISK', size
    obj.rotation_euler=(Vector((-3,0,1))-obj.location).to_track_quat('-Z','Y').to_euler()
scene.world.use_nodes=True
scene.world.node_tree.nodes.get('Background').inputs['Color'].default_value=(0.42,0.46,0.5,1)
scene.world.node_tree.nodes.get('Background').inputs['Strength'].default_value=0.3
scene.render.engine='CYCLES'
scene.cycles.samples=96
scene.cycles.use_denoising=True
scene.render.film_transparent=True
scene.render.image_settings.file_format='PNG'
scene.render.image_settings.color_mode='RGBA'
scene.view_settings.view_transform='AgX'
scene.render.resolution_percentage=100
scene.render.resolution_x,scene.render.resolution_y=1440,480
scene.frame_set(13)
assert len(wheel_roots)==6
assert all(math.isclose(o.rotation_euler.y,math.pi,abs_tol=1e-5) for o in wheel_roots)
scene.frame_set(1)
scene.render.filepath=str(OUT/'preview.png')
bpy.ops.render.render(write_still=True)
if '--preview' not in args:
    scene.cycles.samples=48
    scene.render.resolution_x,scene.render.resolution_y=720,240
    scene.render.filepath=str(OUT/'truck-')
    bpy.context.preferences.filepaths.save_version = 0
    bpy.data.orphans_purge(do_recursive=True)
    bpy.ops.wm.save_as_mainfile(filepath=str(BASE/'truck.blend'))
    bpy.ops.render.render(animation=True)
