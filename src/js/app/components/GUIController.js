import Utils from 'Utils'

export default class GUIController {
	constructor(folder, props, id, vars) {
		this.props = props
		this.id = id

		if(vars.from != undefined && vars.to != undefined) {
			var controller = folder.add(props, id, vars.from, vars.to);
			controller.onChange((value)=> {
				props[id] = value
			})
		}else if(vars.color != undefined) {
			var controller = folder.addColor(props, id, vars.color);
			controller.onChange((value)=> {
				var hex = Utils.rgbToHex(Math.round(value.r), Math.round(value.g), Math.round(value.b))
				var color = new THREE.Color(hex)
				props[id] = color
				console.log(id, hex)
			})
		}else if(vars.x != undefined && vars.y != undefined && vars.z != undefined) {
			folder.add(props.position, 'x', -vars.x, vars.x);
			folder.add(props.position, 'y', -vars.y, vars.y);
			folder.add(props.position, 'z', -vars.z, vars.z);
		}

	}
	addValue() {

	}
}
