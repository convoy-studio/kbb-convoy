import meatParticle from './MeatParticle'
import Utils from '../utils'
import AnimatedParticle from './AnimatedParticle'
import AppStore from 'AppStore'

export default (container)=> {
  let scope
  let intersection
  let parent = new THREE.Object3D()
  const MEAT_PARTICLES_NUM = 70
  parent.position.z = 100
  let meatTexture = AppStore.getTexture('shawarma-diff-small')
  let meatDiffuseColor = new THREE.Color( 0xffffff )
  let meatMetalness = 0.5
  let meatRoughness = 1.0
  let animTextures = [
    {
      tex: AppStore.getTexture('favorite-icon'),
      horizontal: 4,
      vertical: 1,
      total: 4,
      duration: 150,
      scale: 300
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
    particles[i] = meatParticle(meatMaterial, animTextures)
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
