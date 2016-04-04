(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/Main.js":[function(require,module,exports){
// Avoid console errors for the IE crappy browsers
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _AppStore = require('./app/stores/AppStore');

var _AppStore2 = _interopRequireDefault(_AppStore);

var _Utils = require('./app/utils/Utils');

var _Utils2 = _interopRequireDefault(_Utils);

var _App = require('./app/App');

var _App2 = _interopRequireDefault(_App);

var _gsap = require('gsap');

var _gsap2 = _interopRequireDefault(_gsap);

var _raf = require('./app/utils/raf');

var _raf2 = _interopRequireDefault(_raf);

var _mobileDetect = require('mobile-detect');

var _mobileDetect2 = _interopRequireDefault(_mobileDetect);

var _domHand = require('dom-hand');

var _domHand2 = _interopRequireDefault(_domHand);

if (!window.console) console = { log: function log() {} };

var md = new _mobileDetect2['default'](window.navigator.userAgent);

_AppStore2['default'].Detector.isSafari = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
_AppStore2['default'].Detector.isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') != -1;
_AppStore2['default'].Detector.isMobile = md.mobile() || md.tablet() ? true : false;
_AppStore2['default'].Parent = _domHand2['default'].select('#app-container');
_AppStore2['default'].Detector.oldIE = _domHand2['default'].classes.contains(_AppStore2['default'].Parent, 'ie6') || _domHand2['default'].classes.contains(_AppStore2['default'].Parent, 'ie7') || _domHand2['default'].classes.contains(_AppStore2['default'].Parent, 'ie8');
_AppStore2['default'].Detector.isSupportWebGL = _Utils2['default'].SupportWebGL();
if (_AppStore2['default'].Detector.oldIE) _AppStore2['default'].Detector.isMobile = true;

var app = new _App2['default']();

app.init();

},{"./app/App":"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/App.js","./app/stores/AppStore":"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/stores/AppStore.js","./app/utils/Utils":"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/utils/Utils.js","./app/utils/raf":"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/utils/raf.js","dom-hand":"dom-hand","gsap":"gsap","mobile-detect":"mobile-detect"}],"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/App.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _AppStore = require('./stores/AppStore');

var _AppStore2 = _interopRequireDefault(_AppStore);

var _AppActions = require('./actions/AppActions');

var _AppActions2 = _interopRequireDefault(_AppActions);

var _AppTemplate = require('./AppTemplate');

var _AppTemplate2 = _interopRequireDefault(_AppTemplate);

var _Router = require('./services/Router');

var _Router2 = _interopRequireDefault(_Router);

var _GlobalEvents = require('./services/GlobalEvents');

var _GlobalEvents2 = _interopRequireDefault(_GlobalEvents);

var _Preloader = require('./services/Preloader');

var _Preloader2 = _interopRequireDefault(_Preloader);

var _AppConstants = require('./constants/AppConstants');

var _AppConstants2 = _interopRequireDefault(_AppConstants);

var _domHand = require('dom-hand');

var _domHand2 = _interopRequireDefault(_domHand);

var App = (function () {
	function App() {
		_classCallCheck(this, App);

		this.onAppReady = this.onAppReady.bind(this);
		this.loadMainAssets = this.loadMainAssets.bind(this);
	}

	_createClass(App, [{
		key: 'init',
		value: function init() {

			Math.radians = function (degrees) {
				return degrees * Math.PI / 180;
			};

			// Converts from radians to degrees.
			Math.degrees = function (radians) {
				return radians * 180 / Math.PI;
			};

			// Init router
			this.router = new _Router2['default']();
			this.router.init();

			_AppStore2['default'].Preloader = new _Preloader2['default']();

			// Init global events
			window.GlobalEvents = new _GlobalEvents2['default']();
			GlobalEvents.init();

			var appTemplate = new _AppTemplate2['default']();
			appTemplate.isReady = this.loadMainAssets;
			appTemplate.render('#app-container');

			// Start routing
			this.router.beginRouting();
		}
	}, {
		key: 'loadMainAssets',
		value: function loadMainAssets() {
			this.onAppReady();
		}
	}, {
		key: 'onAppReady',
		value: function onAppReady() {
			_AppActions2['default'].appStart();
			_AppActions2['default'].pageHasherChanged();
		}
	}]);

	return App;
})();

exports['default'] = App;
module.exports = exports['default'];

},{"./AppTemplate":"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/AppTemplate.js","./actions/AppActions":"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/actions/AppActions.js","./constants/AppConstants":"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/constants/AppConstants.js","./services/GlobalEvents":"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/services/GlobalEvents.js","./services/Preloader":"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/services/Preloader.js","./services/Router":"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/services/Router.js","./stores/AppStore":"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/stores/AppStore.js","dom-hand":"dom-hand"}],"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/AppTemplate.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _BaseComponent2 = require('./../pager/components/BaseComponent');

var _BaseComponent3 = _interopRequireDefault(_BaseComponent2);

var _AppStore = require('./stores/AppStore');

var _AppStore2 = _interopRequireDefault(_AppStore);

var _AppConstants = require('./constants/AppConstants');

var _AppConstants2 = _interopRequireDefault(_AppConstants);

var _AppActions = require('./actions/AppActions');

var _AppActions2 = _interopRequireDefault(_AppActions);

var _domHand = require('dom-hand');

var _domHand2 = _interopRequireDefault(_domHand);

var _Materials = require('./components/Materials');

var _Materials2 = _interopRequireDefault(_Materials);

var _Utils = require('./utils/Utils');

var _Utils2 = _interopRequireDefault(_Utils);

var _GUI = require('./components/GUI');

var _GUI2 = _interopRequireDefault(_GUI);

var _MeatParticles = require('./components/MeatParticles');

var _MeatParticles2 = _interopRequireDefault(_MeatParticles);

var AppTemplate = (function (_BaseComponent) {
	_inherits(AppTemplate, _BaseComponent);

	function AppTemplate() {
		_classCallCheck(this, AppTemplate);

		_get(Object.getPrototypeOf(AppTemplate.prototype), 'constructor', this).call(this);
		this.resize = this.resize.bind(this);
		this.animate = this.animate.bind(this);
		this.mouseMove = this.mouseMove.bind(this);
		this.onGeometryLoaded = this.onGeometryLoaded.bind(this);
	}

	_createClass(AppTemplate, [{
		key: 'render',
		value: function render(parent) {
			_get(Object.getPrototypeOf(AppTemplate.prototype), 'render', this).call(this, 'AppTemplate', parent, undefined);
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {

			_AppStore2['default'].on(_AppConstants2['default'].WINDOW_RESIZE, this.resize);
			_domHand2['default'].event(window, 'mousemove', this.mouseMove);

			this.scene = new THREE.Scene();

			this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
			this.camera.position.z = 800;

			this.renderer = new THREE.WebGLRenderer();
			this.renderer.setSize(window.innerWidth, window.innerHeight);
			_domHand2['default'].tree.add(this.element, this.renderer.domElement);

			this.raycaster = new THREE.Raycaster();
			this.mouse = new THREE.Vector2();
			this.intersection = undefined;

			this.kebab = new THREE.Object3D();
			this.scene.add(this.kebab);

			this.meatParticles = (0, _MeatParticles2['default'])(this.scene);

			var planeGeometry = new THREE.PlaneGeometry(1200, 400, 10, 10);
			// var planeTexture = Utils.LoadTexture("red-color-gradient-wallpaper-3.jpg")
			// var planeTexture = Utils.LoadTexture("landscape-desert-sand-dune-clear-sky-shadow-yellow-nature-1920x1200.jpg")
			// var planeTexture = Utils.LoadTexture("flying-over-namibia.jpg")
			var planeTexture = _Utils2['default'].LoadTexture("gradient-sky-1172968.jpg");
			// var planeTexture = Utils.LoadTexture("Monotone-Sunset-Sky.jpg")
			var planeMaterial = new THREE.MeshBasicMaterial({
				color: 0xffffff,
				map: planeTexture,
				side: THREE.DoubleSide
			});
			this.background = new THREE.Mesh(planeGeometry, planeMaterial);
			this.background.scale.set(10, 10, 10);
			this.background.position.z = -600;
			this.scene.add(this.background);

			var ambientL = new THREE.AmbientLight(0xffffff);

			var directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
			directionalLight.position.set(-40, 17, 100);
			_GUI2['default'].setDirectionalLight('A ', directionalLight);

			var directionalLight2 = new THREE.DirectionalLight(0xffffff, 1.0);
			directionalLight2.position.set(-100, 72, -18);
			_GUI2['default'].setDirectionalLight('B ', directionalLight2);

			var directionalLight3 = new THREE.DirectionalLight(0xffffff, 1.0);
			directionalLight3.position.set(100, 17, -50);
			_GUI2['default'].setDirectionalLight('C ', directionalLight3);

			this.lights = {
				ambient: ambientL,
				dir1: directionalLight,
				dir2: directionalLight2,
				dir3: directionalLight3
			};

			this.scene.add(this.lights.ambient);
			this.scene.add(this.lights.dir1);
			this.scene.add(this.lights.dir2);
			this.scene.add(this.lights.dir3);

			var manifest = [{ id: _AppConstants2['default'].KEBAB.BASE, src: "mesh/kebab_base.js" }, { id: _AppConstants2['default'].KEBAB.TOMATO, src: "mesh/tomato.js" }, { id: _AppConstants2['default'].KEBAB.SILVER, src: "mesh/silver.js" }, { id: _AppConstants2['default'].KEBAB.PARTICLE, src: "mesh/meat-particle.js" }];
			this.loadAssets(manifest);

			this.animate();
			_get(Object.getPrototypeOf(AppTemplate.prototype), 'componentDidMount', this).call(this);
		}
	}, {
		key: 'mouseMove',
		value: function mouseMove(e) {
			e.preventDefault();
			this.mouse.x = e.clientX / window.innerWidth * 2 - 1;
			this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
		}
	}, {
		key: 'loadAssets',
		value: function loadAssets(manifest) {
			var jsonLoader = new THREE.JSONLoader();
			for (var i = 0; i < manifest.length; i++) {
				var asset = manifest[i];
				jsonLoader.load(asset.id, asset.src, this.onGeometryLoaded);
			};
		}
	}, {
		key: 'onGeometryLoaded',
		value: function onGeometryLoaded(id, geometry) {
			switch (id) {
				case _AppConstants2['default'].KEBAB.BASE:
					this.setupKebabBase(geometry);
					break;
				case _AppConstants2['default'].KEBAB.TOMATO:
					this.setupTomato(geometry);
					break;
				case _AppConstants2['default'].KEBAB.SILVER:
					this.setupSilverBase(geometry);
					break;
				case _AppConstants2['default'].KEBAB.PARTICLE:
					this.meatParticles.setup(geometry);
					break;
			}
		}
	}, {
		key: 'scaleGeometryMatrix',
		value: function scaleGeometryMatrix(geometry) {
			geometry.applyMatrix(new THREE.Matrix4().multiplyScalar(0.5));
		}
	}, {
		key: 'setupKebabBase',
		value: function setupKebabBase(geometry) {
			var texture = _Utils2['default'].LoadTexture("Shawarma-diff.jpg");
			var bump = _Utils2['default'].LoadTexture("Shawarma-bump.jpg");
			this.scaleGeometryMatrix(geometry);
			var diffuseColor = new THREE.Color(0xffffff);
			var metalness = 0.5;
			var roughness = 1.0;
			var bumpScale = 1;
			var material = _Materials2['default'].MeshStandardMaterial('kebab', {
				map: texture,
				bumpMap: bump,
				bumpScale: bumpScale,
				color: diffuseColor,
				metalness: metalness,
				roughness: roughness
			});
			var holder = new THREE.Object3D();
			var mesh = new THREE.Mesh(geometry, material);
			this.kebabBase = mesh;
			this.kebab.add(mesh);
		}
	}, {
		key: 'setupSilverBase',
		value: function setupSilverBase(geometry) {
			var texture = _Utils2['default'].LoadTexture("Shawarma-diff.jpg");
			var bump = _Utils2['default'].LoadTexture("Shawarma-bump.jpg");
			this.scaleGeometryMatrix(geometry);
			var diffuseColor = new THREE.Color(0xe0e0e0);
			var metalness = 0.56;
			var roughness = 0.7;
			var bumpScale = 1;
			var material = _Materials2['default'].MeshStandardMaterial('silver', {
				color: diffuseColor,
				metalness: metalness,
				roughness: roughness
			});
			var holder = new THREE.Object3D();
			var mesh = new THREE.Mesh(geometry, material);
			this.kebab.add(mesh);
		}
	}, {
		key: 'setupTomato',
		value: function setupTomato(geometry) {
			var texture = _Utils2['default'].LoadTexture("Tomato_Skin.jpg");
			var bump = _Utils2['default'].LoadTexture("Tomato_skin_bump.jpg");
			this.scaleGeometryMatrix(geometry);
			var diffuseColor = new THREE.Color(0xffffff);
			var metalness = 0.5;
			var roughness = 1.0;
			var bumpScale = 1;
			var material = _Materials2['default'].MeshStandardMaterial('tomato', {
				map: texture,
				bumpMap: bump,
				bumpScale: bumpScale,
				color: diffuseColor,
				metalness: metalness,
				roughness: roughness
			});
			var holder = new THREE.Object3D();
			var mesh = new THREE.Mesh(geometry, material);
			this.kebab.add(mesh);
		}
	}, {
		key: 'animate',
		value: function animate() {
			requestAnimationFrame(this.animate);

			this.kebab.rotation.y += 0.006;

			this.raycaster.setFromCamera(this.mouse, this.camera);

			if (this.kebabBase != undefined) {
				var intersections = this.raycaster.intersectObjects([this.kebabBase]);
				this.intersection = intersections.length > 0 ? intersections[0] : null;
			}

			this.meatParticles.update(this.intersection);
			this.renderer.render(this.scene, this.camera);
		}
	}, {
		key: 'resize',
		value: function resize() {
			this.camera.aspect = window.innerWidth / window.innerHeight;
			this.camera.updateProjectionMatrix();
			this.renderer.setSize(window.innerWidth, window.innerHeight);

			_get(Object.getPrototypeOf(AppTemplate.prototype), 'resize', this).call(this);
		}
	}]);

	return AppTemplate;
})(_BaseComponent3['default']);

exports['default'] = AppTemplate;
module.exports = exports['default'];

},{"./../pager/components/BaseComponent":"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/pager/components/BaseComponent.js","./actions/AppActions":"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/actions/AppActions.js","./components/GUI":"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/components/GUI.js","./components/Materials":"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/components/Materials.js","./components/MeatParticles":"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/components/MeatParticles.js","./constants/AppConstants":"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/constants/AppConstants.js","./stores/AppStore":"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/stores/AppStore.js","./utils/Utils":"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/utils/Utils.js","dom-hand":"dom-hand"}],"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/actions/AppActions.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _AppConstants = require('./../constants/AppConstants');

var _AppConstants2 = _interopRequireDefault(_AppConstants);

var _AppDispatcher = require('./../dispatchers/AppDispatcher');

var _AppDispatcher2 = _interopRequireDefault(_AppDispatcher);

var _AppStore = require('./../stores/AppStore');

var _AppStore2 = _interopRequireDefault(_AppStore);

function _proceedTransitionInAction(pageId) {
    _AppDispatcher2['default'].handleViewAction({
        actionType: _AppConstants2['default'].PAGE_ASSETS_LOADED,
        item: pageId
    });
}

var AppActions = {
    pageHasherChanged: function pageHasherChanged(pageId) {
        _AppDispatcher2['default'].handleViewAction({
            actionType: _AppConstants2['default'].PAGE_HASHER_CHANGED,
            item: pageId
        });
    },
    loadPageAssets: function loadPageAssets(pageId) {
        var manifest = _AppStore2['default'].pageAssetsToLoad();
        if (manifest.length < 1) {
            _proceedTransitionInAction(pageId);
        } else {
            _AppStore2['default'].Preloader.load(manifest, function () {
                _proceedTransitionInAction(pageId);
            });
        }
    },
    windowResize: function windowResize(windowW, windowH) {
        _AppDispatcher2['default'].handleViewAction({
            actionType: _AppConstants2['default'].WINDOW_RESIZE,
            item: { windowW: windowW, windowH: windowH }
        });
    },
    pxContainerIsReady: function pxContainerIsReady(component) {
        _AppDispatcher2['default'].handleViewAction({
            actionType: _AppConstants2['default'].PX_CONTAINER_IS_READY,
            item: component
        });
    },
    pxAddChild: function pxAddChild(child) {
        _AppDispatcher2['default'].handleViewAction({
            actionType: _AppConstants2['default'].PX_CONTAINER_ADD_CHILD,
            item: child
        });
    },
    pxRemoveChild: function pxRemoveChild(child) {
        _AppDispatcher2['default'].handleViewAction({
            actionType: _AppConstants2['default'].PX_CONTAINER_REMOVE_CHILD,
            item: child
        });
    },
    openFunFact: function openFunFact() {
        _AppDispatcher2['default'].handleViewAction({
            actionType: _AppConstants2['default'].OPEN_FUN_FACT,
            item: undefined
        });
    },
    closeFunFact: function closeFunFact() {
        _AppDispatcher2['default'].handleViewAction({
            actionType: _AppConstants2['default'].CLOSE_FUN_FACT,
            item: undefined
        });
    },
    cellMouseEnter: function cellMouseEnter(id) {
        _AppDispatcher2['default'].handleViewAction({
            actionType: _AppConstants2['default'].CELL_MOUSE_ENTER,
            item: id
        });
    },
    cellMouseLeave: function cellMouseLeave(id) {
        _AppDispatcher2['default'].handleViewAction({
            actionType: _AppConstants2['default'].CELL_MOUSE_LEAVE,
            item: id
        });
    },
    openFeed: function openFeed() {
        _AppDispatcher2['default'].handleViewAction({
            actionType: _AppConstants2['default'].OPEN_FEED,
            item: undefined
        });
    },
    openGrid: function openGrid() {
        _AppDispatcher2['default'].handleViewAction({
            actionType: _AppConstants2['default'].OPEN_GRID,
            item: undefined
        });
    },
    appStart: function appStart() {
        _AppDispatcher2['default'].handleViewAction({
            actionType: _AppConstants2['default'].APP_START,
            item: undefined
        });
    }
};

exports['default'] = AppActions;
module.exports = exports['default'];

},{"./../constants/AppConstants":"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/constants/AppConstants.js","./../dispatchers/AppDispatcher":"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/dispatchers/AppDispatcher.js","./../stores/AppStore":"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/stores/AppStore.js"}],"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/components/GUI.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _GUIController = require('./GUIController');

var _GUIController2 = _interopRequireDefault(_GUIController);

function _getGUI() {
	if (GUI.gui == undefined) {
		GUI.gui = new dat.GUI();
		return GUI.gui;
	} else {
		return GUI.gui;
	}
}

var GUI = {
	gui: undefined,
	setStandardMaterial: function setStandardMaterial(id, material) {
		// var gui = _getGUI()
		// var folder = gui.addFolder(id + ' StandardMaterial');
		// new GUIController(folder, material, 'metalness', { from: 0, to: 3 })
		// new GUIController(folder, material, 'roughness', { from: 0, to: 3 })
		// new GUIController(folder, material, 'bumpScale', { from: 0, to: 3 })
		// new GUIController(folder, material, 'color', { color: [ 0, 0, 0 ] })
		// new GUIController(folder, material, 'emissive', { color: [ 0, 0, 0 ] })
		// folder.open()
	},
	setPhongMaterial: function setPhongMaterial(id, material) {
		// var gui = _getGUI()
		// var folder = gui.addFolder(id + ' PhongMaterial');
		// new GUIController(folder, material, 'shininess', { from: 0, to: 50 })
		// new GUIController(folder, material, 'reflectivity', { from: 0, to: 5 })
		// new GUIController(folder, material, 'color', { color: [ 0, 0, 0 ] })
		// new GUIController(folder, material, 'emissive', { color: [ 0, 0, 0 ] })
		// new GUIController(folder, material, 'specular', { color: [ 0, 0, 0 ] })
		// folder.open()
	},
	setDirectionalLight: function setDirectionalLight(id, light) {
		// var gui = _getGUI()
		// var folder = gui.addFolder(id + ' DirectionalLight');
		// new GUIController(folder, light, 'position', { x:100, y:100, z:100 })
		// new GUIController(folder, light, 'intensity', { from: 0, to: 50 })
	}
};

exports['default'] = GUI;
module.exports = exports['default'];

},{"./GUIController":"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/components/GUIController.js"}],"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/components/GUIController.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Utils = require('./../utils/Utils');

var _Utils2 = _interopRequireDefault(_Utils);

var GUIController = (function () {
	function GUIController(folder, props, id, vars) {
		_classCallCheck(this, GUIController);

		this.props = props;
		this.id = id;

		if (vars.from != undefined && vars.to != undefined) {
			var controller = folder.add(props, id, vars.from, vars.to);
			controller.onChange(function (value) {
				props[id] = value;
			});
		} else if (vars.color != undefined) {
			var controller = folder.addColor(props, id, vars.color);
			controller.onChange(function (value) {
				var hex = _Utils2['default'].rgbToHex(Math.round(value.r), Math.round(value.g), Math.round(value.b));
				var color = new THREE.Color(hex);
				props[id] = color;
				console.log(id, hex);
			});
		} else if (vars.x != undefined && vars.y != undefined && vars.z != undefined) {
			folder.add(props.position, 'x', -vars.x, vars.x);
			folder.add(props.position, 'y', -vars.y, vars.y);
			folder.add(props.position, 'z', -vars.z, vars.z);
		}
	}

	_createClass(GUIController, [{
		key: 'addValue',
		value: function addValue() {}
	}]);

	return GUIController;
})();

exports['default'] = GUIController;
module.exports = exports['default'];

},{"./../utils/Utils":"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/utils/Utils.js"}],"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/components/Materials.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _GUI = require('./GUI');

var _GUI2 = _interopRequireDefault(_GUI);

function _checkShading(props) {
	var shading = props.shading || THREE.SmoothShading;
	props.shading = shading;
}

var Materials = {
	MeshStandardMaterial: function MeshStandardMaterial(id, props) {
		_checkShading(props);
		var material = new THREE.MeshStandardMaterial(props);
		_GUI2['default'].setStandardMaterial(id, material);
		return material;
	},
	MeshPhongMaterial: function MeshPhongMaterial(id, props) {
		_checkShading(props);
		var material = new THREE.MeshPhongMaterial(props);
		_GUI2['default'].setPhongMaterial(id, material);
		return material;
	}
};

exports['default'] = Materials;
module.exports = exports['default'];

},{"./GUI":"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/components/GUI.js"}],"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/components/MeatParticle.js":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _Utils = require('./../utils/Utils');

var _Utils2 = _interopRequireDefault(_Utils);

exports["default"] = function (container) {
	var scope;

	var texture = _Utils2["default"].LoadTexture("Shawarma-diff.jpg");
	var diffuseColor = new THREE.Color(0xffffff);
	var metalness = 0.5;
	var roughness = 1.0;
	var mesh;
	var material = new THREE.MeshStandardMaterial({
		map: texture,
		color: diffuseColor,
		metalness: metalness,
		roughness: roughness
	});

	scope = {
		create: function create(geometry, parent) {
			mesh = new THREE.Mesh();
			mesh.geometry = geometry;
			mesh.material = material;
			mesh.position.x = 300;
			parent.add(mesh);
			return mesh;
		},
		update: function update() {
			// if(mesh)
			// mesh.position.set(scope.position.x, scope.position.y, scope.position.z)
		}
	};

	return scope;
};

module.exports = exports["default"];

},{"./../utils/Utils":"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/utils/Utils.js"}],"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/components/MeatParticles.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _MeatParticle = require('./MeatParticle');

var _MeatParticle2 = _interopRequireDefault(_MeatParticle);

var _Utils = require('./../utils/Utils');

var _Utils2 = _interopRequireDefault(_Utils);

exports['default'] = function (container) {
	var scope;
	var particle = (0, _MeatParticle2['default'])();
	var parent = new THREE.Object3D();
	var intersection;

	container.add(parent);

	scope = {
		particles: [],
		update: function update(inter) {
			intersection = inter;
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = scope.particles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var p = _step.value;

					p.position.y -= p.force;
					p.rotation.x += 0.005;
					p.rotation.y += 0.006;
					p.rotation.z += 0.008;

					if (p.position.y < -700) {
						scope.reset(p);
					}
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator['return']) {
						_iterator['return']();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}
		},
		reset: function reset(p) {

			if (intersection) {
				p.position.x = intersection.point.x;
				p.position.y = intersection.point.y;
				p.position.z = intersection.point.z;
			}

			var scale = _Utils2['default'].Rand(0.001, 0.005, 4);
			p.force = _Utils2['default'].Rand(3, 12, 3);
			p.scale.set(scale, scale, scale);
			p.rotation.x = Math.radians(_Utils2['default'].Rand(-180, 180, 0));
			p.rotation.y = Math.radians(_Utils2['default'].Rand(-180, 180, 0));
			p.rotation.z = Math.radians(_Utils2['default'].Rand(-180, 180, 0));
		},
		setup: function setup(geometry) {
			for (var i = 0; i < 120; i++) {
				scope.particles[i] = particle.create(geometry, parent);
				scope.reset(scope.particles[i]);
			}
		}
	};

	return scope;
};

module.exports = exports['default'];

},{"./../utils/Utils":"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/utils/Utils.js","./MeatParticle":"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/components/MeatParticle.js"}],"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/constants/AppConstants.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = {
	WINDOW_RESIZE: 'WINDOW_RESIZE',
	PAGE_HASHER_CHANGED: 'PAGE_HASHER_CHANGED',
	PAGE_ASSETS_LOADED: 'PAGE_ASSETS_LOADED',
	APP_START: 'APP_START',

	LANDSCAPE: 'LANDSCAPE',
	PORTRAIT: 'PORTRAIT',

	FORWARD: 'FORWARD',
	BACKWARD: 'BACKWARD',

	LEFT: 'LEFT',
	RIGHT: 'RIGHT',
	TOP: 'TOP',
	BOTTOM: 'BOTTOM',

	KEBAB: {
		BASE: 'BASE',
		SILVER: 'SILVER',
		TOMATO: 'TOMATO',
		PARTICLE: 'PARTICLE'
	},

	ENVIRONMENTS: {
		PREPROD: {
			'static': ''
		},
		PROD: {
			"static": JS_url_static + '/'
		}
	},

	MEDIA_GLOBAL_W: 1920,
	MEDIA_GLOBAL_H: 1080,

	MIN_MIDDLE_W: 960,
	MQ_XSMALL: 320,
	MQ_SMALL: 480,
	MQ_MEDIUM: 768,
	MQ_LARGE: 1024,
	MQ_XLARGE: 1280,
	MQ_XXLARGE: 1680
};
module.exports = exports['default'];

},{}],"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/dispatchers/AppDispatcher.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _flux = require('flux');

var _flux2 = _interopRequireDefault(_flux);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var AppDispatcher = (0, _objectAssign2['default'])(new _flux2['default'].Dispatcher(), {
	handleViewAction: function handleViewAction(action) {
		this.dispatch({
			source: 'VIEW_ACTION',
			action: action
		});
	}
});

exports['default'] = AppDispatcher;
module.exports = exports['default'];

},{"flux":"flux","object-assign":"object-assign"}],"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/services/GlobalEvents.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _AppActions = require('./../actions/AppActions');

var _AppActions2 = _interopRequireDefault(_AppActions);

var _domHand = require('dom-hand');

var _domHand2 = _interopRequireDefault(_domHand);

var GlobalEvents = (function () {
	function GlobalEvents() {
		_classCallCheck(this, GlobalEvents);
	}

	_createClass(GlobalEvents, [{
		key: 'init',
		value: function init() {
			_domHand2['default'].event.on(window, 'resize', this.resize);
		}
	}, {
		key: 'resize',
		value: function resize() {
			_AppActions2['default'].windowResize(window.innerWidth, window.innerHeight);
		}
	}]);

	return GlobalEvents;
})();

exports['default'] = GlobalEvents;
module.exports = exports['default'];

},{"./../actions/AppActions":"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/actions/AppActions.js","dom-hand":"dom-hand"}],"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/services/Preloader.js":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _AppStore = require('./../stores/AppStore');

var _AppStore2 = _interopRequireDefault(_AppStore);

var Preloader = (function () {
	function Preloader() {
		_classCallCheck(this, Preloader);

		this.queue = new createjs.LoadQueue(false);
		this.queue.on("complete", this.onManifestLoadCompleted, this);
		this.currentLoadedCallback = undefined;
		this.allManifests = [];
	}

	_createClass(Preloader, [{
		key: "load",
		value: function load(manifest, onLoaded) {

			if (this.allManifests.length > 0) {
				for (var i = 0; i < this.allManifests.length; i++) {
					var m = this.allManifests[i];
					if (m.length == manifest.length && m[0].id == manifest[0].id && m[m.length - 1].id == manifest[manifest.length - 1].id) {
						onLoaded();
						return;
					}
				};
			}

			this.allManifests.push(manifest);
			this.currentLoadedCallback = onLoaded;
			this.queue.loadManifest(manifest);
		}
	}, {
		key: "onManifestLoadCompleted",
		value: function onManifestLoadCompleted() {
			this.currentLoadedCallback();
		}
	}, {
		key: "getContentById",
		value: function getContentById(id) {
			return this.queue.getResult(id);
		}
	}, {
		key: "getImageURL",
		value: function getImageURL(id) {
			return this.getContentById(id).getAttribute("src");
		}
	}, {
		key: "getImageSize",
		value: function getImageSize(id) {
			var content = this.getContentById(id);
			return { width: content.naturalWidth, height: content.naturalHeight };
		}
	}]);

	return Preloader;
})();

exports["default"] = Preloader;
module.exports = exports["default"];

},{"./../stores/AppStore":"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/stores/AppStore.js"}],"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/services/Router.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _hasher = require('hasher');

var _hasher2 = _interopRequireDefault(_hasher);

var _AppActions = require('./../actions/AppActions');

var _AppActions2 = _interopRequireDefault(_AppActions);

var _crossroads = require('crossroads');

var _crossroads2 = _interopRequireDefault(_crossroads);

var _AppStore = require('./../stores/AppStore');

var _AppStore2 = _interopRequireDefault(_AppStore);

var _GlobalData = require('./../../../../www/data/data.json');

var _GlobalData2 = _interopRequireDefault(_GlobalData);

var _AppConstants = require('./../constants/AppConstants');

var _AppConstants2 = _interopRequireDefault(_AppConstants);

var Router = (function () {
	function Router() {
		_classCallCheck(this, Router);
	}

	_createClass(Router, [{
		key: 'init',
		value: function init() {
			this.routing = _GlobalData2['default'].routing;
			this.setupRoutes();
			this.firstPass = true;
			this.newHashFounded = false;
			_hasher2['default'].newHash = undefined;
			_hasher2['default'].oldHash = undefined;

			// remove the analytics parameters
			var loc = _AppStore2['default'].Detector.isSafari ? location.hash : window.location.hash;
			var hash = loc.split('?');
			window.location.hash = hash[0];

			_hasher2['default'].initialized.add(this.didHasherChange.bind(this));
			_hasher2['default'].changed.add(this.didHasherChange.bind(this));
			this.setupCrossroads();
		}
	}, {
		key: 'beginRouting',
		value: function beginRouting() {
			_hasher2['default'].init();
		}
	}, {
		key: 'setupCrossroads',
		value: function setupCrossroads() {
			var routes = _hasher2['default'].routes;
			for (var i = 0; i < routes.length; i++) {
				var route = routes[i];
				_crossroads2['default'].addRoute(route, this.onParseUrl.bind(this));
			};
			_crossroads2['default'].addRoute('', this.onParseUrl.bind(this));
		}
	}, {
		key: 'onParseUrl',
		value: function onParseUrl() {
			this.assignRoute();
		}
	}, {
		key: 'onDefaultURLHandler',
		value: function onDefaultURLHandler() {
			this.sendToDefault();
		}
	}, {
		key: 'assignRoute',
		value: function assignRoute(id) {
			var hash = _hasher2['default'].getHash();
			var parts = this.getURLParts(hash);
			this.updatePageRoute(hash, parts, parts[0], parts[1] == undefined ? '' : parts[1]);
			this.newHashFounded = true;
		}
	}, {
		key: 'getURLParts',
		value: function getURLParts(url) {
			var hash = url;
			return hash.split('/');
		}
	}, {
		key: 'updatePageRoute',
		value: function updatePageRoute(hash, parts, parent, target) {
			_hasher2['default'].oldHash = _hasher2['default'].newHash;
			_hasher2['default'].newHash = {
				hash: hash,
				parts: parts,
				parent: parent,
				target: target
			};
			_hasher2['default'].newHash.type = _hasher2['default'].newHash.hash == '' ? _AppConstants2['default'].HOME : _AppConstants2['default'].DIPTYQUE;
			// If first pass send the action from App.js when all assets are ready
			if (this.firstPass) {
				this.firstPass = false;
			} else {
				_AppActions2['default'].pageHasherChanged();
			}
		}
	}, {
		key: 'didHasherChange',
		value: function didHasherChange(newHash, oldHash) {
			this.newHashFounded = false;
			_crossroads2['default'].parse(newHash);
			if (this.newHashFounded) return;
			// If URL don't match a pattern, send to default
			this.onDefaultURLHandler();
		}
	}, {
		key: 'sendToDefault',
		value: function sendToDefault() {
			_hasher2['default'].setHash(_AppStore2['default'].defaultRoute());
		}
	}, {
		key: 'setupRoutes',
		value: function setupRoutes() {
			_hasher2['default'].routes = [];
			_hasher2['default'].diptyqueRoutes = [];
			var i = 0,
			    k;
			for (k in this.routing) {
				_hasher2['default'].routes[i] = k;
				if (k.length > 2) _hasher2['default'].diptyqueRoutes.push(k);
				i++;
			}
		}
	}], [{
		key: 'getBaseURL',
		value: function getBaseURL() {
			return document.URL.split("#")[0];
		}
	}, {
		key: 'getHash',
		value: function getHash() {
			return _hasher2['default'].getHash();
		}
	}, {
		key: 'getRoutes',
		value: function getRoutes() {
			return _hasher2['default'].routes;
		}
	}, {
		key: 'getDiptyqueRoutes',
		value: function getDiptyqueRoutes() {
			return _hasher2['default'].diptyqueRoutes;
		}
	}, {
		key: 'getNewHash',
		value: function getNewHash() {
			return _hasher2['default'].newHash;
		}
	}, {
		key: 'getOldHash',
		value: function getOldHash() {
			return _hasher2['default'].oldHash;
		}
	}, {
		key: 'setHash',
		value: function setHash(hash) {
			_hasher2['default'].setHash(hash);
		}
	}]);

	return Router;
})();

exports['default'] = Router;
module.exports = exports['default'];

},{"./../../../../www/data/data.json":"/Users/panagiotisthomoglou/Projects/kbb-convoy/www/data/data.json","./../actions/AppActions":"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/actions/AppActions.js","./../constants/AppConstants":"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/constants/AppConstants.js","./../stores/AppStore":"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/stores/AppStore.js","crossroads":"crossroads","hasher":"hasher"}],"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/stores/AppStore.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _AppDispatcher = require('./../dispatchers/AppDispatcher');

var _AppDispatcher2 = _interopRequireDefault(_AppDispatcher);

var _AppConstants = require('./../constants/AppConstants');

var _AppConstants2 = _interopRequireDefault(_AppConstants);

var _eventemitter2 = require('eventemitter2');

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _GlobalData = require('./../../../../www/data/data.json');

var _GlobalData2 = _interopRequireDefault(_GlobalData);

var _Router = require('./../services/Router');

var _Router2 = _interopRequireDefault(_Router);

var _isRetina2 = require('is-retina');

var _isRetina3 = _interopRequireDefault(_isRetina2);

function _getContentScope() {
    var hashObj = _Router2['default'].getNewHash();
    return AppStore.getRoutePathScopeById(hashObj.hash);
}
function _getPageAssetsToLoad() {
    var scope = _getContentScope();
    var hashObj = _Router2['default'].getNewHash();
    var type = _getTypeOfPage();
    var manifest;

    if (type != _AppConstants2['default'].HOME) {
        var filenames = ['character' + _getImageDeviceExtension() + '.png', 'character-bg.jpg', 'shoe-bg.jpg'];
        manifest = _addBasePathsToUrls(filenames, hashObj.parent, hashObj.target, type);
    }

    // In case of extra assets
    if (scope.assets != undefined) {
        var assets = scope.assets;
        var assetsManifest;
        if (type == _AppConstants2['default'].HOME) {
            assetsManifest = _addBasePathsToUrls(assets, 'home', hashObj.target, type);
        } else {
            assetsManifest = _addBasePathsToUrls(assets, hashObj.parent, hashObj.target, type);
        }
        manifest = manifest == undefined ? assetsManifest : manifest.concat(assetsManifest);
    }

    return manifest;
}
function _addBasePathsToUrls(urls, pageId, targetId, type) {
    var basePath = type == _AppConstants2['default'].HOME ? _getHomePageAssetsBasePath() : _getPageAssetsBasePathById(pageId, targetId);
    var manifest = [];
    for (var i = 0; i < urls.length; i++) {
        var splitter = urls[i].split('.');
        var fileName = splitter[0];
        var extension = splitter[1];
        var id = pageId + '-';
        if (targetId) id += targetId + '-';
        id += fileName;
        manifest[i] = {
            id: id,
            src: basePath + fileName + '.' + extension
        };
    }
    return manifest;
}
function _getPageAssetsBasePathById(id, assetGroupId) {
    return AppStore.baseMediaPath() + 'image/diptyque/' + id + '/' + assetGroupId + '/';
}
function _getHomePageAssetsBasePath() {
    return AppStore.baseMediaPath() + 'image/home/';
}
function _getImageDeviceExtension() {
    var retina = _isRetina();
    var str = '@1x';
    if (retina == true) str = '@2x';
    return str;
}
function _isRetina() {
    return (0, _isRetina3['default'])();
}
function _getDeviceRatio() {
    var scale = window.devicePixelRatio == undefined ? 1 : window.devicePixelRatio;
    return scale > 1 ? 2 : 1;
}
function _getTypeOfPage(hash) {
    var h = hash || _Router2['default'].getNewHash();
    if (h.parts.length == 2) return _AppConstants2['default'].DIPTYQUE;else return _AppConstants2['default'].HOME;
}
function _getPageContent() {
    var hashObj = _Router2['default'].getNewHash();
    var hash = hashObj.hash.length < 1 ? '/' : hashObj.hash;
    var content = _GlobalData2['default'].routing[hash];
    return content;
}
function _getContentByLang(lang) {
    return _GlobalData2['default'].content.lang[lang];
}
function _getGlobalContent() {
    return _getContentByLang(AppStore.lang());
}
function _getAppData() {
    return _GlobalData2['default'];
}
function _getDefaultRoute() {
    return _GlobalData2['default']['default-route'];
}
function _windowWidthHeight() {
    return {
        w: window.innerWidth,
        h: window.innerHeight
    };
}
function _getDiptyqueShoes() {
    var hashObj = _Router2['default'].getNewHash();
    var baseurl = _getPageAssetsBasePathById(hashObj.parent, hashObj.target);
    return _getContentScope().shoes;
}

var AppStore = (0, _objectAssign2['default'])({}, _eventemitter2.EventEmitter2.prototype, {
    emitChange: function emitChange(type, item) {
        this.emit(type, item);
    },
    pageContent: function pageContent() {
        return _getPageContent();
    },
    appData: function appData() {
        return _getAppData();
    },
    defaultRoute: function defaultRoute() {
        return _getDefaultRoute();
    },
    globalContent: function globalContent() {
        return _getGlobalContent();
    },
    pageAssetsToLoad: function pageAssetsToLoad() {
        return _getPageAssetsToLoad();
    },
    getRoutePathScopeById: function getRoutePathScopeById(id) {
        id = id.length < 1 ? '/' : id;
        return _GlobalData2['default'].routing[id];
    },
    baseMediaPath: function baseMediaPath() {
        return AppStore.getEnvironment()['static'];
    },
    getPageAssetsBasePathById: function getPageAssetsBasePathById(parent, target) {
        return _getPageAssetsBasePathById(parent, target);
    },
    getEnvironment: function getEnvironment() {
        return _AppConstants2['default'].ENVIRONMENTS[ENV];
    },
    getTypeOfPage: function getTypeOfPage(hash) {
        return _getTypeOfPage(hash);
    },
    getHomeVideos: function getHomeVideos() {
        return _GlobalData2['default']['home-videos'];
    },
    generalInfos: function generalInfos() {
        return _GlobalData2['default'].content;
    },
    diptyqueShoes: function diptyqueShoes() {
        return _getDiptyqueShoes();
    },
    getNextDiptyque: function getNextDiptyque() {
        var hashObj = _Router2['default'].getNewHash();
        var routes = _Router2['default'].getDiptyqueRoutes();
        var current = hashObj.hash;
        for (var i = 0; i < routes.length; i++) {
            var route = routes[i];
            if (route == current) {
                var index = i + 1 > routes.length - 1 ? 0 : i + 1;
                return routes[index];
            }
        };
    },
    getPreviousDiptyque: function getPreviousDiptyque() {
        var hashObj = _Router2['default'].getNewHash();
        var routes = _Router2['default'].getDiptyqueRoutes();
        var current = hashObj.hash;
        for (var i = 0; i < routes.length; i++) {
            var route = routes[i];
            if (route == current) {
                var index = i - 1 < 0 ? routes.length - 1 : i - 1;
                return routes[index];
            }
        };
    },
    getDiptyquePageIndex: function getDiptyquePageIndex() {
        var hashObj = _Router2['default'].getNewHash();
        var routes = _Router2['default'].getDiptyqueRoutes();
        var current = hashObj.hash;
        for (var i = 0; i < routes.length; i++) {
            var route = routes[i];
            if (route == current) {
                return i;
            }
        };
    },
    getImageDeviceExtension: _getImageDeviceExtension,
    getPreviewUrlByHash: function getPreviewUrlByHash(hash) {
        return AppStore.baseMediaPath() + 'image/diptyque/' + hash + '/preview.gif';
    },
    getFeed: function getFeed() {
        return _GlobalData2['default'].feed;
    },
    lang: function lang() {
        var defaultLang = true;
        for (var i = 0; i < _GlobalData2['default'].langs.length; i++) {
            var lang = _GlobalData2['default'].langs[i];
            if (lang == JS_lang) {
                defaultLang = false;
            }
        };
        return defaultLang == true ? 'en' : JS_lang;
    },
    Window: function Window() {
        return _windowWidthHeight();
    },
    addPXChild: function addPXChild(item) {
        AppStore.PXContainer.add(item.child);
    },
    removePXChild: function removePXChild(item) {
        AppStore.PXContainer.remove(item.child);
    },
    Parent: undefined,
    Canvas: undefined,
    FrontBlock: undefined,
    Orientation: _AppConstants2['default'].LANDSCAPE,
    Detector: {
        isMobile: undefined
    },
    dispatcherIndex: _AppDispatcher2['default'].register(function (payload) {
        var action = payload.action;
        switch (action.actionType) {
            case _AppConstants2['default'].WINDOW_RESIZE:
                AppStore.Window.w = action.item.windowW;
                AppStore.Window.h = action.item.windowH;
                AppStore.Orientation = AppStore.Window.w > AppStore.Window.h ? _AppConstants2['default'].LANDSCAPE : _AppConstants2['default'].PORTRAIT;
                AppStore.emitChange(action.actionType);
                break;
            default:
                AppStore.emitChange(action.actionType, action.item);
                break;
        }
        return true;
    })
});

exports['default'] = AppStore;
module.exports = exports['default'];

},{"./../../../../www/data/data.json":"/Users/panagiotisthomoglou/Projects/kbb-convoy/www/data/data.json","./../constants/AppConstants":"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/constants/AppConstants.js","./../dispatchers/AppDispatcher":"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/dispatchers/AppDispatcher.js","./../services/Router":"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/services/Router.js","eventemitter2":"eventemitter2","is-retina":"is-retina","object-assign":"object-assign"}],"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/utils/Utils.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _AppConstants = require('./../constants/AppConstants');

var _AppConstants2 = _interopRequireDefault(_AppConstants);

var _domHand = require('dom-hand');

var _domHand2 = _interopRequireDefault(_domHand);

var Utils = (function () {
	function Utils() {
		_classCallCheck(this, Utils);
	}

	_createClass(Utils, null, [{
		key: 'NormalizeMouseCoords',
		value: function NormalizeMouseCoords(e, objWrapper) {
			var posx = 0;
			var posy = 0;
			if (!e) var e = window.event;
			if (e.pageX || e.pageY) {
				posx = e.pageX;
				posy = e.pageY;
			} else if (e.clientX || e.clientY) {
				posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
				posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
			}
			objWrapper.x = posx;
			objWrapper.y = posy;
			return objWrapper;
		}
	}, {
		key: 'ResizePositionProportionally',
		value: function ResizePositionProportionally(windowW, windowH, contentW, contentH, orientation) {
			var aspectRatio = contentW / contentH;
			if (orientation !== undefined) {
				if (orientation == _AppConstants2['default'].LANDSCAPE) {
					var scale = windowW / contentW * 1;
				} else {
					var scale = windowH / contentH * 1;
				}
			} else {
				var scale = windowW / windowH < aspectRatio ? windowH / contentH * 1 : windowW / contentW * 1;
			}
			var newW = contentW * scale;
			var newH = contentH * scale;
			var css = {
				width: newW,
				height: newH,
				left: (windowW >> 1) - (newW >> 1),
				top: (windowH >> 1) - (newH >> 1),
				scale: scale
			};

			return css;
		}
	}, {
		key: 'CapitalizeFirstLetter',
		value: function CapitalizeFirstLetter(string) {
			return string.charAt(0).toUpperCase() + string.slice(1);
		}
	}, {
		key: 'SupportWebGL',
		value: function SupportWebGL() {
			try {
				var canvas = document.createElement('canvas');
				return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
			} catch (e) {
				return false;
			}
		}
	}, {
		key: 'DestroyVideo',
		value: function DestroyVideo(video) {
			video.pause();
			video.src = '';
			var children = video.childNodes;
			for (var i = 0; i < children.length; i++) {
				var child = children[i];
				child.setAttribute('src', '');
				// Working with a polyfill or use jquery
				_domHand2['default'].tree.remove(child);
			}
		}
	}, {
		key: 'DestroyVideoTexture',
		value: function DestroyVideoTexture(texture) {
			var video = texture.baseTexture.source;
			Utils.DestroyVideo(video);
		}
	}, {
		key: 'Rand',
		value: function Rand(min, max, decimals) {
			var randomNum = Math.random() * (max - min) + min;
			if (decimals == undefined) {
				return randomNum;
			} else {
				var d = Math.pow(10, decimals);
				return ~ ~(d * randomNum + 0.5) / d;
			}
		}
	}, {
		key: 'GetImgUrlId',
		value: function GetImgUrlId(url) {
			var split = url.split('/');
			return split[split.length - 1].split('.')[0];
		}
	}, {
		key: 'Style',
		value: function Style(div, style) {
			div.style.webkitTransform = style;
			div.style.mozTransform = style;
			div.style.msTransform = style;
			div.style.oTransform = style;
			div.style.transform = style;
		}
	}, {
		key: 'Translate',
		value: function Translate(div, x, y, z) {
			if ('webkitTransform' in document.body.style || 'mozTransform' in document.body.style || 'oTransform' in document.body.style || 'transform' in document.body.style) {
				Utils.Style(div, 'translate3d(' + x + 'px,' + y + 'px,' + z + 'px)');
			} else {
				div.style.top = y + 'px';
				div.style.left = x + 'px';
			}
		}
	}, {
		key: 'SpringTo',
		value: function SpringTo(item, toPosition, index) {
			var dx = toPosition.x - item.position.x;
			var dy = toPosition.y - item.position.y;
			var angle = Math.atan2(dy, dx);
			var targetX = toPosition.x - Math.cos(angle) * (item.config.length * index);
			var targetY = toPosition.y - Math.sin(angle) * (item.config.length * index);
			item.velocity.x += (targetX - item.position.x) * item.config.spring;
			item.velocity.y += (targetY - item.position.y) * item.config.spring;
			item.velocity.x *= item.config.friction;
			item.velocity.y *= item.config.friction;
		}
	}, {
		key: 'SpringToScale',
		value: function SpringToScale(item, toScale, index) {
			var dx = toScale.x - item.scale.x;
			var dy = toScale.y - item.scale.y;
			var angle = Math.atan2(dy, dx);
			var targetX = toScale.x - Math.cos(angle) * (item.config.length * index);
			var targetY = toScale.y - Math.sin(angle) * (item.config.length * index);
			item.velocityScale.x += (targetX - item.scale.x) * item.config.spring;
			item.velocityScale.y += (targetY - item.scale.y) * item.config.spring;
			item.velocityScale.x *= item.config.friction;
			item.velocityScale.y *= item.config.friction;
		}
	}, {
		key: 'LoadTexture',
		value: function LoadTexture(url) {
			var uri = 'image/textures/' + url;
			var texture = THREE.ImageUtils.loadTexture(uri);
			texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
			texture.anisotropy = 16;
			return texture;
		}
	}]);

	return Utils;
})();

exports['default'] = Utils;
module.exports = exports['default'];

},{"./../constants/AppConstants":"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/constants/AppConstants.js","dom-hand":"dom-hand"}],"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/utils/raf.js":[function(require,module,exports){
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

'use strict';

(function () {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) window.requestAnimationFrame = function (callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function () {
            callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };

    if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function (id) {
        clearTimeout(id);
    };
})();

},{}],"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/pager/components/BaseComponent.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _toSlugCase = require('to-slug-case');

var _toSlugCase2 = _interopRequireDefault(_toSlugCase);

var _domHand = require('dom-hand');

var _domHand2 = _interopRequireDefault(_domHand);

var BaseComponent = (function () {
	function BaseComponent() {
		_classCallCheck(this, BaseComponent);

		this.domIsReady = false;
		this.componentDidMount = this.componentDidMount.bind(this);
	}

	_createClass(BaseComponent, [{
		key: 'componentWillMount',
		value: function componentWillMount() {}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.domIsReady = true;
			this.resize();
		}
	}, {
		key: 'render',
		value: function render(childId, parentId, template, object) {
			this.componentWillMount();
			this.childId = childId;
			this.parentId = parentId;

			if (_domHand2['default'].isDom(parentId)) {
				this.parent = parentId;
			} else {
				var id = this.parentId.indexOf('#') > -1 ? this.parentId.split('#')[1] : this.parentId;
				this.parent = document.getElementById(id);
			}

			if (template == undefined) {
				this.element = document.createElement('div');
			} else {
				this.element = document.createElement('div');
				var t = template(object);
				this.element.innerHTML = t;
			}
			if (this.element.getAttribute('id') == undefined) this.element.setAttribute('id', (0, _toSlugCase2['default'])(childId));
			_domHand2['default'].tree.add(this.parent, this.element);

			setTimeout(this.componentDidMount, 0);
		}
	}, {
		key: 'remove',
		value: function remove() {
			this.componentWillUnmount();
			this.element.remove();
		}
	}, {
		key: 'resize',
		value: function resize() {}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {}
	}]);

	return BaseComponent;
})();

exports['default'] = BaseComponent;
module.exports = exports['default'];

},{"dom-hand":"dom-hand","to-slug-case":"to-slug-case"}],"/Users/panagiotisthomoglou/Projects/kbb-convoy/www/data/data.json":[function(require,module,exports){
module.exports={
	"content": {
		"twitter_url": "https://twitter.com/camper",
		"facebook_url": "https://www.facebook.com/Camper",
		"instagram_url": "https://instagram.com/camper/",
		"lab_url": "http://www.camper.com/lab",
		"men_shop_url": "http://www.camper.com/int/men/shoes/ss16_inspiration",
		"women_shop_url": "http://www.camper.com/int/women/shoes/ss16_inspiration",
		"lang": {
			"en": {
				"home": "MAP",
				"grid": "INDEX",
				"lab": "LAB",
				"camper_lab": "Camper Lab",
				"shop_title": "Shop",
				"shop_men": "Men",
				"shop_women": "Women",
				"map_txt": "MAP"
			},
			"fr": {
				"home": "MAP",
				"grid": "INDEX",
				"lab": "LAB",
				"camper_lab": "Camper Lab",
				"shop_title": "Acheter",
				"shop_men": "homme",
				"shop_women": "femme",
				"map_txt": "MAP"
			},
			"es": {
				"home": "MAP",
				"grid": "INDEX",
				"lab": "LAB",
				"camper_lab": "Camper Lab",
				"shop_title": "Comprar",
				"shop_men": "hombre",
				"shop_women": "mujer",
				"map_txt": "MAP"
			},
			"it": {
				"home": "MAP",
				"grid": "INDEX",
				"lab": "LAB",
				"camper_lab": "Camper Lab",
				"shop_title": "Acquisiti",
				"shop_men": "uomo",
				"shop_women": "donna",
				"map_txt": "MAP"
			},
			"de": {
				"home": "MAP",
				"grid": "INDEX",
				"lab": "LAB",
				"camper_lab": "Camper Lab",
				"shop_title": "Shop",
				"shop_men": "Herren",
				"shop_women": "Damen",
				"map_txt": "MAP"
			},
			"pt": {
				"home": "MAP",
				"grid": "INDEX",
				"lab": "LAB",
				"camper_lab": "Camper Lab",
				"shop_title": "Compre",
				"shop_men": "Homen",
				"shop_women": "Mulher",
				"map_txt": "MAP"
			}
		}
	},

	"langs": ["en", "fr", "es", "it", "de", "pt"],

	"home-videos": [
		"deia-dub.mp4",
		"deia-mateo.mp4",
		"deia-marta.mp4",
		"es-trenc-isamu.mp4",
		"es-trenc-beluga.mp4",
		"arelluf-capas.mp4",
		"arelluf-pelotas.mp4",
		"arelluf-marta.mp4",
		"arelluf-kobarah.mp4",
		"arelluf-dub.mp4",
		"arelluf-paradise.mp4"
	],

	"feed": [
		{
			"id": "deia",
			"person": "mateo",
			"time": "2 min ago",
			"media": {
				"type": "image",
				"id": "shoe"
			},
			"comments": [
				{
					"person-name": "mateo",
					"person-text": "Estreno Campers para nuestro weekend en Deia @Marta"
				}
			]
		},{
			"id": "deia",
			"person": "mateo",
			"time": "2 min ago",
			"media": {
				"type": "image",
				"id": "character"
			},
			"comments": [
				{
					"person-name": "mateo",
					"person-text": "Profile pic? maybe? maybe baby?"
				}
			]
		},{
			"id": "deia",
			"person": "mateo",
			"time": "2 min ago",
			"media": {
				"type": "video",
				"id": "fun-fact"
			},
			"comments": [
				{
					"person-name": "mateo",
					"person-text": "Me being me… Hehe :) <span>#camper</span>"
				}
			]
		},{
			"id": "deia",
			"person": "mateo",
			"time": "2 min ago",
			"media": {
				"type": "video",
				"id": "character"
			},
			"comments": [
				{
					"person-name": "marta",
					"person-text": "Porque esa cara de emo?? @Mateo lol!! #SelfieVideo #MallorcaByCamper"
				}
			]
		},{
			"id": "deia",
			"person": "dub",
			"time": "2 min ago",
			"media": {
				"type": "image",
				"id": "shoe"
			},
			"comments": [
				{
					"person-name": "dub",
					"person-text": "These shoes are the shoes Mirko would wear if he was still alive and kickin'"
				}
			]
		},{
			"id": "deia",
			"person": "dub",
			"time": "2 min ago",
			"media": {
				"type": "image",
				"id": "character"
			},
			"comments": [
				{
					"person-name": "mateo",
					"person-text": "Porque no vienes a Deia con @Marta y conmigo el proximo weekend??"
				},{
					"person-name": "dub",
					"person-text": "No puedooooo… tengo clases de pintura y mi madre viene a visitar #heavymetal"
				}
			]
		},{
			"id": "deia",
			"person": "dub",
			"time": "2 min ago",
			"media": {
				"type": "video",
				"id": "fun-fact"
			},
			"comments": [
				{
					"person-name": "mateo",
					"person-text": "Me being me… Hehe :) <span>#camper</span>"
				}
			]
		},{
			"id": "deia",
			"person": "dub",
			"time": "2 min ago",
			"media": {
				"type": "video",
				"id": "character"
			},
			"comments": [
				{
					"person-name": "dub",
					"person-text": "#artselfie"
				}
			]
		},{
			"id": "deia",
			"person": "marta",
			"time": "2 min ago",
			"media": {
				"type": "image",
				"id": "shoe"
			},
			"comments": [
				{
					"person-name": "marta",
					"person-text": "Deep blue #campershoes"
				}
			]
		},{
			"id": "deia",
			"person": "marta",
			"time": "2 min ago",
			"media": {
				"type": "image",
				"id": "character"
			},
			"comments": [
				{
					"person-name": "marta",
					"person-text": "Thanks for the flowers @Mateo sooo cuuute."
				}
			]
		},{
			"id": "deia",
			"person": "marta",
			"time": "2 min ago",
			"media": {
				"type": "video",
				"id": "fun-fact"
			},
			"comments": [
				{
					"person-name": "marta",
					"person-text": "Me being me… Hehe :) <span>#camper</span>"
				}
			]
		},{
			"id": "deia",
			"person": "marta",
			"time": "2 min ago",
			"media": {
				"type": "video",
				"id": "character"
			},
			"comments": [
				{
					"person-name": "marta",
					"person-text": "Las flores que @mateo me regalo. #MallorcaByCamper"
				}
			]
		},{
			"id": "es-trenc",
			"person": "beluga",
			"time": "2 min ago",
			"media": {
				"type": "image",
				"id": "shoe"
			},
			"comments": [
				{
					"person-name": "beluga",
					"person-text": "Me being me... Hehe :) #campershoes #Beluga"
				}
			]
		},{
			"id": "es-trenc",
			"person": "beluga",
			"time": "2 min ago",
			"media": {
				"type": "image",
				"id": "character"
			},
			"comments": [
				{
					"person-name": "beluga",
					"person-text": "Es Trenc is the place to be. "
				}
			]
		},{
			"id": "es-trenc",
			"person": "beluga",
			"time": "2 min ago",
			"media": {
				"type": "video",
				"id": "fun-fact"
			},
			"comments": [
				{
					"person-name": "beluga",
					"person-text": "Me being me… Hehe :) <span>#camper</span>"
				}
			]
		},{
			"id": "es-trenc",
			"person": "beluga",
			"time": "2 min ago",
			"media": {
				"type": "video",
				"id": "character"
			},
			"comments": [
				{
					"person-name": "beluga",
					"person-text": "All this smoke is not what you think it is #HighonLife"
				}
			]
		},{
			"id": "es-trenc",
			"person": "isamu",
			"time": "2 min ago",
			"media": {
				"type": "image",
				"id": "shoe"
			},
			"comments": [
				{
					"person-name": "isamu",
					"person-text": "Supernatural beauty. I love the new #me"
				}
			]
		},{
			"id": "es-trenc",
			"person": "isamu",
			"time": "2 min ago",
			"media": {
				"type": "image",
				"id": "character"
			},
			"comments": [
				{
					"person-name": "isamu",
					"person-text": "So calm at Es Trenc."
				}
			]
		},{
			"id": "es-trenc",
			"person": "isamu",
			"time": "2 min ago",
			"media": {
				"type": "video",
				"id": "fun-fact"
			},
			"comments": [
				{
					"person-name": "isamu",
					"person-text": "Me being me… Hehe :) <span>#camper</span>"
				}
			]
		},{
			"id": "es-trenc",
			"person": "isamu",
			"time": "2 min ago",
			"media": {
				"type": "video",
				"id": "character"
			},
			"comments": [
				{
					"person-name": "isamu",
					"person-text": "Hiiii!!! :) #MallorcaByCamper"
				}
			]
		},

		{
			"id": "arelluf",
			"person": "capas",
			"time": "2 min ago",
			"media": {
				"type": "image",
				"id": "shoe"
			},
			"comments": [
				{
					"person-name": "capas",
					"person-text": "New colors. Same energy"
				}
			]
		},{
			"id": "arelluf",
			"person": "capas",
			"time": "2 min ago",
			"media": {
				"type": "image",
				"id": "character"
			},
			"comments": [
				{
					"person-name": "capas",
					"person-text": "Last night was in-sane."
				}
			]
		},{
			"id": "arelluf",
			"person": "capas",
			"time": "2 min ago",
			"media": {
				"type": "video",
				"id": "fun-fact"
			},
			"comments": [
				{
					"person-name": "capas",
					"person-text": "Me being me… Hehe :) <span>#camper</span>"
				}
			]
		},{
			"id": "arelluf",
			"person": "capas",
			"time": "2 min ago",
			"media": {
				"type": "video",
				"id": "character"
			},
			"comments": [
				{
					"person-name": "capas",
					"person-text": "So much fun Mallorca #MallorcaByCamper"
				}
			]
		},

		{
			"id": "arelluf",
			"person": "pelotas",
			"time": "2 min ago",
			"media": {
				"type": "image",
				"id": "shoe"
			},
			"comments": [
				{
					"person-name": "pelotas",
					"person-text": "Check out my molded Pelotas"
				}
			]
		},{
			"id": "arelluf",
			"person": "pelotas",
			"time": "2 min ago",
			"media": {
				"type": "image",
				"id": "character"
			},
			"comments": [
				{
					"person-name": "pelotas",
					"person-text": "Riders of Mallorda #campershoes"
				}
			]
		},{
			"id": "arelluf",
			"person": "pelotas",
			"time": "2 min ago",
			"media": {
				"type": "video",
				"id": "fun-fact"
			},
			"comments": [
				{
					"person-name": "pelotas",
					"person-text": "What happens in Arelluf stays in #Arelluf"
				}
			]
		},{
			"id": "arelluf",
			"person": "pelotas",
			"time": "2 min ago",
			"media": {
				"type": "video",
				"id": "character"
			},
			"comments": [
				{
					"person-name": "pelotas",
					"person-text": "No nonsense #selfie #MallorcaByCamper"
				}
			]
		},

		{
			"id": "arelluf",
			"person": "marta",
			"time": "2 min ago",
			"media": {
				"type": "image",
				"id": "shoe"
			},
			"comments": [
				{
					"person-name": "marta",
					"person-text": "These new Campers are Da bomb"
				}
			]
		},{
			"id": "arelluf",
			"person": "marta",
			"time": "2 min ago",
			"media": {
				"type": "image",
				"id": "character"
			},
			"comments": [
				{
					"person-name": "marta",
					"person-text": "I'm not going in the pool like this."
				}
			]
		},{
			"id": "arelluf",
			"person": "marta",
			"time": "2 min ago",
			"media": {
				"type": "video",
				"id": "fun-fact"
			},
			"comments": [
				{
					"person-name": "marta",
					"person-text": "Me being me… Hehe :) <span>#camper</span>"
				}
			]
		},{
			"id": "arelluf",
			"person": "marta",
			"time": "2 min ago",
			"media": {
				"type": "video",
				"id": "character"
			},
			"comments": [
				{
					"person-name": "marta",
					"person-text": "After party. After life #SelfieLife #MallorcaByCamper"
				}
			]
		},

		{
			"id": "arelluf",
			"person": "kobarah",
			"time": "2 min ago",
			"media": {
				"type": "image",
				"id": "shoe"
			},
			"comments": [
				{
					"person-name": "kobarah",
					"person-text": "I dare you"
				}
			]
		},{
			"id": "arelluf",
			"person": "kobarah",
			"time": "2 min ago",
			"media": {
				"type": "image",
				"id": "character"
			},
			"comments": [
				{
					"person-name": "kobarah",
					"person-text": "Wish you were here #arelluf"
				}
			]
		},{
			"id": "arelluf",
			"person": "kobarah",
			"time": "2 min ago",
			"media": {
				"type": "video",
				"id": "fun-fact"
			},
			"comments": [
				{
					"person-name": "kobarah",
					"person-text": "Haters will say it's Photoshop"
				}
			]
		},{
			"id": "arelluf",
			"person": "kobarah",
			"time": "2 min ago",
			"media": {
				"type": "video",
				"id": "character"
			},
			"comments": [
				{
					"person-name": "kobarah",
					"person-text": "Call me Pandemonia #MallorcaByCamper"
				}
			]
		},

		{
			"id": "arelluf",
			"person": "dub",
			"time": "2 min ago",
			"media": {
				"type": "image",
				"id": "shoe"
			},
			"comments": [
				{
					"person-name": "dub",
					"person-text": "My new Campers are the SUV of shoes"
				}
			]
		},{
			"id": "arelluf",
			"person": "dub",
			"time": "2 min ago",
			"media": {
				"type": "image",
				"id": "character"
			},
			"comments": [
				{
					"person-name": "dub",
					"person-text": "Free diving excursions this afternoon at #arelluf. PM me if interested"
				}
			]
		},{
			"id": "arelluf",
			"person": "dub",
			"time": "2 min ago",
			"media": {
				"type": "video",
				"id": "fun-fact"
			},
			"comments": [
				{
					"person-name": "dub",
					"person-text": "Me being me… Hehe :) <span>#camper</span>"
				}
			]
		},{
			"id": "arelluf",
			"person": "dub",
			"time": "2 min ago",
			"media": {
				"type": "video",
				"id": "character"
			},
			"comments": [
				{
					"person-name": "dub",
					"person-text": "Peace Y’all #MallorcaByCamper"
				}
			]
		},

		{
			"id": "arelluf",
			"person": "paradise",
			"time": "2 min ago",
			"media": {
				"type": "image",
				"id": "shoe"
			},
			"comments": [
				{
					"person-name": "paradise",
					"person-text": "Bold and Beautiful"
				}
			]
		},{
			"id": "arelluf",
			"person": "paradise",
			"time": "2 min ago",
			"media": {
				"type": "image",
				"id": "character"
			},
			"comments": [
				{
					"person-name": "paradise",
					"person-text": "Detox by the pool. Much needed."
				}
			]
		},{
			"id": "arelluf",
			"person": "paradise",
			"time": "2 min ago",
			"media": {
				"type": "video",
				"id": "fun-fact"
			},
			"comments": [
				{
					"person-name": "paradise",
					"person-text": "Selfie on waterslide like a boss #SelfieRide"
				}
			]
		},{
			"id": "arelluf",
			"person": "paradise",
			"time": "2 min ago",
			"media": {
				"type": "video",
				"id": "character"
			},
			"comments": [
				{
					"person-name": "paradise",
					"person-text": "I am not a bimbo."
				}
			]
		}
	],

	"default-route": "",

	"routing": {
		"/": {
			"texts": {
				"en": {
					"generic": "The Spring/Summer 2016 collection is inspired by Mallorca, the Mediterranean island that Camper calls home. Our vision of this sunny paradise highlights three hot spots: Deia, Es Trenc, and Arelluf. For us, Mallorca isn’t just a destination, it’s a state of mind. #MallorcaByCamper",
					"deia": "The village of Deia has long attracted both retirees and rock stars with its picturesque scenery and chill vibe. The seemingly sleepy countryside has a bohemian spirit unique to this mountain enclave. #DeiaByCamper",
					"arelluf": "The fist-pumping ragers of Arenal and unbridled debauchery of Magaluf meet in Arelluf, an imagined but epic part of our vision of this beloved island. It’s all neon and non-stop partying in the summer sun – quite literally a hot mess. #ArellufByCamper",
					"es-trenc": "This coastal wilderness boasts breathtaking beaches and a serene atmosphere. The seaside has an untamed yet peaceful feeling that is both inspiring and soothing. #EsTrencByCamper"
				},
				"fr": {
					"generic": "La collection Printemps/Été 2016 s’inspire de Majorque, l’île méditerranéenne d'où Camper est originaire. Notre vision de ce paradis ensoleillé se reflète dans trois lieux incontournables : Deia, Es Trenc et Arelluf. Pour nous, Majorque est plus qu’une simple destination : c’est un état d’esprit. #MallorcaByCamper",
					"deia": "Le village de Deia attire depuis longtemps les retraités comme les rock stars grâce à ses paysages pittoresques et son ambiance décontractée. Sa campagne d’apparence tranquille affiche un esprit bohème caractéristique de cette enclave montagneuse. #DeiaByCamper",
					"arelluf": "L’exaltation d’Arenal et les soirées débridées de Magaluf se rejoignent à Arelluf, un lieu imaginaire mais central dans notre vision de cette île adorée. Tout y est question de fluo et de fêtes sans fin au soleil de l’été : un joyeux bazar, en somme. #ArellufByCamper",
					"es-trenc": "Cette nature sauvage côtière jouit d’une superbe plage et d’une atmosphère calme. Le bord de mer a un côté à la fois tranquille et indompté qui inspire autant qu’il apaise. #EsTrencByCamper"
				},
				"es": {
					"generic": "La colección primavera/verano 2016 está inspirada en Mallorca, la isla mediterránea que Camper considera su hogar. Nuestra visión de este paraíso soleado destaca tres lugares importantes: Deia, Es Trenc y Arelluf. Para nosotros, Mallorca no es tan solo un destino, es un estado de ánimo. #MallorcaByCamper",
					"deia": "Los horizontes pintorescos y la tranquilidad del pueblo de Deia llevan mucho tiempo cautivando tanto a artistas retirados como a estrellas del rock. El paisaje rural de aparente calma posee un espíritu bohemio propio de este enclave montañoso. #DeiaByCamper",
					"arelluf": "La locura fiestera de S’Arenal y el desenfreno de Magaluf se reúnen en Arelluf, una creación dentro de nuestra visión de esta querida isla. Todo gira en torno al neón y la fiesta sin fin bajo el sol. En definitiva, una combinación explosiva. #ArellufByCamper",
					"es-trenc": "Este espacio natural virgen cuenta con una playa impresionante y un ambiente sereno. La costa, salvaje y pacífica al mismo tiempo, transmite una sensación evocadora y relajante. #EsTrencByCamper"
				},
				"it": {
					"generic": "La collezione Primavera/Estate 2016 è ispirata a Maiorca, l’isola del Mediterraneo che ha dato i natali a Camper. La nostra visione di questo paradiso assolato si sofferma su tre luoghi simbolo: Deia, Es Trenc e Arelluf. Per noi, Maiorca non è una semplice meta, è uno stato d'animo. #MallorcaByCamper",
					"deia": "Da tempo, il villaggio di Deia attira pensionati e rock star con il suo paesaggio pittoresco e l'atmosfera rilassata. La campagna apparentemente sonnolenta ha uno spirito bohémien tipico di questo paesino di montagna. #DeiaByCamper",
					"arelluf": "Gli scatenati festaioli di Arenal e la sfrenata dissolutezza di Magaluf si fondono in Arelluf, una parte immaginaria ma epica della nostra visione di questa adorata isola. È un turbinio di luci al neon e feste ininterrotte sotto il sole estivo, un caos pazzesco. #ArellufByCamper",
					"es-trenc": "Quest'area protetta vanta una spiaggia mozzafiato e un'atmosfera serena. Il litorale ha un che di selvaggio, ma pacifico, che è suggestivo e rilassante al tempo stesso. #EsTrencByCamper"
				},
				"de": {
					"generic": "Die Kollektion Frühjahr/Sommer 2016 hat sich von Mallorca inspirieren lassen, der Mittelmeerinsel, auf der Camper zu Hause ist. Unsere Vision des Sonnenparadieses befasst sich mit drei Hotspots: Deia, Es Trenc und Arelluf. Für uns ist Mallorca mehr als nur ein Reiseziel, es ist eine Lebenseinstellung. #MallorcaByCamper",
					"deia": "Der Ort Deia mit seiner malerischen Landschaft und Lässigkeit zieht seit vielen Jahren nicht nur Pensionäre, sondern auch Rockstars an. Die verschlafen anmutende Gegend versprüht einen ganz besonderen Bohemian-Charme, der einzigartig ist für diese Gebirgsenklave. #DeiaByCamper",
					"arelluf": "Die gestählten Körper von Arenal und die ungezügelte Offenheit von Magaluf treffen in Arelluf aufeinander – ein fantasievolles und doch umfassendes Element unserer Vision der beliebten Insel. Ein Sommer aus endlosen Partys in Neonfarben – ein echt heißer Ort. #ArellufByCamper",
					"es-trenc": "Dieser unberührte Küstenstreifen verfügt über einen atemberaubenden Strand und eine beruhigende Atmosphäre. Das Meer ist ungezähmt und friedvoll zugleich und dient als Quelle der Inspiration ebenso wie als Ruhepol. #EsTrencByCamper"
				},
				"pt": {
					"generic": "A coleção primavera/verão 2016 tem Maiorca como inspiração, a ilha mediterrânea que a Camper chama de casa. A nossa visão deste paraíso solarengo realça três locais importantes: Deia, Es Trenc e Arelluf. Para nós, Maiorca não é só um destino de férias, mas também um estado de espírito. #MallorcaByCamper",
					"deia": "A aldeia de Deia sempre atraiu reformados e estrelas de rock devido à sua paisagem pitoresca e ambiente descontraído. Esta aldeia campestre aparentemente pacata tem um espírito boémio, exclusivo deste enclave montanhoso. #DeiaByCamper",
					"arelluf": "As grandes festas de Arenal e a diversão sem limites de Magaluf reúnem-se em Arelluf, uma parte imaginada mas épica da nossa visão desta ilha tão amada por nós. A combinação perfeita entre tons néon e festas imparáveis sob o sol de verão (uma mistura bem quente, na realidade). #ArellufByCamper",
					"es-trenc": "Esta vasta região costeira possui praias impressionantes e um ambiente sereno. O litoral tem uma atmosfera selvagem e tranquila ao mesmo tempo, que é tanto inspiradora como relaxante. #EsTrencByCamper"
				}
			},
			"assets": [
				"background.jpg",
				"displacement.jpg",
				"video-shots/arelluf-capas.jpg",
				"video-shots/arelluf-dub.jpg",
				"video-shots/arelluf-kobarah.jpg",
				"video-shots/arelluf-paradise.jpg",
				"video-shots/arelluf-pelotas.jpg",
				"video-shots/arelluf-marta.jpg",
				"video-shots/deia-dub.jpg",
				"video-shots/deia-marta.jpg",
				"video-shots/deia-mateo.jpg",
				"video-shots/es-trenc-beluga.jpg",
				"video-shots/es-trenc-isamu.jpg"
			]
		},

        "deia/dub": {
        	"selfie-stick-video-url": "http://embed.wistia.com/deliveries/13bbb61195164873d823a3b91a2c82accefb3edd/deia-dub.mp4",
        	"ambient-color": {
        		"from": { "h": 188, "s": 85, "v": 61 },
        		"to": { "h": 357, "s": 97, "v": 26 },
        		"selfie-stick": { "h": 359, "s": 93, "v": 51 }
        	},
        	"fun-fact-video-url": "http://embed.wistia.com/deliveries/b741eeb1737a682f5646cba17e040630a1dd018a/deia-dub.mp4",
        	"fact": {
        		"en": "Breaking up via text message. not a very deia thing to do"
        	},
        	"shop-url": "http://www.camper.com/int/men/shoes/dub_deia_ss2016",
        	"wistia-character-id": "azjc2jh62j",
        	"wistia-fun-id": "lnfvc3ag50"
        },
        "deia/mateo": {
        	"selfie-stick-video-url": "http://embed.wistia.com/deliveries/e424889ac026f70e544af03035e7187f34941705/deia-mateo.mp4",
        	"ambient-color": {
        		"from": { "h": 37, "s": 89, "v": 83 },
        		"to": { "h": 8, "s": 86, "v": 57 },
        		"selfie-stick": { "h": 8, "s": 86, "v": 57 }
        	},
        	"fun-fact-video-url": "http://embed.wistia.com/deliveries/344c711238977490c0730509e73ba117f9464338/deia-mateo.mp4",
        	"fact": {
        		"en": "buys an atelier at deia. starts career as an artist"
        	},
        	"shop-url": "http://www.camper.com/int/men/shoes/mateo_deia_ss2016",
        	"wistia-character-id": "6het1knik3",
        	"wistia-fun-id": "6p32lyvdqo"
        },

        "deia/marta": {
        	"selfie-stick-video-url": "http://embed.wistia.com/deliveries/4bb6e485b717bf7dbdd5c941fafa2b1884e90838/deia-marta.mp4",
        	"ambient-color": {
        		"from": { "h": 346, "s": 70, "v": 55 },
        		"to": { "h": 244, "s": 29, "v": 73 },
        		"selfie-stick": { "h": 244, "s": 29, "v": 73 }
        	},
        	"fun-fact-video-url": "http://embed.wistia.com/deliveries/d159b55ff8cecc9cbd8c0c12ee2781e2eda23e93/deia-marta.mp4",
        	"fact": {
        		"en": "FOMO of not being at deia"
        	},
        	"shop-url": "http://www.camper.com/int/women/shoes/marta_deia_ss2016",
        	"wistia-character-id": "toro2pe469",
        	"wistia-fun-id": "bgkx7gmk13"
        },

        "es-trenc/beluga": {
        	"selfie-stick-video-url": "http://embed.wistia.com/deliveries/23444d3c8693e59f8079f827dd182c5e33413877/es-trenc-beluga.mp4",
        	"ambient-color": {
        		"from": { "h": 212, "s": 10, "v": 69 },
        		"to": { "h": 193, "s": 12, "v": 45 },
        		"selfie-stick": { "h": 193, "s": 0, "v": 45 }
        	},
        	"fun-fact-video-url": "http://embed.wistia.com/deliveries/70455ad73af7b7e35e9e674109929c3b70294064/es-trenc-beluga.mp4",
        	"fact": {
        		"en": "Es Trenc nudist PARTY BOY"
        	},
        	"shop-url": "http://www.camper.com/int/men/shoes/beluga_es_trenc_ss2016",
        	"wistia-character-id": "fo112zh7pv",
        	"wistia-fun-id": "97bvpzhtnb"
        },
        "es-trenc/isamu": {
        	"selfie-stick-video-url": "http://embed.wistia.com/deliveries/6eafae7f1b3bc41d856973557a2f51598c8241a6/es-trenc-isamu.mp4",
        	"ambient-color": {
        		"from": { "h": 210, "s": 1, "v": 74 },
        		"to": { "h": 21, "s": 35, "v": 72 },
        		"selfie-stick": { "h": 20, "s": 45, "v": 30 }
        	},
        	"fun-fact-video-url": "http://embed.wistia.com/deliveries/06679f3ebd696e9c42fd13cf9dbdaeffe9b1f873/es-trenc-isamu.mp4",
        	"fact": {
        		"en": "UFO sighting at es trenc"
        	},
        	"shop-url": "http://www.camper.com/int/women/shoes/isamu_es_trenc_ss2016",
        	"wistia-character-id": "1xsabq7yey",
        	"wistia-fun-id": "xnlnyee83o"
        },

		"arelluf/capas": {
			"selfie-stick-video-url": "http://embed.wistia.com/deliveries/840a3f6729b1f52f446aae6daec939a3eca4c0c1/arelluf-capas.mp4",
        	"ambient-color": {
        		"from": { "h": 0, "s": 0, "v": 0 },
        		"to": { "h": 8, "s": 76, "v": 91 },
        		"selfie-stick": { "h": 8, "s": 76, "v": 91 }
        	},
        	"fun-fact-video-url": "http://embed.wistia.com/deliveries/48ff1c58b86b08912681b4fdf3b7547c757766d7/arelluf-capas.mp4",
        	"fact": {
        		"en": "MEANWHILE IN ARELLUF"
        	},
        	"shop-url": "http://www.camper.com/int/men/shoes/capas_arelluf_ss2016",
        	"wistia-character-id": "z7or68da1v",
        	"wistia-fun-id": "kfc0u1vvhp"
		},
        "arelluf/pelotas": {
        	"selfie-stick-video-url": "http://embed.wistia.com/deliveries/3dcfd70c7072692ea3a739aef5376b026b04b675/arelluf-pelotas.mp4",
        	"ambient-color": {
        		"from": { "h": 211, "s": 95, "v": 29 },
        		"to": { "h": 22, "s": 35, "v": 79 },
        		"selfie-stick": { "h": 233, "s": 35, "v": 10 }
        	},
        	"fun-fact-video-url": "http://embed.wistia.com/deliveries/ac16d53c4f9e8fd6930779e237854687dcf241e8/arelluf-pelotas.mp4",
        	"fact": {
        		"en": "WHAT HAPPENS IN ARELLUF STAYS IN ARELLUF"
        	},
        	"shop-url": "http://www.camper.com/int/men/shoes/pelotas_arelluf_ss2016",
        	"wistia-character-id": "f9do2qlwnj",
        	"wistia-fun-id": "kyjkbwcn6v"
        },
        "arelluf/marta": {
        	"selfie-stick-video-url": "http://embed.wistia.com/deliveries/9b9471dcbe1f94ff7b3508841f68ff15be192ee4/arelluf-marta.mp4",
        	"ambient-color": {
        		"from": { "h": 200, "s": 57, "v": 81 },
        		"to": { "h": 201, "s": 100, "v": 69 },
        		"selfie-stick": { "h": 201, "s": 100, "v": 69 }
        	},
        	"fun-fact-video-url": "http://embed.wistia.com/deliveries/5b9d2706100e5ea0d317143e2374d6bd6c9607b1/arelluf-marta.mp4",
        	"fact": {
        		"en": "BAD TRIP AT THE HOTEL POOL"
        	},
        	"shop-url": "http://www.camper.com/int/women/shoes/marta_arelluf_ss2016",
        	"wistia-character-id": "ppkmfdl5jq",
        	"wistia-fun-id": "r64ij2ojh3"
        },
        "arelluf/kobarah": {
        	"selfie-stick-video-url": "http://embed.wistia.com/deliveries/2980f14cc8bd9912b14dca46a4cd4a85fa04774c/arelluf-kobarah.mp4",
        	"ambient-color": {
        		"from": { "h": 264, "s": 69, "v": 41 },
        		"to": { "h": 344, "s": 56, "v": 100 },
        		"selfie-stick": { "h": 344, "s": 41, "v": 100 }
        	},
        	"fun-fact-video-url": "http://embed.wistia.com/deliveries/62e54eac1d8989ab9de238fa3f7c6d8db4d9de8d/arelluf-kobarah.mp4",
        	"fact": {
        		"en": "Haters will say it's Photoshop"
        	},
        	"shop-url": "http://www.camper.com/int/women/shoes/kobarah_arelluf_ss2016",
        	"wistia-character-id": "9xe5vjzybo",
        	"wistia-fun-id": "o79dqphpsl"
        },
		"arelluf/dub": {
			"selfie-stick-video-url": "http://embed.wistia.com/deliveries/22b360c8ca399696985313dde99ba83d4ec972b7/arelluf-dub.mp4",
        	"ambient-color": {
        		"from": { "h": 196, "s": 52, "v": 33 },
        		"to": { "h": 15, "s": 84, "v": 100 },
        		"selfie-stick": { "h": 15, "s": 84, "v": 100 }
        	},
        	"fun-fact-video-url": "http://embed.wistia.com/deliveries/987bdab012979822b818637837cc288414cef8f3/arelluf-dub.mp4",
        	"fact": {
        		"en": "WHEN YOU CAN'T KEEP THE ARROW ON THE CENTER LINE"
        	},
        	"shop-url": "http://www.camper.com/int/men/shoes/dub_arelluf_ss2016",
        	"wistia-character-id": "dlg5azy5ar",
        	"wistia-fun-id": "qphj9p3t5h"
        },
        "arelluf/paradise": {
        	"selfie-stick-video-url": "http://embed.wistia.com/deliveries/a819c373f9777852f3967ce023bcfb0d9115386f/arelluf-paradise.mp4",
        	"ambient-color": {
        		"from": { "h": 59, "s": 19, "v": 99 },
        		"to": { "h": 207, "s": 31, "v": 100 },
        		"selfie-stick": { "h": 183, "s": 71, "v": 64 }
        	},
        	"fun-fact-video-url": "http://embed.wistia.com/deliveries/5dc19726efa7b2e756c80534d43fa600cc61f178/arelluf-paradise.mp4",
        	"fact": {
        		"en": "SELFIE ON WATERSLIDE LIKE A BOSS"
        	},
        	"shop-url": "http://www.camper.com/int/women/shoes/paradise_arelluf_ss2016",
        	"wistia-character-id": "h89y0kuwy2",
        	"wistia-fun-id": "343t1sn2np"
        }

	}
}
},{}]},{},["/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/Main.js"])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvcGFuYWdpb3Rpc3Rob21vZ2xvdS9Qcm9qZWN0cy9rYmItY29udm95L3NyYy9qcy9NYWluLmpzIiwiL1VzZXJzL3BhbmFnaW90aXN0aG9tb2dsb3UvUHJvamVjdHMva2JiLWNvbnZveS9zcmMvanMvYXBwL0FwcC5qcyIsIi9Vc2Vycy9wYW5hZ2lvdGlzdGhvbW9nbG91L1Byb2plY3RzL2tiYi1jb252b3kvc3JjL2pzL2FwcC9BcHBUZW1wbGF0ZS5qcyIsIi9Vc2Vycy9wYW5hZ2lvdGlzdGhvbW9nbG91L1Byb2plY3RzL2tiYi1jb252b3kvc3JjL2pzL2FwcC9hY3Rpb25zL0FwcEFjdGlvbnMuanMiLCIvVXNlcnMvcGFuYWdpb3Rpc3Rob21vZ2xvdS9Qcm9qZWN0cy9rYmItY29udm95L3NyYy9qcy9hcHAvY29tcG9uZW50cy9HVUkuanMiLCIvVXNlcnMvcGFuYWdpb3Rpc3Rob21vZ2xvdS9Qcm9qZWN0cy9rYmItY29udm95L3NyYy9qcy9hcHAvY29tcG9uZW50cy9HVUlDb250cm9sbGVyLmpzIiwiL1VzZXJzL3BhbmFnaW90aXN0aG9tb2dsb3UvUHJvamVjdHMva2JiLWNvbnZveS9zcmMvanMvYXBwL2NvbXBvbmVudHMvTWF0ZXJpYWxzLmpzIiwiL1VzZXJzL3BhbmFnaW90aXN0aG9tb2dsb3UvUHJvamVjdHMva2JiLWNvbnZveS9zcmMvanMvYXBwL2NvbXBvbmVudHMvTWVhdFBhcnRpY2xlLmpzIiwiL1VzZXJzL3BhbmFnaW90aXN0aG9tb2dsb3UvUHJvamVjdHMva2JiLWNvbnZveS9zcmMvanMvYXBwL2NvbXBvbmVudHMvTWVhdFBhcnRpY2xlcy5qcyIsIi9Vc2Vycy9wYW5hZ2lvdGlzdGhvbW9nbG91L1Byb2plY3RzL2tiYi1jb252b3kvc3JjL2pzL2FwcC9jb25zdGFudHMvQXBwQ29uc3RhbnRzLmpzIiwiL1VzZXJzL3BhbmFnaW90aXN0aG9tb2dsb3UvUHJvamVjdHMva2JiLWNvbnZveS9zcmMvanMvYXBwL2Rpc3BhdGNoZXJzL0FwcERpc3BhdGNoZXIuanMiLCIvVXNlcnMvcGFuYWdpb3Rpc3Rob21vZ2xvdS9Qcm9qZWN0cy9rYmItY29udm95L3NyYy9qcy9hcHAvc2VydmljZXMvR2xvYmFsRXZlbnRzLmpzIiwiL1VzZXJzL3BhbmFnaW90aXN0aG9tb2dsb3UvUHJvamVjdHMva2JiLWNvbnZveS9zcmMvanMvYXBwL3NlcnZpY2VzL1ByZWxvYWRlci5qcyIsIi9Vc2Vycy9wYW5hZ2lvdGlzdGhvbW9nbG91L1Byb2plY3RzL2tiYi1jb252b3kvc3JjL2pzL2FwcC9zZXJ2aWNlcy9Sb3V0ZXIuanMiLCIvVXNlcnMvcGFuYWdpb3Rpc3Rob21vZ2xvdS9Qcm9qZWN0cy9rYmItY29udm95L3NyYy9qcy9hcHAvc3RvcmVzL0FwcFN0b3JlLmpzIiwiL1VzZXJzL3BhbmFnaW90aXN0aG9tb2dsb3UvUHJvamVjdHMva2JiLWNvbnZveS9zcmMvanMvYXBwL3V0aWxzL1V0aWxzLmpzIiwiL1VzZXJzL3BhbmFnaW90aXN0aG9tb2dsb3UvUHJvamVjdHMva2JiLWNvbnZveS9zcmMvanMvYXBwL3V0aWxzL3JhZi5qcyIsIi9Vc2Vycy9wYW5hZ2lvdGlzdGhvbW9nbG91L1Byb2plY3RzL2tiYi1jb252b3kvc3JjL2pzL3BhZ2VyL2NvbXBvbmVudHMvQmFzZUNvbXBvbmVudC5qcyIsInd3dy9kYXRhL2RhdGEuanNvbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O3dCQ0dxQixVQUFVOzs7O3FCQUNiLE9BQU87Ozs7bUJBQ1QsS0FBSzs7OztvQkFDQSxNQUFNOzs7O21CQUNYLEtBQUs7Ozs7NEJBQ0ksZUFBZTs7Ozt1QkFDeEIsVUFBVTs7OztBQVIxQixJQUFLLENBQUUsTUFBTSxDQUFDLE9BQU8sRUFBRyxPQUFPLEdBQUcsRUFBRSxHQUFHLEVBQUUsZUFBVSxFQUFFLEVBQUUsQ0FBQzs7QUFVeEQsSUFBSSxFQUFFLEdBQUcsOEJBQWlCLE1BQU0sQ0FBQyxTQUFTLENBQUMs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bUIsZ0NBQUcsRUFDdEI7OztRQTFDSSxhQUFhOzs7cUJBNkNKLGFBQWE7Ozs7QUNoRDVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy8gQXZvaWQgY29uc29sZSBlcnJvcnMgZm9yIHRoZSBJRSBjcmFwcHkgYnJvd3NlcnNcbmlmICggISB3aW5kb3cuY29uc29sZSApIGNvbnNvbGUgPSB7IGxvZzogZnVuY3Rpb24oKXt9IH07XG5cbmltcG9ydCBBcHBTdG9yZSBmcm9tICdBcHBTdG9yZSdcbmltcG9ydCBVdGlscyBmcm9tICdVdGlscydcbmltcG9ydCBBcHAgZnJvbSAnQXBwJ1xuaW1wb3J0IFR3ZWVuTWF4IGZyb20gJ2dzYXAnXG5pbXBvcnQgcmFmIGZyb20gJ3JhZidcbmltcG9ydCBNb2JpbGVEZXRlY3QgZnJvbSAnbW9iaWxlLWRldGVjdCdcbmltcG9ydCBkb20gZnJvbSAnZG9tLWhhbmQnXG5cbnZhciBtZCA9IG5ldyBNb2JpbGVEZXRlY3Qod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQpXG5cbkFwcFN0b3JlLkRldGVjdG9yLmlzU2FmYXJpID0gKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignU2FmYXJpJykgIT0gLTEgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdDaHJvbWUnKSA9PSAtMSlcbkFwcFN0b3JlLkRldGVjdG9yLmlzRmlyZWZveCA9IG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5pbmRleE9mKCdmaXJlZm94JykgIT0gLTFcbkFwcFN0b3JlLkRldGVjdG9yLmlzTW9iaWxlID0gKG1kLm1vYmlsZSgpIHx8IG1kLnRhYmxldCgpKSA/IHRydWUgOiBmYWxzZVxuQXBwU3RvcmUuUGFyZW50ID0gZG9tLnNlbGVjdCgnI2FwcC1jb250YWluZXInKVxuQXBwU3RvcmUuRGV0ZWN0b3Iub2xkSUUgPSBkb20uY2xhc3Nlcy5jb250YWlucyhBcHBTdG9yZS5QYXJlbnQsICdpZTYnKSB8fCBkb20uY2xhc3Nlcy5jb250YWlucyhBcHBTdG9yZS5QYXJlbnQsICdpZTcnKSB8fCBkb20uY2xhc3Nlcy5jb250YWlucyhBcHBTdG9yZS5QYXJlbnQsICdpZTgnKVxuQXBwU3RvcmUuRGV0ZWN0b3IuaXNTdXBwb3J0V2ViR0wgPSBVdGlscy5TdXBwb3J0V2ViR0woKVxuaWYoQXBwU3RvcmUuRGV0ZWN0b3Iub2xkSUUpIEFwcFN0b3JlLkRldGVjdG9yLmlzTW9iaWxlID0gdHJ1ZVxuXG52YXIgYXBwID0gbmV3IEFwcCgpXHRcblxuYXBwLmluaXQoKVxuXG4iLCJpbXBvcnQgQXBwU3RvcmUgZnJvbSAnQXBwU3RvcmUnXG5pbXBvcnQgQXBwQWN0aW9ucyBmcm9tICdBcHBBY3Rpb25zJ1xuaW1wb3J0IEFwcFRlbXBsYXRlIGZyb20gJ0FwcFRlbXBsYXRlJ1xuaW1wb3J0IFJvdXRlciBmcm9tICdSb3V0ZXInXG5pbXBvcnQgR0V2ZW50cyBmcm9tICdHbG9iYWxFdmVudHMnXG5pbXBvcnQgUHJlbG9hZGVyIGZyb20gJ1ByZWxvYWRlcidcbmltcG9ydCBBcHBDb25zdGFudHMgZnJvbSAnQXBwQ29uc3RhbnRzJ1xuaW1wb3J0IGRvbSBmcm9tICdkb20taGFuZCdcblxuY2xhc3MgQXBwIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy5vbkFwcFJlYWR5ID0gdGhpcy5vbkFwcFJlYWR5LmJpbmQodGhpcylcblx0XHR0aGlzLmxvYWRNYWluQXNzZXRzID0gdGhpcy5sb2FkTWFpbkFzc2V0cy5iaW5kKHRoaXMpXG5cdH1cblx0aW5pdCgpIHtcblxuXHRcdE1hdGgucmFkaWFucyA9IGZ1bmN0aW9uKGRlZ3JlZXMpIHtcblx0XHRcdHJldHVybiBkZWdyZWVzICogTWF0aC5QSSAvIDE4MDtcblx0XHR9O1xuXHRcdCBcblx0XHQvLyBDb252ZXJ0cyBmcm9tIHJhZGlhbnMgdG8gZGVncmVlcy5cblx0XHRNYXRoLmRlZ3JlZXMgPSBmdW5jdGlvbihyYWRpYW5zKSB7XG5cdFx0XHRyZXR1cm4gcmFkaWFucyAqIDE4MCAvIE1hdGguUEk7XG5cdFx0fTtcblxuXHRcdC8vIEluaXQgcm91dGVyXG5cdFx0dGhpcy5yb3V0ZXIgPSBuZXcgUm91dGVyKClcblx0XHR0aGlzLnJvdXRlci5pbml0KClcblxuXHRcdEFwcFN0b3JlLlByZWxvYWRlciA9IG5ldyBQcmVsb2FkZXIoKVxuXG5cdFx0Ly8gSW5pdCBnbG9iYWwgZXZlbnRzXG5cdFx0d2luZG93Lkdsb2JhbEV2ZW50cyA9IG5ldyBHRXZlbnRzKClcblx0XHRHbG9iYWxFdmVudHMuaW5pdCgpXG5cblx0XHR2YXIgYXBwVGVtcGxhdGUgPSBuZXcgQXBwVGVtcGxhdGUoKVxuXHRcdGFwcFRlbXBsYXRlLmlzUmVhZHkgPSB0aGlzLmxvYWRNYWluQXNzZXRzXG5cdFx0YXBwVGVtcGxhdGUucmVuZGVyKCcjYXBwLWNvbnRhaW5lcicpXG5cblx0XHQvLyBTdGFydCByb3V0aW5nXG5cdFx0dGhpcy5yb3V0ZXIuYmVnaW5Sb3V0aW5nKClcblx0fVxuXHRsb2FkTWFpbkFzc2V0cygpIHtcblx0XHR0aGlzLm9uQXBwUmVhZHkoKVxuXHR9XG5cdG9uQXBwUmVhZHkoKSB7XG5cdFx0QXBwQWN0aW9ucy5hcHBTdGFydCgpXG5cdFx0QXBwQWN0aW9ucy5wYWdlSGFzaGVyQ2hhbmdlZCgpXG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXBwXG4gICAgXHRcbiIsImltcG9ydCBCYXNlQ29tcG9uZW50IGZyb20gJ0Jhc2VDb21wb25lbnQnXG5pbXBvcnQgQXBwU3RvcmUgZnJvbSAnQXBwU3RvcmUnXG5pbXBvcnQgQXBwQ29uc3RhbnRzIGZyb20gJ0FwcENvbnN0YW50cydcbmltcG9ydCBBcHBBY3Rpb25zIGZyb20gJ0FwcEFjdGlvbnMnXG5pbXBvcnQgZG9tIGZyb20gJ2RvbS1oYW5kJ1xuaW1wb3J0IE1hdGVyaWFscyBmcm9tICdNYXRlcmlhbHMnXG5pbXBvcnQgVXRpbHMgZnJvbSAnVXRpbHMnXG5pbXBvcnQgR1VJIGZyb20gJ0dVSSdcbmltcG9ydCBNZWF0UGFydGljbGVzIGZyb20gJ01lYXRQYXJ0aWNsZXMnXG5cbmNsYXNzIEFwcFRlbXBsYXRlIGV4dGVuZHMgQmFzZUNvbXBvbmVudCB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKClcblx0XHR0aGlzLnJlc2l6ZSA9IHRoaXMucmVzaXplLmJpbmQodGhpcylcblx0XHR0aGlzLmFuaW1hdGUgPSB0aGlzLmFuaW1hdGUuYmluZCh0aGlzKVxuXHRcdHRoaXMubW91c2VNb3ZlID0gdGhpcy5tb3VzZU1vdmUuYmluZCh0aGlzKVxuXHRcdHRoaXMub25HZW9tZXRyeUxvYWRlZCA9IHRoaXMub25HZW9tZXRyeUxvYWRlZC5iaW5kKHRoaXMpXG5cdH1cblx0cmVuZGVyKHBhcmVudCkge1xuXHRcdHN1cGVyLnJlbmRlcignQXBwVGVtcGxhdGUnLCBwYXJlbnQsIHVuZGVmaW5lZClcblx0fVxuXHRjb21wb25lbnREaWRNb3VudCgpIHtcblxuXHRcdEFwcFN0b3JlLm9uKEFwcENvbnN0YW50cy5XSU5ET1dfUkVTSVpFLCB0aGlzLnJlc2l6ZSlcblx0XHRkb20uZXZlbnQod2luZG93LCAnbW91c2Vtb3ZlJywgdGhpcy5tb3VzZU1vdmUpXG5cblx0XHR0aGlzLnNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKCk7XG5cbiAgICAgICAgdGhpcy5jYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoIDc1LCB3aW5kb3cuaW5uZXJXaWR0aCAvIHdpbmRvdy5pbm5lckhlaWdodCwgMSwgMTAwMDAgKTtcbiAgICAgICAgdGhpcy5jYW1lcmEucG9zaXRpb24ueiA9IDgwMDtcblxuICAgICAgICB0aGlzLnJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTaXplKCB3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0ICk7XG4gICAgICAgIGRvbS50cmVlLmFkZCh0aGlzLmVsZW1lbnQsIHRoaXMucmVuZGVyZXIuZG9tRWxlbWVudClcblxuICAgICAgICB0aGlzLnJheWNhc3RlciA9IG5ldyBUSFJFRS5SYXljYXN0ZXIoKTtcbiAgICAgICAgdGhpcy5tb3VzZSA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG4gICAgICAgIHRoaXMuaW50ZXJzZWN0aW9uID0gdW5kZWZpbmVkXG5cbiAgICAgICAgdGhpcy5rZWJhYiA9IG5ldyBUSFJFRS5PYmplY3QzRCgpXG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHRoaXMua2ViYWIpXG5cbiAgICAgICAgdGhpcy5tZWF0UGFydGljbGVzID0gTWVhdFBhcnRpY2xlcyh0aGlzLnNjZW5lKVxuXG4gICAgICAgIHZhciBwbGFuZUdlb21ldHJ5ID0gbmV3IFRIUkVFLlBsYW5lR2VvbWV0cnkoIDEyMDAsIDQwMCwgMTAsIDEwICk7XG4gICAgICAgIC8vIHZhciBwbGFuZVRleHR1cmUgPSBVdGlscy5Mb2FkVGV4dHVyZShcInJlZC1jb2xvci1ncmFkaWVudC13YWxscGFwZXItMy5qcGdcIilcbiAgICAgICAgLy8gdmFyIHBsYW5lVGV4dHVyZSA9IFV0aWxzLkxvYWRUZXh0dXJlKFwibGFuZHNjYXBlLWRlc2VydC1zYW5kLWR1bmUtY2xlYXItc2t5LXNoYWRvdy15ZWxsb3ctbmF0dXJlLTE5MjB4MTIwMC5qcGdcIilcbiAgICAgICAgLy8gdmFyIHBsYW5lVGV4dHVyZSA9IFV0aWxzLkxvYWRUZXh0dXJlKFwiZmx5aW5nLW92ZXItbmFtaWJpYS5qcGdcIilcbiAgICAgICAgdmFyIHBsYW5lVGV4dHVyZSA9IFV0aWxzLkxvYWRUZXh0dXJlKFwiZ3JhZGllbnQtc2t5LTExNzI5NjguanBnXCIpXG4gICAgICAgIC8vIHZhciBwbGFuZVRleHR1cmUgPSBVdGlscy5Mb2FkVGV4dHVyZShcIk1vbm90b25lLVN1bnNldC1Ta3kuanBnXCIpXG4gICAgICAgIHZhciBwbGFuZU1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAgICAgICAgXHRjb2xvcjogMHhmZmZmZmYsXG4gICAgICAgIFx0bWFwOiBwbGFuZVRleHR1cmUsXG4gICAgICAgIFx0c2lkZTogVEhSRUUuRG91YmxlU2lkZVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kID0gbmV3IFRIUkVFLk1lc2gocGxhbmVHZW9tZXRyeSwgcGxhbmVNYXRlcmlhbClcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kLnNjYWxlLnNldCgxMCwgMTAsIDEwKVxuICAgICAgICB0aGlzLmJhY2tncm91bmQucG9zaXRpb24ueiA9IC02MDBcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQodGhpcy5iYWNrZ3JvdW5kKVxuXG4gICAgICAgIHZhciBhbWJpZW50TCA9IG5ldyBUSFJFRS5BbWJpZW50TGlnaHQoIDB4ZmZmZmZmICk7XG5cblx0XHR2YXIgZGlyZWN0aW9uYWxMaWdodCA9IG5ldyBUSFJFRS5EaXJlY3Rpb25hbExpZ2h0KCAweGZmZmZmZiwgMC43ICk7XG5cdFx0ZGlyZWN0aW9uYWxMaWdodC5wb3NpdGlvbi5zZXQoIC00MCwgMTcsIDEwMCApXG5cdFx0R1VJLnNldERpcmVjdGlvbmFsTGlnaHQoJ0EgJywgZGlyZWN0aW9uYWxMaWdodClcblxuXHRcdHZhciBkaXJlY3Rpb25hbExpZ2h0MiA9IG5ldyBUSFJFRS5EaXJlY3Rpb25hbExpZ2h0KCAweGZmZmZmZiwgMS4wICk7XG5cdFx0ZGlyZWN0aW9uYWxMaWdodDIucG9zaXRpb24uc2V0KCAtMTAwLCA3MiwgLTE4IClcblx0XHRHVUkuc2V0RGlyZWN0aW9uYWxMaWdodCgnQiAnLCBkaXJlY3Rpb25hbExpZ2h0MilcblxuXHRcdHZhciBkaXJlY3Rpb25hbExpZ2h0MyA9IG5ldyBUSFJFRS5EaXJlY3Rpb25hbExpZ2h0KCAweGZmZmZmZiwgMS4wICk7XG5cdFx0ZGlyZWN0aW9uYWxMaWdodDMucG9zaXRpb24uc2V0KCAxMDAsIDE3LCAtNTAgKVxuXHRcdEdVSS5zZXREaXJlY3Rpb25hbExpZ2h0KCdDICcsIGRpcmVjdGlvbmFsTGlnaHQzKVxuXG4gICAgICAgIHRoaXMubGlnaHRzID0ge1xuICAgICAgICBcdGFtYmllbnQ6IGFtYmllbnRMLFxuICAgICAgICBcdGRpcjE6IGRpcmVjdGlvbmFsTGlnaHQsXG4gICAgICAgIFx0ZGlyMjogZGlyZWN0aW9uYWxMaWdodDIsXG4gICAgICAgIFx0ZGlyMzogZGlyZWN0aW9uYWxMaWdodDMsXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLmxpZ2h0cy5hbWJpZW50KVxuICAgICAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLmxpZ2h0cy5kaXIxKVxuICAgICAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLmxpZ2h0cy5kaXIyKVxuICAgICAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLmxpZ2h0cy5kaXIzKVxuXG4gICAgICAgIHZhciBtYW5pZmVzdCA9IFtcbiAgICAgICAgXHR7IGlkOiBBcHBDb25zdGFudHMuS0VCQUIuQkFTRSwgc3JjOiBcIm1lc2gva2ViYWJfYmFzZS5qc1wiIH0sXG4gICAgICAgIFx0eyBpZDogQXBwQ29uc3RhbnRzLktFQkFCLlRPTUFUTywgc3JjOiBcIm1lc2gvdG9tYXRvLmpzXCIgfSxcbiAgICAgICAgXHR7IGlkOiBBcHBDb25zdGFudHMuS0VCQUIuU0lMVkVSLCBzcmM6IFwibWVzaC9zaWx2ZXIuanNcIiB9LFxuICAgICAgICBcdHsgaWQ6IEFwcENvbnN0YW50cy5LRUJBQi5QQVJUSUNMRSwgc3JjOiBcIm1lc2gvbWVhdC1wYXJ0aWNsZS5qc1wiIH0sXG4gICAgICAgIF1cbiAgICAgICAgdGhpcy5sb2FkQXNzZXRzKG1hbmlmZXN0KVxuXG4gICAgICAgIHRoaXMuYW5pbWF0ZSgpXG5cdFx0c3VwZXIuY29tcG9uZW50RGlkTW91bnQoKVxuXHR9XG5cdG1vdXNlTW92ZShlKSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHRoaXMubW91c2UueCA9ICggZS5jbGllbnRYIC8gd2luZG93LmlubmVyV2lkdGggKSAqIDIgLSAxO1xuXHRcdHRoaXMubW91c2UueSA9IC0gKCBlLmNsaWVudFkgLyB3aW5kb3cuaW5uZXJIZWlnaHQgKSAqIDIgKyAxO1xuXHR9XG5cdGxvYWRBc3NldHMobWFuaWZlc3QpIHtcblx0XHR2YXIganNvbkxvYWRlciA9IG5ldyBUSFJFRS5KU09OTG9hZGVyKCk7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtYW5pZmVzdC5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGFzc2V0ID0gbWFuaWZlc3RbaV1cblx0XHRcdGpzb25Mb2FkZXIubG9hZCggYXNzZXQuaWQsIGFzc2V0LnNyYywgdGhpcy5vbkdlb21ldHJ5TG9hZGVkICk7XG5cdFx0fTtcblx0fVxuXHRvbkdlb21ldHJ5TG9hZGVkKGlkLCBnZW9tZXRyeSkge1xuXHRcdHN3aXRjaChpZCkge1xuXHRcdFx0Y2FzZSBBcHBDb25zdGFudHMuS0VCQUIuQkFTRTogXG5cdFx0XHRcdHRoaXMuc2V0dXBLZWJhYkJhc2UoZ2VvbWV0cnkpXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRjYXNlIEFwcENvbnN0YW50cy5LRUJBQi5UT01BVE86IFxuXHRcdFx0XHR0aGlzLnNldHVwVG9tYXRvKGdlb21ldHJ5KVxuXHRcdFx0XHRicmVha1xuXHRcdFx0Y2FzZSBBcHBDb25zdGFudHMuS0VCQUIuU0lMVkVSOiBcblx0XHRcdFx0dGhpcy5zZXR1cFNpbHZlckJhc2UoZ2VvbWV0cnkpXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRjYXNlIEFwcENvbnN0YW50cy5LRUJBQi5QQVJUSUNMRTogXG5cdFx0XHRcdHRoaXMubWVhdFBhcnRpY2xlcy5zZXR1cChnZW9tZXRyeSlcblx0XHRcdFx0YnJlYWtcblx0XHR9XG5cdH1cblx0c2NhbGVHZW9tZXRyeU1hdHJpeChnZW9tZXRyeSkge1xuXHRcdGdlb21ldHJ5LmFwcGx5TWF0cml4KCBuZXcgVEhSRUUuTWF0cml4NCgpLm11bHRpcGx5U2NhbGFyKCAwLjUgKSApO1xuXHR9XG5cdHNldHVwS2ViYWJCYXNlKGdlb21ldHJ5KSB7XG5cdFx0dmFyIHRleHR1cmUgPSBVdGlscy5Mb2FkVGV4dHVyZShcIlNoYXdhcm1hLWRpZmYuanBnXCIpXG5cdFx0dmFyIGJ1bXAgPSBVdGlscy5Mb2FkVGV4dHVyZSggXCJTaGF3YXJtYS1idW1wLmpwZ1wiICk7XG5cdFx0dGhpcy5zY2FsZUdlb21ldHJ5TWF0cml4KGdlb21ldHJ5KVxuXHRcdHZhciBkaWZmdXNlQ29sb3IgPSBuZXcgVEhSRUUuQ29sb3IoIDB4ZmZmZmZmIClcblx0XHR2YXIgbWV0YWxuZXNzID0gMC41XG5cdFx0dmFyIHJvdWdobmVzcyA9IDEuMFxuXHRcdHZhciBidW1wU2NhbGUgPSAxXG5cdFx0dmFyIG1hdGVyaWFsID0gTWF0ZXJpYWxzLk1lc2hTdGFuZGFyZE1hdGVyaWFsKCdrZWJhYicsIHtcblx0XHRcdG1hcDogdGV4dHVyZSxcblx0XHRcdGJ1bXBNYXA6IGJ1bXAsXG5cdFx0XHRidW1wU2NhbGU6IGJ1bXBTY2FsZSxcblx0XHRcdGNvbG9yOiBkaWZmdXNlQ29sb3IsXG5cdFx0XHRtZXRhbG5lc3M6IG1ldGFsbmVzcyxcblx0XHRcdHJvdWdobmVzczogcm91Z2huZXNzXG5cdFx0fSApXG5cdFx0dmFyIGhvbGRlciA9IG5ldyBUSFJFRS5PYmplY3QzRCgpXG5cdFx0dmFyIG1lc2ggPSBuZXcgVEhSRUUuTWVzaCggZ2VvbWV0cnksIG1hdGVyaWFsICk7XG5cdFx0dGhpcy5rZWJhYkJhc2UgPSBtZXNoXG5cdFx0dGhpcy5rZWJhYi5hZGQobWVzaClcblx0fVxuXHRzZXR1cFNpbHZlckJhc2UoZ2VvbWV0cnkpIHtcblx0XHR2YXIgdGV4dHVyZSA9IFV0aWxzLkxvYWRUZXh0dXJlKFwiU2hhd2FybWEtZGlmZi5qcGdcIilcblx0XHR2YXIgYnVtcCA9IFV0aWxzLkxvYWRUZXh0dXJlKCBcIlNoYXdhcm1hLWJ1bXAuanBnXCIgKTtcblx0XHR0aGlzLnNjYWxlR2VvbWV0cnlNYXRyaXgoZ2VvbWV0cnkpXG5cdFx0dmFyIGRpZmZ1c2VDb2xvciA9IG5ldyBUSFJFRS5Db2xvciggMHhlMGUwZTAgKVxuXHRcdHZhciBtZXRhbG5lc3MgPSAwLjU2XG5cdFx0dmFyIHJvdWdobmVzcyA9IDAuN1xuXHRcdHZhciBidW1wU2NhbGUgPSAxXG5cdFx0dmFyIG1hdGVyaWFsID0gTWF0ZXJpYWxzLk1lc2hTdGFuZGFyZE1hdGVyaWFsKCdzaWx2ZXInLCB7XG5cdFx0XHRjb2xvcjogZGlmZnVzZUNvbG9yLFxuXHRcdFx0bWV0YWxuZXNzOiBtZXRhbG5lc3MsXG5cdFx0XHRyb3VnaG5lc3M6IHJvdWdobmVzc1xuXHRcdH0gKVxuXHRcdHZhciBob2xkZXIgPSBuZXcgVEhSRUUuT2JqZWN0M0QoKVxuXHRcdHZhciBtZXNoID0gbmV3IFRIUkVFLk1lc2goIGdlb21ldHJ5LCBtYXRlcmlhbCApO1xuXHRcdHRoaXMua2ViYWIuYWRkKG1lc2gpXG5cdH1cblx0c2V0dXBUb21hdG8oZ2VvbWV0cnkpIHtcblx0XHR2YXIgdGV4dHVyZSA9IFV0aWxzLkxvYWRUZXh0dXJlKFwiVG9tYXRvX1NraW4uanBnXCIpXG5cdFx0dmFyIGJ1bXAgPSBVdGlscy5Mb2FkVGV4dHVyZSggXCJUb21hdG9fc2tpbl9idW1wLmpwZ1wiICk7XG5cdFx0dGhpcy5zY2FsZUdlb21ldHJ5TWF0cml4KGdlb21ldHJ5KVxuXHRcdHZhciBkaWZmdXNlQ29sb3IgPSBuZXcgVEhSRUUuQ29sb3IoIDB4ZmZmZmZmIClcblx0XHR2YXIgbWV0YWxuZXNzID0gMC41XG5cdFx0dmFyIHJvdWdobmVzcyA9IDEuMFxuXHRcdHZhciBidW1wU2NhbGUgPSAxXG5cdFx0dmFyIG1hdGVyaWFsID0gTWF0ZXJpYWxzLk1lc2hTdGFuZGFyZE1hdGVyaWFsKCd0b21hdG8nLCB7XG5cdFx0XHRtYXA6IHRleHR1cmUsXG5cdFx0XHRidW1wTWFwOiBidW1wLFxuXHRcdFx0YnVtcFNjYWxlOiBidW1wU2NhbGUsXG5cdFx0XHRjb2xvcjogZGlmZnVzZUNvbG9yLFxuXHRcdFx0bWV0YWxuZXNzOiBtZXRhbG5lc3MsXG5cdFx0XHRyb3VnaG5lc3M6IHJvdWdobmVzc1xuXHRcdH0gKVxuXHRcdHZhciBob2xkZXIgPSBuZXcgVEhSRUUuT2JqZWN0M0QoKVxuXHRcdHZhciBtZXNoID0gbmV3IFRIUkVFLk1lc2goIGdlb21ldHJ5LCBtYXRlcmlhbCApO1xuXHRcdHRoaXMua2ViYWIuYWRkKG1lc2gpXG5cdH1cblx0YW5pbWF0ZSgpIHtcblx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5hbmltYXRlKVxuXG4gICAgICAgIHRoaXMua2ViYWIucm90YXRpb24ueSArPSAwLjAwNlxuXG4gICAgICAgIHRoaXMucmF5Y2FzdGVyLnNldEZyb21DYW1lcmEoIHRoaXMubW91c2UsIHRoaXMuY2FtZXJhICk7XG5cblxuICAgICAgICBpZih0aGlzLmtlYmFiQmFzZSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgXHR2YXIgaW50ZXJzZWN0aW9ucyA9IHRoaXMucmF5Y2FzdGVyLmludGVyc2VjdE9iamVjdHMoIFt0aGlzLmtlYmFiQmFzZV0gKTtcbiAgICAgICAgXHR0aGlzLmludGVyc2VjdGlvbiA9ICggaW50ZXJzZWN0aW9ucy5sZW5ndGggKSA+IDAgPyBpbnRlcnNlY3Rpb25zWyAwIF0gOiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tZWF0UGFydGljbGVzLnVwZGF0ZSh0aGlzLmludGVyc2VjdGlvbilcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXIoIHRoaXMuc2NlbmUsIHRoaXMuY2FtZXJhICk7XG5cdH1cblx0cmVzaXplKCkge1xuXHRcdHRoaXMuY2FtZXJhLmFzcGVjdCA9IHdpbmRvdy5pbm5lcldpZHRoIC8gd2luZG93LmlubmVySGVpZ2h0O1xuXHQgICAgdGhpcy5jYW1lcmEudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuXHQgICAgdGhpcy5yZW5kZXJlci5zZXRTaXplKCB3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0ICk7XG5cblx0XHRzdXBlci5yZXNpemUoKVxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFwcFRlbXBsYXRlXG5cbiIsImltcG9ydCBBcHBDb25zdGFudHMgZnJvbSAnQXBwQ29uc3RhbnRzJ1xuaW1wb3J0IEFwcERpc3BhdGNoZXIgZnJvbSAnQXBwRGlzcGF0Y2hlcidcbmltcG9ydCBBcHBTdG9yZSBmcm9tICdBcHBTdG9yZSdcblxuZnVuY3Rpb24gX3Byb2NlZWRUcmFuc2l0aW9uSW5BY3Rpb24ocGFnZUlkKSB7XG4gICAgQXBwRGlzcGF0Y2hlci5oYW5kbGVWaWV3QWN0aW9uKHtcbiAgICAgICAgYWN0aW9uVHlwZTogQXBwQ29uc3RhbnRzLlBBR0VfQVNTRVRTX0xPQURFRCxcbiAgICAgICAgaXRlbTogcGFnZUlkXG4gICAgfSkgIFxufVxuXG52YXIgQXBwQWN0aW9ucyA9IHtcbiAgICBwYWdlSGFzaGVyQ2hhbmdlZDogZnVuY3Rpb24ocGFnZUlkKSB7XG4gICAgICAgIEFwcERpc3BhdGNoZXIuaGFuZGxlVmlld0FjdGlvbih7XG4gICAgICAgICAgICBhY3Rpb25UeXBlOiBBcHBDb25zdGFudHMuUEFHRV9IQVNIRVJfQ0hBTkdFRCxcbiAgICAgICAgICAgIGl0ZW06IHBhZ2VJZFxuICAgICAgICB9KVxuICAgIH0sXG4gICAgbG9hZFBhZ2VBc3NldHM6IGZ1bmN0aW9uKHBhZ2VJZCkge1xuICAgICAgICB2YXIgbWFuaWZlc3QgPSBBcHBTdG9yZS5wYWdlQXNzZXRzVG9Mb2FkKClcbiAgICAgICAgaWYobWFuaWZlc3QubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgX3Byb2NlZWRUcmFuc2l0aW9uSW5BY3Rpb24ocGFnZUlkKVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIEFwcFN0b3JlLlByZWxvYWRlci5sb2FkKG1hbmlmZXN0LCAoKT0+e1xuICAgICAgICAgICAgICAgIF9wcm9jZWVkVHJhbnNpdGlvbkluQWN0aW9uKHBhZ2VJZClcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHdpbmRvd1Jlc2l6ZTogZnVuY3Rpb24od2luZG93Vywgd2luZG93SCkge1xuICAgICAgICBBcHBEaXNwYXRjaGVyLmhhbmRsZVZpZXdBY3Rpb24oe1xuICAgICAgICAgICAgYWN0aW9uVHlwZTogQXBwQ29uc3RhbnRzLldJTkRPV19SRVNJWkUsXG4gICAgICAgICAgICBpdGVtOiB7IHdpbmRvd1c6d2luZG93Vywgd2luZG93SDp3aW5kb3dIIH1cbiAgICAgICAgfSlcbiAgICB9LFxuICAgIHB4Q29udGFpbmVySXNSZWFkeTogZnVuY3Rpb24oY29tcG9uZW50KSB7XG4gICAgICAgIEFwcERpc3BhdGNoZXIuaGFuZGxlVmlld0FjdGlvbih7XG4gICAgICAgICAgICBhY3Rpb25UeXBlOiBBcHBDb25zdGFudHMuUFhfQ09OVEFJTkVSX0lTX1JFQURZLFxuICAgICAgICAgICAgaXRlbTogY29tcG9uZW50XG4gICAgICAgIH0pICAgICAgICAgICAgXG4gICAgfSxcbiAgICBweEFkZENoaWxkOiBmdW5jdGlvbihjaGlsZCkge1xuICAgICAgICBBcHBEaXNwYXRjaGVyLmhhbmRsZVZpZXdBY3Rpb24oe1xuICAgICAgICAgICAgYWN0aW9uVHlwZTogQXBwQ29uc3RhbnRzLlBYX0NPTlRBSU5FUl9BRERfQ0hJTEQsXG4gICAgICAgICAgICBpdGVtOiBjaGlsZFxuICAgICAgICB9KSAgICAgICAgICAgIFxuICAgIH0sXG4gICAgcHhSZW1vdmVDaGlsZDogZnVuY3Rpb24oY2hpbGQpIHtcbiAgICAgICAgQXBwRGlzcGF0Y2hlci5oYW5kbGVWaWV3QWN0aW9uKHtcbiAgICAgICAgICAgIGFjdGlvblR5cGU6IEFwcENvbnN0YW50cy5QWF9DT05UQUlORVJfUkVNT1ZFX0NISUxELFxuICAgICAgICAgICAgaXRlbTogY2hpbGRcbiAgICAgICAgfSkgICAgICAgICAgICBcbiAgICB9LFxuICAgIG9wZW5GdW5GYWN0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgQXBwRGlzcGF0Y2hlci5oYW5kbGVWaWV3QWN0aW9uKHtcbiAgICAgICAgICAgIGFjdGlvblR5cGU6IEFwcENvbnN0YW50cy5PUEVOX0ZVTl9GQUNULFxuICAgICAgICAgICAgaXRlbTogdW5kZWZpbmVkXG4gICAgICAgIH0pXG4gICAgfSxcbiAgICBjbG9zZUZ1bkZhY3Q6IGZ1bmN0aW9uKCkge1xuICAgICAgICBBcHBEaXNwYXRjaGVyLmhhbmRsZVZpZXdBY3Rpb24oe1xuICAgICAgICAgICAgYWN0aW9uVHlwZTogQXBwQ29uc3RhbnRzLkNMT1NFX0ZVTl9GQUNULFxuICAgICAgICAgICAgaXRlbTogdW5kZWZpbmVkXG4gICAgICAgIH0pICBcbiAgICB9LFxuICAgIGNlbGxNb3VzZUVudGVyOiBmdW5jdGlvbihpZCkge1xuICAgICAgICBBcHBEaXNwYXRjaGVyLmhhbmRsZVZpZXdBY3Rpb24oe1xuICAgICAgICAgICAgYWN0aW9uVHlwZTogQXBwQ29uc3RhbnRzLkNFTExfTU9VU0VfRU5URVIsXG4gICAgICAgICAgICBpdGVtOiBpZFxuICAgICAgICB9KSBcbiAgICB9LFxuICAgIGNlbGxNb3VzZUxlYXZlOiBmdW5jdGlvbihpZCkge1xuICAgICAgICBBcHBEaXNwYXRjaGVyLmhhbmRsZVZpZXdBY3Rpb24oe1xuICAgICAgICAgICAgYWN0aW9uVHlwZTogQXBwQ29uc3RhbnRzLkNFTExfTU9VU0VfTEVBVkUsXG4gICAgICAgICAgICBpdGVtOiBpZFxuICAgICAgICB9KVxuICAgIH0sXG4gICAgb3BlbkZlZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBBcHBEaXNwYXRjaGVyLmhhbmRsZVZpZXdBY3Rpb24oe1xuICAgICAgICAgICAgYWN0aW9uVHlwZTogQXBwQ29uc3RhbnRzLk9QRU5fRkVFRCxcbiAgICAgICAgICAgIGl0ZW06IHVuZGVmaW5lZFxuICAgICAgICB9KSAgXG4gICAgfSxcbiAgICBvcGVuR3JpZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIEFwcERpc3BhdGNoZXIuaGFuZGxlVmlld0FjdGlvbih7XG4gICAgICAgICAgICBhY3Rpb25UeXBlOiBBcHBDb25zdGFudHMuT1BFTl9HUklELFxuICAgICAgICAgICAgaXRlbTogdW5kZWZpbmVkXG4gICAgICAgIH0pICBcbiAgICB9LFxuICAgIGFwcFN0YXJ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgQXBwRGlzcGF0Y2hlci5oYW5kbGVWaWV3QWN0aW9uKHtcbiAgICAgICAgICAgIGFjdGlvblR5cGU6IEFwcENvbnN0YW50cy5BUFBfU1RBUlQsXG4gICAgICAgICAgICBpdGVtOiB1bmRlZmluZWRcbiAgICAgICAgfSkgICAgXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBcHBBY3Rpb25zXG5cblxuICAgICAgXG4iLCJpbXBvcnQgR1VJQ29udHJvbGxlciBmcm9tICdHVUlDb250cm9sbGVyJ1xuXG5mdW5jdGlvbiBfZ2V0R1VJKCkge1xuXHRpZihHVUkuZ3VpID09IHVuZGVmaW5lZCkge1xuXHRcdEdVSS5ndWkgPSBuZXcgZGF0LkdVSSgpO1xuXHRcdHJldHVybiBHVUkuZ3VpXG5cdH1lbHNle1xuXHRcdHJldHVybiBHVUkuZ3VpXG5cdH1cbn1cblxudmFyIEdVSSA9IHtcblx0Z3VpOiB1bmRlZmluZWQsXG5cdHNldFN0YW5kYXJkTWF0ZXJpYWw6IGZ1bmN0aW9uKGlkLCBtYXRlcmlhbCkge1xuXHRcdC8vIHZhciBndWkgPSBfZ2V0R1VJKClcblx0XHQvLyB2YXIgZm9sZGVyID0gZ3VpLmFkZEZvbGRlcihpZCArICcgU3RhbmRhcmRNYXRlcmlhbCcpO1xuXHRcdC8vIG5ldyBHVUlDb250cm9sbGVyKGZvbGRlciwgbWF0ZXJpYWwsICdtZXRhbG5lc3MnLCB7IGZyb206IDAsIHRvOiAzIH0pXG5cdFx0Ly8gbmV3IEdVSUNvbnRyb2xsZXIoZm9sZGVyLCBtYXRlcmlhbCwgJ3JvdWdobmVzcycsIHsgZnJvbTogMCwgdG86IDMgfSlcblx0XHQvLyBuZXcgR1VJQ29udHJvbGxlcihmb2xkZXIsIG1hdGVyaWFsLCAnYnVtcFNjYWxlJywgeyBmcm9tOiAwLCB0bzogMyB9KVxuXHRcdC8vIG5ldyBHVUlDb250cm9sbGVyKGZvbGRlciwgbWF0ZXJpYWwsICdjb2xvcicsIHsgY29sb3I6IFsgMCwgMCwgMCBdIH0pXG5cdFx0Ly8gbmV3IEdVSUNvbnRyb2xsZXIoZm9sZGVyLCBtYXRlcmlhbCwgJ2VtaXNzaXZlJywgeyBjb2xvcjogWyAwLCAwLCAwIF0gfSlcblx0XHQvLyBmb2xkZXIub3BlbigpXG5cdH0sXG5cdHNldFBob25nTWF0ZXJpYWw6IGZ1bmN0aW9uKGlkLCBtYXRlcmlhbCkge1xuXHRcdC8vIHZhciBndWkgPSBfZ2V0R1VJKClcblx0XHQvLyB2YXIgZm9sZGVyID0gZ3VpLmFkZEZvbGRlcihpZCArICcgUGhvbmdNYXRlcmlhbCcpO1xuXHRcdC8vIG5ldyBHVUlDb250cm9sbGVyKGZvbGRlciwgbWF0ZXJpYWwsICdzaGluaW5lc3MnLCB7IGZyb206IDAsIHRvOiA1MCB9KVxuXHRcdC8vIG5ldyBHVUlDb250cm9sbGVyKGZvbGRlciwgbWF0ZXJpYWwsICdyZWZsZWN0aXZpdHknLCB7IGZyb206IDAsIHRvOiA1IH0pXG5cdFx0Ly8gbmV3IEdVSUNvbnRyb2xsZXIoZm9sZGVyLCBtYXRlcmlhbCwgJ2NvbG9yJywgeyBjb2xvcjogWyAwLCAwLCAwIF0gfSlcblx0XHQvLyBuZXcgR1VJQ29udHJvbGxlcihmb2xkZXIsIG1hdGVyaWFsLCAnZW1pc3NpdmUnLCB7IGNvbG9yOiBbIDAsIDAsIDAgXSB9KVxuXHRcdC8vIG5ldyBHVUlDb250cm9sbGVyKGZvbGRlciwgbWF0ZXJpYWwsICdzcGVjdWxhcicsIHsgY29sb3I6IFsgMCwgMCwgMCBdIH0pXG5cdFx0Ly8gZm9sZGVyLm9wZW4oKVxuXHR9LFxuXHRzZXREaXJlY3Rpb25hbExpZ2h0OiBmdW5jdGlvbihpZCwgbGlnaHQpIHtcblx0XHQvLyB2YXIgZ3VpID0gX2dldEdVSSgpXG5cdFx0Ly8gdmFyIGZvbGRlciA9IGd1aS5hZGRGb2xkZXIoaWQgKyAnIERpcmVjdGlvbmFsTGlnaHQnKTtcblx0XHQvLyBuZXcgR1VJQ29udHJvbGxlcihmb2xkZXIsIGxpZ2h0LCAncG9zaXRpb24nLCB7IHg6MTAwLCB5OjEwMCwgejoxMDAgfSlcblx0XHQvLyBuZXcgR1VJQ29udHJvbGxlcihmb2xkZXIsIGxpZ2h0LCAnaW50ZW5zaXR5JywgeyBmcm9tOiAwLCB0bzogNTAgfSlcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBHVUkiLCJpbXBvcnQgVXRpbHMgZnJvbSAnVXRpbHMnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdVSUNvbnRyb2xsZXIge1xuXHRjb25zdHJ1Y3Rvcihmb2xkZXIsIHByb3BzLCBpZCwgdmFycykge1xuXHRcdHRoaXMucHJvcHMgPSBwcm9wc1xuXHRcdHRoaXMuaWQgPSBpZFxuXG5cdFx0aWYodmFycy5mcm9tICE9IHVuZGVmaW5lZCAmJiB2YXJzLnRvICE9IHVuZGVmaW5lZCkge1xuXHRcdFx0dmFyIGNvbnRyb2xsZXIgPSBmb2xkZXIuYWRkKHByb3BzLCBpZCwgdmFycy5mcm9tLCB2YXJzLnRvKTtcblx0XHRcdGNvbnRyb2xsZXIub25DaGFuZ2UoKHZhbHVlKT0+IHtcblx0XHRcdFx0cHJvcHNbaWRdID0gdmFsdWVcblx0XHRcdH0pXG5cdFx0fWVsc2UgaWYodmFycy5jb2xvciAhPSB1bmRlZmluZWQpIHtcblx0XHRcdHZhciBjb250cm9sbGVyID0gZm9sZGVyLmFkZENvbG9yKHByb3BzLCBpZCwgdmFycy5jb2xvcik7XG5cdFx0XHRjb250cm9sbGVyLm9uQ2hhbmdlKCh2YWx1ZSk9PiB7XG5cdFx0XHRcdHZhciBoZXggPSBVdGlscy5yZ2JUb0hleChNYXRoLnJvdW5kKHZhbHVlLnIpLCBNYXRoLnJvdW5kKHZhbHVlLmcpLCBNYXRoLnJvdW5kKHZhbHVlLmIpKVxuXHRcdFx0XHR2YXIgY29sb3IgPSBuZXcgVEhSRUUuQ29sb3IoaGV4KVxuXHRcdFx0XHRwcm9wc1tpZF0gPSBjb2xvclxuXHRcdFx0XHRjb25zb2xlLmxvZyhpZCwgaGV4KVxuXHRcdFx0fSlcblx0XHR9ZWxzZSBpZih2YXJzLnggIT0gdW5kZWZpbmVkICYmIHZhcnMueSAhPSB1bmRlZmluZWQgJiYgdmFycy56ICE9IHVuZGVmaW5lZCkge1xuXHRcdFx0Zm9sZGVyLmFkZChwcm9wcy5wb3NpdGlvbiwgJ3gnLCAtdmFycy54LCB2YXJzLngpO1xuXHRcdFx0Zm9sZGVyLmFkZChwcm9wcy5wb3NpdGlvbiwgJ3knLCAtdmFycy55LCB2YXJzLnkpO1xuXHRcdFx0Zm9sZGVyLmFkZChwcm9wcy5wb3NpdGlvbiwgJ3onLCAtdmFycy56LCB2YXJzLnopO1xuXHRcdH1cblxuXHR9XG5cdGFkZFZhbHVlKCkge1xuXG5cdH1cbn1cbiIsImltcG9ydCBHVUkgZnJvbSAnR1VJJ1xuXG5mdW5jdGlvbiBfY2hlY2tTaGFkaW5nKHByb3BzKSB7XG5cdHZhciBzaGFkaW5nID0gcHJvcHMuc2hhZGluZyB8fCBUSFJFRS5TbW9vdGhTaGFkaW5nXG5cdHByb3BzLnNoYWRpbmcgPSBzaGFkaW5nXG59XG5cbnZhciBNYXRlcmlhbHMgPSB7XG5cdE1lc2hTdGFuZGFyZE1hdGVyaWFsOiBmdW5jdGlvbihpZCwgcHJvcHMpIHtcblx0XHRfY2hlY2tTaGFkaW5nKHByb3BzKVxuXHRcdHZhciBtYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoU3RhbmRhcmRNYXRlcmlhbCggcHJvcHMgKVxuXHRcdEdVSS5zZXRTdGFuZGFyZE1hdGVyaWFsKGlkLCBtYXRlcmlhbClcblx0XHRyZXR1cm4gbWF0ZXJpYWxcblx0fSxcblx0TWVzaFBob25nTWF0ZXJpYWw6IGZ1bmN0aW9uKGlkLCBwcm9wcykge1xuXHRcdF9jaGVja1NoYWRpbmcocHJvcHMpXG5cdFx0dmFyIG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hQaG9uZ01hdGVyaWFsKCBwcm9wcyApXG5cdFx0R1VJLnNldFBob25nTWF0ZXJpYWwoaWQsIG1hdGVyaWFsKVxuXHRcdHJldHVybiBtYXRlcmlhbFxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1hdGVyaWFscyIsImltcG9ydCBVdGlscyBmcm9tICdVdGlscydcblxuZXhwb3J0IGRlZmF1bHQgKGNvbnRhaW5lcik9PiB7XG5cdHZhciBzY29wZTtcblx0XG5cdHZhciB0ZXh0dXJlID0gVXRpbHMuTG9hZFRleHR1cmUoXCJTaGF3YXJtYS1kaWZmLmpwZ1wiKVxuXHR2YXIgZGlmZnVzZUNvbG9yID0gbmV3IFRIUkVFLkNvbG9yKCAweGZmZmZmZiApXG5cdHZhciBtZXRhbG5lc3MgPSAwLjVcblx0dmFyIHJvdWdobmVzcyA9IDEuMFxuXHR2YXIgbWVzaDtcblx0dmFyIG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsKHtcblx0XHRtYXA6IHRleHR1cmUsXG5cdFx0Y29sb3I6IGRpZmZ1c2VDb2xvcixcblx0XHRtZXRhbG5lc3M6IG1ldGFsbmVzcyxcblx0XHRyb3VnaG5lc3M6IHJvdWdobmVzc1xuXHR9KVxuXG5cdHNjb3BlID0ge1xuXHRcdGNyZWF0ZTogKGdlb21ldHJ5LCBwYXJlbnQpID0+IHtcblx0XHRcdG1lc2ggPSBuZXcgVEhSRUUuTWVzaCgpXG5cdFx0XHRtZXNoLmdlb21ldHJ5ID0gZ2VvbWV0cnlcblx0XHRcdG1lc2gubWF0ZXJpYWwgPSBtYXRlcmlhbFxuXHRcdFx0bWVzaC5wb3NpdGlvbi54ID0gMzAwXG5cdFx0XHRwYXJlbnQuYWRkKG1lc2gpXG5cdFx0XHRyZXR1cm4gbWVzaFxuXHRcdH0sXG5cdFx0dXBkYXRlOiAoKT0+IHtcblx0XHRcdC8vIGlmKG1lc2gpXG5cdFx0XHQvLyBtZXNoLnBvc2l0aW9uLnNldChzY29wZS5wb3NpdGlvbi54LCBzY29wZS5wb3NpdGlvbi55LCBzY29wZS5wb3NpdGlvbi56KVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBzY29wZVxufSIsImltcG9ydCBNZWF0UGFydGljbGUgZnJvbSAnTWVhdFBhcnRpY2xlJ1xuaW1wb3J0IFV0aWxzIGZyb20gJ1V0aWxzJ1xuXG5leHBvcnQgZGVmYXVsdCAoY29udGFpbmVyKT0+IHtcblx0dmFyIHNjb3BlO1xuXHR2YXIgcGFydGljbGUgPSBNZWF0UGFydGljbGUoKVxuXHR2YXIgcGFyZW50ID0gbmV3IFRIUkVFLk9iamVjdDNEKClcblx0dmFyIGludGVyc2VjdGlvbjtcblxuXHRjb250YWluZXIuYWRkKHBhcmVudClcblxuXHRzY29wZSA9IHtcblx0XHRwYXJ0aWNsZXM6IFtdLFxuXHRcdHVwZGF0ZTogKGludGVyKT0+IHtcblx0XHRcdGludGVyc2VjdGlvbiA9IGludGVyXG5cdFx0XHRmb3IgKGxldCBwIG9mIHNjb3BlLnBhcnRpY2xlcykge1xuXHRcdFx0XHRwLnBvc2l0aW9uLnkgLT0gcC5mb3JjZVxuXHRcdFx0XHRwLnJvdGF0aW9uLnggKz0gMC4wMDVcblx0XHRcdFx0cC5yb3RhdGlvbi55ICs9IDAuMDA2XG5cdFx0XHRcdHAucm90YXRpb24ueiArPSAwLjAwOFxuXG5cdFx0XHRcdGlmKHAucG9zaXRpb24ueSA8IC03MDApIHtcblx0XHRcdFx0XHRzY29wZS5yZXNldChwKVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRyZXNldDogKHApPT4ge1xuXG5cdFx0XHRpZihpbnRlcnNlY3Rpb24pIHtcblx0XHRcdFx0cC5wb3NpdGlvbi54ID0gaW50ZXJzZWN0aW9uLnBvaW50Lnhcblx0XHRcdFx0cC5wb3NpdGlvbi55ID0gaW50ZXJzZWN0aW9uLnBvaW50Lnlcblx0XHRcdFx0cC5wb3NpdGlvbi56ID0gaW50ZXJzZWN0aW9uLnBvaW50Lnpcblx0XHRcdH1cblxuXHRcdFx0bGV0IHNjYWxlID0gVXRpbHMuUmFuZCgwLjAwMSwgMC4wMDUsIDQpXG5cdFx0XHRwLmZvcmNlID0gVXRpbHMuUmFuZCgzLCAxMiwgMylcblx0XHRcdHAuc2NhbGUuc2V0KHNjYWxlLCBzY2FsZSwgc2NhbGUpXG5cdFx0XHRwLnJvdGF0aW9uLnggPSBNYXRoLnJhZGlhbnMoVXRpbHMuUmFuZCgtMTgwLCAxODAsIDApKVxuXHRcdFx0cC5yb3RhdGlvbi55ID0gTWF0aC5yYWRpYW5zKFV0aWxzLlJhbmQoLTE4MCwgMTgwLCAwKSlcblx0XHRcdHAucm90YXRpb24ueiA9IE1hdGgucmFkaWFucyhVdGlscy5SYW5kKC0xODAsIDE4MCwgMCkpXG5cblx0XHR9LFxuXHRcdHNldHVwOiAoZ2VvbWV0cnkpPT4ge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAxMjA7IGkrKykge1xuXHRcdFx0XHRzY29wZS5wYXJ0aWNsZXNbaV0gPSBwYXJ0aWNsZS5jcmVhdGUoZ2VvbWV0cnksIHBhcmVudClcblx0XHRcdFx0c2NvcGUucmVzZXQoc2NvcGUucGFydGljbGVzW2ldKVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBzY29wZVxufSIsImV4cG9ydCBkZWZhdWx0IHtcblx0V0lORE9XX1JFU0laRTogJ1dJTkRPV19SRVNJWkUnLFxuXHRQQUdFX0hBU0hFUl9DSEFOR0VEOiAnUEFHRV9IQVNIRVJfQ0hBTkdFRCcsXG5cdFBBR0VfQVNTRVRTX0xPQURFRDogJ1BBR0VfQVNTRVRTX0xPQURFRCcsXG5cdEFQUF9TVEFSVDogJ0FQUF9TVEFSVCcsXG5cblx0TEFORFNDQVBFOiAnTEFORFNDQVBFJyxcblx0UE9SVFJBSVQ6ICdQT1JUUkFJVCcsXG5cblx0Rk9SV0FSRDogJ0ZPUldBUkQnLFxuXHRCQUNLV0FSRDogJ0JBQ0tXQVJEJyxcblxuXHRMRUZUOiAnTEVGVCcsXG5cdFJJR0hUOiAnUklHSFQnLFxuXHRUT1A6ICdUT1AnLFxuXHRCT1RUT006ICdCT1RUT00nLFxuXG5cdEtFQkFCOiB7XG5cdFx0QkFTRTogJ0JBU0UnLFxuXHRcdFNJTFZFUjogJ1NJTFZFUicsXG5cdFx0VE9NQVRPOiAnVE9NQVRPJyxcblx0XHRQQVJUSUNMRTogJ1BBUlRJQ0xFJyxcblx0fSxcblxuXHRFTlZJUk9OTUVOVFM6IHtcblx0XHRQUkVQUk9EOiB7XG5cdFx0XHRzdGF0aWM6ICcnXG5cdFx0fSxcblx0XHRQUk9EOiB7XG5cdFx0XHRcInN0YXRpY1wiOiBKU191cmxfc3RhdGljICsgJy8nXG5cdFx0fVxuXHR9LFxuXG5cdE1FRElBX0dMT0JBTF9XOiAxOTIwLFxuXHRNRURJQV9HTE9CQUxfSDogMTA4MCxcblxuXHRNSU5fTUlERExFX1c6IDk2MCxcblx0TVFfWFNNQUxMOiAzMjAsXG5cdE1RX1NNQUxMOiA0ODAsXG5cdE1RX01FRElVTTogNzY4LFxuXHRNUV9MQVJHRTogMTAyNCxcblx0TVFfWExBUkdFOiAxMjgwLFxuXHRNUV9YWExBUkdFOiAxNjgwLFxufSIsImltcG9ydCBGbHV4IGZyb20gJ2ZsdXgnXG5pbXBvcnQgYXNzaWduIGZyb20gJ29iamVjdC1hc3NpZ24nXG5cbnZhciBBcHBEaXNwYXRjaGVyID0gYXNzaWduKG5ldyBGbHV4LkRpc3BhdGNoZXIoKSwge1xuXHRoYW5kbGVWaWV3QWN0aW9uOiBmdW5jdGlvbihhY3Rpb24pIHtcblx0XHR0aGlzLmRpc3BhdGNoKHtcblx0XHRcdHNvdXJjZTogJ1ZJRVdfQUNUSU9OJyxcblx0XHRcdGFjdGlvbjogYWN0aW9uXG5cdFx0fSk7XG5cdH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBBcHBEaXNwYXRjaGVyIiwiaW1wb3J0IEFwcEFjdGlvbnMgZnJvbSAnQXBwQWN0aW9ucydcbmltcG9ydCBkb20gZnJvbSAnZG9tLWhhbmQnXG4gICAgXHRcbmNsYXNzIEdsb2JhbEV2ZW50cyB7XG5cdGluaXQoKSB7XG5cdFx0ZG9tLmV2ZW50Lm9uKHdpbmRvdywgJ3Jlc2l6ZScsIHRoaXMucmVzaXplKVxuXHR9XG5cdHJlc2l6ZSgpIHtcblx0XHRBcHBBY3Rpb25zLndpbmRvd1Jlc2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KVxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdsb2JhbEV2ZW50c1xuIiwiaW1wb3J0IEFwcFN0b3JlIGZyb20gJ0FwcFN0b3JlJ1xuXG5jbGFzcyBQcmVsb2FkZXIgIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy5xdWV1ZSA9IG5ldyBjcmVhdGVqcy5Mb2FkUXVldWUoZmFsc2UpXG5cdFx0dGhpcy5xdWV1ZS5vbihcImNvbXBsZXRlXCIsIHRoaXMub25NYW5pZmVzdExvYWRDb21wbGV0ZWQsIHRoaXMpXG5cdFx0dGhpcy5jdXJyZW50TG9hZGVkQ2FsbGJhY2sgPSB1bmRlZmluZWRcblx0XHR0aGlzLmFsbE1hbmlmZXN0cyA9IFtdXG5cdH1cblx0bG9hZChtYW5pZmVzdCwgb25Mb2FkZWQpIHtcblxuXHRcdGlmKHRoaXMuYWxsTWFuaWZlc3RzLmxlbmd0aCA+IDApIHtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5hbGxNYW5pZmVzdHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0dmFyIG0gPSB0aGlzLmFsbE1hbmlmZXN0c1tpXVxuXHRcdFx0XHRpZihtLmxlbmd0aCA9PSBtYW5pZmVzdC5sZW5ndGggJiYgbVswXS5pZCA9PSBtYW5pZmVzdFswXS5pZCAmJiBtW20ubGVuZ3RoLTFdLmlkID09IG1hbmlmZXN0W21hbmlmZXN0Lmxlbmd0aC0xXS5pZCkge1xuXHRcdFx0XHRcdG9uTG9hZGVkKClcdFxuXHRcdFx0XHRcdHJldHVyblxuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdHRoaXMuYWxsTWFuaWZlc3RzLnB1c2gobWFuaWZlc3QpXG5cdFx0dGhpcy5jdXJyZW50TG9hZGVkQ2FsbGJhY2sgPSBvbkxvYWRlZFxuICAgICAgICB0aGlzLnF1ZXVlLmxvYWRNYW5pZmVzdChtYW5pZmVzdClcblx0fVxuXHRvbk1hbmlmZXN0TG9hZENvbXBsZXRlZCgpIHtcblx0XHR0aGlzLmN1cnJlbnRMb2FkZWRDYWxsYmFjaygpXG5cdH1cblx0Z2V0Q29udGVudEJ5SWQoaWQpIHtcblx0XHRyZXR1cm4gdGhpcy5xdWV1ZS5nZXRSZXN1bHQoaWQpXG5cdH1cblx0Z2V0SW1hZ2VVUkwoaWQpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRDb250ZW50QnlJZChpZCkuZ2V0QXR0cmlidXRlKFwic3JjXCIpXG5cdH1cblx0Z2V0SW1hZ2VTaXplKGlkKSB7XG5cdFx0dmFyIGNvbnRlbnQgPSB0aGlzLmdldENvbnRlbnRCeUlkKGlkKVxuXHRcdHJldHVybiB7IHdpZHRoOiBjb250ZW50Lm5hdHVyYWxXaWR0aCwgaGVpZ2h0OiBjb250ZW50Lm5hdHVyYWxIZWlnaHQgfVxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFByZWxvYWRlclxuIiwiaW1wb3J0IGhhc2hlciBmcm9tICdoYXNoZXInXG5pbXBvcnQgQXBwQWN0aW9ucyBmcm9tICdBcHBBY3Rpb25zJ1xuaW1wb3J0IGNyb3Nzcm9hZHMgZnJvbSAnY3Jvc3Nyb2FkcydcbmltcG9ydCBBcHBTdG9yZSBmcm9tICdBcHBTdG9yZSdcbmltcG9ydCBkYXRhIGZyb20gJ0dsb2JhbERhdGEnXG5pbXBvcnQgQXBwQ29uc3RhbnRzIGZyb20gJ0FwcENvbnN0YW50cydcblxuY2xhc3MgUm91dGVyIHtcblx0aW5pdCgpIHtcblx0XHR0aGlzLnJvdXRpbmcgPSBkYXRhLnJvdXRpbmdcblx0XHR0aGlzLnNldHVwUm91dGVzKClcblx0XHR0aGlzLmZpcnN0UGFzcyA9IHRydWVcblx0XHR0aGlzLm5ld0hhc2hGb3VuZGVkID0gZmFsc2Vcblx0XHRoYXNoZXIubmV3SGFzaCA9IHVuZGVmaW5lZFxuXHRcdGhhc2hlci5vbGRIYXNoID0gdW5kZWZpbmVkXG5cblx0XHQvLyByZW1vdmUgdGhlIGFuYWx5dGljcyBwYXJhbWV0ZXJzXG5cdFx0dmFyIGxvYyA9IEFwcFN0b3JlLkRldGVjdG9yLmlzU2FmYXJpID8gbG9jYXRpb24uaGFzaCA6IHdpbmRvdy5sb2NhdGlvbi5oYXNoXG5cdFx0dmFyIGhhc2ggPSBsb2Muc3BsaXQoJz8nKVxuXHRcdHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gaGFzaFswXVxuXG5cdFx0aGFzaGVyLmluaXRpYWxpemVkLmFkZCh0aGlzLmRpZEhhc2hlckNoYW5nZS5iaW5kKHRoaXMpKVxuXHRcdGhhc2hlci5jaGFuZ2VkLmFkZCh0aGlzLmRpZEhhc2hlckNoYW5nZS5iaW5kKHRoaXMpKVxuXHRcdHRoaXMuc2V0dXBDcm9zc3JvYWRzKClcblx0fVxuXHRiZWdpblJvdXRpbmcoKSB7XG5cdFx0aGFzaGVyLmluaXQoKVxuXHR9XG5cdHNldHVwQ3Jvc3Nyb2FkcygpIHtcblx0IFx0dmFyIHJvdXRlcyA9IGhhc2hlci5yb3V0ZXNcblx0IFx0Zm9yICh2YXIgaSA9IDA7IGkgPCByb3V0ZXMubGVuZ3RoOyBpKyspIHtcblx0IFx0XHR2YXIgcm91dGUgPSByb3V0ZXNbaV1cblx0IFx0XHRjcm9zc3JvYWRzLmFkZFJvdXRlKHJvdXRlLCB0aGlzLm9uUGFyc2VVcmwuYmluZCh0aGlzKSlcblx0IFx0fTtcblx0XHRjcm9zc3JvYWRzLmFkZFJvdXRlKCcnLCB0aGlzLm9uUGFyc2VVcmwuYmluZCh0aGlzKSlcblx0fVxuXHRvblBhcnNlVXJsKCkge1xuXHRcdHRoaXMuYXNzaWduUm91dGUoKVxuXHR9XG5cdG9uRGVmYXVsdFVSTEhhbmRsZXIoKSB7XG5cdFx0dGhpcy5zZW5kVG9EZWZhdWx0KClcblx0fVxuXHRhc3NpZ25Sb3V0ZShpZCkge1xuXHRcdHZhciBoYXNoID0gaGFzaGVyLmdldEhhc2goKVxuXHRcdHZhciBwYXJ0cyA9IHRoaXMuZ2V0VVJMUGFydHMoaGFzaClcblx0XHR0aGlzLnVwZGF0ZVBhZ2VSb3V0ZShoYXNoLCBwYXJ0cywgcGFydHNbMF0sIChwYXJ0c1sxXSA9PSB1bmRlZmluZWQpID8gJycgOiBwYXJ0c1sxXSlcblx0XHR0aGlzLm5ld0hhc2hGb3VuZGVkID0gdHJ1ZVxuXHR9XG5cdGdldFVSTFBhcnRzKHVybCkge1xuXHRcdHZhciBoYXNoID0gdXJsXG5cdFx0cmV0dXJuIGhhc2guc3BsaXQoJy8nKVxuXHR9XG5cdHVwZGF0ZVBhZ2VSb3V0ZShoYXNoLCBwYXJ0cywgcGFyZW50LCB0YXJnZXQpIHtcblx0XHRoYXNoZXIub2xkSGFzaCA9IGhhc2hlci5uZXdIYXNoXG5cdFx0aGFzaGVyLm5ld0hhc2ggPSB7XG5cdFx0XHRoYXNoOiBoYXNoLFxuXHRcdFx0cGFydHM6IHBhcnRzLFxuXHRcdFx0cGFyZW50OiBwYXJlbnQsXG5cdFx0XHR0YXJnZXQ6IHRhcmdldFxuXHRcdH1cblx0XHRoYXNoZXIubmV3SGFzaC50eXBlID0gaGFzaGVyLm5ld0hhc2guaGFzaCA9PSAnJyA/IEFwcENvbnN0YW50cy5IT01FIDogQXBwQ29uc3RhbnRzLkRJUFRZUVVFXG5cdFx0Ly8gSWYgZmlyc3QgcGFzcyBzZW5kIHRoZSBhY3Rpb24gZnJvbSBBcHAuanMgd2hlbiBhbGwgYXNzZXRzIGFyZSByZWFkeVxuXHRcdGlmKHRoaXMuZmlyc3RQYXNzKSB7XG5cdFx0XHR0aGlzLmZpcnN0UGFzcyA9IGZhbHNlXG5cdFx0fWVsc2V7XG5cdFx0XHRBcHBBY3Rpb25zLnBhZ2VIYXNoZXJDaGFuZ2VkKClcblx0XHR9XG5cdH1cblx0ZGlkSGFzaGVyQ2hhbmdlKG5ld0hhc2gsIG9sZEhhc2gpIHtcblx0XHR0aGlzLm5ld0hhc2hGb3VuZGVkID0gZmFsc2Vcblx0XHRjcm9zc3JvYWRzLnBhcnNlKG5ld0hhc2gpXG5cdFx0aWYodGhpcy5uZXdIYXNoRm91bmRlZCkgcmV0dXJuXG5cdFx0Ly8gSWYgVVJMIGRvbid0IG1hdGNoIGEgcGF0dGVybiwgc2VuZCB0byBkZWZhdWx0XG5cdFx0dGhpcy5vbkRlZmF1bHRVUkxIYW5kbGVyKClcblx0fVxuXHRzZW5kVG9EZWZhdWx0KCkge1xuXHRcdGhhc2hlci5zZXRIYXNoKEFwcFN0b3JlLmRlZmF1bHRSb3V0ZSgpKVxuXHR9XG5cdHNldHVwUm91dGVzKCkge1xuXHRcdGhhc2hlci5yb3V0ZXMgPSBbXVxuXHRcdGhhc2hlci5kaXB0eXF1ZVJvdXRlcyA9IFtdXG5cdFx0dmFyIGkgPSAwLCBrO1xuXHRcdGZvcihrIGluIHRoaXMucm91dGluZykge1xuXHRcdFx0aGFzaGVyLnJvdXRlc1tpXSA9IGtcblx0XHRcdGlmKGsubGVuZ3RoID4gMikgaGFzaGVyLmRpcHR5cXVlUm91dGVzLnB1c2goaylcblx0XHRcdGkrK1xuXHRcdH1cblx0fVxuXHRzdGF0aWMgZ2V0QmFzZVVSTCgpIHtcblx0XHRyZXR1cm4gZG9jdW1lbnQuVVJMLnNwbGl0KFwiI1wiKVswXVxuXHR9XG5cdHN0YXRpYyBnZXRIYXNoKCkge1xuXHRcdHJldHVybiBoYXNoZXIuZ2V0SGFzaCgpXG5cdH1cblx0c3RhdGljIGdldFJvdXRlcygpIHtcblx0XHRyZXR1cm4gaGFzaGVyLnJvdXRlc1xuXHR9XG5cdHN0YXRpYyBnZXREaXB0eXF1ZVJvdXRlcygpIHtcblx0XHRyZXR1cm4gaGFzaGVyLmRpcHR5cXVlUm91dGVzXG5cdH1cblx0c3RhdGljIGdldE5ld0hhc2goKSB7XG5cdFx0cmV0dXJuIGhhc2hlci5uZXdIYXNoXG5cdH1cblx0c3RhdGljIGdldE9sZEhhc2goKSB7XG5cdFx0cmV0dXJuIGhhc2hlci5vbGRIYXNoXG5cdH1cblx0c3RhdGljIHNldEhhc2goaGFzaCkge1xuXHRcdGhhc2hlci5zZXRIYXNoKGhhc2gpXG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUm91dGVyXG4iLCJpbXBvcnQgQXBwRGlzcGF0Y2hlciBmcm9tICdBcHBEaXNwYXRjaGVyJ1xuaW1wb3J0IEFwcENvbnN0YW50cyBmcm9tICdBcHBDb25zdGFudHMnXG5pbXBvcnQge0V2ZW50RW1pdHRlcjJ9IGZyb20gJ2V2ZW50ZW1pdHRlcjInXG5pbXBvcnQgYXNzaWduIGZyb20gJ29iamVjdC1hc3NpZ24nXG5pbXBvcnQgZGF0YSBmcm9tICdHbG9iYWxEYXRhJ1xuaW1wb3J0IFJvdXRlciBmcm9tICdSb3V0ZXInXG5pbXBvcnQgaXNSZXRpbmEgZnJvbSAnaXMtcmV0aW5hJ1xuXG5mdW5jdGlvbiBfZ2V0Q29udGVudFNjb3BlKCkge1xuICAgIHZhciBoYXNoT2JqID0gUm91dGVyLmdldE5ld0hhc2goKVxuICAgIHJldHVybiBBcHBTdG9yZS5nZXRSb3V0ZVBhdGhTY29wZUJ5SWQoaGFzaE9iai5oYXNoKVxufVxuZnVuY3Rpb24gX2dldFBhZ2VBc3NldHNUb0xvYWQoKSB7XG4gICAgdmFyIHNjb3BlID0gX2dldENvbnRlbnRTY29wZSgpXG4gICAgdmFyIGhhc2hPYmogPSBSb3V0ZXIuZ2V0TmV3SGFzaCgpXG4gICAgdmFyIHR5cGUgPSBfZ2V0VHlwZU9mUGFnZSgpXG4gICAgdmFyIG1hbmlmZXN0O1xuXG4gICAgaWYodHlwZSAhPSBBcHBDb25zdGFudHMuSE9NRSkge1xuICAgICAgICB2YXIgZmlsZW5hbWVzID0gW1xuICAgICAgICAgICAgJ2NoYXJhY3RlcicgKyBfZ2V0SW1hZ2VEZXZpY2VFeHRlbnNpb24oKSArJy5wbmcnLFxuICAgICAgICAgICAgJ2NoYXJhY3Rlci1iZy5qcGcnLFxuICAgICAgICAgICAgJ3Nob2UtYmcuanBnJ1xuICAgICAgICBdXG4gICAgICAgIG1hbmlmZXN0ID0gX2FkZEJhc2VQYXRoc1RvVXJscyhmaWxlbmFtZXMsIGhhc2hPYmoucGFyZW50LCBoYXNoT2JqLnRhcmdldCwgdHlwZSlcbiAgICB9XG5cbiAgICAvLyBJbiBjYXNlIG9mIGV4dHJhIGFzc2V0c1xuICAgIGlmKHNjb3BlLmFzc2V0cyAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFyIGFzc2V0cyA9IHNjb3BlLmFzc2V0c1xuICAgICAgICB2YXIgYXNzZXRzTWFuaWZlc3Q7XG4gICAgICAgIGlmKHR5cGUgPT0gQXBwQ29uc3RhbnRzLkhPTUUpIHtcbiAgICAgICAgICAgIGFzc2V0c01hbmlmZXN0ID0gX2FkZEJhc2VQYXRoc1RvVXJscyhhc3NldHMsICdob21lJywgaGFzaE9iai50YXJnZXQsIHR5cGUpXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgYXNzZXRzTWFuaWZlc3QgPSBfYWRkQmFzZVBhdGhzVG9VcmxzKGFzc2V0cywgaGFzaE9iai5wYXJlbnQsIGhhc2hPYmoudGFyZ2V0LCB0eXBlKSAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBtYW5pZmVzdCA9IChtYW5pZmVzdCA9PSB1bmRlZmluZWQpID8gYXNzZXRzTWFuaWZlc3QgOiBtYW5pZmVzdC5jb25jYXQoYXNzZXRzTWFuaWZlc3QpXG4gICAgfVxuXG4gICAgcmV0dXJuIG1hbmlmZXN0XG59XG5mdW5jdGlvbiBfYWRkQmFzZVBhdGhzVG9VcmxzKHVybHMsIHBhZ2VJZCwgdGFyZ2V0SWQsIHR5cGUpIHtcbiAgICB2YXIgYmFzZVBhdGggPSAodHlwZSA9PSBBcHBDb25zdGFudHMuSE9NRSkgPyBfZ2V0SG9tZVBhZ2VBc3NldHNCYXNlUGF0aCgpIDogX2dldFBhZ2VBc3NldHNCYXNlUGF0aEJ5SWQocGFnZUlkLCB0YXJnZXRJZClcbiAgICB2YXIgbWFuaWZlc3QgPSBbXVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdXJscy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgc3BsaXR0ZXIgPSB1cmxzW2ldLnNwbGl0KCcuJylcbiAgICAgICAgdmFyIGZpbGVOYW1lID0gc3BsaXR0ZXJbMF1cbiAgICAgICAgdmFyIGV4dGVuc2lvbiA9IHNwbGl0dGVyWzFdXG4gICAgICAgIHZhciBpZCA9IHBhZ2VJZCArICctJ1xuICAgICAgICBpZih0YXJnZXRJZCkgaWQgKz0gdGFyZ2V0SWQgKyAnLSdcbiAgICAgICAgaWQgKz0gZmlsZU5hbWVcbiAgICAgICAgbWFuaWZlc3RbaV0gPSB7XG4gICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICBzcmM6IGJhc2VQYXRoICsgZmlsZU5hbWUgKyAnLicgKyBleHRlbnNpb25cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbWFuaWZlc3Rcbn1cbmZ1bmN0aW9uIF9nZXRQYWdlQXNzZXRzQmFzZVBhdGhCeUlkKGlkLCBhc3NldEdyb3VwSWQpIHtcbiAgICByZXR1cm4gQXBwU3RvcmUuYmFzZU1lZGlhUGF0aCgpICsgJ2ltYWdlL2RpcHR5cXVlLycgKyBpZCArICcvJyArIGFzc2V0R3JvdXBJZCArICcvJ1xufVxuZnVuY3Rpb24gX2dldEhvbWVQYWdlQXNzZXRzQmFzZVBhdGgoKSB7XG4gICAgcmV0dXJuIEFwcFN0b3JlLmJhc2VNZWRpYVBhdGgoKSArICdpbWFnZS9ob21lLydcbn1cbmZ1bmN0aW9uIF9nZXRJbWFnZURldmljZUV4dGVuc2lvbigpIHtcbiAgICB2YXIgcmV0aW5hID0gX2lzUmV0aW5hKClcbiAgICB2YXIgc3RyID0gJ0AxeCdcbiAgICBpZihyZXRpbmEgPT0gdHJ1ZSkgc3RyID0gJ0AyeCdcbiAgICByZXR1cm4gc3RyXG59XG5mdW5jdGlvbiBfaXNSZXRpbmEoKSB7XG4gICAgcmV0dXJuIGlzUmV0aW5hKClcbn1cbmZ1bmN0aW9uIF9nZXREZXZpY2VSYXRpbygpIHtcbiAgICB2YXIgc2NhbGUgPSAod2luZG93LmRldmljZVBpeGVsUmF0aW8gPT0gdW5kZWZpbmVkKSA/IDEgOiB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpb1xuICAgIHJldHVybiAoc2NhbGUgPiAxKSA/IDIgOiAxXG59XG5mdW5jdGlvbiBfZ2V0VHlwZU9mUGFnZShoYXNoKSB7XG4gICAgdmFyIGggPSBoYXNoIHx8IFJvdXRlci5nZXROZXdIYXNoKClcbiAgICBpZihoLnBhcnRzLmxlbmd0aCA9PSAyKSByZXR1cm4gQXBwQ29uc3RhbnRzLkRJUFRZUVVFXG4gICAgZWxzZSByZXR1cm4gQXBwQ29uc3RhbnRzLkhPTUVcbn1cbmZ1bmN0aW9uIF9nZXRQYWdlQ29udGVudCgpIHtcbiAgICB2YXIgaGFzaE9iaiA9IFJvdXRlci5nZXROZXdIYXNoKClcbiAgICB2YXIgaGFzaCA9IGhhc2hPYmouaGFzaC5sZW5ndGggPCAxID8gJy8nIDogaGFzaE9iai5oYXNoXG4gICAgdmFyIGNvbnRlbnQgPSBkYXRhLnJvdXRpbmdbaGFzaF1cbiAgICByZXR1cm4gY29udGVudFxufVxuZnVuY3Rpb24gX2dldENvbnRlbnRCeUxhbmcobGFuZykge1xuICAgIHJldHVybiBkYXRhLmNvbnRlbnQubGFuZ1tsYW5nXVxufVxuZnVuY3Rpb24gX2dldEdsb2JhbENvbnRlbnQoKSB7XG4gICAgcmV0dXJuIF9nZXRDb250ZW50QnlMYW5nKEFwcFN0b3JlLmxhbmcoKSlcbn1cbmZ1bmN0aW9uIF9nZXRBcHBEYXRhKCkge1xuICAgIHJldHVybiBkYXRhXG59XG5mdW5jdGlvbiBfZ2V0RGVmYXVsdFJvdXRlKCkge1xuICAgIHJldHVybiBkYXRhWydkZWZhdWx0LXJvdXRlJ11cbn1cbmZ1bmN0aW9uIF93aW5kb3dXaWR0aEhlaWdodCgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB3OiB3aW5kb3cuaW5uZXJXaWR0aCxcbiAgICAgICAgaDogd2luZG93LmlubmVySGVpZ2h0XG4gICAgfVxufVxuZnVuY3Rpb24gX2dldERpcHR5cXVlU2hvZXMoKSB7XG4gICAgdmFyIGhhc2hPYmogPSBSb3V0ZXIuZ2V0TmV3SGFzaCgpXG4gICAgdmFyIGJhc2V1cmwgPSBfZ2V0UGFnZUFzc2V0c0Jhc2VQYXRoQnlJZChoYXNoT2JqLnBhcmVudCwgaGFzaE9iai50YXJnZXQpXG4gICAgcmV0dXJuIF9nZXRDb250ZW50U2NvcGUoKS5zaG9lc1xufVxuXG52YXIgQXBwU3RvcmUgPSBhc3NpZ24oe30sIEV2ZW50RW1pdHRlcjIucHJvdG90eXBlLCB7XG4gICAgZW1pdENoYW5nZTogZnVuY3Rpb24odHlwZSwgaXRlbSkge1xuICAgICAgICB0aGlzLmVtaXQodHlwZSwgaXRlbSlcbiAgICB9LFxuICAgIHBhZ2VDb250ZW50OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIF9nZXRQYWdlQ29udGVudCgpXG4gICAgfSxcbiAgICBhcHBEYXRhOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIF9nZXRBcHBEYXRhKClcbiAgICB9LFxuICAgIGRlZmF1bHRSb3V0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBfZ2V0RGVmYXVsdFJvdXRlKClcbiAgICB9LFxuICAgIGdsb2JhbENvbnRlbnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gX2dldEdsb2JhbENvbnRlbnQoKVxuICAgIH0sXG4gICAgcGFnZUFzc2V0c1RvTG9hZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBfZ2V0UGFnZUFzc2V0c1RvTG9hZCgpXG4gICAgfSxcbiAgICBnZXRSb3V0ZVBhdGhTY29wZUJ5SWQ6IGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgIGlkID0gaWQubGVuZ3RoIDwgMSA/ICcvJyA6IGlkXG4gICAgICAgIHJldHVybiBkYXRhLnJvdXRpbmdbaWRdXG4gICAgfSxcbiAgICBiYXNlTWVkaWFQYXRoOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIEFwcFN0b3JlLmdldEVudmlyb25tZW50KCkuc3RhdGljXG4gICAgfSxcbiAgICBnZXRQYWdlQXNzZXRzQmFzZVBhdGhCeUlkOiBmdW5jdGlvbihwYXJlbnQsIHRhcmdldCkge1xuICAgICAgICByZXR1cm4gX2dldFBhZ2VBc3NldHNCYXNlUGF0aEJ5SWQocGFyZW50LCB0YXJnZXQpXG4gICAgfSxcbiAgICBnZXRFbnZpcm9ubWVudDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBBcHBDb25zdGFudHMuRU5WSVJPTk1FTlRTW0VOVl1cbiAgICB9LFxuICAgIGdldFR5cGVPZlBhZ2U6IGZ1bmN0aW9uKGhhc2gpIHtcbiAgICAgICAgcmV0dXJuIF9nZXRUeXBlT2ZQYWdlKGhhc2gpXG4gICAgfSxcbiAgICBnZXRIb21lVmlkZW9zOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGRhdGFbJ2hvbWUtdmlkZW9zJ11cbiAgICB9LFxuICAgIGdlbmVyYWxJbmZvczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBkYXRhLmNvbnRlbnRcbiAgICB9LFxuICAgIGRpcHR5cXVlU2hvZXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gX2dldERpcHR5cXVlU2hvZXMoKVxuICAgIH0sXG4gICAgZ2V0TmV4dERpcHR5cXVlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGhhc2hPYmogPSBSb3V0ZXIuZ2V0TmV3SGFzaCgpXG4gICAgICAgIHZhciByb3V0ZXMgPSBSb3V0ZXIuZ2V0RGlwdHlxdWVSb3V0ZXMoKVxuICAgICAgICB2YXIgY3VycmVudCA9IGhhc2hPYmouaGFzaFxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJvdXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHJvdXRlID0gcm91dGVzW2ldXG4gICAgICAgICAgICBpZihyb3V0ZSA9PSBjdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gKGkrMSkgPiByb3V0ZXMubGVuZ3RoLTEgPyAwIDogKGkrMSlcbiAgICAgICAgICAgICAgICByZXR1cm4gcm91dGVzW2luZGV4XVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0sXG4gICAgZ2V0UHJldmlvdXNEaXB0eXF1ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBoYXNoT2JqID0gUm91dGVyLmdldE5ld0hhc2goKVxuICAgICAgICB2YXIgcm91dGVzID0gUm91dGVyLmdldERpcHR5cXVlUm91dGVzKClcbiAgICAgICAgdmFyIGN1cnJlbnQgPSBoYXNoT2JqLmhhc2hcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByb3V0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciByb3V0ZSA9IHJvdXRlc1tpXVxuICAgICAgICAgICAgaWYocm91dGUgPT0gY3VycmVudCkge1xuICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IChpLTEpIDwgMCA/IHJvdXRlcy5sZW5ndGgtMSA6IChpLTEpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJvdXRlc1tpbmRleF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGdldERpcHR5cXVlUGFnZUluZGV4OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGhhc2hPYmogPSBSb3V0ZXIuZ2V0TmV3SGFzaCgpXG4gICAgICAgIHZhciByb3V0ZXMgPSBSb3V0ZXIuZ2V0RGlwdHlxdWVSb3V0ZXMoKVxuICAgICAgICB2YXIgY3VycmVudCA9IGhhc2hPYmouaGFzaFxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJvdXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHJvdXRlID0gcm91dGVzW2ldXG4gICAgICAgICAgICBpZihyb3V0ZSA9PSBjdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGdldEltYWdlRGV2aWNlRXh0ZW5zaW9uOiBfZ2V0SW1hZ2VEZXZpY2VFeHRlbnNpb24sXG4gICAgZ2V0UHJldmlld1VybEJ5SGFzaDogZnVuY3Rpb24oaGFzaCkge1xuICAgICAgICByZXR1cm4gQXBwU3RvcmUuYmFzZU1lZGlhUGF0aCgpICsgJ2ltYWdlL2RpcHR5cXVlLycgKyBoYXNoICsgJy9wcmV2aWV3LmdpZidcbiAgICB9LFxuICAgIGdldEZlZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gZGF0YS5mZWVkXG4gICAgfSxcbiAgICBsYW5nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGRlZmF1bHRMYW5nID0gdHJ1ZVxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGFuZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBsYW5nID0gZGF0YS5sYW5nc1tpXVxuICAgICAgICAgICAgaWYobGFuZyA9PSBKU19sYW5nKSB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdExhbmcgPSBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gKGRlZmF1bHRMYW5nID09IHRydWUpID8gJ2VuJyA6IEpTX2xhbmdcbiAgICB9LFxuICAgIFdpbmRvdzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBfd2luZG93V2lkdGhIZWlnaHQoKVxuICAgIH0sXG4gICAgYWRkUFhDaGlsZDogZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICBBcHBTdG9yZS5QWENvbnRhaW5lci5hZGQoaXRlbS5jaGlsZClcbiAgICB9LFxuICAgIHJlbW92ZVBYQ2hpbGQ6IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgQXBwU3RvcmUuUFhDb250YWluZXIucmVtb3ZlKGl0ZW0uY2hpbGQpXG4gICAgfSxcbiAgICBQYXJlbnQ6IHVuZGVmaW5lZCxcbiAgICBDYW52YXM6IHVuZGVmaW5lZCxcbiAgICBGcm9udEJsb2NrOiB1bmRlZmluZWQsXG4gICAgT3JpZW50YXRpb246IEFwcENvbnN0YW50cy5MQU5EU0NBUEUsXG4gICAgRGV0ZWN0b3I6IHtcbiAgICAgICAgaXNNb2JpbGU6IHVuZGVmaW5lZFxuICAgIH0sXG4gICAgZGlzcGF0Y2hlckluZGV4OiBBcHBEaXNwYXRjaGVyLnJlZ2lzdGVyKGZ1bmN0aW9uKHBheWxvYWQpe1xuICAgICAgICB2YXIgYWN0aW9uID0gcGF5bG9hZC5hY3Rpb25cbiAgICAgICAgc3dpdGNoKGFjdGlvbi5hY3Rpb25UeXBlKSB7XG4gICAgICAgICAgICBjYXNlIEFwcENvbnN0YW50cy5XSU5ET1dfUkVTSVpFOlxuICAgICAgICAgICAgICAgIEFwcFN0b3JlLldpbmRvdy53ID0gYWN0aW9uLml0ZW0ud2luZG93V1xuICAgICAgICAgICAgICAgIEFwcFN0b3JlLldpbmRvdy5oID0gYWN0aW9uLml0ZW0ud2luZG93SFxuICAgICAgICAgICAgICAgIEFwcFN0b3JlLk9yaWVudGF0aW9uID0gKEFwcFN0b3JlLldpbmRvdy53ID4gQXBwU3RvcmUuV2luZG93LmgpID8gQXBwQ29uc3RhbnRzLkxBTkRTQ0FQRSA6IEFwcENvbnN0YW50cy5QT1JUUkFJVFxuICAgICAgICAgICAgICAgIEFwcFN0b3JlLmVtaXRDaGFuZ2UoYWN0aW9uLmFjdGlvblR5cGUpXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgQXBwU3RvcmUuZW1pdENoYW5nZShhY3Rpb24uYWN0aW9uVHlwZSwgYWN0aW9uLml0ZW0pIFxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICB9KVxufSlcblxuXG5leHBvcnQgZGVmYXVsdCBBcHBTdG9yZVxuXG4iLCJpbXBvcnQgQXBwQ29uc3RhbnRzIGZyb20gJ0FwcENvbnN0YW50cydcbmltcG9ydCBkb20gZnJvbSAnZG9tLWhhbmQnXG5cbmNsYXNzIFV0aWxzIHtcblx0c3RhdGljIE5vcm1hbGl6ZU1vdXNlQ29vcmRzKGUsIG9ialdyYXBwZXIpIHtcblx0XHR2YXIgcG9zeCA9IDA7XG5cdFx0dmFyIHBvc3kgPSAwO1xuXHRcdGlmICghZSkgdmFyIGUgPSB3aW5kb3cuZXZlbnQ7XG5cdFx0aWYgKGUucGFnZVggfHwgZS5wYWdlWSkgXHR7XG5cdFx0XHRwb3N4ID0gZS5wYWdlWDtcblx0XHRcdHBvc3kgPSBlLnBhZ2VZO1xuXHRcdH1cblx0XHRlbHNlIGlmIChlLmNsaWVudFggfHwgZS5jbGllbnRZKSBcdHtcblx0XHRcdHBvc3ggPSBlLmNsaWVudFggKyBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnRcblx0XHRcdFx0KyBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdDtcblx0XHRcdHBvc3kgPSBlLmNsaWVudFkgKyBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcFxuXHRcdFx0XHQrIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XG5cdFx0fVxuXHRcdG9ialdyYXBwZXIueCA9IHBvc3hcblx0XHRvYmpXcmFwcGVyLnkgPSBwb3N5XG5cdFx0cmV0dXJuIG9ialdyYXBwZXJcblx0fVxuXHRzdGF0aWMgUmVzaXplUG9zaXRpb25Qcm9wb3J0aW9uYWxseSh3aW5kb3dXLCB3aW5kb3dILCBjb250ZW50VywgY29udGVudEgsIG9yaWVudGF0aW9uKSB7XG5cdFx0dmFyIGFzcGVjdFJhdGlvID0gY29udGVudFcgLyBjb250ZW50SFxuXHRcdGlmKG9yaWVudGF0aW9uICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdGlmKG9yaWVudGF0aW9uID09IEFwcENvbnN0YW50cy5MQU5EU0NBUEUpIHtcblx0XHRcdFx0dmFyIHNjYWxlID0gKHdpbmRvd1cgLyBjb250ZW50VykgKiAxXG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0dmFyIHNjYWxlID0gKHdpbmRvd0ggLyBjb250ZW50SCkgKiAxXG5cdFx0XHR9XG5cdFx0fWVsc2V7XG5cdFx0XHR2YXIgc2NhbGUgPSAoKHdpbmRvd1cgLyB3aW5kb3dIKSA8IGFzcGVjdFJhdGlvKSA/ICh3aW5kb3dIIC8gY29udGVudEgpICogMSA6ICh3aW5kb3dXIC8gY29udGVudFcpICogMVxuXHRcdH1cblx0XHR2YXIgbmV3VyA9IGNvbnRlbnRXICogc2NhbGVcblx0XHR2YXIgbmV3SCA9IGNvbnRlbnRIICogc2NhbGVcblx0XHR2YXIgY3NzID0ge1xuXHRcdFx0d2lkdGg6IG5ld1csXG5cdFx0XHRoZWlnaHQ6IG5ld0gsXG5cdFx0XHRsZWZ0OiAod2luZG93VyA+PiAxKSAtIChuZXdXID4+IDEpLFxuXHRcdFx0dG9wOiAod2luZG93SCA+PiAxKSAtIChuZXdIID4+IDEpLFxuXHRcdFx0c2NhbGU6IHNjYWxlXG5cdFx0fVxuXHRcdFxuXHRcdHJldHVybiBjc3Ncblx0fVxuXHRzdGF0aWMgQ2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHN0cmluZykge1xuXHQgICAgcmV0dXJuIHN0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKTtcblx0fVxuXHRzdGF0aWMgU3VwcG9ydFdlYkdMKCkge1xuXHRcdHRyeSB7XG5cdFx0XHR2YXIgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2NhbnZhcycgKTtcblx0XHRcdHJldHVybiAhISAoIHdpbmRvdy5XZWJHTFJlbmRlcmluZ0NvbnRleHQgJiYgKCBjYW52YXMuZ2V0Q29udGV4dCggJ3dlYmdsJyApIHx8IGNhbnZhcy5nZXRDb250ZXh0KCAnZXhwZXJpbWVudGFsLXdlYmdsJyApICkgKTtcblx0XHR9IGNhdGNoICggZSApIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdH1cblx0c3RhdGljIERlc3Ryb3lWaWRlbyh2aWRlbykge1xuICAgICAgICB2aWRlby5wYXVzZSgpO1xuICAgICAgICB2aWRlby5zcmMgPSAnJztcbiAgICAgICAgdmFyIGNoaWxkcmVuID0gdmlkZW8uY2hpbGROb2Rlc1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIFx0dmFyIGNoaWxkID0gY2hpbGRyZW5baV1cbiAgICAgICAgXHRjaGlsZC5zZXRBdHRyaWJ1dGUoJ3NyYycsICcnKTtcbiAgICAgICAgXHQvLyBXb3JraW5nIHdpdGggYSBwb2x5ZmlsbCBvciB1c2UganF1ZXJ5XG4gICAgICAgIFx0ZG9tLnRyZWUucmVtb3ZlKGNoaWxkKVxuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBEZXN0cm95VmlkZW9UZXh0dXJlKHRleHR1cmUpIHtcbiAgICBcdHZhciB2aWRlbyA9IHRleHR1cmUuYmFzZVRleHR1cmUuc291cmNlXG4gICAgICAgIFV0aWxzLkRlc3Ryb3lWaWRlbyh2aWRlbylcbiAgICB9XG4gICAgc3RhdGljIFJhbmQobWluLCBtYXgsIGRlY2ltYWxzKSB7XG4gICAgICAgIHZhciByYW5kb21OdW0gPSBNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKyBtaW5cbiAgICAgICAgaWYoZGVjaW1hbHMgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIFx0cmV0dXJuIHJhbmRvbU51bVxuICAgICAgICB9ZWxzZXtcblx0ICAgICAgICB2YXIgZCA9IE1hdGgucG93KDEwLCBkZWNpbWFscylcblx0ICAgICAgICByZXR1cm4gfn4oKGQgKiByYW5kb21OdW0pICsgMC41KSAvIGRcbiAgICAgICAgfVxuXHR9XG5cdHN0YXRpYyBHZXRJbWdVcmxJZCh1cmwpIHtcblx0XHR2YXIgc3BsaXQgPSB1cmwuc3BsaXQoJy8nKVxuXHRcdHJldHVybiBzcGxpdFtzcGxpdC5sZW5ndGgtMV0uc3BsaXQoJy4nKVswXVxuXHR9XG5cdHN0YXRpYyBTdHlsZShkaXYsIHN0eWxlKSB7XG4gICAgXHRkaXYuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gc3R5bGVcblx0XHRkaXYuc3R5bGUubW96VHJhbnNmb3JtICAgID0gc3R5bGVcblx0XHRkaXYuc3R5bGUubXNUcmFuc2Zvcm0gICAgID0gc3R5bGVcblx0XHRkaXYuc3R5bGUub1RyYW5zZm9ybSAgICAgID0gc3R5bGVcblx0XHRkaXYuc3R5bGUudHJhbnNmb3JtICAgICAgID0gc3R5bGVcbiAgICB9XG4gICAgc3RhdGljIFRyYW5zbGF0ZShkaXYsIHgsIHksIHopIHtcbiAgICBcdGlmICgnd2Via2l0VHJhbnNmb3JtJyBpbiBkb2N1bWVudC5ib2R5LnN0eWxlIHx8ICdtb3pUcmFuc2Zvcm0nIGluIGRvY3VtZW50LmJvZHkuc3R5bGUgfHwgJ29UcmFuc2Zvcm0nIGluIGRvY3VtZW50LmJvZHkuc3R5bGUgfHwgJ3RyYW5zZm9ybScgaW4gZG9jdW1lbnQuYm9keS5zdHlsZSkge1xuICAgIFx0XHRVdGlscy5TdHlsZShkaXYsICd0cmFuc2xhdGUzZCgnK3grJ3B4LCcreSsncHgsJyt6KydweCknKVxuXHRcdH1lbHNle1xuXHRcdFx0ZGl2LnN0eWxlLnRvcCA9IHkgKyAncHgnXG5cdFx0XHRkaXYuc3R5bGUubGVmdCA9IHggKyAncHgnXG5cdFx0fVxuICAgIH1cbiAgICBzdGF0aWMgU3ByaW5nVG8oaXRlbSwgdG9Qb3NpdGlvbiwgaW5kZXgpIHtcbiAgICBcdHZhciBkeCA9IHRvUG9zaXRpb24ueCAtIGl0ZW0ucG9zaXRpb24ueFxuICAgIFx0dmFyIGR5ID0gdG9Qb3NpdGlvbi55IC0gaXRlbS5wb3NpdGlvbi55XG5cdFx0dmFyIGFuZ2xlID0gTWF0aC5hdGFuMihkeSwgZHgpXG5cdFx0dmFyIHRhcmdldFggPSB0b1Bvc2l0aW9uLnggLSBNYXRoLmNvcyhhbmdsZSkgKiAoaXRlbS5jb25maWcubGVuZ3RoICogaW5kZXgpXG5cdFx0dmFyIHRhcmdldFkgPSB0b1Bvc2l0aW9uLnkgLSBNYXRoLnNpbihhbmdsZSkgKiAoaXRlbS5jb25maWcubGVuZ3RoICogaW5kZXgpXG5cdFx0aXRlbS52ZWxvY2l0eS54ICs9ICh0YXJnZXRYIC0gaXRlbS5wb3NpdGlvbi54KSAqIGl0ZW0uY29uZmlnLnNwcmluZ1xuXHRcdGl0ZW0udmVsb2NpdHkueSArPSAodGFyZ2V0WSAtIGl0ZW0ucG9zaXRpb24ueSkgKiBpdGVtLmNvbmZpZy5zcHJpbmdcblx0XHRpdGVtLnZlbG9jaXR5LnggKj0gaXRlbS5jb25maWcuZnJpY3Rpb25cblx0XHRpdGVtLnZlbG9jaXR5LnkgKj0gaXRlbS5jb25maWcuZnJpY3Rpb25cbiAgICB9XG4gICAgc3RhdGljIFNwcmluZ1RvU2NhbGUoaXRlbSwgdG9TY2FsZSwgaW5kZXgpIHtcbiAgICBcdHZhciBkeCA9IHRvU2NhbGUueCAtIGl0ZW0uc2NhbGUueFxuICAgIFx0dmFyIGR5ID0gdG9TY2FsZS55IC0gaXRlbS5zY2FsZS55XG5cdFx0dmFyIGFuZ2xlID0gTWF0aC5hdGFuMihkeSwgZHgpXG5cdFx0dmFyIHRhcmdldFggPSB0b1NjYWxlLnggLSBNYXRoLmNvcyhhbmdsZSkgKiAoaXRlbS5jb25maWcubGVuZ3RoICogaW5kZXgpXG5cdFx0dmFyIHRhcmdldFkgPSB0b1NjYWxlLnkgLSBNYXRoLnNpbihhbmdsZSkgKiAoaXRlbS5jb25maWcubGVuZ3RoICogaW5kZXgpXG5cdFx0aXRlbS52ZWxvY2l0eVNjYWxlLnggKz0gKHRhcmdldFggLSBpdGVtLnNjYWxlLngpICogaXRlbS5jb25maWcuc3ByaW5nXG5cdFx0aXRlbS52ZWxvY2l0eVNjYWxlLnkgKz0gKHRhcmdldFkgLSBpdGVtLnNjYWxlLnkpICogaXRlbS5jb25maWcuc3ByaW5nXG5cdFx0aXRlbS52ZWxvY2l0eVNjYWxlLnggKj0gaXRlbS5jb25maWcuZnJpY3Rpb25cblx0XHRpdGVtLnZlbG9jaXR5U2NhbGUueSAqPSBpdGVtLmNvbmZpZy5mcmljdGlvblxuICAgIH1cbiAgICBzdGF0aWMgTG9hZFRleHR1cmUodXJsKSB7XG5cdFx0dmFyIHVyaSA9ICdpbWFnZS90ZXh0dXJlcy8nICsgdXJsXG5cdFx0dmFyIHRleHR1cmUgPSBUSFJFRS5JbWFnZVV0aWxzLmxvYWRUZXh0dXJlKCB1cmkgKTtcblx0XHR0ZXh0dXJlLndyYXBTID0gdGV4dHVyZS53cmFwVCA9IFRIUkVFLlJlcGVhdFdyYXBwaW5nO1xuXHRcdHRleHR1cmUuYW5pc290cm9weSA9IDE2O1xuXHRcdHJldHVybiB0ZXh0dXJlXG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVXRpbHNcbiIsIi8vIGh0dHA6Ly9wYXVsaXJpc2guY29tLzIwMTEvcmVxdWVzdGFuaW1hdGlvbmZyYW1lLWZvci1zbWFydC1hbmltYXRpbmcvXG4vLyBodHRwOi8vbXkub3BlcmEuY29tL2Vtb2xsZXIvYmxvZy8yMDExLzEyLzIwL3JlcXVlc3RhbmltYXRpb25mcmFtZS1mb3Itc21hcnQtZXItYW5pbWF0aW5nXG4gXG4vLyByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgcG9seWZpbGwgYnkgRXJpayBNw7ZsbGVyLiBmaXhlcyBmcm9tIFBhdWwgSXJpc2ggYW5kIFRpbm8gWmlqZGVsXG4gXG4vLyBNSVQgbGljZW5zZVxuIFxuKGZ1bmN0aW9uKCkge1xuICAgIHZhciBsYXN0VGltZSA9IDA7XG4gICAgdmFyIHZlbmRvcnMgPSBbJ21zJywgJ21veicsICd3ZWJraXQnLCAnbyddO1xuICAgIGZvcih2YXIgeCA9IDA7IHggPCB2ZW5kb3JzLmxlbmd0aCAmJiAhd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZTsgKyt4KSB7XG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSB3aW5kb3dbdmVuZG9yc1t4XSsnUmVxdWVzdEFuaW1hdGlvbkZyYW1lJ107XG4gICAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSA9IHdpbmRvd1t2ZW5kb3JzW3hdKydDYW5jZWxBbmltYXRpb25GcmFtZSddIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8fCB3aW5kb3dbdmVuZG9yc1t4XSsnQ2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lJ107XG4gICAgfVxuIFxuICAgIGlmICghd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSlcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IGZ1bmN0aW9uKGNhbGxiYWNrLCBlbGVtZW50KSB7XG4gICAgICAgICAgICB2YXIgY3VyclRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgICAgIHZhciB0aW1lVG9DYWxsID0gTWF0aC5tYXgoMCwgMTYgLSAoY3VyclRpbWUgLSBsYXN0VGltZSkpO1xuICAgICAgICAgICAgdmFyIGlkID0gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7IGNhbGxiYWNrKGN1cnJUaW1lICsgdGltZVRvQ2FsbCk7IH0sIFxuICAgICAgICAgICAgICB0aW1lVG9DYWxsKTtcbiAgICAgICAgICAgIGxhc3RUaW1lID0gY3VyclRpbWUgKyB0aW1lVG9DYWxsO1xuICAgICAgICAgICAgcmV0dXJuIGlkO1xuICAgICAgICB9O1xuIFxuICAgIGlmICghd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKVxuICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgPSBmdW5jdGlvbihpZCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGlkKTtcbiAgICAgICAgfTtcbn0oKSk7IiwiaW1wb3J0IHNsdWcgZnJvbSAndG8tc2x1Zy1jYXNlJ1xuaW1wb3J0IGRvbSBmcm9tICdkb20taGFuZCdcblxuY2xhc3MgQmFzZUNvbXBvbmVudCB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMuZG9tSXNSZWFkeSA9IGZhbHNlXG5cdFx0dGhpcy5jb21wb25lbnREaWRNb3VudCA9IHRoaXMuY29tcG9uZW50RGlkTW91bnQuYmluZCh0aGlzKVxuXHR9XG5cdGNvbXBvbmVudFdpbGxNb3VudCgpIHtcblx0fVxuXHRjb21wb25lbnREaWRNb3VudCgpIHtcblx0XHR0aGlzLmRvbUlzUmVhZHkgPSB0cnVlXG5cdFx0dGhpcy5yZXNpemUoKVxuXHR9XG5cdHJlbmRlcihjaGlsZElkLCBwYXJlbnRJZCwgdGVtcGxhdGUsIG9iamVjdCkge1xuXHRcdHRoaXMuY29tcG9uZW50V2lsbE1vdW50KClcblx0XHR0aGlzLmNoaWxkSWQgPSBjaGlsZElkXG5cdFx0dGhpcy5wYXJlbnRJZCA9IHBhcmVudElkXG5cdFx0XG5cdFx0aWYoZG9tLmlzRG9tKHBhcmVudElkKSkge1xuXHRcdFx0dGhpcy5wYXJlbnQgPSBwYXJlbnRJZFxuXHRcdH1lbHNle1xuXHRcdFx0dmFyIGlkID0gdGhpcy5wYXJlbnRJZC5pbmRleE9mKCcjJykgPiAtMSA/IHRoaXMucGFyZW50SWQuc3BsaXQoJyMnKVsxXSA6IHRoaXMucGFyZW50SWRcblx0XHRcdHRoaXMucGFyZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpXG5cdFx0fVxuXG5cdFx0aWYodGVtcGxhdGUgPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHR0aGlzLmVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXHRcdH1lbHNlIHtcblx0XHRcdHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cdFx0XHR2YXIgdCA9IHRlbXBsYXRlKG9iamVjdClcblx0XHRcdHRoaXMuZWxlbWVudC5pbm5lckhUTUwgPSB0XG5cdFx0fVxuXHRcdGlmKHRoaXMuZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2lkJykgPT0gdW5kZWZpbmVkKSB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKCdpZCcsIHNsdWcoY2hpbGRJZCkpXG5cdFx0ZG9tLnRyZWUuYWRkKHRoaXMucGFyZW50LCB0aGlzLmVsZW1lbnQpXG5cblx0XHRzZXRUaW1lb3V0KHRoaXMuY29tcG9uZW50RGlkTW91bnQsIDApXG5cdH1cblx0cmVtb3ZlKCkge1xuXHRcdHRoaXMuY29tcG9uZW50V2lsbFVubW91bnQoKVxuXHRcdHRoaXMuZWxlbWVudC5yZW1vdmUoKVxuXHR9XG5cdHJlc2l6ZSgpIHtcblx0fVxuXHRjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBCYXNlQ29tcG9uZW50XG5cbiIsIm1vZHVsZS5leHBvcnRzPXtcblx0XCJjb250ZW50XCI6IHtcblx0XHRcInR3aXR0ZXJfdXJsXCI6IFwiaHR0cHM6Ly90d2l0dGVyLmNvbS9jYW1wZXJcIixcblx0XHRcImZhY2Vib29rX3VybFwiOiBcImh0dHBzOi8vd3d3LmZhY2Vib29rLmNvbS9DYW1wZXJcIixcblx0XHRcImluc3RhZ3JhbV91cmxcIjogXCJodHRwczovL2luc3RhZ3JhbS5jb20vY2FtcGVyL1wiLFxuXHRcdFwibGFiX3VybFwiOiBcImh0dHA6Ly93d3cuY2FtcGVyLmNvbS9sYWJcIixcblx0XHRcIm1lbl9zaG9wX3VybFwiOiBcImh0dHA6Ly93d3cuY2FtcGVyLmNvbS9pbnQvbWVuL3Nob2VzL3NzMTZfaW5zcGlyYXRpb25cIixcblx0XHRcIndvbWVuX3Nob3BfdXJsXCI6IFwiaHR0cDovL3d3dy5jYW1wZXIuY29tL2ludC93b21lbi9zaG9lcy9zczE2X2luc3BpcmF0aW9uXCIsXG5cdFx0XCJsYW5nXCI6IHtcblx0XHRcdFwiZW5cIjoge1xuXHRcdFx0XHRcImhvbWVcIjogXCJNQVBcIixcblx0XHRcdFx0XCJncmlkXCI6IFwiSU5ERVhcIixcblx0XHRcdFx0XCJsYWJcIjogXCJMQUJcIixcblx0XHRcdFx0XCJjYW1wZXJfbGFiXCI6IFwiQ2FtcGVyIExhYlwiLFxuXHRcdFx0XHRcInNob3BfdGl0bGVcIjogXCJTaG9wXCIsXG5cdFx0XHRcdFwic2hvcF9tZW5cIjogXCJNZW5cIixcblx0XHRcdFx0XCJzaG9wX3dvbWVuXCI6IFwiV29tZW5cIixcblx0XHRcdFx0XCJtYXBfdHh0XCI6IFwiTUFQXCJcblx0XHRcdH0sXG5cdFx0XHRcImZyXCI6IHtcblx0XHRcdFx0XCJob21lXCI6IFwiTUFQXCIsXG5cdFx0XHRcdFwiZ3JpZFwiOiBcIklOREVYXCIsXG5cdFx0XHRcdFwibGFiXCI6IFwiTEFCXCIsXG5cdFx0XHRcdFwiY2FtcGVyX2xhYlwiOiBcIkNhbXBlciBMYWJcIixcblx0XHRcdFx0XCJzaG9wX3RpdGxlXCI6IFwiQWNoZXRlclwiLFxuXHRcdFx0XHRcInNob3BfbWVuXCI6IFwiaG9tbWVcIixcblx0XHRcdFx0XCJzaG9wX3dvbWVuXCI6IFwiZmVtbWVcIixcblx0XHRcdFx0XCJtYXBfdHh0XCI6IFwiTUFQXCJcblx0XHRcdH0sXG5cdFx0XHRcImVzXCI6IHtcblx0XHRcdFx0XCJob21lXCI6IFwiTUFQXCIsXG5cdFx0XHRcdFwiZ3JpZFwiOiBcIklOREVYXCIsXG5cdFx0XHRcdFwibGFiXCI6IFwiTEFCXCIsXG5cdFx0XHRcdFwiY2FtcGVyX2xhYlwiOiBcIkNhbXBlciBMYWJcIixcblx0XHRcdFx0XCJzaG9wX3RpdGxlXCI6IFwiQ29tcHJhclwiLFxuXHRcdFx0XHRcInNob3BfbWVuXCI6IFwiaG9tYnJlXCIsXG5cdFx0XHRcdFwic2hvcF93b21lblwiOiBcIm11amVyXCIsXG5cdFx0XHRcdFwibWFwX3R4dFwiOiBcIk1BUFwiXG5cdFx0XHR9LFxuXHRcdFx0XCJpdFwiOiB7XG5cdFx0XHRcdFwiaG9tZVwiOiBcIk1BUFwiLFxuXHRcdFx0XHRcImdyaWRcIjogXCJJTkRFWFwiLFxuXHRcdFx0XHRcImxhYlwiOiBcIkxBQlwiLFxuXHRcdFx0XHRcImNhbXBlcl9sYWJcIjogXCJDYW1wZXIgTGFiXCIsXG5cdFx0XHRcdFwic2hvcF90aXRsZVwiOiBcIkFjcXVpc2l0aVwiLFxuXHRcdFx0XHRcInNob3BfbWVuXCI6IFwidW9tb1wiLFxuXHRcdFx0XHRcInNob3Bfd29tZW5cIjogXCJkb25uYVwiLFxuXHRcdFx0XHRcIm1hcF90eHRcIjogXCJNQVBcIlxuXHRcdFx0fSxcblx0XHRcdFwiZGVcIjoge1xuXHRcdFx0XHRcImhvbWVcIjogXCJNQVBcIixcblx0XHRcdFx0XCJncmlkXCI6IFwiSU5ERVhcIixcblx0XHRcdFx0XCJsYWJcIjogXCJMQUJcIixcblx0XHRcdFx0XCJjYW1wZXJfbGFiXCI6IFwiQ2FtcGVyIExhYlwiLFxuXHRcdFx0XHRcInNob3BfdGl0bGVcIjogXCJTaG9wXCIsXG5cdFx0XHRcdFwic2hvcF9tZW5cIjogXCJIZXJyZW5cIixcblx0XHRcdFx0XCJzaG9wX3dvbWVuXCI6IFwiRGFtZW5cIixcblx0XHRcdFx0XCJtYXBfdHh0XCI6IFwiTUFQXCJcblx0XHRcdH0sXG5cdFx0XHRcInB0XCI6IHtcblx0XHRcdFx0XCJob21lXCI6IFwiTUFQXCIsXG5cdFx0XHRcdFwiZ3JpZFwiOiBcIklOREVYXCIsXG5cdFx0XHRcdFwibGFiXCI6IFwiTEFCXCIsXG5cdFx0XHRcdFwiY2FtcGVyX2xhYlwiOiBcIkNhbXBlciBMYWJcIixcblx0XHRcdFx0XCJzaG9wX3RpdGxlXCI6IFwiQ29tcHJlXCIsXG5cdFx0XHRcdFwic2hvcF9tZW5cIjogXCJIb21lblwiLFxuXHRcdFx0XHRcInNob3Bfd29tZW5cIjogXCJNdWxoZXJcIixcblx0XHRcdFx0XCJtYXBfdHh0XCI6IFwiTUFQXCJcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0XCJsYW5nc1wiOiBbXCJlblwiLCBcImZyXCIsIFwiZXNcIiwgXCJpdFwiLCBcImRlXCIsIFwicHRcIl0sXG5cblx0XCJob21lLXZpZGVvc1wiOiBbXG5cdFx0XCJkZWlhLWR1Yi5tcDRcIixcblx0XHRcImRlaWEtbWF0ZW8ubXA0XCIsXG5cdFx0XCJkZWlhLW1hcnRhLm1wNFwiLFxuXHRcdFwiZXMtdHJlbmMtaXNhbXUubXA0XCIsXG5cdFx0XCJlcy10cmVuYy1iZWx1Z2EubXA0XCIsXG5cdFx0XCJhcmVsbHVmLWNhcGFzLm1wNFwiLFxuXHRcdFwiYXJlbGx1Zi1wZWxvdGFzLm1wNFwiLFxuXHRcdFwiYXJlbGx1Zi1tYXJ0YS5tcDRcIixcblx0XHRcImFyZWxsdWYta29iYXJhaC5tcDRcIixcblx0XHRcImFyZWxsdWYtZHViLm1wNFwiLFxuXHRcdFwiYXJlbGx1Zi1wYXJhZGlzZS5tcDRcIlxuXHRdLFxuXG5cdFwiZmVlZFwiOiBbXG5cdFx0e1xuXHRcdFx0XCJpZFwiOiBcImRlaWFcIixcblx0XHRcdFwicGVyc29uXCI6IFwibWF0ZW9cIixcblx0XHRcdFwidGltZVwiOiBcIjIgbWluIGFnb1wiLFxuXHRcdFx0XCJtZWRpYVwiOiB7XG5cdFx0XHRcdFwidHlwZVwiOiBcImltYWdlXCIsXG5cdFx0XHRcdFwiaWRcIjogXCJzaG9lXCJcblx0XHRcdH0sXG5cdFx0XHRcImNvbW1lbnRzXCI6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdFwicGVyc29uLW5hbWVcIjogXCJtYXRlb1wiLFxuXHRcdFx0XHRcdFwicGVyc29uLXRleHRcIjogXCJFc3RyZW5vIENhbXBlcnMgcGFyYSBudWVzdHJvIHdlZWtlbmQgZW4gRGVpYSBATWFydGFcIlxuXHRcdFx0XHR9XG5cdFx0XHRdXG5cdFx0fSx7XG5cdFx0XHRcImlkXCI6IFwiZGVpYVwiLFxuXHRcdFx0XCJwZXJzb25cIjogXCJtYXRlb1wiLFxuXHRcdFx0XCJ0aW1lXCI6IFwiMiBtaW4gYWdvXCIsXG5cdFx0XHRcIm1lZGlhXCI6IHtcblx0XHRcdFx0XCJ0eXBlXCI6IFwiaW1hZ2VcIixcblx0XHRcdFx0XCJpZFwiOiBcImNoYXJhY3RlclwiXG5cdFx0XHR9LFxuXHRcdFx0XCJjb21tZW50c1wiOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRcInBlcnNvbi1uYW1lXCI6IFwibWF0ZW9cIixcblx0XHRcdFx0XHRcInBlcnNvbi10ZXh0XCI6IFwiUHJvZmlsZSBwaWM/IG1heWJlPyBtYXliZSBiYWJ5P1wiXG5cdFx0XHRcdH1cblx0XHRcdF1cblx0XHR9LHtcblx0XHRcdFwiaWRcIjogXCJkZWlhXCIsXG5cdFx0XHRcInBlcnNvblwiOiBcIm1hdGVvXCIsXG5cdFx0XHRcInRpbWVcIjogXCIyIG1pbiBhZ29cIixcblx0XHRcdFwibWVkaWFcIjoge1xuXHRcdFx0XHRcInR5cGVcIjogXCJ2aWRlb1wiLFxuXHRcdFx0XHRcImlkXCI6IFwiZnVuLWZhY3RcIlxuXHRcdFx0fSxcblx0XHRcdFwiY29tbWVudHNcIjogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0XCJwZXJzb24tbmFtZVwiOiBcIm1hdGVvXCIsXG5cdFx0XHRcdFx0XCJwZXJzb24tdGV4dFwiOiBcIk1lIGJlaW5nIG1l4oCmIEhlaGUgOikgPHNwYW4+I2NhbXBlcjwvc3Bhbj5cIlxuXHRcdFx0XHR9XG5cdFx0XHRdXG5cdFx0fSx7XG5cdFx0XHRcImlkXCI6IFwiZGVpYVwiLFxuXHRcdFx0XCJwZXJzb25cIjogXCJtYXRlb1wiLFxuXHRcdFx0XCJ0aW1lXCI6IFwiMiBtaW4gYWdvXCIsXG5cdFx0XHRcIm1lZGlhXCI6IHtcblx0XHRcdFx0XCJ0eXBlXCI6IFwidmlkZW9cIixcblx0XHRcdFx0XCJpZFwiOiBcImNoYXJhY3RlclwiXG5cdFx0XHR9LFxuXHRcdFx0XCJjb21tZW50c1wiOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRcInBlcnNvbi1uYW1lXCI6IFwibWFydGFcIixcblx0XHRcdFx0XHRcInBlcnNvbi10ZXh0XCI6IFwiUG9ycXVlIGVzYSBjYXJhIGRlIGVtbz8/IEBNYXRlbyBsb2whISAjU2VsZmllVmlkZW8gI01hbGxvcmNhQnlDYW1wZXJcIlxuXHRcdFx0XHR9XG5cdFx0XHRdXG5cdFx0fSx7XG5cdFx0XHRcImlkXCI6IFwiZGVpYVwiLFxuXHRcdFx0XCJwZXJzb25cIjogXCJkdWJcIixcblx0XHRcdFwidGltZVwiOiBcIjIgbWluIGFnb1wiLFxuXHRcdFx0XCJtZWRpYVwiOiB7XG5cdFx0XHRcdFwidHlwZVwiOiBcImltYWdlXCIsXG5cdFx0XHRcdFwiaWRcIjogXCJzaG9lXCJcblx0XHRcdH0sXG5cdFx0XHRcImNvbW1lbnRzXCI6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdFwicGVyc29uLW5hbWVcIjogXCJkdWJcIixcblx0XHRcdFx0XHRcInBlcnNvbi10ZXh0XCI6IFwiVGhlc2Ugc2hvZXMgYXJlIHRoZSBzaG9lcyBNaXJrbyB3b3VsZCB3ZWFyIGlmIGhlIHdhcyBzdGlsbCBhbGl2ZSBhbmQga2lja2luJ1wiXG5cdFx0XHRcdH1cblx0XHRcdF1cblx0XHR9LHtcblx0XHRcdFwiaWRcIjogXCJkZWlhXCIsXG5cdFx0XHRcInBlcnNvblwiOiBcImR1YlwiLFxuXHRcdFx0XCJ0aW1lXCI6IFwiMiBtaW4gYWdvXCIsXG5cdFx0XHRcIm1lZGlhXCI6IHtcblx0XHRcdFx0XCJ0eXBlXCI6IFwiaW1hZ2VcIixcblx0XHRcdFx0XCJpZFwiOiBcImNoYXJhY3RlclwiXG5cdFx0XHR9LFxuXHRcdFx0XCJjb21tZW50c1wiOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRcInBlcnNvbi1uYW1lXCI6IFwibWF0ZW9cIixcblx0XHRcdFx0XHRcInBlcnNvbi10ZXh0XCI6IFwiUG9ycXVlIG5vIHZpZW5lcyBhIERlaWEgY29uIEBNYXJ0YSB5IGNvbm1pZ28gZWwgcHJveGltbyB3ZWVrZW5kPz9cIlxuXHRcdFx0XHR9LHtcblx0XHRcdFx0XHRcInBlcnNvbi1uYW1lXCI6IFwiZHViXCIsXG5cdFx0XHRcdFx0XCJwZXJzb24tdGV4dFwiOiBcIk5vIHB1ZWRvb29vb+KApiB0ZW5nbyBjbGFzZXMgZGUgcGludHVyYSB5IG1pIG1hZHJlIHZpZW5lIGEgdmlzaXRhciAjaGVhdnltZXRhbFwiXG5cdFx0XHRcdH1cblx0XHRcdF1cblx0XHR9LHtcblx0XHRcdFwiaWRcIjogXCJkZWlhXCIsXG5cdFx0XHRcInBlcnNvblwiOiBcImR1YlwiLFxuXHRcdFx0XCJ0aW1lXCI6IFwiMiBtaW4gYWdvXCIsXG5cdFx0XHRcIm1lZGlhXCI6IHtcblx0XHRcdFx0XCJ0eXBlXCI6IFwidmlkZW9cIixcblx0XHRcdFx0XCJpZFwiOiBcImZ1bi1mYWN0XCJcblx0XHRcdH0sXG5cdFx0XHRcImNvbW1lbnRzXCI6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdFwicGVyc29uLW5hbWVcIjogXCJtYXRlb1wiLFxuXHRcdFx0XHRcdFwicGVyc29uLXRleHRcIjogXCJNZSBiZWluZyBtZeKApiBIZWhlIDopIDxzcGFuPiNjYW1wZXI8L3NwYW4+XCJcblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdH0se1xuXHRcdFx0XCJpZFwiOiBcImRlaWFcIixcblx0XHRcdFwicGVyc29uXCI6IFwiZHViXCIsXG5cdFx0XHRcInRpbWVcIjogXCIyIG1pbiBhZ29cIixcblx0XHRcdFwibWVkaWFcIjoge1xuXHRcdFx0XHRcInR5cGVcIjogXCJ2aWRlb1wiLFxuXHRcdFx0XHRcImlkXCI6IFwiY2hhcmFjdGVyXCJcblx0XHRcdH0sXG5cdFx0XHRcImNvbW1lbnRzXCI6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdFwicGVyc29uLW5hbWVcIjogXCJkdWJcIixcblx0XHRcdFx0XHRcInBlcnNvbi10ZXh0XCI6IFwiI2FydHNlbGZpZVwiXG5cdFx0XHRcdH1cblx0XHRcdF1cblx0XHR9LHtcblx0XHRcdFwiaWRcIjogXCJkZWlhXCIsXG5cdFx0XHRcInBlcnNvblwiOiBcIm1hcnRhXCIsXG5cdFx0XHRcInRpbWVcIjogXCIyIG1pbiBhZ29cIixcblx0XHRcdFwibWVkaWFcIjoge1xuXHRcdFx0XHRcInR5cGVcIjogXCJpbWFnZVwiLFxuXHRcdFx0XHRcImlkXCI6IFwic2hvZVwiXG5cdFx0XHR9LFxuXHRcdFx0XCJjb21tZW50c1wiOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRcInBlcnNvbi1uYW1lXCI6IFwibWFydGFcIixcblx0XHRcdFx0XHRcInBlcnNvbi10ZXh0XCI6IFwiRGVlcCBibHVlICNjYW1wZXJzaG9lc1wiXG5cdFx0XHRcdH1cblx0XHRcdF1cblx0XHR9LHtcblx0XHRcdFwiaWRcIjogXCJkZWlhXCIsXG5cdFx0XHRcInBlcnNvblwiOiBcIm1hcnRhXCIsXG5cdFx0XHRcInRpbWVcIjogXCIyIG1pbiBhZ29cIixcblx0XHRcdFwibWVkaWFcIjoge1xuXHRcdFx0XHRcInR5cGVcIjogXCJpbWFnZVwiLFxuXHRcdFx0XHRcImlkXCI6IFwiY2hhcmFjdGVyXCJcblx0XHRcdH0sXG5cdFx0XHRcImNvbW1lbnRzXCI6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdFwicGVyc29uLW5hbWVcIjogXCJtYXJ0YVwiLFxuXHRcdFx0XHRcdFwicGVyc29uLXRleHRcIjogXCJUaGFua3MgZm9yIHRoZSBmbG93ZXJzIEBNYXRlbyBzb29vIGN1dXV0ZS5cIlxuXHRcdFx0XHR9XG5cdFx0XHRdXG5cdFx0fSx7XG5cdFx0XHRcImlkXCI6IFwiZGVpYVwiLFxuXHRcdFx0XCJwZXJzb25cIjogXCJtYXJ0YVwiLFxuXHRcdFx0XCJ0aW1lXCI6IFwiMiBtaW4gYWdvXCIsXG5cdFx0XHRcIm1lZGlhXCI6IHtcblx0XHRcdFx0XCJ0eXBlXCI6IFwidmlkZW9cIixcblx0XHRcdFx0XCJpZFwiOiBcImZ1bi1mYWN0XCJcblx0XHRcdH0sXG5cdFx0XHRcImNvbW1lbnRzXCI6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdFwicGVyc29uLW5hbWVcIjogXCJtYXJ0YVwiLFxuXHRcdFx0XHRcdFwicGVyc29uLXRleHRcIjogXCJNZSBiZWluZyBtZeKApiBIZWhlIDopIDxzcGFuPiNjYW1wZXI8L3NwYW4+XCJcblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdH0se1xuXHRcdFx0XCJpZFwiOiBcImRlaWFcIixcblx0XHRcdFwicGVyc29uXCI6IFwibWFydGFcIixcblx0XHRcdFwidGltZVwiOiBcIjIgbWluIGFnb1wiLFxuXHRcdFx0XCJtZWRpYVwiOiB7XG5cdFx0XHRcdFwidHlwZVwiOiBcInZpZGVvXCIsXG5cdFx0XHRcdFwiaWRcIjogXCJjaGFyYWN0ZXJcIlxuXHRcdFx0fSxcblx0XHRcdFwiY29tbWVudHNcIjogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0XCJwZXJzb24tbmFtZVwiOiBcIm1hcnRhXCIsXG5cdFx0XHRcdFx0XCJwZXJzb24tdGV4dFwiOiBcIkxhcyBmbG9yZXMgcXVlIEBtYXRlbyBtZSByZWdhbG8uICNNYWxsb3JjYUJ5Q2FtcGVyXCJcblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdH0se1xuXHRcdFx0XCJpZFwiOiBcImVzLXRyZW5jXCIsXG5cdFx0XHRcInBlcnNvblwiOiBcImJlbHVnYVwiLFxuXHRcdFx0XCJ0aW1lXCI6IFwiMiBtaW4gYWdvXCIsXG5cdFx0XHRcIm1lZGlhXCI6IHtcblx0XHRcdFx0XCJ0eXBlXCI6IFwiaW1hZ2VcIixcblx0XHRcdFx0XCJpZFwiOiBcInNob2VcIlxuXHRcdFx0fSxcblx0XHRcdFwiY29tbWVudHNcIjogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0XCJwZXJzb24tbmFtZVwiOiBcImJlbHVnYVwiLFxuXHRcdFx0XHRcdFwicGVyc29uLXRleHRcIjogXCJNZSBiZWluZyBtZS4uLiBIZWhlIDopICNjYW1wZXJzaG9lcyAjQmVsdWdhXCJcblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdH0se1xuXHRcdFx0XCJpZFwiOiBcImVzLXRyZW5jXCIsXG5cdFx0XHRcInBlcnNvblwiOiBcImJlbHVnYVwiLFxuXHRcdFx0XCJ0aW1lXCI6IFwiMiBtaW4gYWdvXCIsXG5cdFx0XHRcIm1lZGlhXCI6IHtcblx0XHRcdFx0XCJ0eXBlXCI6IFwiaW1hZ2VcIixcblx0XHRcdFx0XCJpZFwiOiBcImNoYXJhY3RlclwiXG5cdFx0XHR9LFxuXHRcdFx0XCJjb21tZW50c1wiOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRcInBlcnNvbi1uYW1lXCI6IFwiYmVsdWdhXCIsXG5cdFx0XHRcdFx0XCJwZXJzb24tdGV4dFwiOiBcIkVzIFRyZW5jIGlzIHRoZSBwbGFjZSB0byBiZS4gXCJcblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdH0se1xuXHRcdFx0XCJpZFwiOiBcImVzLXRyZW5jXCIsXG5cdFx0XHRcInBlcnNvblwiOiBcImJlbHVnYVwiLFxuXHRcdFx0XCJ0aW1lXCI6IFwiMiBtaW4gYWdvXCIsXG5cdFx0XHRcIm1lZGlhXCI6IHtcblx0XHRcdFx0XCJ0eXBlXCI6IFwidmlkZW9cIixcblx0XHRcdFx0XCJpZFwiOiBcImZ1bi1mYWN0XCJcblx0XHRcdH0sXG5cdFx0XHRcImNvbW1lbnRzXCI6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdFwicGVyc29uLW5hbWVcIjogXCJiZWx1Z2FcIixcblx0XHRcdFx0XHRcInBlcnNvbi10ZXh0XCI6IFwiTWUgYmVpbmcgbWXigKYgSGVoZSA6KSA8c3Bhbj4jY2FtcGVyPC9zcGFuPlwiXG5cdFx0XHRcdH1cblx0XHRcdF1cblx0XHR9LHtcblx0XHRcdFwiaWRcIjogXCJlcy10cmVuY1wiLFxuXHRcdFx0XCJwZXJzb25cIjogXCJiZWx1Z2FcIixcblx0XHRcdFwidGltZVwiOiBcIjIgbWluIGFnb1wiLFxuXHRcdFx0XCJtZWRpYVwiOiB7XG5cdFx0XHRcdFwidHlwZVwiOiBcInZpZGVvXCIsXG5cdFx0XHRcdFwiaWRcIjogXCJjaGFyYWN0ZXJcIlxuXHRcdFx0fSxcblx0XHRcdFwiY29tbWVudHNcIjogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0XCJwZXJzb24tbmFtZVwiOiBcImJlbHVnYVwiLFxuXHRcdFx0XHRcdFwicGVyc29uLXRleHRcIjogXCJBbGwgdGhpcyBzbW9rZSBpcyBub3Qgd2hhdCB5b3UgdGhpbmsgaXQgaXMgI0hpZ2hvbkxpZmVcIlxuXHRcdFx0XHR9XG5cdFx0XHRdXG5cdFx0fSx7XG5cdFx0XHRcImlkXCI6IFwiZXMtdHJlbmNcIixcblx0XHRcdFwicGVyc29uXCI6IFwiaXNhbXVcIixcblx0XHRcdFwidGltZVwiOiBcIjIgbWluIGFnb1wiLFxuXHRcdFx0XCJtZWRpYVwiOiB7XG5cdFx0XHRcdFwidHlwZVwiOiBcImltYWdlXCIsXG5cdFx0XHRcdFwiaWRcIjogXCJzaG9lXCJcblx0XHRcdH0sXG5cdFx0XHRcImNvbW1lbnRzXCI6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdFwicGVyc29uLW5hbWVcIjogXCJpc2FtdVwiLFxuXHRcdFx0XHRcdFwicGVyc29uLXRleHRcIjogXCJTdXBlcm5hdHVyYWwgYmVhdXR5LiBJIGxvdmUgdGhlIG5ldyAjbWVcIlxuXHRcdFx0XHR9XG5cdFx0XHRdXG5cdFx0fSx7XG5cdFx0XHRcImlkXCI6IFwiZXMtdHJlbmNcIixcblx0XHRcdFwicGVyc29uXCI6IFwiaXNhbXVcIixcblx0XHRcdFwidGltZVwiOiBcIjIgbWluIGFnb1wiLFxuXHRcdFx0XCJtZWRpYVwiOiB7XG5cdFx0XHRcdFwidHlwZVwiOiBcImltYWdlXCIsXG5cdFx0XHRcdFwiaWRcIjogXCJjaGFyYWN0ZXJcIlxuXHRcdFx0fSxcblx0XHRcdFwiY29tbWVudHNcIjogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0XCJwZXJzb24tbmFtZVwiOiBcImlzYW11XCIsXG5cdFx0XHRcdFx0XCJwZXJzb24tdGV4dFwiOiBcIlNvIGNhbG0gYXQgRXMgVHJlbmMuXCJcblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdH0se1xuXHRcdFx0XCJpZFwiOiBcImVzLXRyZW5jXCIsXG5cdFx0XHRcInBlcnNvblwiOiBcImlzYW11XCIsXG5cdFx0XHRcInRpbWVcIjogXCIyIG1pbiBhZ29cIixcblx0XHRcdFwibWVkaWFcIjoge1xuXHRcdFx0XHRcInR5cGVcIjogXCJ2aWRlb1wiLFxuXHRcdFx0XHRcImlkXCI6IFwiZnVuLWZhY3RcIlxuXHRcdFx0fSxcblx0XHRcdFwiY29tbWVudHNcIjogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0XCJwZXJzb24tbmFtZVwiOiBcImlzYW11XCIsXG5cdFx0XHRcdFx0XCJwZXJzb24tdGV4dFwiOiBcIk1lIGJlaW5nIG1l4oCmIEhlaGUgOikgPHNwYW4+I2NhbXBlcjwvc3Bhbj5cIlxuXHRcdFx0XHR9XG5cdFx0XHRdXG5cdFx0fSx7XG5cdFx0XHRcImlkXCI6IFwiZXMtdHJlbmNcIixcblx0XHRcdFwicGVyc29uXCI6IFwiaXNhbXVcIixcblx0XHRcdFwidGltZVwiOiBcIjIgbWluIGFnb1wiLFxuXHRcdFx0XCJtZWRpYVwiOiB7XG5cdFx0XHRcdFwidHlwZVwiOiBcInZpZGVvXCIsXG5cdFx0XHRcdFwiaWRcIjogXCJjaGFyYWN0ZXJcIlxuXHRcdFx0fSxcblx0XHRcdFwiY29tbWVudHNcIjogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0XCJwZXJzb24tbmFtZVwiOiBcImlzYW11XCIsXG5cdFx0XHRcdFx0XCJwZXJzb24tdGV4dFwiOiBcIkhpaWlpISEhIDopICNNYWxsb3JjYUJ5Q2FtcGVyXCJcblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdH0sXG5cblx0XHR7XG5cdFx0XHRcImlkXCI6IFwiYXJlbGx1ZlwiLFxuXHRcdFx0XCJwZXJzb25cIjogXCJjYXBhc1wiLFxuXHRcdFx0XCJ0aW1lXCI6IFwiMiBtaW4gYWdvXCIsXG5cdFx0XHRcIm1lZGlhXCI6IHtcblx0XHRcdFx0XCJ0eXBlXCI6IFwiaW1hZ2VcIixcblx0XHRcdFx0XCJpZFwiOiBcInNob2VcIlxuXHRcdFx0fSxcblx0XHRcdFwiY29tbWVudHNcIjogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0XCJwZXJzb24tbmFtZVwiOiBcImNhcGFzXCIsXG5cdFx0XHRcdFx0XCJwZXJzb24tdGV4dFwiOiBcIk5ldyBjb2xvcnMuIFNhbWUgZW5lcmd5XCJcblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdH0se1xuXHRcdFx0XCJpZFwiOiBcImFyZWxsdWZcIixcblx0XHRcdFwicGVyc29uXCI6IFwiY2FwYXNcIixcblx0XHRcdFwidGltZVwiOiBcIjIgbWluIGFnb1wiLFxuXHRcdFx0XCJtZWRpYVwiOiB7XG5cdFx0XHRcdFwidHlwZVwiOiBcImltYWdlXCIsXG5cdFx0XHRcdFwiaWRcIjogXCJjaGFyYWN0ZXJcIlxuXHRcdFx0fSxcblx0XHRcdFwiY29tbWVudHNcIjogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0XCJwZXJzb24tbmFtZVwiOiBcImNhcGFzXCIsXG5cdFx0XHRcdFx0XCJwZXJzb24tdGV4dFwiOiBcIkxhc3QgbmlnaHQgd2FzIGluLXNhbmUuXCJcblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdH0se1xuXHRcdFx0XCJpZFwiOiBcImFyZWxsdWZcIixcblx0XHRcdFwicGVyc29uXCI6IFwiY2FwYXNcIixcblx0XHRcdFwidGltZVwiOiBcIjIgbWluIGFnb1wiLFxuXHRcdFx0XCJtZWRpYVwiOiB7XG5cdFx0XHRcdFwidHlwZVwiOiBcInZpZGVvXCIsXG5cdFx0XHRcdFwiaWRcIjogXCJmdW4tZmFjdFwiXG5cdFx0XHR9LFxuXHRcdFx0XCJjb21tZW50c1wiOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRcInBlcnNvbi1uYW1lXCI6IFwiY2FwYXNcIixcblx0XHRcdFx0XHRcInBlcnNvbi10ZXh0XCI6IFwiTWUgYmVpbmcgbWXigKYgSGVoZSA6KSA8c3Bhbj4jY2FtcGVyPC9zcGFuPlwiXG5cdFx0XHRcdH1cblx0XHRcdF1cblx0XHR9LHtcblx0XHRcdFwiaWRcIjogXCJhcmVsbHVmXCIsXG5cdFx0XHRcInBlcnNvblwiOiBcImNhcGFzXCIsXG5cdFx0XHRcInRpbWVcIjogXCIyIG1pbiBhZ29cIixcblx0XHRcdFwibWVkaWFcIjoge1xuXHRcdFx0XHRcInR5cGVcIjogXCJ2aWRlb1wiLFxuXHRcdFx0XHRcImlkXCI6IFwiY2hhcmFjdGVyXCJcblx0XHRcdH0sXG5cdFx0XHRcImNvbW1lbnRzXCI6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdFwicGVyc29uLW5hbWVcIjogXCJjYXBhc1wiLFxuXHRcdFx0XHRcdFwicGVyc29uLXRleHRcIjogXCJTbyBtdWNoIGZ1biBNYWxsb3JjYSAjTWFsbG9yY2FCeUNhbXBlclwiXG5cdFx0XHRcdH1cblx0XHRcdF1cblx0XHR9LFxuXG5cdFx0e1xuXHRcdFx0XCJpZFwiOiBcImFyZWxsdWZcIixcblx0XHRcdFwicGVyc29uXCI6IFwicGVsb3Rhc1wiLFxuXHRcdFx0XCJ0aW1lXCI6IFwiMiBtaW4gYWdvXCIsXG5cdFx0XHRcIm1lZGlhXCI6IHtcblx0XHRcdFx0XCJ0eXBlXCI6IFwiaW1hZ2VcIixcblx0XHRcdFx0XCJpZFwiOiBcInNob2VcIlxuXHRcdFx0fSxcblx0XHRcdFwiY29tbWVudHNcIjogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0XCJwZXJzb24tbmFtZVwiOiBcInBlbG90YXNcIixcblx0XHRcdFx0XHRcInBlcnNvbi10ZXh0XCI6IFwiQ2hlY2sgb3V0IG15IG1vbGRlZCBQZWxvdGFzXCJcblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdH0se1xuXHRcdFx0XCJpZFwiOiBcImFyZWxsdWZcIixcblx0XHRcdFwicGVyc29uXCI6IFwicGVsb3Rhc1wiLFxuXHRcdFx0XCJ0aW1lXCI6IFwiMiBtaW4gYWdvXCIsXG5cdFx0XHRcIm1lZGlhXCI6IHtcblx0XHRcdFx0XCJ0eXBlXCI6IFwiaW1hZ2VcIixcblx0XHRcdFx0XCJpZFwiOiBcImNoYXJhY3RlclwiXG5cdFx0XHR9LFxuXHRcdFx0XCJjb21tZW50c1wiOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRcInBlcnNvbi1uYW1lXCI6IFwicGVsb3Rhc1wiLFxuXHRcdFx0XHRcdFwicGVyc29uLXRleHRcIjogXCJSaWRlcnMgb2YgTWFsbG9yZGEgI2NhbXBlcnNob2VzXCJcblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdH0se1xuXHRcdFx0XCJpZFwiOiBcImFyZWxsdWZcIixcblx0XHRcdFwicGVyc29uXCI6IFwicGVsb3Rhc1wiLFxuXHRcdFx0XCJ0aW1lXCI6IFwiMiBtaW4gYWdvXCIsXG5cdFx0XHRcIm1lZGlhXCI6IHtcblx0XHRcdFx0XCJ0eXBlXCI6IFwidmlkZW9cIixcblx0XHRcdFx0XCJpZFwiOiBcImZ1bi1mYWN0XCJcblx0XHRcdH0sXG5cdFx0XHRcImNvbW1lbnRzXCI6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdFwicGVyc29uLW5hbWVcIjogXCJwZWxvdGFzXCIsXG5cdFx0XHRcdFx0XCJwZXJzb24tdGV4dFwiOiBcIldoYXQgaGFwcGVucyBpbiBBcmVsbHVmIHN0YXlzIGluICNBcmVsbHVmXCJcblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdH0se1xuXHRcdFx0XCJpZFwiOiBcImFyZWxsdWZcIixcblx0XHRcdFwicGVyc29uXCI6IFwicGVsb3Rhc1wiLFxuXHRcdFx0XCJ0aW1lXCI6IFwiMiBtaW4gYWdvXCIsXG5cdFx0XHRcIm1lZGlhXCI6IHtcblx0XHRcdFx0XCJ0eXBlXCI6IFwidmlkZW9cIixcblx0XHRcdFx0XCJpZFwiOiBcImNoYXJhY3RlclwiXG5cdFx0XHR9LFxuXHRcdFx0XCJjb21tZW50c1wiOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRcInBlcnNvbi1uYW1lXCI6IFwicGVsb3Rhc1wiLFxuXHRcdFx0XHRcdFwicGVyc29uLXRleHRcIjogXCJObyBub25zZW5zZSAjc2VsZmllICNNYWxsb3JjYUJ5Q2FtcGVyXCJcblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdH0sXG5cblx0XHR7XG5cdFx0XHRcImlkXCI6IFwiYXJlbGx1ZlwiLFxuXHRcdFx0XCJwZXJzb25cIjogXCJtYXJ0YVwiLFxuXHRcdFx0XCJ0aW1lXCI6IFwiMiBtaW4gYWdvXCIsXG5cdFx0XHRcIm1lZGlhXCI6IHtcblx0XHRcdFx0XCJ0eXBlXCI6IFwiaW1hZ2VcIixcblx0XHRcdFx0XCJpZFwiOiBcInNob2VcIlxuXHRcdFx0fSxcblx0XHRcdFwiY29tbWVudHNcIjogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0XCJwZXJzb24tbmFtZVwiOiBcIm1hcnRhXCIsXG5cdFx0XHRcdFx0XCJwZXJzb24tdGV4dFwiOiBcIlRoZXNlIG5ldyBDYW1wZXJzIGFyZSBEYSBib21iXCJcblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdH0se1xuXHRcdFx0XCJpZFwiOiBcImFyZWxsdWZcIixcblx0XHRcdFwicGVyc29uXCI6IFwibWFydGFcIixcblx0XHRcdFwidGltZVwiOiBcIjIgbWluIGFnb1wiLFxuXHRcdFx0XCJtZWRpYVwiOiB7XG5cdFx0XHRcdFwidHlwZVwiOiBcImltYWdlXCIsXG5cdFx0XHRcdFwiaWRcIjogXCJjaGFyYWN0ZXJcIlxuXHRcdFx0fSxcblx0XHRcdFwiY29tbWVudHNcIjogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0XCJwZXJzb24tbmFtZVwiOiBcIm1hcnRhXCIsXG5cdFx0XHRcdFx0XCJwZXJzb24tdGV4dFwiOiBcIkknbSBub3QgZ29pbmcgaW4gdGhlIHBvb2wgbGlrZSB0aGlzLlwiXG5cdFx0XHRcdH1cblx0XHRcdF1cblx0XHR9LHtcblx0XHRcdFwiaWRcIjogXCJhcmVsbHVmXCIsXG5cdFx0XHRcInBlcnNvblwiOiBcIm1hcnRhXCIsXG5cdFx0XHRcInRpbWVcIjogXCIyIG1pbiBhZ29cIixcblx0XHRcdFwibWVkaWFcIjoge1xuXHRcdFx0XHRcInR5cGVcIjogXCJ2aWRlb1wiLFxuXHRcdFx0XHRcImlkXCI6IFwiZnVuLWZhY3RcIlxuXHRcdFx0fSxcblx0XHRcdFwiY29tbWVudHNcIjogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0XCJwZXJzb24tbmFtZVwiOiBcIm1hcnRhXCIsXG5cdFx0XHRcdFx0XCJwZXJzb24tdGV4dFwiOiBcIk1lIGJlaW5nIG1l4oCmIEhlaGUgOikgPHNwYW4+I2NhbXBlcjwvc3Bhbj5cIlxuXHRcdFx0XHR9XG5cdFx0XHRdXG5cdFx0fSx7XG5cdFx0XHRcImlkXCI6IFwiYXJlbGx1ZlwiLFxuXHRcdFx0XCJwZXJzb25cIjogXCJtYXJ0YVwiLFxuXHRcdFx0XCJ0aW1lXCI6IFwiMiBtaW4gYWdvXCIsXG5cdFx0XHRcIm1lZGlhXCI6IHtcblx0XHRcdFx0XCJ0eXBlXCI6IFwidmlkZW9cIixcblx0XHRcdFx0XCJpZFwiOiBcImNoYXJhY3RlclwiXG5cdFx0XHR9LFxuXHRcdFx0XCJjb21tZW50c1wiOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRcInBlcnNvbi1uYW1lXCI6IFwibWFydGFcIixcblx0XHRcdFx0XHRcInBlcnNvbi10ZXh0XCI6IFwiQWZ0ZXIgcGFydHkuIEFmdGVyIGxpZmUgI1NlbGZpZUxpZmUgI01hbGxvcmNhQnlDYW1wZXJcIlxuXHRcdFx0XHR9XG5cdFx0XHRdXG5cdFx0fSxcblxuXHRcdHtcblx0XHRcdFwiaWRcIjogXCJhcmVsbHVmXCIsXG5cdFx0XHRcInBlcnNvblwiOiBcImtvYmFyYWhcIixcblx0XHRcdFwidGltZVwiOiBcIjIgbWluIGFnb1wiLFxuXHRcdFx0XCJtZWRpYVwiOiB7XG5cdFx0XHRcdFwidHlwZVwiOiBcImltYWdlXCIsXG5cdFx0XHRcdFwiaWRcIjogXCJzaG9lXCJcblx0XHRcdH0sXG5cdFx0XHRcImNvbW1lbnRzXCI6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdFwicGVyc29uLW5hbWVcIjogXCJrb2JhcmFoXCIsXG5cdFx0XHRcdFx0XCJwZXJzb24tdGV4dFwiOiBcIkkgZGFyZSB5b3VcIlxuXHRcdFx0XHR9XG5cdFx0XHRdXG5cdFx0fSx7XG5cdFx0XHRcImlkXCI6IFwiYXJlbGx1ZlwiLFxuXHRcdFx0XCJwZXJzb25cIjogXCJrb2JhcmFoXCIsXG5cdFx0XHRcInRpbWVcIjogXCIyIG1pbiBhZ29cIixcblx0XHRcdFwibWVkaWFcIjoge1xuXHRcdFx0XHRcInR5cGVcIjogXCJpbWFnZVwiLFxuXHRcdFx0XHRcImlkXCI6IFwiY2hhcmFjdGVyXCJcblx0XHRcdH0sXG5cdFx0XHRcImNvbW1lbnRzXCI6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdFwicGVyc29uLW5hbWVcIjogXCJrb2JhcmFoXCIsXG5cdFx0XHRcdFx0XCJwZXJzb24tdGV4dFwiOiBcIldpc2ggeW91IHdlcmUgaGVyZSAjYXJlbGx1ZlwiXG5cdFx0XHRcdH1cblx0XHRcdF1cblx0XHR9LHtcblx0XHRcdFwiaWRcIjogXCJhcmVsbHVmXCIsXG5cdFx0XHRcInBlcnNvblwiOiBcImtvYmFyYWhcIixcblx0XHRcdFwidGltZVwiOiBcIjIgbWluIGFnb1wiLFxuXHRcdFx0XCJtZWRpYVwiOiB7XG5cdFx0XHRcdFwidHlwZVwiOiBcInZpZGVvXCIsXG5cdFx0XHRcdFwiaWRcIjogXCJmdW4tZmFjdFwiXG5cdFx0XHR9LFxuXHRcdFx0XCJjb21tZW50c1wiOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRcInBlcnNvbi1uYW1lXCI6IFwia29iYXJhaFwiLFxuXHRcdFx0XHRcdFwicGVyc29uLXRleHRcIjogXCJIYXRlcnMgd2lsbCBzYXkgaXQncyBQaG90b3Nob3BcIlxuXHRcdFx0XHR9XG5cdFx0XHRdXG5cdFx0fSx7XG5cdFx0XHRcImlkXCI6IFwiYXJlbGx1ZlwiLFxuXHRcdFx0XCJwZXJzb25cIjogXCJrb2JhcmFoXCIsXG5cdFx0XHRcInRpbWVcIjogXCIyIG1pbiBhZ29cIixcblx0XHRcdFwibWVkaWFcIjoge1xuXHRcdFx0XHRcInR5cGVcIjogXCJ2aWRlb1wiLFxuXHRcdFx0XHRcImlkXCI6IFwiY2hhcmFjdGVyXCJcblx0XHRcdH0sXG5cdFx0XHRcImNvbW1lbnRzXCI6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdFwicGVyc29uLW5hbWVcIjogXCJrb2JhcmFoXCIsXG5cdFx0XHRcdFx0XCJwZXJzb24tdGV4dFwiOiBcIkNhbGwgbWUgUGFuZGVtb25pYSAjTWFsbG9yY2FCeUNhbXBlclwiXG5cdFx0XHRcdH1cblx0XHRcdF1cblx0XHR9LFxuXG5cdFx0e1xuXHRcdFx0XCJpZFwiOiBcImFyZWxsdWZcIixcblx0XHRcdFwicGVyc29uXCI6IFwiZHViXCIsXG5cdFx0XHRcInRpbWVcIjogXCIyIG1pbiBhZ29cIixcblx0XHRcdFwibWVkaWFcIjoge1xuXHRcdFx0XHRcInR5cGVcIjogXCJpbWFnZVwiLFxuXHRcdFx0XHRcImlkXCI6IFwic2hvZVwiXG5cdFx0XHR9LFxuXHRcdFx0XCJjb21tZW50c1wiOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRcInBlcnNvbi1uYW1lXCI6IFwiZHViXCIsXG5cdFx0XHRcdFx0XCJwZXJzb24tdGV4dFwiOiBcIk15IG5ldyBDYW1wZXJzIGFyZSB0aGUgU1VWIG9mIHNob2VzXCJcblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdH0se1xuXHRcdFx0XCJpZFwiOiBcImFyZWxsdWZcIixcblx0XHRcdFwicGVyc29uXCI6IFwiZHViXCIsXG5cdFx0XHRcInRpbWVcIjogXCIyIG1pbiBhZ29cIixcblx0XHRcdFwibWVkaWFcIjoge1xuXHRcdFx0XHRcInR5cGVcIjogXCJpbWFnZVwiLFxuXHRcdFx0XHRcImlkXCI6IFwiY2hhcmFjdGVyXCJcblx0XHRcdH0sXG5cdFx0XHRcImNvbW1lbnRzXCI6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdFwicGVyc29uLW5hbWVcIjogXCJkdWJcIixcblx0XHRcdFx0XHRcInBlcnNvbi10ZXh0XCI6IFwiRnJlZSBkaXZpbmcgZXhjdXJzaW9ucyB0aGlzIGFmdGVybm9vbiBhdCAjYXJlbGx1Zi4gUE0gbWUgaWYgaW50ZXJlc3RlZFwiXG5cdFx0XHRcdH1cblx0XHRcdF1cblx0XHR9LHtcblx0XHRcdFwiaWRcIjogXCJhcmVsbHVmXCIsXG5cdFx0XHRcInBlcnNvblwiOiBcImR1YlwiLFxuXHRcdFx0XCJ0aW1lXCI6IFwiMiBtaW4gYWdvXCIsXG5cdFx0XHRcIm1lZGlhXCI6IHtcblx0XHRcdFx0XCJ0eXBlXCI6IFwidmlkZW9cIixcblx0XHRcdFx0XCJpZFwiOiBcImZ1bi1mYWN0XCJcblx0XHRcdH0sXG5cdFx0XHRcImNvbW1lbnRzXCI6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdFwicGVyc29uLW5hbWVcIjogXCJkdWJcIixcblx0XHRcdFx0XHRcInBlcnNvbi10ZXh0XCI6IFwiTWUgYmVpbmcgbWXigKYgSGVoZSA6KSA8c3Bhbj4jY2FtcGVyPC9zcGFuPlwiXG5cdFx0XHRcdH1cblx0XHRcdF1cblx0XHR9LHtcblx0XHRcdFwiaWRcIjogXCJhcmVsbHVmXCIsXG5cdFx0XHRcInBlcnNvblwiOiBcImR1YlwiLFxuXHRcdFx0XCJ0aW1lXCI6IFwiMiBtaW4gYWdvXCIsXG5cdFx0XHRcIm1lZGlhXCI6IHtcblx0XHRcdFx0XCJ0eXBlXCI6IFwidmlkZW9cIixcblx0XHRcdFx0XCJpZFwiOiBcImNoYXJhY3RlclwiXG5cdFx0XHR9LFxuXHRcdFx0XCJjb21tZW50c1wiOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRcInBlcnNvbi1uYW1lXCI6IFwiZHViXCIsXG5cdFx0XHRcdFx0XCJwZXJzb24tdGV4dFwiOiBcIlBlYWNlIFnigJlhbGwgI01hbGxvcmNhQnlDYW1wZXJcIlxuXHRcdFx0XHR9XG5cdFx0XHRdXG5cdFx0fSxcblxuXHRcdHtcblx0XHRcdFwiaWRcIjogXCJhcmVsbHVmXCIsXG5cdFx0XHRcInBlcnNvblwiOiBcInBhcmFkaXNlXCIsXG5cdFx0XHRcInRpbWVcIjogXCIyIG1pbiBhZ29cIixcblx0XHRcdFwibWVkaWFcIjoge1xuXHRcdFx0XHRcInR5cGVcIjogXCJpbWFnZVwiLFxuXHRcdFx0XHRcImlkXCI6IFwic2hvZVwiXG5cdFx0XHR9LFxuXHRcdFx0XCJjb21tZW50c1wiOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRcInBlcnNvbi1uYW1lXCI6IFwicGFyYWRpc2VcIixcblx0XHRcdFx0XHRcInBlcnNvbi10ZXh0XCI6IFwiQm9sZCBhbmQgQmVhdXRpZnVsXCJcblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdH0se1xuXHRcdFx0XCJpZFwiOiBcImFyZWxsdWZcIixcblx0XHRcdFwicGVyc29uXCI6IFwicGFyYWRpc2VcIixcblx0XHRcdFwidGltZVwiOiBcIjIgbWluIGFnb1wiLFxuXHRcdFx0XCJtZWRpYVwiOiB7XG5cdFx0XHRcdFwidHlwZVwiOiBcImltYWdlXCIsXG5cdFx0XHRcdFwiaWRcIjogXCJjaGFyYWN0ZXJcIlxuXHRcdFx0fSxcblx0XHRcdFwiY29tbWVudHNcIjogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0XCJwZXJzb24tbmFtZVwiOiBcInBhcmFkaXNlXCIsXG5cdFx0XHRcdFx0XCJwZXJzb24tdGV4dFwiOiBcIkRldG94IGJ5IHRoZSBwb29sLiBNdWNoIG5lZWRlZC5cIlxuXHRcdFx0XHR9XG5cdFx0XHRdXG5cdFx0fSx7XG5cdFx0XHRcImlkXCI6IFwiYXJlbGx1ZlwiLFxuXHRcdFx0XCJwZXJzb25cIjogXCJwYXJhZGlzZVwiLFxuXHRcdFx0XCJ0aW1lXCI6IFwiMiBtaW4gYWdvXCIsXG5cdFx0XHRcIm1lZGlhXCI6IHtcblx0XHRcdFx0XCJ0eXBlXCI6IFwidmlkZW9cIixcblx0XHRcdFx0XCJpZFwiOiBcImZ1bi1mYWN0XCJcblx0XHRcdH0sXG5cdFx0XHRcImNvbW1lbnRzXCI6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdFwicGVyc29uLW5hbWVcIjogXCJwYXJhZGlzZVwiLFxuXHRcdFx0XHRcdFwicGVyc29uLXRleHRcIjogXCJTZWxmaWUgb24gd2F0ZXJzbGlkZSBsaWtlIGEgYm9zcyAjU2VsZmllUmlkZVwiXG5cdFx0XHRcdH1cblx0XHRcdF1cblx0XHR9LHtcblx0XHRcdFwiaWRcIjogXCJhcmVsbHVmXCIsXG5cdFx0XHRcInBlcnNvblwiOiBcInBhcmFkaXNlXCIsXG5cdFx0XHRcInRpbWVcIjogXCIyIG1pbiBhZ29cIixcblx0XHRcdFwibWVkaWFcIjoge1xuXHRcdFx0XHRcInR5cGVcIjogXCJ2aWRlb1wiLFxuXHRcdFx0XHRcImlkXCI6IFwiY2hhcmFjdGVyXCJcblx0XHRcdH0sXG5cdFx0XHRcImNvbW1lbnRzXCI6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdFwicGVyc29uLW5hbWVcIjogXCJwYXJhZGlzZVwiLFxuXHRcdFx0XHRcdFwicGVyc29uLXRleHRcIjogXCJJIGFtIG5vdCBhIGJpbWJvLlwiXG5cdFx0XHRcdH1cblx0XHRcdF1cblx0XHR9XG5cdF0sXG5cblx0XCJkZWZhdWx0LXJvdXRlXCI6IFwiXCIsXG5cblx0XCJyb3V0aW5nXCI6IHtcblx0XHRcIi9cIjoge1xuXHRcdFx0XCJ0ZXh0c1wiOiB7XG5cdFx0XHRcdFwiZW5cIjoge1xuXHRcdFx0XHRcdFwiZ2VuZXJpY1wiOiBcIlRoZSBTcHJpbmcvU3VtbWVyIDIwMTYgY29sbGVjdGlvbiBpcyBpbnNwaXJlZCBieSBNYWxsb3JjYSwgdGhlIE1lZGl0ZXJyYW5lYW4gaXNsYW5kIHRoYXQgQ2FtcGVyIGNhbGxzIGhvbWUuIE91ciB2aXNpb24gb2YgdGhpcyBzdW5ueSBwYXJhZGlzZSBoaWdobGlnaHRzIHRocmVlIGhvdCBzcG90czogRGVpYSwgRXMgVHJlbmMsIGFuZCBBcmVsbHVmLiBGb3IgdXMsIE1hbGxvcmNhIGlzbuKAmXQganVzdCBhIGRlc3RpbmF0aW9uLCBpdOKAmXMgYSBzdGF0ZSBvZiBtaW5kLiAjTWFsbG9yY2FCeUNhbXBlclwiLFxuXHRcdFx0XHRcdFwiZGVpYVwiOiBcIlRoZSB2aWxsYWdlIG9mIERlaWEgaGFzIGxvbmcgYXR0cmFjdGVkIGJvdGggcmV0aXJlZXMgYW5kIHJvY2sgc3RhcnMgd2l0aCBpdHMgcGljdHVyZXNxdWUgc2NlbmVyeSBhbmQgY2hpbGwgdmliZS4gVGhlIHNlZW1pbmdseSBzbGVlcHkgY291bnRyeXNpZGUgaGFzIGEgYm9oZW1pYW4gc3Bpcml0IHVuaXF1ZSB0byB0aGlzIG1vdW50YWluIGVuY2xhdmUuICNEZWlhQnlDYW1wZXJcIixcblx0XHRcdFx0XHRcImFyZWxsdWZcIjogXCJUaGUgZmlzdC1wdW1waW5nIHJhZ2VycyBvZiBBcmVuYWwgYW5kIHVuYnJpZGxlZCBkZWJhdWNoZXJ5IG9mIE1hZ2FsdWYgbWVldCBpbiBBcmVsbHVmLCBhbiBpbWFnaW5lZCBidXQgZXBpYyBwYXJ0IG9mIG91ciB2aXNpb24gb2YgdGhpcyBiZWxvdmVkIGlzbGFuZC4gSXTigJlzIGFsbCBuZW9uIGFuZCBub24tc3RvcCBwYXJ0eWluZyBpbiB0aGUgc3VtbWVyIHN1biDigJMgcXVpdGUgbGl0ZXJhbGx5IGEgaG90IG1lc3MuICNBcmVsbHVmQnlDYW1wZXJcIixcblx0XHRcdFx0XHRcImVzLXRyZW5jXCI6IFwiVGhpcyBjb2FzdGFsIHdpbGRlcm5lc3MgYm9hc3RzIGJyZWF0aHRha2luZyBiZWFjaGVzIGFuZCBhIHNlcmVuZSBhdG1vc3BoZXJlLiBUaGUgc2Vhc2lkZSBoYXMgYW4gdW50YW1lZCB5ZXQgcGVhY2VmdWwgZmVlbGluZyB0aGF0IGlzIGJvdGggaW5zcGlyaW5nIGFuZCBzb290aGluZy4gI0VzVHJlbmNCeUNhbXBlclwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdFwiZnJcIjoge1xuXHRcdFx0XHRcdFwiZ2VuZXJpY1wiOiBcIkxhIGNvbGxlY3Rpb24gUHJpbnRlbXBzL8OJdMOpIDIwMTYgc+KAmWluc3BpcmUgZGUgTWFqb3JxdWUsIGzigJnDrmxlIG3DqWRpdGVycmFuw6llbm5lIGQnb8O5IENhbXBlciBlc3Qgb3JpZ2luYWlyZS4gTm90cmUgdmlzaW9uIGRlIGNlIHBhcmFkaXMgZW5zb2xlaWxsw6kgc2UgcmVmbMOodGUgZGFucyB0cm9pcyBsaWV1eCBpbmNvbnRvdXJuYWJsZXMgOiBEZWlhLCBFcyBUcmVuYyBldCBBcmVsbHVmLiBQb3VyIG5vdXMsIE1ham9ycXVlIGVzdCBwbHVzIHF14oCZdW5lIHNpbXBsZSBkZXN0aW5hdGlvbiA6IGPigJllc3QgdW4gw6l0YXQgZOKAmWVzcHJpdC4gI01hbGxvcmNhQnlDYW1wZXJcIixcblx0XHRcdFx0XHRcImRlaWFcIjogXCJMZSB2aWxsYWdlIGRlIERlaWEgYXR0aXJlIGRlcHVpcyBsb25ndGVtcHMgbGVzIHJldHJhaXTDqXMgY29tbWUgbGVzIHJvY2sgc3RhcnMgZ3LDomNlIMOgIHNlcyBwYXlzYWdlcyBwaXR0b3Jlc3F1ZXMgZXQgc29uIGFtYmlhbmNlIGTDqWNvbnRyYWN0w6llLiBTYSBjYW1wYWduZSBk4oCZYXBwYXJlbmNlIHRyYW5xdWlsbGUgYWZmaWNoZSB1biBlc3ByaXQgYm9ow6htZSBjYXJhY3TDqXJpc3RpcXVlIGRlIGNldHRlIGVuY2xhdmUgbW9udGFnbmV1c2UuICNEZWlhQnlDYW1wZXJcIixcblx0XHRcdFx0XHRcImFyZWxsdWZcIjogXCJM4oCZZXhhbHRhdGlvbiBk4oCZQXJlbmFsIGV0IGxlcyBzb2lyw6llcyBkw6licmlkw6llcyBkZSBNYWdhbHVmIHNlIHJlam9pZ25lbnQgw6AgQXJlbGx1ZiwgdW4gbGlldSBpbWFnaW5haXJlIG1haXMgY2VudHJhbCBkYW5zIG5vdHJlIHZpc2lvbiBkZSBjZXR0ZSDDrmxlIGFkb3LDqWUuIFRvdXQgeSBlc3QgcXVlc3Rpb24gZGUgZmx1byBldCBkZSBmw6p0ZXMgc2FucyBmaW4gYXUgc29sZWlsIGRlIGzigJnDqXTDqSA6IHVuIGpveWV1eCBiYXphciwgZW4gc29tbWUuICNBcmVsbHVmQnlDYW1wZXJcIixcblx0XHRcdFx0XHRcImVzLXRyZW5jXCI6IFwiQ2V0dGUgbmF0dXJlIHNhdXZhZ2UgY8O0dGnDqHJlIGpvdWl0IGTigJl1bmUgc3VwZXJiZSBwbGFnZSBldCBk4oCZdW5lIGF0bW9zcGjDqHJlIGNhbG1lLiBMZSBib3JkIGRlIG1lciBhIHVuIGPDtHTDqSDDoCBsYSBmb2lzIHRyYW5xdWlsbGUgZXQgaW5kb21wdMOpIHF1aSBpbnNwaXJlIGF1dGFudCBxdeKAmWlsIGFwYWlzZS4gI0VzVHJlbmNCeUNhbXBlclwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdFwiZXNcIjoge1xuXHRcdFx0XHRcdFwiZ2VuZXJpY1wiOiBcIkxhIGNvbGVjY2nDs24gcHJpbWF2ZXJhL3ZlcmFubyAyMDE2IGVzdMOhIGluc3BpcmFkYSBlbiBNYWxsb3JjYSwgbGEgaXNsYSBtZWRpdGVycsOhbmVhIHF1ZSBDYW1wZXIgY29uc2lkZXJhIHN1IGhvZ2FyLiBOdWVzdHJhIHZpc2nDs24gZGUgZXN0ZSBwYXJhw61zbyBzb2xlYWRvIGRlc3RhY2EgdHJlcyBsdWdhcmVzIGltcG9ydGFudGVzOiBEZWlhLCBFcyBUcmVuYyB5IEFyZWxsdWYuIFBhcmEgbm9zb3Ryb3MsIE1hbGxvcmNhIG5vIGVzIHRhbiBzb2xvIHVuIGRlc3Rpbm8sIGVzIHVuIGVzdGFkbyBkZSDDoW5pbW8uICNNYWxsb3JjYUJ5Q2FtcGVyXCIsXG5cdFx0XHRcdFx0XCJkZWlhXCI6IFwiTG9zIGhvcml6b250ZXMgcGludG9yZXNjb3MgeSBsYSB0cmFucXVpbGlkYWQgZGVsIHB1ZWJsbyBkZSBEZWlhIGxsZXZhbiBtdWNobyB0aWVtcG8gY2F1dGl2YW5kbyB0YW50byBhIGFydGlzdGFzIHJldGlyYWRvcyBjb21vIGEgZXN0cmVsbGFzIGRlbCByb2NrLiBFbCBwYWlzYWplIHJ1cmFsIGRlIGFwYXJlbnRlIGNhbG1hIHBvc2VlIHVuIGVzcMOtcml0dSBib2hlbWlvIHByb3BpbyBkZSBlc3RlIGVuY2xhdmUgbW9udGHDsW9zby4gI0RlaWFCeUNhbXBlclwiLFxuXHRcdFx0XHRcdFwiYXJlbGx1ZlwiOiBcIkxhIGxvY3VyYSBmaWVzdGVyYSBkZSBT4oCZQXJlbmFsIHkgZWwgZGVzZW5mcmVubyBkZSBNYWdhbHVmIHNlIHJlw7puZW4gZW4gQXJlbGx1ZiwgdW5hIGNyZWFjacOzbiBkZW50cm8gZGUgbnVlc3RyYSB2aXNpw7NuIGRlIGVzdGEgcXVlcmlkYSBpc2xhLiBUb2RvIGdpcmEgZW4gdG9ybm8gYWwgbmXDs24geSBsYSBmaWVzdGEgc2luIGZpbiBiYWpvIGVsIHNvbC4gRW4gZGVmaW5pdGl2YSwgdW5hIGNvbWJpbmFjacOzbiBleHBsb3NpdmEuICNBcmVsbHVmQnlDYW1wZXJcIixcblx0XHRcdFx0XHRcImVzLXRyZW5jXCI6IFwiRXN0ZSBlc3BhY2lvIG5hdHVyYWwgdmlyZ2VuIGN1ZW50YSBjb24gdW5hIHBsYXlhIGltcHJlc2lvbmFudGUgeSB1biBhbWJpZW50ZSBzZXJlbm8uIExhIGNvc3RhLCBzYWx2YWplIHkgcGFjw61maWNhIGFsIG1pc21vIHRpZW1wbywgdHJhbnNtaXRlIHVuYSBzZW5zYWNpw7NuIGV2b2NhZG9yYSB5IHJlbGFqYW50ZS4gI0VzVHJlbmNCeUNhbXBlclwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdFwiaXRcIjoge1xuXHRcdFx0XHRcdFwiZ2VuZXJpY1wiOiBcIkxhIGNvbGxlemlvbmUgUHJpbWF2ZXJhL0VzdGF0ZSAyMDE2IMOoIGlzcGlyYXRhIGEgTWFpb3JjYSwgbOKAmWlzb2xhIGRlbCBNZWRpdGVycmFuZW8gY2hlIGhhIGRhdG8gaSBuYXRhbGkgYSBDYW1wZXIuIExhIG5vc3RyYSB2aXNpb25lIGRpIHF1ZXN0byBwYXJhZGlzbyBhc3NvbGF0byBzaSBzb2ZmZXJtYSBzdSB0cmUgbHVvZ2hpIHNpbWJvbG86IERlaWEsIEVzIFRyZW5jIGUgQXJlbGx1Zi4gUGVyIG5vaSwgTWFpb3JjYSBub24gw6ggdW5hIHNlbXBsaWNlIG1ldGEsIMOoIHVubyBzdGF0byBkJ2FuaW1vLiAjTWFsbG9yY2FCeUNhbXBlclwiLFxuXHRcdFx0XHRcdFwiZGVpYVwiOiBcIkRhIHRlbXBvLCBpbCB2aWxsYWdnaW8gZGkgRGVpYSBhdHRpcmEgcGVuc2lvbmF0aSBlIHJvY2sgc3RhciBjb24gaWwgc3VvIHBhZXNhZ2dpbyBwaXR0b3Jlc2NvIGUgbCdhdG1vc2ZlcmEgcmlsYXNzYXRhLiBMYSBjYW1wYWduYSBhcHBhcmVudGVtZW50ZSBzb25ub2xlbnRhIGhhIHVubyBzcGlyaXRvIGJvaMOpbWllbiB0aXBpY28gZGkgcXVlc3RvIHBhZXNpbm8gZGkgbW9udGFnbmEuICNEZWlhQnlDYW1wZXJcIixcblx0XHRcdFx0XHRcImFyZWxsdWZcIjogXCJHbGkgc2NhdGVuYXRpIGZlc3RhaW9saSBkaSBBcmVuYWwgZSBsYSBzZnJlbmF0YSBkaXNzb2x1dGV6emEgZGkgTWFnYWx1ZiBzaSBmb25kb25vIGluIEFyZWxsdWYsIHVuYSBwYXJ0ZSBpbW1hZ2luYXJpYSBtYSBlcGljYSBkZWxsYSBub3N0cmEgdmlzaW9uZSBkaSBxdWVzdGEgYWRvcmF0YSBpc29sYS4gw4ggdW4gdHVyYmluaW8gZGkgbHVjaSBhbCBuZW9uIGUgZmVzdGUgaW5pbnRlcnJvdHRlIHNvdHRvIGlsIHNvbGUgZXN0aXZvLCB1biBjYW9zIHBhenplc2NvLiAjQXJlbGx1ZkJ5Q2FtcGVyXCIsXG5cdFx0XHRcdFx0XCJlcy10cmVuY1wiOiBcIlF1ZXN0J2FyZWEgcHJvdGV0dGEgdmFudGEgdW5hIHNwaWFnZ2lhIG1venphZmlhdG8gZSB1bidhdG1vc2ZlcmEgc2VyZW5hLiBJbCBsaXRvcmFsZSBoYSB1biBjaGUgZGkgc2VsdmFnZ2lvLCBtYSBwYWNpZmljbywgY2hlIMOoIHN1Z2dlc3Rpdm8gZSByaWxhc3NhbnRlIGFsIHRlbXBvIHN0ZXNzby4gI0VzVHJlbmNCeUNhbXBlclwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdFwiZGVcIjoge1xuXHRcdFx0XHRcdFwiZ2VuZXJpY1wiOiBcIkRpZSBLb2xsZWt0aW9uIEZyw7xoamFoci9Tb21tZXIgMjAxNiBoYXQgc2ljaCB2b24gTWFsbG9yY2EgaW5zcGlyaWVyZW4gbGFzc2VuLCBkZXIgTWl0dGVsbWVlcmluc2VsLCBhdWYgZGVyIENhbXBlciB6dSBIYXVzZSBpc3QuIFVuc2VyZSBWaXNpb24gZGVzIFNvbm5lbnBhcmFkaWVzZXMgYmVmYXNzdCBzaWNoIG1pdCBkcmVpIEhvdHNwb3RzOiBEZWlhLCBFcyBUcmVuYyB1bmQgQXJlbGx1Zi4gRsO8ciB1bnMgaXN0IE1hbGxvcmNhIG1laHIgYWxzIG51ciBlaW4gUmVpc2V6aWVsLCBlcyBpc3QgZWluZSBMZWJlbnNlaW5zdGVsbHVuZy4gI01hbGxvcmNhQnlDYW1wZXJcIixcblx0XHRcdFx0XHRcImRlaWFcIjogXCJEZXIgT3J0IERlaWEgbWl0IHNlaW5lciBtYWxlcmlzY2hlbiBMYW5kc2NoYWZ0IHVuZCBMw6Rzc2lna2VpdCB6aWVodCBzZWl0IHZpZWxlbiBKYWhyZW4gbmljaHQgbnVyIFBlbnNpb27DpHJlLCBzb25kZXJuIGF1Y2ggUm9ja3N0YXJzIGFuLiBEaWUgdmVyc2NobGFmZW4gYW5tdXRlbmRlIEdlZ2VuZCB2ZXJzcHLDvGh0IGVpbmVuIGdhbnogYmVzb25kZXJlbiBCb2hlbWlhbi1DaGFybWUsIGRlciBlaW56aWdhcnRpZyBpc3QgZsO8ciBkaWVzZSBHZWJpcmdzZW5rbGF2ZS4gI0RlaWFCeUNhbXBlclwiLFxuXHRcdFx0XHRcdFwiYXJlbGx1ZlwiOiBcIkRpZSBnZXN0w6RobHRlbiBLw7ZycGVyIHZvbiBBcmVuYWwgdW5kIGRpZSB1bmdlesO8Z2VsdGUgT2ZmZW5oZWl0IHZvbiBNYWdhbHVmIHRyZWZmZW4gaW4gQXJlbGx1ZiBhdWZlaW5hbmRlciDigJMgZWluIGZhbnRhc2lldm9sbGVzIHVuZCBkb2NoIHVtZmFzc2VuZGVzIEVsZW1lbnQgdW5zZXJlciBWaXNpb24gZGVyIGJlbGllYnRlbiBJbnNlbC4gRWluIFNvbW1lciBhdXMgZW5kbG9zZW4gUGFydHlzIGluIE5lb25mYXJiZW4g4oCTIGVpbiBlY2h0IGhlacOfZXIgT3J0LiAjQXJlbGx1ZkJ5Q2FtcGVyXCIsXG5cdFx0XHRcdFx0XCJlcy10cmVuY1wiOiBcIkRpZXNlciB1bmJlcsO8aHJ0ZSBLw7xzdGVuc3RyZWlmZW4gdmVyZsO8Z3Qgw7xiZXIgZWluZW4gYXRlbWJlcmF1YmVuZGVuIFN0cmFuZCB1bmQgZWluZSBiZXJ1aGlnZW5kZSBBdG1vc3Bow6RyZS4gRGFzIE1lZXIgaXN0IHVuZ2V6w6RobXQgdW5kIGZyaWVkdm9sbCB6dWdsZWljaCB1bmQgZGllbnQgYWxzIFF1ZWxsZSBkZXIgSW5zcGlyYXRpb24gZWJlbnNvIHdpZSBhbHMgUnVoZXBvbC4gI0VzVHJlbmNCeUNhbXBlclwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdFwicHRcIjoge1xuXHRcdFx0XHRcdFwiZ2VuZXJpY1wiOiBcIkEgY29sZcOnw6NvIHByaW1hdmVyYS92ZXLDo28gMjAxNiB0ZW0gTWFpb3JjYSBjb21vIGluc3BpcmHDp8OjbywgYSBpbGhhIG1lZGl0ZXJyw6JuZWEgcXVlIGEgQ2FtcGVyIGNoYW1hIGRlIGNhc2EuIEEgbm9zc2Egdmlzw6NvIGRlc3RlIHBhcmHDrXNvIHNvbGFyZW5nbyByZWFsw6dhIHRyw6pzIGxvY2FpcyBpbXBvcnRhbnRlczogRGVpYSwgRXMgVHJlbmMgZSBBcmVsbHVmLiBQYXJhIG7Ds3MsIE1haW9yY2EgbsOjbyDDqSBzw7MgdW0gZGVzdGlubyBkZSBmw6lyaWFzLCBtYXMgdGFtYsOpbSB1bSBlc3RhZG8gZGUgZXNww61yaXRvLiAjTWFsbG9yY2FCeUNhbXBlclwiLFxuXHRcdFx0XHRcdFwiZGVpYVwiOiBcIkEgYWxkZWlhIGRlIERlaWEgc2VtcHJlIGF0cmFpdSByZWZvcm1hZG9zIGUgZXN0cmVsYXMgZGUgcm9jayBkZXZpZG8gw6Agc3VhIHBhaXNhZ2VtIHBpdG9yZXNjYSBlIGFtYmllbnRlIGRlc2NvbnRyYcOtZG8uIEVzdGEgYWxkZWlhIGNhbXBlc3RyZSBhcGFyZW50ZW1lbnRlIHBhY2F0YSB0ZW0gdW0gZXNww61yaXRvIGJvw6ltaW8sIGV4Y2x1c2l2byBkZXN0ZSBlbmNsYXZlIG1vbnRhbmhvc28uICNEZWlhQnlDYW1wZXJcIixcblx0XHRcdFx0XHRcImFyZWxsdWZcIjogXCJBcyBncmFuZGVzIGZlc3RhcyBkZSBBcmVuYWwgZSBhIGRpdmVyc8OjbyBzZW0gbGltaXRlcyBkZSBNYWdhbHVmIHJlw7puZW0tc2UgZW0gQXJlbGx1ZiwgdW1hIHBhcnRlIGltYWdpbmFkYSBtYXMgw6lwaWNhIGRhIG5vc3NhIHZpc8OjbyBkZXN0YSBpbGhhIHTDo28gYW1hZGEgcG9yIG7Ds3MuIEEgY29tYmluYcOnw6NvIHBlcmZlaXRhIGVudHJlIHRvbnMgbsOpb24gZSBmZXN0YXMgaW1wYXLDoXZlaXMgc29iIG8gc29sIGRlIHZlcsOjbyAodW1hIG1pc3R1cmEgYmVtIHF1ZW50ZSwgbmEgcmVhbGlkYWRlKS4gI0FyZWxsdWZCeUNhbXBlclwiLFxuXHRcdFx0XHRcdFwiZXMtdHJlbmNcIjogXCJFc3RhIHZhc3RhIHJlZ2nDo28gY29zdGVpcmEgcG9zc3VpIHByYWlhcyBpbXByZXNzaW9uYW50ZXMgZSB1bSBhbWJpZW50ZSBzZXJlbm8uIE8gbGl0b3JhbCB0ZW0gdW1hIGF0bW9zZmVyYSBzZWx2YWdlbSBlIHRyYW5xdWlsYSBhbyBtZXNtbyB0ZW1wbywgcXVlIMOpIHRhbnRvIGluc3BpcmFkb3JhIGNvbW8gcmVsYXhhbnRlLiAjRXNUcmVuY0J5Q2FtcGVyXCJcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdFwiYXNzZXRzXCI6IFtcblx0XHRcdFx0XCJiYWNrZ3JvdW5kLmpwZ1wiLFxuXHRcdFx0XHRcImRpc3BsYWNlbWVudC5qcGdcIixcblx0XHRcdFx0XCJ2aWRlby1zaG90cy9hcmVsbHVmLWNhcGFzLmpwZ1wiLFxuXHRcdFx0XHRcInZpZGVvLXNob3RzL2FyZWxsdWYtZHViLmpwZ1wiLFxuXHRcdFx0XHRcInZpZGVvLXNob3RzL2FyZWxsdWYta29iYXJhaC5qcGdcIixcblx0XHRcdFx0XCJ2aWRlby1zaG90cy9hcmVsbHVmLXBhcmFkaXNlLmpwZ1wiLFxuXHRcdFx0XHRcInZpZGVvLXNob3RzL2FyZWxsdWYtcGVsb3Rhcy5qcGdcIixcblx0XHRcdFx0XCJ2aWRlby1zaG90cy9hcmVsbHVmLW1hcnRhLmpwZ1wiLFxuXHRcdFx0XHRcInZpZGVvLXNob3RzL2RlaWEtZHViLmpwZ1wiLFxuXHRcdFx0XHRcInZpZGVvLXNob3RzL2RlaWEtbWFydGEuanBnXCIsXG5cdFx0XHRcdFwidmlkZW8tc2hvdHMvZGVpYS1tYXRlby5qcGdcIixcblx0XHRcdFx0XCJ2aWRlby1zaG90cy9lcy10cmVuYy1iZWx1Z2EuanBnXCIsXG5cdFx0XHRcdFwidmlkZW8tc2hvdHMvZXMtdHJlbmMtaXNhbXUuanBnXCJcblx0XHRcdF1cblx0XHR9LFxuXG4gICAgICAgIFwiZGVpYS9kdWJcIjoge1xuICAgICAgICBcdFwic2VsZmllLXN0aWNrLXZpZGVvLXVybFwiOiBcImh0dHA6Ly9lbWJlZC53aXN0aWEuY29tL2RlbGl2ZXJpZXMvMTNiYmI2MTE5NTE2NDg3M2Q4MjNhM2I5MWEyYzgyYWNjZWZiM2VkZC9kZWlhLWR1Yi5tcDRcIixcbiAgICAgICAgXHRcImFtYmllbnQtY29sb3JcIjoge1xuICAgICAgICBcdFx0XCJmcm9tXCI6IHsgXCJoXCI6IDE4OCwgXCJzXCI6IDg1LCBcInZcIjogNjEgfSxcbiAgICAgICAgXHRcdFwidG9cIjogeyBcImhcIjogMzU3LCBcInNcIjogOTcsIFwidlwiOiAyNiB9LFxuICAgICAgICBcdFx0XCJzZWxmaWUtc3RpY2tcIjogeyBcImhcIjogMzU5LCBcInNcIjogOTMsIFwidlwiOiA1MSB9XG4gICAgICAgIFx0fSxcbiAgICAgICAgXHRcImZ1bi1mYWN0LXZpZGVvLXVybFwiOiBcImh0dHA6Ly9lbWJlZC53aXN0aWEuY29tL2RlbGl2ZXJpZXMvYjc0MWVlYjE3MzdhNjgyZjU2NDZjYmExN2UwNDA2MzBhMWRkMDE4YS9kZWlhLWR1Yi5tcDRcIixcbiAgICAgICAgXHRcImZhY3RcIjoge1xuICAgICAgICBcdFx0XCJlblwiOiBcIkJyZWFraW5nIHVwIHZpYSB0ZXh0IG1lc3NhZ2UuIG5vdCBhIHZlcnkgZGVpYSB0aGluZyB0byBkb1wiXG4gICAgICAgIFx0fSxcbiAgICAgICAgXHRcInNob3AtdXJsXCI6IFwiaHR0cDovL3d3dy5jYW1wZXIuY29tL2ludC9tZW4vc2hvZXMvZHViX2RlaWFfc3MyMDE2XCIsXG4gICAgICAgIFx0XCJ3aXN0aWEtY2hhcmFjdGVyLWlkXCI6IFwiYXpqYzJqaDYyalwiLFxuICAgICAgICBcdFwid2lzdGlhLWZ1bi1pZFwiOiBcImxuZnZjM2FnNTBcIlxuICAgICAgICB9LFxuICAgICAgICBcImRlaWEvbWF0ZW9cIjoge1xuICAgICAgICBcdFwic2VsZmllLXN0aWNrLXZpZGVvLXVybFwiOiBcImh0dHA6Ly9lbWJlZC53aXN0aWEuY29tL2RlbGl2ZXJpZXMvZTQyNDg4OWFjMDI2ZjcwZTU0NGFmMDMwMzVlNzE4N2YzNDk0MTcwNS9kZWlhLW1hdGVvLm1wNFwiLFxuICAgICAgICBcdFwiYW1iaWVudC1jb2xvclwiOiB7XG4gICAgICAgIFx0XHRcImZyb21cIjogeyBcImhcIjogMzcsIFwic1wiOiA4OSwgXCJ2XCI6IDgzIH0sXG4gICAgICAgIFx0XHRcInRvXCI6IHsgXCJoXCI6IDgsIFwic1wiOiA4NiwgXCJ2XCI6IDU3IH0sXG4gICAgICAgIFx0XHRcInNlbGZpZS1zdGlja1wiOiB7IFwiaFwiOiA4LCBcInNcIjogODYsIFwidlwiOiA1NyB9XG4gICAgICAgIFx0fSxcbiAgICAgICAgXHRcImZ1bi1mYWN0LXZpZGVvLXVybFwiOiBcImh0dHA6Ly9lbWJlZC53aXN0aWEuY29tL2RlbGl2ZXJpZXMvMzQ0YzcxMTIzODk3NzQ5MGMwNzMwNTA5ZTczYmExMTdmOTQ2NDMzOC9kZWlhLW1hdGVvLm1wNFwiLFxuICAgICAgICBcdFwiZmFjdFwiOiB7XG4gICAgICAgIFx0XHRcImVuXCI6IFwiYnV5cyBhbiBhdGVsaWVyIGF0IGRlaWEuIHN0YXJ0cyBjYXJlZXIgYXMgYW4gYXJ0aXN0XCJcbiAgICAgICAgXHR9LFxuICAgICAgICBcdFwic2hvcC11cmxcIjogXCJodHRwOi8vd3d3LmNhbXBlci5jb20vaW50L21lbi9zaG9lcy9tYXRlb19kZWlhX3NzMjAxNlwiLFxuICAgICAgICBcdFwid2lzdGlhLWNoYXJhY3Rlci1pZFwiOiBcIjZoZXQxa25pazNcIixcbiAgICAgICAgXHRcIndpc3RpYS1mdW4taWRcIjogXCI2cDMybHl2ZHFvXCJcbiAgICAgICAgfSxcblxuICAgICAgICBcImRlaWEvbWFydGFcIjoge1xuICAgICAgICBcdFwic2VsZmllLXN0aWNrLXZpZGVvLXVybFwiOiBcImh0dHA6Ly9lbWJlZC53aXN0aWEuY29tL2RlbGl2ZXJpZXMvNGJiNmU0ODViNzE3YmY3ZGJkZDVjOTQxZmFmYTJiMTg4NGU5MDgzOC9kZWlhLW1hcnRhLm1wNFwiLFxuICAgICAgICBcdFwiYW1iaWVudC1jb2xvclwiOiB7XG4gICAgICAgIFx0XHRcImZyb21cIjogeyBcImhcIjogMzQ2LCBcInNcIjogNzAsIFwidlwiOiA1NSB9LFxuICAgICAgICBcdFx0XCJ0b1wiOiB7IFwiaFwiOiAyNDQsIFwic1wiOiAyOSwgXCJ2XCI6IDczIH0sXG4gICAgICAgIFx0XHRcInNlbGZpZS1zdGlja1wiOiB7IFwiaFwiOiAyNDQsIFwic1wiOiAyOSwgXCJ2XCI6IDczIH1cbiAgICAgICAgXHR9LFxuICAgICAgICBcdFwiZnVuLWZhY3QtdmlkZW8tdXJsXCI6IFwiaHR0cDovL2VtYmVkLndpc3RpYS5jb20vZGVsaXZlcmllcy9kMTU5YjU1ZmY4Y2VjYzljYmQ4YzBjMTJlZTI3ODFlMmVkYTIzZTkzL2RlaWEtbWFydGEubXA0XCIsXG4gICAgICAgIFx0XCJmYWN0XCI6IHtcbiAgICAgICAgXHRcdFwiZW5cIjogXCJGT01PIG9mIG5vdCBiZWluZyBhdCBkZWlhXCJcbiAgICAgICAgXHR9LFxuICAgICAgICBcdFwic2hvcC11cmxcIjogXCJodHRwOi8vd3d3LmNhbXBlci5jb20vaW50L3dvbWVuL3Nob2VzL21hcnRhX2RlaWFfc3MyMDE2XCIsXG4gICAgICAgIFx0XCJ3aXN0aWEtY2hhcmFjdGVyLWlkXCI6IFwidG9ybzJwZTQ2OVwiLFxuICAgICAgICBcdFwid2lzdGlhLWZ1bi1pZFwiOiBcImJna3g3Z21rMTNcIlxuICAgICAgICB9LFxuXG4gICAgICAgIFwiZXMtdHJlbmMvYmVsdWdhXCI6IHtcbiAgICAgICAgXHRcInNlbGZpZS1zdGljay12aWRlby11cmxcIjogXCJodHRwOi8vZW1iZWQud2lzdGlhLmNvbS9kZWxpdmVyaWVzLzIzNDQ0ZDNjODY5M2U1OWY4MDc5ZjgyN2RkMTgyYzVlMzM0MTM4NzcvZXMtdHJlbmMtYmVsdWdhLm1wNFwiLFxuICAgICAgICBcdFwiYW1iaWVudC1jb2xvclwiOiB7XG4gICAgICAgIFx0XHRcImZyb21cIjogeyBcImhcIjogMjEyLCBcInNcIjogMTAsIFwidlwiOiA2OSB9LFxuICAgICAgICBcdFx0XCJ0b1wiOiB7IFwiaFwiOiAxOTMsIFwic1wiOiAxMiwgXCJ2XCI6IDQ1IH0sXG4gICAgICAgIFx0XHRcInNlbGZpZS1zdGlja1wiOiB7IFwiaFwiOiAxOTMsIFwic1wiOiAwLCBcInZcIjogNDUgfVxuICAgICAgICBcdH0sXG4gICAgICAgIFx0XCJmdW4tZmFjdC12aWRlby11cmxcIjogXCJodHRwOi8vZW1iZWQud2lzdGlhLmNvbS9kZWxpdmVyaWVzLzcwNDU1YWQ3M2FmN2I3ZTM1ZTllNjc0MTA5OTI5YzNiNzAyOTQwNjQvZXMtdHJlbmMtYmVsdWdhLm1wNFwiLFxuICAgICAgICBcdFwiZmFjdFwiOiB7XG4gICAgICAgIFx0XHRcImVuXCI6IFwiRXMgVHJlbmMgbnVkaXN0IFBBUlRZIEJPWVwiXG4gICAgICAgIFx0fSxcbiAgICAgICAgXHRcInNob3AtdXJsXCI6IFwiaHR0cDovL3d3dy5jYW1wZXIuY29tL2ludC9tZW4vc2hvZXMvYmVsdWdhX2VzX3RyZW5jX3NzMjAxNlwiLFxuICAgICAgICBcdFwid2lzdGlhLWNoYXJhY3Rlci1pZFwiOiBcImZvMTEyemg3cHZcIixcbiAgICAgICAgXHRcIndpc3RpYS1mdW4taWRcIjogXCI5N2J2cHpodG5iXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJlcy10cmVuYy9pc2FtdVwiOiB7XG4gICAgICAgIFx0XCJzZWxmaWUtc3RpY2stdmlkZW8tdXJsXCI6IFwiaHR0cDovL2VtYmVkLndpc3RpYS5jb20vZGVsaXZlcmllcy82ZWFmYWU3ZjFiM2JjNDFkODU2OTczNTU3YTJmNTE1OThjODI0MWE2L2VzLXRyZW5jLWlzYW11Lm1wNFwiLFxuICAgICAgICBcdFwiYW1iaWVudC1jb2xvclwiOiB7XG4gICAgICAgIFx0XHRcImZyb21cIjogeyBcImhcIjogMjEwLCBcInNcIjogMSwgXCJ2XCI6IDc0IH0sXG4gICAgICAgIFx0XHRcInRvXCI6IHsgXCJoXCI6IDIxLCBcInNcIjogMzUsIFwidlwiOiA3MiB9LFxuICAgICAgICBcdFx0XCJzZWxmaWUtc3RpY2tcIjogeyBcImhcIjogMjAsIFwic1wiOiA0NSwgXCJ2XCI6IDMwIH1cbiAgICAgICAgXHR9LFxuICAgICAgICBcdFwiZnVuLWZhY3QtdmlkZW8tdXJsXCI6IFwiaHR0cDovL2VtYmVkLndpc3RpYS5jb20vZGVsaXZlcmllcy8wNjY3OWYzZWJkNjk2ZTljNDJmZDEzY2Y5ZGJkYWVmZmU5YjFmODczL2VzLXRyZW5jLWlzYW11Lm1wNFwiLFxuICAgICAgICBcdFwiZmFjdFwiOiB7XG4gICAgICAgIFx0XHRcImVuXCI6IFwiVUZPIHNpZ2h0aW5nIGF0IGVzIHRyZW5jXCJcbiAgICAgICAgXHR9LFxuICAgICAgICBcdFwic2hvcC11cmxcIjogXCJodHRwOi8vd3d3LmNhbXBlci5jb20vaW50L3dvbWVuL3Nob2VzL2lzYW11X2VzX3RyZW5jX3NzMjAxNlwiLFxuICAgICAgICBcdFwid2lzdGlhLWNoYXJhY3Rlci1pZFwiOiBcIjF4c2FicTd5ZXlcIixcbiAgICAgICAgXHRcIndpc3RpYS1mdW4taWRcIjogXCJ4bmxueWVlODNvXCJcbiAgICAgICAgfSxcblxuXHRcdFwiYXJlbGx1Zi9jYXBhc1wiOiB7XG5cdFx0XHRcInNlbGZpZS1zdGljay12aWRlby11cmxcIjogXCJodHRwOi8vZW1iZWQud2lzdGlhLmNvbS9kZWxpdmVyaWVzLzg0MGEzZjY3MjliMWY1MmY0NDZhYWU2ZGFlYzkzOWEzZWNhNGMwYzEvYXJlbGx1Zi1jYXBhcy5tcDRcIixcbiAgICAgICAgXHRcImFtYmllbnQtY29sb3JcIjoge1xuICAgICAgICBcdFx0XCJmcm9tXCI6IHsgXCJoXCI6IDAsIFwic1wiOiAwLCBcInZcIjogMCB9LFxuICAgICAgICBcdFx0XCJ0b1wiOiB7IFwiaFwiOiA4LCBcInNcIjogNzYsIFwidlwiOiA5MSB9LFxuICAgICAgICBcdFx0XCJzZWxmaWUtc3RpY2tcIjogeyBcImhcIjogOCwgXCJzXCI6IDc2LCBcInZcIjogOTEgfVxuICAgICAgICBcdH0sXG4gICAgICAgIFx0XCJmdW4tZmFjdC12aWRlby11cmxcIjogXCJodHRwOi8vZW1iZWQud2lzdGlhLmNvbS9kZWxpdmVyaWVzLzQ4ZmYxYzU4Yjg2YjA4OTEyNjgxYjRmZGYzYjc1NDdjNzU3NzY2ZDcvYXJlbGx1Zi1jYXBhcy5tcDRcIixcbiAgICAgICAgXHRcImZhY3RcIjoge1xuICAgICAgICBcdFx0XCJlblwiOiBcIk1FQU5XSElMRSBJTiBBUkVMTFVGXCJcbiAgICAgICAgXHR9LFxuICAgICAgICBcdFwic2hvcC11cmxcIjogXCJodHRwOi8vd3d3LmNhbXBlci5jb20vaW50L21lbi9zaG9lcy9jYXBhc19hcmVsbHVmX3NzMjAxNlwiLFxuICAgICAgICBcdFwid2lzdGlhLWNoYXJhY3Rlci1pZFwiOiBcIno3b3I2OGRhMXZcIixcbiAgICAgICAgXHRcIndpc3RpYS1mdW4taWRcIjogXCJrZmMwdTF2dmhwXCJcblx0XHR9LFxuICAgICAgICBcImFyZWxsdWYvcGVsb3Rhc1wiOiB7XG4gICAgICAgIFx0XCJzZWxmaWUtc3RpY2stdmlkZW8tdXJsXCI6IFwiaHR0cDovL2VtYmVkLndpc3RpYS5jb20vZGVsaXZlcmllcy8zZGNmZDcwYzcwNzI2OTJlYTNhNzM5YWVmNTM3NmIwMjZiMDRiNjc1L2FyZWxsdWYtcGVsb3Rhcy5tcDRcIixcbiAgICAgICAgXHRcImFtYmllbnQtY29sb3JcIjoge1xuICAgICAgICBcdFx0XCJmcm9tXCI6IHsgXCJoXCI6IDIxMSwgXCJzXCI6IDk1LCBcInZcIjogMjkgfSxcbiAgICAgICAgXHRcdFwidG9cIjogeyBcImhcIjogMjIsIFwic1wiOiAzNSwgXCJ2XCI6IDc5IH0sXG4gICAgICAgIFx0XHRcInNlbGZpZS1zdGlja1wiOiB7IFwiaFwiOiAyMzMsIFwic1wiOiAzNSwgXCJ2XCI6IDEwIH1cbiAgICAgICAgXHR9LFxuICAgICAgICBcdFwiZnVuLWZhY3QtdmlkZW8tdXJsXCI6IFwiaHR0cDovL2VtYmVkLndpc3RpYS5jb20vZGVsaXZlcmllcy9hYzE2ZDUzYzRmOWU4ZmQ2OTMwNzc5ZTIzNzg1NDY4N2RjZjI0MWU4L2FyZWxsdWYtcGVsb3Rhcy5tcDRcIixcbiAgICAgICAgXHRcImZhY3RcIjoge1xuICAgICAgICBcdFx0XCJlblwiOiBcIldIQVQgSEFQUEVOUyBJTiBBUkVMTFVGIFNUQVlTIElOIEFSRUxMVUZcIlxuICAgICAgICBcdH0sXG4gICAgICAgIFx0XCJzaG9wLXVybFwiOiBcImh0dHA6Ly93d3cuY2FtcGVyLmNvbS9pbnQvbWVuL3Nob2VzL3BlbG90YXNfYXJlbGx1Zl9zczIwMTZcIixcbiAgICAgICAgXHRcIndpc3RpYS1jaGFyYWN0ZXItaWRcIjogXCJmOWRvMnFsd25qXCIsXG4gICAgICAgIFx0XCJ3aXN0aWEtZnVuLWlkXCI6IFwia3lqa2J3Y242dlwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiYXJlbGx1Zi9tYXJ0YVwiOiB7XG4gICAgICAgIFx0XCJzZWxmaWUtc3RpY2stdmlkZW8tdXJsXCI6IFwiaHR0cDovL2VtYmVkLndpc3RpYS5jb20vZGVsaXZlcmllcy85Yjk0NzFkY2JlMWY5NGZmN2IzNTA4ODQxZjY4ZmYxNWJlMTkyZWU0L2FyZWxsdWYtbWFydGEubXA0XCIsXG4gICAgICAgIFx0XCJhbWJpZW50LWNvbG9yXCI6IHtcbiAgICAgICAgXHRcdFwiZnJvbVwiOiB7IFwiaFwiOiAyMDAsIFwic1wiOiA1NywgXCJ2XCI6IDgxIH0sXG4gICAgICAgIFx0XHRcInRvXCI6IHsgXCJoXCI6IDIwMSwgXCJzXCI6IDEwMCwgXCJ2XCI6IDY5IH0sXG4gICAgICAgIFx0XHRcInNlbGZpZS1zdGlja1wiOiB7IFwiaFwiOiAyMDEsIFwic1wiOiAxMDAsIFwidlwiOiA2OSB9XG4gICAgICAgIFx0fSxcbiAgICAgICAgXHRcImZ1bi1mYWN0LXZpZGVvLXVybFwiOiBcImh0dHA6Ly9lbWJlZC53aXN0aWEuY29tL2RlbGl2ZXJpZXMvNWI5ZDI3MDYxMDBlNWVhMGQzMTcxNDNlMjM3NGQ2YmQ2Yzk2MDdiMS9hcmVsbHVmLW1hcnRhLm1wNFwiLFxuICAgICAgICBcdFwiZmFjdFwiOiB7XG4gICAgICAgIFx0XHRcImVuXCI6IFwiQkFEIFRSSVAgQVQgVEhFIEhPVEVMIFBPT0xcIlxuICAgICAgICBcdH0sXG4gICAgICAgIFx0XCJzaG9wLXVybFwiOiBcImh0dHA6Ly93d3cuY2FtcGVyLmNvbS9pbnQvd29tZW4vc2hvZXMvbWFydGFfYXJlbGx1Zl9zczIwMTZcIixcbiAgICAgICAgXHRcIndpc3RpYS1jaGFyYWN0ZXItaWRcIjogXCJwcGttZmRsNWpxXCIsXG4gICAgICAgIFx0XCJ3aXN0aWEtZnVuLWlkXCI6IFwicjY0aWoyb2poM1wiXG4gICAgICAgIH0sXG4gICAgICAgIFwiYXJlbGx1Zi9rb2JhcmFoXCI6IHtcbiAgICAgICAgXHRcInNlbGZpZS1zdGljay12aWRlby11cmxcIjogXCJodHRwOi8vZW1iZWQud2lzdGlhLmNvbS9kZWxpdmVyaWVzLzI5ODBmMTRjYzhiZDk5MTJiMTRkY2E0NmE0Y2Q0YTg1ZmEwNDc3NGMvYXJlbGx1Zi1rb2JhcmFoLm1wNFwiLFxuICAgICAgICBcdFwiYW1iaWVudC1jb2xvclwiOiB7XG4gICAgICAgIFx0XHRcImZyb21cIjogeyBcImhcIjogMjY0LCBcInNcIjogNjksIFwidlwiOiA0MSB9LFxuICAgICAgICBcdFx0XCJ0b1wiOiB7IFwiaFwiOiAzNDQsIFwic1wiOiA1NiwgXCJ2XCI6IDEwMCB9LFxuICAgICAgICBcdFx0XCJzZWxmaWUtc3RpY2tcIjogeyBcImhcIjogMzQ0LCBcInNcIjogNDEsIFwidlwiOiAxMDAgfVxuICAgICAgICBcdH0sXG4gICAgICAgIFx0XCJmdW4tZmFjdC12aWRlby11cmxcIjogXCJodHRwOi8vZW1iZWQud2lzdGlhLmNvbS9kZWxpdmVyaWVzLzYyZTU0ZWFjMWQ4OTg5YWI5ZGUyMzhmYTNmN2M2ZDhkYjRkOWRlOGQvYXJlbGx1Zi1rb2JhcmFoLm1wNFwiLFxuICAgICAgICBcdFwiZmFjdFwiOiB7XG4gICAgICAgIFx0XHRcImVuXCI6IFwiSGF0ZXJzIHdpbGwgc2F5IGl0J3MgUGhvdG9zaG9wXCJcbiAgICAgICAgXHR9LFxuICAgICAgICBcdFwic2hvcC11cmxcIjogXCJodHRwOi8vd3d3LmNhbXBlci5jb20vaW50L3dvbWVuL3Nob2VzL2tvYmFyYWhfYXJlbGx1Zl9zczIwMTZcIixcbiAgICAgICAgXHRcIndpc3RpYS1jaGFyYWN0ZXItaWRcIjogXCI5eGU1dmp6eWJvXCIsXG4gICAgICAgIFx0XCJ3aXN0aWEtZnVuLWlkXCI6IFwibzc5ZHFwaHBzbFwiXG4gICAgICAgIH0sXG5cdFx0XCJhcmVsbHVmL2R1YlwiOiB7XG5cdFx0XHRcInNlbGZpZS1zdGljay12aWRlby11cmxcIjogXCJodHRwOi8vZW1iZWQud2lzdGlhLmNvbS9kZWxpdmVyaWVzLzIyYjM2MGM4Y2EzOTk2OTY5ODUzMTNkZGU5OWJhODNkNGVjOTcyYjcvYXJlbGx1Zi1kdWIubXA0XCIsXG4gICAgICAgIFx0XCJhbWJpZW50LWNvbG9yXCI6IHtcbiAgICAgICAgXHRcdFwiZnJvbVwiOiB7IFwiaFwiOiAxOTYsIFwic1wiOiA1MiwgXCJ2XCI6IDMzIH0sXG4gICAgICAgIFx0XHRcInRvXCI6IHsgXCJoXCI6IDE1LCBcInNcIjogODQsIFwidlwiOiAxMDAgfSxcbiAgICAgICAgXHRcdFwic2VsZmllLXN0aWNrXCI6IHsgXCJoXCI6IDE1LCBcInNcIjogODQsIFwidlwiOiAxMDAgfVxuICAgICAgICBcdH0sXG4gICAgICAgIFx0XCJmdW4tZmFjdC12aWRlby11cmxcIjogXCJodHRwOi8vZW1iZWQud2lzdGlhLmNvbS9kZWxpdmVyaWVzLzk4N2JkYWIwMTI5Nzk4MjJiODE4NjM3ODM3Y2MyODg0MTRjZWY4ZjMvYXJlbGx1Zi1kdWIubXA0XCIsXG4gICAgICAgIFx0XCJmYWN0XCI6IHtcbiAgICAgICAgXHRcdFwiZW5cIjogXCJXSEVOIFlPVSBDQU4nVCBLRUVQIFRIRSBBUlJPVyBPTiBUSEUgQ0VOVEVSIExJTkVcIlxuICAgICAgICBcdH0sXG4gICAgICAgIFx0XCJzaG9wLXVybFwiOiBcImh0dHA6Ly93d3cuY2FtcGVyLmNvbS9pbnQvbWVuL3Nob2VzL2R1Yl9hcmVsbHVmX3NzMjAxNlwiLFxuICAgICAgICBcdFwid2lzdGlhLWNoYXJhY3Rlci1pZFwiOiBcImRsZzVhenk1YXJcIixcbiAgICAgICAgXHRcIndpc3RpYS1mdW4taWRcIjogXCJxcGhqOXAzdDVoXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJhcmVsbHVmL3BhcmFkaXNlXCI6IHtcbiAgICAgICAgXHRcInNlbGZpZS1zdGljay12aWRlby11cmxcIjogXCJodHRwOi8vZW1iZWQud2lzdGlhLmNvbS9kZWxpdmVyaWVzL2E4MTljMzczZjk3Nzc4NTJmMzk2N2NlMDIzYmNmYjBkOTExNTM4NmYvYXJlbGx1Zi1wYXJhZGlzZS5tcDRcIixcbiAgICAgICAgXHRcImFtYmllbnQtY29sb3JcIjoge1xuICAgICAgICBcdFx0XCJmcm9tXCI6IHsgXCJoXCI6IDU5LCBcInNcIjogMTksIFwidlwiOiA5OSB9LFxuICAgICAgICBcdFx0XCJ0b1wiOiB7IFwiaFwiOiAyMDcsIFwic1wiOiAzMSwgXCJ2XCI6IDEwMCB9LFxuICAgICAgICBcdFx0XCJzZWxmaWUtc3RpY2tcIjogeyBcImhcIjogMTgzLCBcInNcIjogNzEsIFwidlwiOiA2NCB9XG4gICAgICAgIFx0fSxcbiAgICAgICAgXHRcImZ1bi1mYWN0LXZpZGVvLXVybFwiOiBcImh0dHA6Ly9lbWJlZC53aXN0aWEuY29tL2RlbGl2ZXJpZXMvNWRjMTk3MjZlZmE3YjJlNzU2YzgwNTM0ZDQzZmE2MDBjYzYxZjE3OC9hcmVsbHVmLXBhcmFkaXNlLm1wNFwiLFxuICAgICAgICBcdFwiZmFjdFwiOiB7XG4gICAgICAgIFx0XHRcImVuXCI6IFwiU0VMRklFIE9OIFdBVEVSU0xJREUgTElLRSBBIEJPU1NcIlxuICAgICAgICBcdH0sXG4gICAgICAgIFx0XCJzaG9wLXVybFwiOiBcImh0dHA6Ly93d3cuY2FtcGVyLmNvbS9pbnQvd29tZW4vc2hvZXMvcGFyYWRpc2VfYXJlbGx1Zl9zczIwMTZcIixcbiAgICAgICAgXHRcIndpc3RpYS1jaGFyYWN0ZXItaWRcIjogXCJoODl5MGt1d3kyXCIsXG4gICAgICAgIFx0XCJ3aXN0aWEtZnVuLWlkXCI6IFwiMzQzdDFzbjJucFwiXG4gICAgICAgIH1cblxuXHR9XG59Il19
