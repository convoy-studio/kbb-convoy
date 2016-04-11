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
	let meatMaterial = new THREE.MeshStandardMaterial({
		map: meatTexture,
		color: meatDiffuseColor,
		metalness: meatMetalness,
		roughness: meatRoughness
	})

	let particles = []
	for (let i = 0; i < MEAT_PARTICLES_NUM; i++) {
		particles[i] = MeatParticle(meatMaterial)
	}

	// var groundParticle = AnimatedParticle()

	container.add(parent)

	scope = {
		update: (inter)=> {
			intersection = inter
			for (let p of particles) {

				p.position.y -= p.velocity.y
				p.rotation.x += 0.005
				p.rotation.y += 0.006
				p.rotation.z += 0.008
				p.position.x += p.offset.x

				if(p.position.y < -700) {
				// 	let firstChild = scope.groundParticles.pop()
				// 	if(firstChild) {
				// 		scope.activeGroundParticles.push(firstChild)
				// 		scope.resetGroundParticles(p.position.x, p.position.y, p.position.z, p.force, firstChild)
				// 	}
					scope.reset(p)
				}
			}
			// for (let groundp of scope.activeGroundParticles) {
			// 	if(groundp) {
			// 		groundp.position.y += groundp.force
			// 		groundp.position.x += groundp.translation
			// 		if(groundp.position.y > -250) {
			// 			groundp.material.opacity -= 0.02
			// 			if(groundp.material.opacity < 0.0001) {
			// 				let lastChild = scope.activeGroundParticles.shift()
			// 				scope.groundParticles.push(lastChild)
			// 			}
			// 		}
			// 	}
			// }

			// groundParticle.update()
		},
		reset: (p)=> {

			if(intersection) {
				p.position.x = intersection.point.x
				p.position.y = intersection.point.y
				p.position.z = 200
			}

			let scale = Utils.Rand(0.001, 0.005, 4)
			p.velocity.y = Utils.Rand(3, 12, 3)
			p.scale.set(scale, scale, scale)
			p.offset.x = Math.radians(Utils.Rand(-50, 50, 0))
			p.rotation.x = Math.radians(Utils.Rand(-180, 180, 0))
			p.rotation.y = Math.radians(Utils.Rand(-180, 180, 0))
			p.rotation.z = Math.radians(Utils.Rand(-180, 180, 0))

		},
		// resetGroundParticles: (x, y, z, force, p)=> {
		// 	if(p) {
		// 		let scale = Utils.Rand(0.2, 0.9, 4)
		// 		p.position.x = x
		// 		p.position.y = y
		// 		p.position.z = z
		// 		p.translation = Math.radians(Utils.Rand(-270, 270, 0))
		// 		p.material.opacity = 1
		// 		p.scale.set(scale, scale, scale)
		// 		p.force = Utils.Rand(2, 12, 3)
		// 	}
		// },
		setup: (geometry)=> {
			
			particles.forEach(particle => {
				particle.geometryAddTo(geometry, parent)
				scope.reset(particle)
			})

			// for (var i = 0; i < 20; i++) {
			// 	scope.groundParticles[i] = groundParticle.create(parent)
			// 	scope.resetGroundParticles(scope.particles[i])
			// }
			
		}
	}

	return scope
}