
export default (parent, texture, geometry, animator)=> {
	var scope;
	var clock = new THREE.Clock();
	
	// console.log(parent, texture, geometry, animator)
	let material = new THREE.MeshBasicMaterial( {
		map: texture,
		transparent: true, 
		opacity: 1,
		side: THREE.DoubleSide
	} );
	let mesh = new THREE.Mesh(geometry, material);
	let scale = 300
	mesh.scale.set(scale, scale, scale)
	parent.add(mesh);

	scope = {
		mesh: mesh,
		update: ()=> {
			var delta = clock.getDelta(); 
			animator.update(1000 * delta);
		}
	}

	return scope
}