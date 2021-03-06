import BaseComponent from 'BaseComponent'
import AppStore from 'AppStore'
import AppConstants from 'AppConstants'
import AppActions from 'AppActions'
import dom from 'dom-hand'
import Materials from 'Materials'
import Utils from 'Utils'
import GUI from 'GUI'
import MeatParticles from 'MeatParticles'
import Messages from 'Messages'

class AppTemplate extends BaseComponent {
	constructor() {
		super()
		this.resize = this.resize.bind(this)
		this.animate = this.animate.bind(this)
		this.mouseMove = this.mouseMove.bind(this)
		this.onGeometryLoaded = this.onGeometryLoaded.bind(this)
	}
	render(parent) {
		super.render('AppTemplate', parent, undefined)
	}
	componentDidMount() {

		AppStore.on(AppConstants.WINDOW_RESIZE, this.resize)
		dom.event(window, 'mousemove', this.mouseMove)

		this.dot = {
			el: dom.select('#mouse-dot', document),
			x: -200,
			y:-200
		}

		this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
        this.camera.position.z = 900;

        this.renderer = new THREE.WebGLRenderer({
        	antialias: true
        });
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        dom.tree.add(this.element, this.renderer.domElement)

        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2(500, 500);
        this.intersection = undefined
        this.intersectionCounter = 0

        this.kebab = new THREE.Object3D()
        this.scene.add(this.kebab)

        this.meatParticles = MeatParticles(this.scene)

        var planeGeometry = new THREE.PlaneGeometry( 1200, 400, 10, 10 );
        var planeTexture = Utils.LoadTexture("gradient-sky-1172968.jpg")
        var planeMaterial = new THREE.MeshBasicMaterial({
        	color: 0xffffff,
        	map: planeTexture,
        	side: THREE.DoubleSide
        });
        this.background = new THREE.Mesh(planeGeometry, planeMaterial)
        this.background.scale.set(10, 10, 10)
        this.background.position.z = -600
        this.scene.add(this.background)

        var ambientL = new THREE.AmbientLight( 0xffffff );

		var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.7 );
		directionalLight.position.set( -40, 17, 100 )
		GUI.setDirectionalLight('A ', directionalLight)

		var directionalLight2 = new THREE.DirectionalLight( 0xffffff, 1.0 );
		directionalLight2.position.set( -100, 72, -18 )
		GUI.setDirectionalLight('B ', directionalLight2)

		var directionalLight3 = new THREE.DirectionalLight( 0xffffff, 1.0 );
		directionalLight3.position.set( 100, 17, -50 )
		GUI.setDirectionalLight('C ', directionalLight3)

        this.lights = {
        	ambient: ambientL,
        	dir1: directionalLight,
        	dir2: directionalLight2,
        	dir3: directionalLight3,
        }

        this.scene.add(this.lights.ambient)
        this.scene.add(this.lights.dir1)
        this.scene.add(this.lights.dir2)
        this.scene.add(this.lights.dir3)

        var manifest = [
        	{ id: AppConstants.KEBAB.BASE, src: "mesh/kebab_base.js" },
        	{ id: AppConstants.KEBAB.TOMATO, src: "mesh/tomato.js" },
        	{ id: AppConstants.KEBAB.SILVER, src: "mesh/silver.js" },
        	{ id: AppConstants.KEBAB.PARTICLE, src: "mesh/meat-particle.js" },
        ]
        this.loadAssets(manifest)

        Leap.loop((frame)=> {
        	var hand = frame.hands[0]
			if(hand) {
				let x = (window.innerWidth * 0.45) + hand.palmPosition[0]
				let y = (window.innerHeight * 0.9) - hand.palmPosition[1]
				this.updateMousePosition(x, y)
			}
		});

		this.messages = Messages(dom.select('#messages', document))

        this.animate()
		super.componentDidMount()
	}
	updateMousePosition(x, y) {
		const size = 50
		this.mouse.x = ( x / window.innerWidth ) * 2 - 1;
		this.mouse.y = - ( y / window.innerHeight ) * 2 + 1;
		const newX = x - (size >> 1)
		const newY = y - (size >> 1)
		this.dot.x += (newX - this.dot.x) * 0.6
		this.dot.y += (newY - this.dot.y) * 0.6
		Utils.Translate(this.dot.el, this.dot.x, this.dot.y, 1)
	}
 	mouseMove(e) {
		e.preventDefault();
		this.updateMousePosition(e.clientX, e.clientY)
	}
	loadAssets(manifest) {
		var jsonLoader = new THREE.JSONLoader();
		for (var i = 0; i < manifest.length; i++) {
			var asset = manifest[i]
			jsonLoader.load( asset.id, asset.src, this.onGeometryLoaded );
		};
	}
	onGeometryLoaded(id, geometry) {
		switch(id) {
			case AppConstants.KEBAB.BASE: 
				this.setupKebabBase(geometry)
				break
			case AppConstants.KEBAB.TOMATO: 
				this.setupTomato(geometry)
				break
			case AppConstants.KEBAB.SILVER: 
				this.setupSilverBase(geometry)
				break
			case AppConstants.KEBAB.PARTICLE: 
				this.meatParticles.setup(geometry)
				break
		}
	}
	scaleGeometryMatrix(geometry) {
		geometry.applyMatrix( new THREE.Matrix4().multiplyScalar( 0.5 ) );
	}
	setupKebabBase(geometry) {
		var texture = Utils.LoadTexture("Shawarma-diff.jpg")
		var bump = Utils.LoadTexture( "Shawarma-bump.jpg" );
		this.scaleGeometryMatrix(geometry)
		var diffuseColor = new THREE.Color( 0xffffff )
		var metalness = 0.5
		var roughness = 1.0
		var bumpScale = 1
		var material = Materials.MeshStandardMaterial('kebab', {
			map: texture,
			bumpMap: bump,
			bumpScale: bumpScale,
			color: diffuseColor,
			metalness: metalness,
			roughness: roughness
		} )
		var holder = new THREE.Object3D()
		var mesh = new THREE.Mesh( geometry, material );
		this.kebabBase = mesh
		this.kebab.add(mesh)
	}
	setupSilverBase(geometry) {
		var texture = Utils.LoadTexture("Shawarma-diff.jpg")
		var bump = Utils.LoadTexture( "Shawarma-bump.jpg" );
		this.scaleGeometryMatrix(geometry)
		var diffuseColor = new THREE.Color( 0xe0e0e0 )
		var metalness = 0.56
		var roughness = 0.7
		var bumpScale = 1
		var material = Materials.MeshStandardMaterial('silver', {
			color: diffuseColor,
			metalness: metalness,
			roughness: roughness
		} )
		var holder = new THREE.Object3D()
		var mesh = new THREE.Mesh( geometry, material );
		this.kebab.add(mesh)
	}
	setupTomato(geometry) {
		var texture = Utils.LoadTexture("Tomato_Skin.jpg")
		var bump = Utils.LoadTexture( "Tomato_skin_bump.jpg" );
		this.scaleGeometryMatrix(geometry)
		var diffuseColor = new THREE.Color( 0xffffff )
		var metalness = 0.5
		var roughness = 1.0
		var bumpScale = 1
		var material = Materials.MeshStandardMaterial('tomato', {
			map: texture,
			bumpMap: bump,
			bumpScale: bumpScale,
			color: diffuseColor,
			metalness: metalness,
			roughness: roughness
		} )
		var holder = new THREE.Object3D()
		var mesh = new THREE.Mesh( geometry, material );
		this.kebab.add(mesh)
	}
	animate() {
		requestAnimationFrame(this.animate)

        this.kebab.rotation.y += 0.006

        this.raycaster.setFromCamera( this.mouse, this.camera );

        if(this.kebabBase != undefined) {
        	var intersections = this.raycaster.intersectObjects( [this.kebabBase] );
        	this.intersection = ( intersections.length ) > 0 ? intersections[ 0 ] : null;
        }

        if(this.intersection) this.intersectionCounter++
        if(this.intersectionCounter > 350) {
        	this.messages.showMsg()
        	this.intersectionCounter = 0
        }

        this.meatParticles.update(this.intersection)
        this.renderer.render( this.scene, this.camera );
	}
	resize() {
		this.camera.aspect = window.innerWidth / window.innerHeight;
	    this.camera.updateProjectionMatrix();
	    this.renderer.setSize( window.innerWidth, window.innerHeight );
	    this.messages.resize()

		super.resize()
	}
}

export default AppTemplate

