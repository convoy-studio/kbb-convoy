import TextureAnimator from 'TextureAnimator'

export default (container)=> {
	var scope;
	var clock = new THREE.Clock();

	var texture = new THREE.ImageUtils.loadTexture( 'image/textures/dervish.png' );
	var animator = new TextureAnimator( texture, 4, 1, 4, 150 ); // texture, #horiz, #vert, #total, duration.
	

	scope = {
		create: (parent) => {
			
			var runnerMaterial = new THREE.MeshBasicMaterial( {
				map: texture,
				transparent: true, 
				opacity: 1,
			} );
			var runnerGeometry = new THREE.PlaneGeometry(100, 100, 1, 1);
			var mesh = new THREE.Mesh(runnerGeometry, runnerMaterial);
			mesh.position.set(-300,25,0);
			parent.add(mesh);
			return mesh
		},
		update: ()=> {
			var delta = clock.getDelta(); 
			animator.update(1000 * delta);
		}
	}

	return scope
}