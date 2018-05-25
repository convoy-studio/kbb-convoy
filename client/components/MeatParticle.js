import Utils from '../utils'
import TextureAnimator from './TextureAnimator'
import aParticle from './AnimatedParticle'

export default (material, animTextures) => {
  let scope
  const meatMesh = new THREE.Mesh()
  let intersection
  const UP = 'UP'
  const DOWN = 'DOWN'
  let counter = 0
  let force = Utils.rand(-0.1, 0.1, 3)
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
  let animator = undefined
  let geometry = new THREE.PlaneGeometry(100, 100, 1, 1)
  let animatedParticles = []
  for (let animTex of animTextures) {
    let p = aParticle(animContainer, animTex.tex, geometry, animator, animTex.scale)
    p.mesh.scale.set(0.01, 0.01, 0.01)
    animatedParticles.push(p)
  }
  let animatedParticle = animatedParticles[particleIndex]
  setInterval(() => {
    particleIndex++
    if (particleIndex > animatedParticles.length - 1) particleIndex = 0
    TweenMax.to(animatedParticle.mesh.scale, 0.5, { x: 0.01, y: 0.01, z: 0.01, ease: Expo.easeOut })
    setTimeout(() => {
      animatedParticle = animatedParticles[particleIndex]
    }, 0.6)
  }, 14000)
  const resetMesh = () => {
    let scale = Utils.rand(0.001, 0.004, 4)
    container.scale.set(scale, scale, scale)
    container.velocity.y = Utils.rand(10, 20, 3)
    container.offset.x = Math.radians(Utils.rand(-50, 50, 0))
    container.offsetUp.x = Utils.rand(10, 200, 0)
    container.rotation.x = Math.radians(Utils.rand(-180, 180, 0))
    container.rotation.y = Math.radians(Utils.rand(-180, 180, 0))
    container.rotation.z = Math.radians(Utils.rand(-180, 180, 0))
    container.opacity = 1
    meatMesh.scale.set(1, 1, 1)
    meatMesh.material.opacity = container.opacity
    animatedParticle.mesh.scale.set(animatedParticle.scale, animatedParticle.scale, animatedParticle.scale)
    animatedParticle.mesh.material.opacity = 0
    meatMesh.position.y = 0
  }
  resetMesh()
  scope = {
    geometryAddTo: (geo, parent) => {
      meatMesh.geometry = geo
      parent.add(container)
    },
    update: (inter) => {
      counter += force
      intersection = inter
      if (animState === DOWN) {
        container.position.y -= container.velocity.y * 0.5
        container.rotation.x += 0.002
        container.rotation.y += 0.003
        container.rotation.z += 0.005
        container.position.x += container.offset.x
        animatedParticle.mesh.material.opacity = 0
        if (container.position.y < -1000) {
          animState = UP
        }
      } else if (animState === UP) {
        container.position.y += container.velocity.y * 0.5
        container.position.x = Math.sin(counter) * container.offsetUp.x
        container.position.z = Math.cos(counter) * container.offsetUp.x
        if (container.position.y > 50) container.opacity += (0.001 - container.opacity) * 0.8
        container.rotation.x = 0
        container.rotation.y = 0
        container.rotation.z = 0
        meatMesh.material.opacity = 0
        meatMesh.scale.set(0.001, 0.001, 0.001)
        animatedParticle.mesh.material.opacity = container.opacity
        if (container.opacity < 0.01) {
          scope.reset()
          animState = DOWN
        }
      }
    },
    reset: () => {
      if (intersection) {
        container.position.x = intersection.point.x
        container.position.y = intersection.point.y
        container.position.z = 200
        resetMesh()
      }
    }
  }
  return scope
}
