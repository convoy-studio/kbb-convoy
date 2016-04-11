import Utils from 'Utils'

export default (material)=> {
	var scope;
	var mesh = new THREE.Mesh()
	mesh.material = material
	mesh.position.x = 300
	mesh.velocity = new THREE.Vector3(0, 0, 0)
	mesh.offset = new THREE.Vector3(0, 0, 0)

	scope = {
		geometryAddTo: (geometry, parent) => {
			mesh.geometry = geometry
			parent.add(mesh)
		},
		position: mesh.position,
		rotation: mesh.rotation,
		scale: mesh.scale,
		velocity: mesh.velocity,
		offset: mesh.offset,
		update: ()=> {

		}
	}

	return scope
}