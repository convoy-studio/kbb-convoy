import Utils from 'Utils'

export default (container)=> {
	var scope;
	
	var texture = Utils.LoadTexture("Shawarma-diff.jpg")
	var diffuseColor = new THREE.Color( 0xffffff )
	var metalness = 0.5
	var roughness = 1.0
	var mesh;
	var material = new THREE.MeshStandardMaterial({
		map: texture,
		color: diffuseColor,
		metalness: metalness,
		roughness: roughness
	})

	scope = {
		create: (geometry, parent) => {
			mesh = new THREE.Mesh()
			mesh.geometry = geometry
			mesh.material = material
			mesh.position.x = 300
			parent.add(mesh)
			return mesh
		},
		update: ()=> {
			// if(mesh)
			// mesh.position.set(scope.position.x, scope.position.y, scope.position.z)
		}
	}

	return scope
}