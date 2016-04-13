import Utils from 'Utils'
import TextureAnimator from 'TextureAnimator'
import AnimatedParticle from 'AnimatedParticle'

export default (material, animTextures)=> {
	var scope;
	var meatMesh = new THREE.Mesh()
	var intersection;
	const UP = 'UP'
	const DOWN = 'DOWN'
	let counter = 0
	let force = Utils.Rand(-.1, .1, 3)
	let animState = DOWN
	let container = new THREE.Object3D()
	let animContainer = new THREE.Object3D()
	let particleIndex = 0
	container.add(meatMesh)
	container.add(animContainer)
	meatMesh.material = material
	container.position.x = 0
	container.velocity = new THREE.Vector3(0, 0, 0)
	container.offset = new THREE.Vector3(0, 0, 0)
	container.offsetUp = new THREE.Vector3(0, 0, 0)
	container.dir = Math.random() * 1 > 0.45 ? 1 : -1
	container.opacity = 0

	// let texture = animTextures[4].tex
	// // let animator = new TextureAnimator( texture, animTextures[0].horiz, animTextures[0].vert, animTextures[0].total, animTextures[0].duration ); // texture, #horiz, #vert, #total, duration.
	// let animatedParticle = AnimatedParticle(animContainer, texture, geometry, animator)

	let animator = undefined
	let geometry = new THREE.PlaneGeometry(100, 100, 1, 1);
	let animatedParticles = []
	for (let animTex of animTextures) {
		let p = AnimatedParticle(animContainer, animTex.tex, geometry, animator, animTex.scale)
		p.mesh.scale.set(0, 0, 0)
		animatedParticles.push(p)
	}

	let animatedParticle = animatedParticles[particleIndex]
	setInterval(()=>{
		particleIndex++
		if(particleIndex > animatedParticles.length-1) particleIndex = 0
		TweenMax.to(animatedParticle.mesh.scale, 0.5, { x:0, y:0, z:0, ease:Expo.easeOut })
		setTimeout(()=> {
			animatedParticle = animatedParticles[particleIndex]
		}, 0.6)
	}, 14000)

	var resetMesh = () => {
		let scale = Utils.Rand(0.001, 0.004, 4)
		container.scale.set(scale, scale, scale)
		container.velocity.y = Utils.Rand(10, 40, 3)
		container.offset.x = Math.radians(Utils.Rand(-50, 50, 0))
		container.offsetUp.x = Utils.Rand(10, 200, 0)
		container.rotation.x = Math.radians(Utils.Rand(-180, 180, 0))
		container.rotation.y = Math.radians(Utils.Rand(-180, 180, 0))
		container.rotation.z = Math.radians(Utils.Rand(-180, 180, 0))
		container.opacity = 1
		meatMesh.scale.set(1, 1, 1)
		meatMesh.material.opacity = container.opacity
		animatedParticle.mesh.scale.set(animatedParticle.scale, animatedParticle.scale, animatedParticle.scale)
		animatedParticle.mesh.material.opacity = 0
		meatMesh.position.y = 0
	}
	resetMesh()
	
	scope = {
		geometryAddTo: (geometry, parent) => {
			meatMesh.geometry = geometry
			parent.add(container)
		},
		update: (inter)=> {
			counter += force
			intersection = inter

			if(animState === DOWN) {
				container.position.y -= container.velocity.y * 0.6
				container.rotation.x += 0.005
				container.rotation.y += 0.006
				container.rotation.z += 0.008
				container.position.x += container.offset.x
				animatedParticle.mesh.material.opacity = 0
				if(container.position.y < -600) {
					animState = UP
				}
			} else if(animState === UP) {
				container.position.y += container.velocity.y * 0.2
				// container.position.x += container.offsetUp.x * container.dir
				container.position.x = Math.sin(counter) * container.offsetUp.x
				container.position.z = Math.cos(counter) * container.offsetUp.x
				if(container.position.y > 50) container.opacity += (0.001 - container.opacity) * 0.5
				container.rotation.x = 0
				container.rotation.y = 0
				container.rotation.z = 0
				meatMesh.material.opacity = 0
				meatMesh.scale.set(0, 0, 0)
				
				animatedParticle.mesh.material.opacity = container.opacity
				if(container.opacity < 0.01) {
					scope.reset()
					animState = DOWN
				}
			}
		},
		reset: ()=> {
			if(intersection) {
				container.position.x = intersection.point.x
				container.position.y = intersection.point.y
				container.position.z = 200
				resetMesh()
			}
		}
	}

	return scope
}