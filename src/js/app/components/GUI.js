import GUIController from 'GUIController'

function _getGUI() {
	if(GUI.gui == undefined) {
		GUI.gui = new dat.GUI();
		return GUI.gui
	}else{
		return GUI.gui
	}
}

var GUI = {
	gui: undefined,
	setStandardMaterial: function(id, material) {
		// var gui = _getGUI()
		// var folder = gui.addFolder(id + ' StandardMaterial');
		// new GUIController(folder, material, 'metalness', { from: 0, to: 3 })
		// new GUIController(folder, material, 'roughness', { from: 0, to: 3 })
		// new GUIController(folder, material, 'bumpScale', { from: 0, to: 3 })
		// new GUIController(folder, material, 'color', { color: [ 0, 0, 0 ] })
		// new GUIController(folder, material, 'emissive', { color: [ 0, 0, 0 ] })
		// folder.open()
	},
	setPhongMaterial: function(id, material) {
		// var gui = _getGUI()
		// var folder = gui.addFolder(id + ' PhongMaterial');
		// new GUIController(folder, material, 'shininess', { from: 0, to: 50 })
		// new GUIController(folder, material, 'reflectivity', { from: 0, to: 5 })
		// new GUIController(folder, material, 'color', { color: [ 0, 0, 0 ] })
		// new GUIController(folder, material, 'emissive', { color: [ 0, 0, 0 ] })
		// new GUIController(folder, material, 'specular', { color: [ 0, 0, 0 ] })
		// folder.open()
	},
	setDirectionalLight: function(id, light) {
		// var gui = _getGUI()
		// var folder = gui.addFolder(id + ' DirectionalLight');
		// new GUIController(folder, light, 'position', { x:100, y:100, z:100 })
		// new GUIController(folder, light, 'intensity', { from: 0, to: 50 })
	}
}

export default GUI