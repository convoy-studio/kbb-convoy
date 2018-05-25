export default (parent, texture, geometry, animator, scale) => {
  let scope
  const clock = new THREE.Clock()
  let material = new THREE.MeshBasicMaterial( {
    map: texture,
    transparent: true,
    opacity: 1,
    side: THREE.DoubleSide
  })
  let mesh = new THREE.Mesh(geometry, material)
  mesh.scale.set(Math.max(scale, 0.00001), Math.max(scale, 0.00001), Math.max(scale, 0.00001))
  parent.add(mesh)
  scope = {
    scale: scale,
    mesh: mesh,
    update: ()=> {
      const delta = clock.getDelta()
      animator.update(1000 * delta)
    }
  }
  return scope
}
