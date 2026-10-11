"""Render a repeating road tile using the truck's camera and lighting."""
from pathlib import Path
import bpy
from mathutils import Vector

root = Path(__file__).resolve().parent
bpy.ops.wm.open_mainfile(filepath=str(root / 'truck.blend'))
scene = bpy.context.scene
for obj in list(scene.objects):
    if obj.type not in {'CAMERA', 'LIGHT'}:
        bpy.data.objects.remove(obj, do_unlink=True)

def material(name, color):
    mat = bpy.data.materials.new(name)
    mat.diffuse_color = (*color, 1)
    mat.use_nodes = True
    mat.node_tree.nodes.clear()
    shader = mat.node_tree.nodes.new('ShaderNodeBsdfPrincipled')
    shader.name = 'Principled BSDF'
    output = mat.node_tree.nodes.new('ShaderNodeOutputMaterial')
    mat.node_tree.links.new(shader.outputs['BSDF'], output.inputs['Surface'])
    shader.inputs['Base Color'].default_value = (*color, 1)
    shader.inputs['Roughness'].default_value = .92
    return mat

asphalt = material('Fine asphalt', (.085, .10, .115))
nodes = asphalt.node_tree.nodes
noise = nodes.new('ShaderNodeTexNoise')
noise.inputs['Scale'].default_value = 110
bump = nodes.new('ShaderNodeBump')
bump.inputs['Strength'].default_value = .22
bump.inputs['Distance'].default_value = .012
asphalt.node_tree.links.new(noise.outputs['Fac'], bump.inputs['Height'])
asphalt.node_tree.links.new(bump.outputs['Normal'], nodes.get('Principled BSDF').inputs['Normal'])
paint = material('Warm white road paint', (.72, .73, .69))

def plane(name, x, y, width, depth, z, mat):
    bpy.ops.mesh.primitive_plane_add(size=1, location=(x, y, z))
    obj = bpy.context.object
    obj.name = name
    obj.scale = (width, depth, 1)
    obj.data.materials.append(mat)

plane('Asphalt', -4.4, 0, 100, 7, 0, asphalt)
for y in (-3.15, 3.15):
    plane('Edge line', -4.4, y, 100, .12, .006, paint)
for x in range(-48, 49, 6):
    plane('Centre dash', x, 0, 3, .14, .007, paint)

camera = scene.camera
camera.location.z -= 1.75
right = camera.matrix_world.to_quaternion() @ Vector((1, 0, 0))
camera.data.ortho_scale = 6 * right.x
scene.render.resolution_x = 384
scene.render.resolution_y = 192
scene.render.resolution_percentage = 100
scene.cycles.samples = 48
scene.render.film_transparent = True
scene.render.image_settings.file_format = 'PNG'
scene.render.filepath = '/tmp/magnus-road.png'
assert camera.data.ortho_scale > 5
bpy.ops.wm.save_as_mainfile(filepath=str(root / 'road.blend'))
bpy.ops.render.render(write_still=True)
print('Road tile rendered; CSS tile width:', camera.data.ortho_scale / 18.8 * 10, 'rem', flush=True)
