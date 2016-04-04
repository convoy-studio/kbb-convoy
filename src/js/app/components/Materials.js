import GUI from 'GUI'

function _checkShading(props) {
	var shading = props.shading || THREE.SmoothShading
	props.shading = shading
}

var Materials = {
	MeshStandardMaterial: function(id, props) {
		_checkShading(props)
		var material = new THREE.MeshStandardMaterial( props )
		GUI.setStandardMaterial(id, material)
		return material
	},
	MeshPhongMaterial: function(id, props) {
		_checkShading(props)
		var material = new THREE.MeshPhongMaterial( props )
		GUI.setPhongMaterial(id, material)
		return material
	}
}

export default Materials