import MeatParticle from 'MeatParticle'
import Utils from 'Utils'
import AnimatedParticle from 'AnimatedParticle'

export default (container)=> {
	var scope;
	let parent = new THREE.Object3D()
	let intersection;

	const MEAT_PARTICLES_NUM = 80
	let meatTexture = Utils.LoadTexture("Shawarma-diff.jpg")
	let meatDiffuseColor = new THREE.Color( 0xffffff )
	let meatMetalness = 0.5
	let meatRoughness = 1.0

	// let animTextures = [
	// 	{
	// 		tex: new THREE.ImageUtils.loadTexture( 'image/textures/saliormoon.png' ),
	// 		horizontal: 4, 
	// 		vertical: 1, 
	// 		total: 4, 
	// 		duration: 150,
	// 		scale: 300
	// 	},
	// 	{
	// 		tex: new THREE.ImageUtils.loadTexture( 'image/textures/favorite-icon.png' ),
	// 		horizontal: 4, 
	// 		vertical: 1, 
	// 		total: 4, 
	// 		duration: 150,
	// 		scale: 300
	// 	},
	// 	{
	// 		tex: new THREE.ImageUtils.loadTexture( 'image/textures/spiral_heart_moon_rod_by_sayurixsama-d506px0 (1).png' ),
	// 		horizontal: 4, 
	// 		vertical: 1, 
	// 		total: 4, 
	// 		duration: 150,
	// 		scale: 300
	// 	},
	// 	{
	// 		tex: new THREE.ImageUtils.loadTexture( 'image/textures/döner.png' ),
	// 		horizontal: 4, 
	// 		vertical: 1, 
	// 		total: 4, 
	// 		duration: 150,
	// 		scale: 300
	// 	},
	// 	{
	// 		tex: new THREE.ImageUtils.loadTexture( 'image/textures/nordine.png' ),
	// 		horizontal: 4, 
	// 		vertical: 1, 
	// 		total: 4, 
	// 		duration: 150,
	// 		scale: 300
	// 	},
	// 	{
	// 		tex: new THREE.ImageUtils.loadTexture( 'image/textures/crystal-star-icon.png' ),
	// 		horizontal: 4, 
	// 		vertical: 1, 
	// 		total: 4, 
	// 		duration: 150,
	// 		scale: 300
	// 	},
	// 	{
	// 		tex: new THREE.ImageUtils.loadTexture( 'image/textures/cat.png' ),
	// 		horizontal: 4, 
	// 		vertical: 1, 
	// 		total: 4, 
	// 		duration: 150,
	// 		scale: 300
	// 	},
	// 	{
	// 		tex: new THREE.ImageUtils.loadTexture( 'image/textures/picachu.png' ),
	// 		horizontal: 4, 
	// 		vertical: 1, 
	// 		total: 4, 
	// 		duration: 150,
	// 		scale: 300
	// 	},
	// 	{
	// 		tex: new THREE.ImageUtils.loadTexture( 'image/textures/diamond.png' ),
	// 		horizontal: 4, 
	// 		vertical: 1, 
	// 		total: 4, 
	// 		duration: 150,
	// 		scale: 300
	// 	},
	// 	{
	// 		tex: new THREE.ImageUtils.loadTexture( 'image/textures/toperi.png' ),
	// 		horizontal: 4, 
	// 		vertical: 1, 
	// 		total: 4, 
	// 		duration: 150,
	// 		scale: 300
	// 	},
	// 	{
	// 		tex: new THREE.ImageUtils.loadTexture( 'image/textures/dervish-one.png' ),
	// 		horizontal: 4, 
	// 		vertical: 1, 
	// 		total: 4, 
	// 		duration: 150,
	// 		scale: 300
	// 	}
	// ]

	let animTextures = [
		{
			tex: new THREE.ImageUtils.loadTexture( 'image/textures/favorite-icon.png' ),
			horizontal: 4, 
			vertical: 1, 
			total: 4, 
			duration: 150,
			scale: 100
		}
	]

	let particles = []
	for (let i = 0; i < MEAT_PARTICLES_NUM; i++) {
		let meatMaterial = new THREE.MeshStandardMaterial({
			map: meatTexture,
			color: meatDiffuseColor,
			metalness: meatMetalness,
			roughness: meatRoughness,
			transparent: true
		})
		particles[i] = MeatParticle(meatMaterial, animTextures)
	}

	container.add(parent)

	scope = {
		update: (inter)=> {
			intersection = inter
			particles.forEach(p => {
				p.update(intersection)
			})
		},
		setup: (geometry)=> {

			particles.forEach(particle => {
				particle.geometryAddTo(geometry, parent)
				particle.reset()
			})

		}
	}

	return scope
}