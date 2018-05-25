const _checkShading = (props) => {
  props.flatShading = props.shading ? true : false
}
const Materials = {
  meshStandardMaterial: (id, props) => {
    _checkShading(props)
    const material = new THREE.MeshStandardMaterial(props)
    // GUI.setStandardMaterial(id, material)
    return material
  },
  meshPhongMaterial: (id, props) => {
    _checkShading(props)
    const material = new THREE.MeshPhongMaterial(props)
    // GUI.setPhongMaterial(id, material)
    return material
  }
}
export default Materials
