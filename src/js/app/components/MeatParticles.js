import MeatParticle from 'MeatParticle'
import Utils from 'Utils'

export default (container)=> {
	var scope;
	var particle = MeatParticle()
	var parent = new THREE.Object3D()
	var intersection;

	container.add(parent)

	scope = {
		particles: [],
		update: (inter)=> {
			intersection = inter
			for (let p of scope.particles) {
				p.position.y -= p.force
				p.rotation.x += 0.005
				p.rotation.y += 0.006
				p.rotation.z += 0.008

				if(p.position.y < -700) {
					scope.reset(p)
				}
			}
		},
		reset: (p)=> {

			if(intersection) {
				p.position.x = intersection.point.x
				p.position.y = intersection.point.y
				p.position.z = intersection.point.z
			}

			let scale = Utils.Rand(0.001, 0.005, 4)
			p.force = Utils.Rand(3, 12, 3)
			p.scale.set(scale, scale, scale)
			p.rotation.x = Math.radians(Utils.Rand(-180, 180, 0))
			p.rotation.y = Math.radians(Utils.Rand(-180, 180, 0))
			p.rotation.z = Math.radians(Utils.Rand(-180, 180, 0))

		},
		setup: (geometry)=> {
			for (var i = 0; i < 120; i++) {
				scope.particles[i] = particle.create(geometry, parent)
				scope.reset(scope.particles[i])
			}
		}
	}

	return scope
}