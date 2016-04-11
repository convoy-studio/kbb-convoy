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
			var _this = this;

			_AppStore2['default'].on(_AppConstants2['default'].WINDOW_RESIZE, this.resize);
			_domHand2['default'].event(window, 'mousemove', this.mouseMove);

			this.dot = {
				el: _domHand2['default'].select('#mouse-dot', document)
			};

			this.scene = new THREE.Scene();

			this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
			this.camera.position.z = 800;

			this.renderer = new THREE.WebGLRenderer({
				antialias: true
			});
			this.renderer.setSize(window.innerWidth, window.innerHeight);
			_domHand2['default'].tree.add(this.element, this.renderer.domElement);

			this.raycaster = new THREE.Raycaster();
			this.mouse = new THREE.Vector2();
			this.intersection = undefined;

			this.kebab = new THREE.Object3D();
			this.scene.add(this.kebab);

			this.meatParticles = (0, _MeatParticles2['default'])(this.scene);

			var planeGeometry = new THREE.PlaneGeometry(1200, 400, 10, 10);
			var planeTexture = _Utils2['default'].LoadTexture("gradient-sky-1172968.jpg");
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

			Leap.loop(function (frame) {
				var hand = frame.hands[0];
				if (hand) {
					var size = 50;
					var x = window.innerWidth * 0.45 + hand.palmPosition[0];
					var y = window.innerHeight * 0.9 - hand.palmPosition[1];
					_this.mouse.x = x / window.innerWidth * 2 - 1;
					_this.mouse.y = -(y / window.innerHeight) * 2 + 1;
					_Utils2['default'].Translate(_this.dot.el, x - size / 2, y - size / 2, 1);
				}
			});

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

},{"./../constants/AppConstants":"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/constants/AppConstants.js","./../dispatchers/AppDispatcher":"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/dispatchers/AppDispatcher.js","./../stores/AppStore":"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/stores/AppStore.js"}],"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/components/AnimatedParticle.js":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports["default"] = function (parent, texture, geometry, animator) {
	var scope;
	var clock = new THREE.Clock();

	// console.log(parent, texture, geometry, animator)
	var material = new THREE.MeshBasicMaterial({
		map: texture,
		transparent: true,
		opacity: 1,
		side: THREE.DoubleSide
	});
	var mesh = new THREE.Mesh(geometry, material);
	var scale = 300;
	mesh.scale.set(scale, scale, scale);
	parent.add(mesh);

	scope = {
		mesh: mesh,
		update: function update() {
			var delta = clock.getDelta();
			animator.update(1000 * delta);
		}
	};

	return scope;
};

module.exports = exports["default"];

},{}],"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/components/GUI.js":[function(require,module,exports){
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
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Utils = require('./../utils/Utils');

var _Utils2 = _interopRequireDefault(_Utils);

var _TextureAnimator = require('./TextureAnimator');

var _TextureAnimator2 = _interopRequireDefault(_TextureAnimator);

var _AnimatedParticle = require('./AnimatedParticle');

var _AnimatedParticle2 = _interopRequireDefault(_AnimatedParticle);

exports['default'] = function (material, animTextures) {
	var scope;
	var meatMesh = new THREE.Mesh();
	var intersection;
	var UP = 'UP';
	var DOWN = 'DOWN';
	var animState = DOWN;
	var container = new THREE.Object3D();
	var animContainer = new THREE.Object3D();
	container.add(meatMesh);
	container.add(animContainer);
	meatMesh.material = material;
	container.position.x = 0;
	container.velocity = new THREE.Vector3(0, 0, 0);
	container.offset = new THREE.Vector3(0, 0, 0);
	container.offsetUp = new THREE.Vector3(0, 0, 0);
	container.dir = Math.random() * 1 > 0.45 ? 1 : -1;
	container.opacity = 0;

	var texture = animTextures[0].tex;
	// let animator = new TextureAnimator( texture, animTextures[0].horiz, animTextures[0].vert, animTextures[0].total, animTextures[0].duration ); // texture, #horiz, #vert, #total, duration.
	var animator = undefined;
	var geometry = new THREE.PlaneGeometry(100, 100, 1, 1);
	var animatedParticle = (0, _AnimatedParticle2['default'])(animContainer, texture, geometry, animator);

	var resetMesh = function resetMesh() {
		var scale = _Utils2['default'].Rand(0.001, 0.005, 4);
		container.scale.set(scale, scale, scale);
		container.velocity.y = _Utils2['default'].Rand(3, 12, 3);
		container.offset.x = Math.radians(_Utils2['default'].Rand(-50, 50, 0));
		container.offsetUp.x = Math.radians(_Utils2['default'].Rand(400, 800, 0));
		container.rotation.x = Math.radians(_Utils2['default'].Rand(-180, 180, 0));
		container.rotation.y = Math.radians(_Utils2['default'].Rand(-180, 180, 0));
		container.rotation.z = Math.radians(_Utils2['default'].Rand(-180, 180, 0));
		container.opacity = 1;
		meatMesh.material.opacity = container.opacity;
		animatedParticle.mesh.material.opacity = 0;
		meatMesh.position.y = 0;
	};
	resetMesh();

	scope = {
		geometryAddTo: function geometryAddTo(geometry, parent) {
			meatMesh.geometry = geometry;
			parent.add(container);
		},
		update: function update(inter) {
			intersection = inter;

			if (animState === DOWN) {
				container.position.y -= container.velocity.y;
				container.rotation.x += 0.005;
				container.rotation.y += 0.006;
				container.rotation.z += 0.008;
				container.position.x += container.offset.x;
				animatedParticle.mesh.material.opacity = 0;
				if (container.position.y < -500) {
					animState = UP;
				}
			} else if (animState === UP) {
				container.position.y += (container.velocity.y - container.position.y) * 0.02;
				container.position.x += container.offsetUp.x * container.dir;
				if (container.position.y > -200) container.opacity += (0.001 - container.opacity) * 0.2;
				container.rotation.x += 0.005;
				container.rotation.y += 0.006;
				container.rotation.z += 0.008;
				meatMesh.material.opacity = 0;
				meatMesh.position.y = 1300;
				animatedParticle.mesh.material.opacity = container.opacity;
				if (container.opacity < 0.01) {
					scope.reset();
					animState = DOWN;
				}
			}
			// animatedParticle.update()
		},
		reset: function reset() {
			if (intersection) {
				container.position.x = intersection.point.x;
				container.position.y = intersection.point.y;
				container.position.z = 200;
				resetMesh();
			}
		}
	};

	return scope;
};

module.exports = exports['default'];

},{"./../utils/Utils":"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/utils/Utils.js","./AnimatedParticle":"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/components/AnimatedParticle.js","./TextureAnimator":"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/components/TextureAnimator.js"}],"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/components/MeatParticles.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _MeatParticle = require('./MeatParticle');

var _MeatParticle2 = _interopRequireDefault(_MeatParticle);

var _Utils = require('./../utils/Utils');

var _Utils2 = _interopRequireDefault(_Utils);

var _AnimatedParticle = require('./AnimatedParticle');

var _AnimatedParticle2 = _interopRequireDefault(_AnimatedParticle);

exports['default'] = function (container) {
	var scope;
	var parent = new THREE.Object3D();
	var intersection = undefined;

	var MEAT_PARTICLES_NUM = 80;
	var meatTexture = _Utils2['default'].LoadTexture("Shawarma-diff.jpg");
	var meatDiffuseColor = new THREE.Color(0xffffff);
	var meatMetalness = 0.5;
	var meatRoughness = 1.0;

	var animTextures = [{
		tex: new THREE.ImageUtils.loadTexture('image/textures/cat.png'),
		horizontal: 4,
		vertical: 1,
		total: 4,
		duration: 150
	}];

	var particles = [];
	for (var i = 0; i < MEAT_PARTICLES_NUM; i++) {
		var meatMaterial = new THREE.MeshStandardMaterial({
			map: meatTexture,
			color: meatDiffuseColor,
			metalness: meatMetalness,
			roughness: meatRoughness,
			transparent: true
		});
		particles[i] = (0, _MeatParticle2['default'])(meatMaterial, animTextures);
	}

	container.add(parent);

	scope = {
		update: function update(inter) {
			intersection = inter;
			particles.forEach(function (p) {
				p.update(intersection);
			});
		},
		setup: function setup(geometry) {

			particles.forEach(function (particle) {
				particle.geometryAddTo(geometry, parent);
				particle.reset();
			});
		}
	};

	return scope;
};

module.exports = exports['default'];

},{"./../utils/Utils":"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/utils/Utils.js","./AnimatedParticle":"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/components/AnimatedParticle.js","./MeatParticle":"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/components/MeatParticle.js"}],"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/components/TextureAnimator.js":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports["default"] = function (texture, tilesHoriz, tilesVert, numTiles, tileDispDuration) {
	var scope;

	// note: texture passed by reference, will be updated by the update function.

	var tilesHorizontal = tilesHoriz;
	var tilesVertical = tilesVert;
	// how many images does this spritesheet contain?
	//  usually equals tilesHoriz * tilesVert, but not necessarily,
	//  if there at blank tiles at the bottom of the spritesheet.
	var numberOfTiles = numTiles;
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set(1 / tilesHorizontal, 1 / tilesVertical);

	// how long should each image be displayed?
	var tileDisplayDuration = tileDispDuration;

	// how long has the current image been displayed?
	var currentDisplayTime = 0;

	// which image is currently being displayed?
	var currentTile = 0;

	scope = {
		update: function update(milliSec) {
			currentDisplayTime += milliSec;
			while (currentDisplayTime > tileDisplayDuration) {
				currentDisplayTime -= tileDisplayDuration;
				currentTile++;
				if (currentTile == numberOfTiles) currentTile = 0;
				var currentColumn = currentTile % tilesHorizontal;
				texture.offset.x = currentColumn / tilesHorizontal;
				var currentRow = Math.floor(currentTile / tilesHorizontal);
				texture.offset.y = currentRow / tilesVertical;
			}
		}
	};

	return scope;
};

module.exports = exports["default"];

},{}],"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/constants/AppConstants.js":[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvcGFuYWdpb3Rpc3Rob21vZ2xvdS9Qcm9qZWN0cy9rYmItY29udm95L3NyYy9qcy9NYWluLmpzIiwiL1VzZXJzL3BhbmFnaW90aXN0aG9tb2dsb3UvUHJvamVjdHMva2JiLWNvbnZveS9zcmMvanMvYXBwL0FwcC5qcyIsIi9Vc2Vycy9wYW5hZ2lvdGlzdGhvbW9nbG91L1Byb2plY3RzL2tiYi1jb252b3kvc3JjL2pzL2FwcC9BcHBUZW1wbGF0ZS5qcyIsIi9Vc2Vycy9wYW5hZ2lvdGlzdGhvbW9nbG91L1Byb2plY3RzL2tiYi1jb252b3kvc3JjL2pzL2FwcC9hY3Rpb25zL0FwcEFjdGlvbnMuanMiLCIvVXNlcnMvcGFuYWdpb3Rpc3Rob21vZ2xvdS9Qcm9qZWN0cy9rYmItY29udm95L3NyYy9qcy9hcHAvY29tcG9uZW50cy9BbmltYXRlZFBhcnRpY2xlLmpzIiwiL1VzZXJzL3BhbmFnaW90aXN0aG9tb2dsb3UvUHJvamVjdHMva2JiLWNvbnZveS9zcmMvanMvYXBwL2NvbXBvbmVudHMvR1VJLmpzIiwiL1VzZXJzL3BhbmFnaW90aXN0aG9tb2dsb3UvUHJvamVjdHMva2JiLWNvbnZveS9zcmMvanMvYXBwL2NvbXBvbmVudHMvR1VJQ29udHJvbGxlci5qcyIsIi9Vc2Vycy9wYW5hZ2lvdGlzdGhvbW9nbG91L1Byb2plY3RzL2tiYi1jb252b3kvc3JjL2pzL2FwcC9jb21wb25lbnRzL01hdGVyaWFscy5qcyIsIi9Vc2Vycy9wYW5hZ2lvdGlzdGhvbW9nbG91L1Byb2plY3RzL2tiYi1jb252b3kvc3JjL2pzL2FwcC9jb21wb25lbnRzL01lYXRQYXJ0aWNsZS5qcyIsIi9Vc2Vycy9wYW5hZ2lvdGlzdGhvbW9nbG91L1Byb2plY3RzL2tiYi1jb252b3kvc3JjL2pzL2FwcC9jb21wb25lbnRzL01lYXRQYXJ0aWNsZXMuanMiLCIvVXNlcnMvcGFuYWdpb3Rpc3Rob21vZ2xvdS9Qcm9qZWN0cy9rYmItY29udm95L3NyYy9qcy9hcHAvY29tcG9uZW50cy9UZXh0dXJlQW5pbWF0b3IuanMiLCIvVXNlcnMvcGFuYWdpb3Rpc3Rob21vZ2xvdS9Qcm9qZWN0cy9rYmItY29udm95L3NyYy9qcy9hcHAvY29uc3RhbnRzL0FwcENvbnN0YW50cy5qcyIsIi9Vc2Vycy9wYW5hZ2lvdGlzdGhvbW9nbG91L1Byb2plY3RzL2tiYi1jb252b3kvc3JjL2pzL2FwcC9kaXNwYXRjaGVycy9BcHBEaXNwYXRjaGVyLmpzIiwiL1VzZXJzL3BhbmFnaW90aXN0aG9tb2dsb3UvUHJvamVjdHMva2JiLWNvbnZveS9zcmMvanMvYXBwL3NlcnZpY2VzL0dsb2JhbEV2ZW50cy5qcyIsIi9Vc2Vycy9wYW5hZ2lvdGlzdGhvbW9nbG91L1Byb2plY3RzL2tiYi1jb252b3kvc3JjL2pzL2FwcC9zZXJ2aWNlcy9QcmVsb2FkZXIuanMiLCIvVXNlcnMvcGFuYWdpb3Rpc3Rob21vZ2xvdS9Qcm9qZWN0cy9rYmItY29udm95L3NyYy9qcy9hcHAvc2VydmljZXMvUm91dGVyLmpzIiwiL1VzZXJzL3BhbmFnaW90aXN0aG9tb2dsb3UvUHJvamVjdHMva2JiLWNvbnZveS9zcmMvanMvYXBwL3N0b3Jlcy9BcHBTdG9yZS5qcyIsIi9Vc2Vycy9wYW5hZ2lvdGlzdGhvbW9nbG91L1Byb2plY3RzL2tiYi1jb252b3kvc3JjL2pzL2FwcC91dGlscy9VdGlscy5qcyIsIi9Vc2Vycy9wYW5hZ2lvdGlzdGhvbW9nbG91L1Byb2plY3RzL2tiYi1jb252b3kvc3JjL2pzL2FwcC91dGlscy9yYWYuanMiLCIvVXNlcnMvcGFuYWdpb3Rpc3Rob21vZ2xvdS9Qcm9qZWN0cy9rYmItY29udm95L3NyYy9qcy9wYWdlci9jb21wb25lbnRzL0Jhc2VDb21wb25lbnQuanMiLCJ3d3cvZGF0YS9kYXRhLmpzb24iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozt3QkNHcUIsVUFBVTs7OztxQkFDYixPQUFPOzs7O21CQUNULEtBQUs7Ozs7b0JBQ0Es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SUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUE7QUFDdkMsT0FBSSxFQUFFLEdBQUcsVUFBVSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQTtBQUMxQyxPQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQTtBQUM5QixPQUFJLE9BQU8sR0FBRyxVQUFVLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFBLEFBQUMsQ0FBQTtBQUMzRSxPQUFJLE9BQU8sR0FBRyxVQUFVLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFBLEFBQUMsQ0FBQTtBQUMzRSxPQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQSxHQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFBO0FBQ25FLE9BQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFBLEdBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUE7QUFDbkUsT0FBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUE7QUFDdkMsT0FBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUE7R0FDcEM7OztTQUNtQix1QkFBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRTtBQUMxQyxPQUFJLEVBQUUsR0FBRyxPQUFPLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxD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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy8gQXZvaWQgY29uc29sZSBlcnJvcnMgZm9yIHRoZSBJRSBjcmFwcHkgYnJvd3NlcnNcbmlmICggISB3aW5kb3cuY29uc29sZSApIGNvbnNvbGUgPSB7IGxvZzogZnVuY3Rpb24oKXt9IH07XG5cbmltcG9ydCBBcHBTdG9yZSBmcm9tICdBcHBTdG9yZSdcbmltcG9ydCBVdGlscyBmcm9tICdVdGlscydcbmltcG9ydCBBcHAgZnJvbSAnQXBwJ1xuaW1wb3J0IFR3ZWVuTWF4IGZyb20gJ2dzYXAnXG5pbXBvcnQgcmFmIGZyb20gJ3JhZidcbmltcG9ydCBNb2JpbGVEZXRlY3QgZnJvbSAnbW9iaWxlLWRldGVjdCdcbmltcG9ydCBkb20gZnJvbSAnZG9tLWhhbmQnXG5cbnZhciBtZCA9IG5ldyBNb2JpbGVEZXRlY3Qod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQpXG5cbkFwcFN0b3JlLkRldGVjdG9yLmlzU2FmYXJpID0gKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignU2FmYXJpJykgIT0gLTEgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdDaHJvbWUnKSA9PSAtMSlcbkFwcFN0b3JlLkRldGVjdG9yLmlzRmlyZWZveCA9IG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5pbmRleE9mKCdmaXJlZm94JykgIT0gLTFcbkFwcFN0b3JlLkRldGVjdG9yLmlzTW9iaWxlID0gKG1kLm1vYmlsZSgpIHx8IG1kLnRhYmxldCgpKSA/IHRydWUgOiBmYWxzZVxuQXBwU3RvcmUuUGFyZW50ID0gZG9tLnNlbGVjdCgnI2FwcC1jb250YWluZXInKVxuQXBwU3RvcmUuRGV0ZWN0b3Iub2xkSUUgPSBkb20uY2xhc3Nlcy5jb250YWlucyhBcHBTdG9yZS5QYXJlbnQsICdpZTYnKSB8fCBkb20uY2xhc3Nlcy5jb250YWlucyhBcHBTdG9yZS5QYXJlbnQsICdpZTcnKSB8fCBkb20uY2xhc3Nlcy5jb250YWlucyhBcHBTdG9yZS5QYXJlbnQsICdpZTgnKVxuQXBwU3RvcmUuRGV0ZWN0b3IuaXNTdXBwb3J0V2ViR0wgPSBVdGlscy5TdXBwb3J0V2ViR0woKVxuaWYoQXBwU3RvcmUuRGV0ZWN0b3Iub2xkSUUpIEFwcFN0b3JlLkRldGVjdG9yLmlzTW9iaWxlID0gdHJ1ZVxuXG52YXIgYXBwID0gbmV3IEFwcCgpXHRcblxuYXBwLmluaXQoKVxuXG4iLCJpbXBvcnQgQXBwU3RvcmUgZnJvbSAnQXBwU3RvcmUnXG5pbXBvcnQgQXBwQWN0aW9ucyBmcm9tICdBcHBBY3Rpb25zJ1xuaW1wb3J0IEFwcFRlbXBsYXRlIGZyb20gJ0FwcFRlbXBsYXRlJ1xuaW1wb3J0IFJvdXRlciBmcm9tICdSb3V0ZXInXG5pbXBvcnQgR0V2ZW50cyBmcm9tICdHbG9iYWxFdmVudHMnXG5pbXBvcnQgUHJlbG9hZGVyIGZyb20gJ1ByZWxvYWRlcidcbmltcG9ydCBBcHBDb25zdGFudHMgZnJvbSAnQXBwQ29uc3RhbnRzJ1xuaW1wb3J0IGRvbSBmcm9tICdkb20taGFuZCdcblxuY2xhc3MgQXBwIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy5vbkFwcFJlYWR5ID0gdGhpcy5vbkFwcFJlYWR5LmJpbmQodGhpcylcblx0XHR0aGlzLmxvYWRNYWluQXNzZXRzID0gdGhpcy5sb2FkTWFpbkFzc2V0cy5iaW5kKHRoaXMpXG5cdH1cblx0aW5pdCgpIHtcblxuXHRcdE1hdGgucmFkaWFucyA9IGZ1bmN0aW9uKGRlZ3JlZXMpIHtcblx0XHRcdHJldHVybiBkZWdyZWVzICogTWF0aC5QSSAvIDE4MDtcblx0XHR9O1xuXHRcdCBcblx0XHQvLyBDb252ZXJ0cyBmcm9tIHJhZGlhbnMgdG8gZGVncmVlcy5cblx0XHRNYXRoLmRlZ3JlZXMgPSBmdW5jdGlvbihyYWRpYW5zKSB7XG5cdFx0XHRyZXR1cm4gcmFkaWFucyAqIDE4MCAvIE1hdGguUEk7XG5cdFx0fTtcblxuXHRcdC8vIEluaXQgcm91dGVyXG5cdFx0dGhpcy5yb3V0ZXIgPSBuZXcgUm91dGVyKClcblx0XHR0aGlzLnJvdXRlci5pbml0KClcblxuXHRcdEFwcFN0b3JlLlByZWxvYWRlciA9IG5ldyBQcmVsb2FkZXIoKVxuXG5cdFx0Ly8gSW5pdCBnbG9iYWwgZXZlbnRzXG5cdFx0d2luZG93Lkdsb2JhbEV2ZW50cyA9IG5ldyBHRXZlbnRzKClcblx0XHRHbG9iYWxFdmVudHMuaW5pdCgpXG5cblx0XHR2YXIgYXBwVGVtcGxhdGUgPSBuZXcgQXBwVGVtcGxhdGUoKVxuXHRcdGFwcFRlbXBsYXRlLmlzUmVhZHkgPSB0aGlzLmxvYWRNYWluQXNzZXRzXG5cdFx0YXBwVGVtcGxhdGUucmVuZGVyKCcjYXBwLWNvbnRhaW5lcicpXG5cblx0XHQvLyBTdGFydCByb3V0aW5nXG5cdFx0dGhpcy5yb3V0ZXIuYmVnaW5Sb3V0aW5nKClcblx0fVxuXHRsb2FkTWFpbkFzc2V0cygpIHtcblx0XHR0aGlzLm9uQXBwUmVhZHkoKVxuXHR9XG5cdG9uQXBwUmVhZHkoKSB7XG5cdFx0QXBwQWN0aW9ucy5hcHBTdGFydCgpXG5cdFx0QXBwQWN0aW9ucy5wYWdlSGFzaGVyQ2hhbmdlZCgpXG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXBwXG4gICAgXHRcbiIsImltcG9ydCBCYXNlQ29tcG9uZW50IGZyb20gJ0Jhc2VDb21wb25lbnQnXG5pbXBvcnQgQXBwU3RvcmUgZnJvbSAnQXBwU3RvcmUnXG5pbXBvcnQgQXBwQ29uc3RhbnRzIGZyb20gJ0FwcENvbnN0YW50cydcbmltcG9ydCBBcHBBY3Rpb25zIGZyb20gJ0FwcEFjdGlvbnMnXG5pbXBvcnQgZG9tIGZyb20gJ2RvbS1oYW5kJ1xuaW1wb3J0IE1hdGVyaWFscyBmcm9tICdNYXRlcmlhbHMnXG5pbXBvcnQgVXRpbHMgZnJvbSAnVXRpbHMnXG5pbXBvcnQgR1VJIGZyb20gJ0dVSSdcbmltcG9ydCBNZWF0UGFydGljbGVzIGZyb20gJ01lYXRQYXJ0aWNsZXMnXG5cbmNsYXNzIEFwcFRlbXBsYXRlIGV4dGVuZHMgQmFzZUNvbXBvbmVudCB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKClcblx0XHR0aGlzLnJlc2l6ZSA9IHRoaXMucmVzaXplLmJpbmQodGhpcylcblx0XHR0aGlzLmFuaW1hdGUgPSB0aGlzLmFuaW1hdGUuYmluZCh0aGlzKVxuXHRcdHRoaXMubW91c2VNb3ZlID0gdGhpcy5tb3VzZU1vdmUuYmluZCh0aGlzKVxuXHRcdHRoaXMub25HZW9tZXRyeUxvYWRlZCA9IHRoaXMub25HZW9tZXRyeUxvYWRlZC5iaW5kKHRoaXMpXG5cdH1cblx0cmVuZGVyKHBhcmVudCkge1xuXHRcdHN1cGVyLnJlbmRlcignQXBwVGVtcGxhdGUnLCBwYXJlbnQsIHVuZGVmaW5lZClcblx0fVxuXHRjb21wb25lbnREaWRNb3VudCgpIHtcblxuXHRcdEFwcFN0b3JlLm9uKEFwcENvbnN0YW50cy5XSU5ET1dfUkVTSVpFLCB0aGlzLnJlc2l6ZSlcblx0XHRkb20uZXZlbnQod2luZG93LCAnbW91c2Vtb3ZlJywgdGhpcy5tb3VzZU1vdmUpXG5cblx0XHR0aGlzLmRvdCA9IHtcblx0XHRcdGVsOiBkb20uc2VsZWN0KCcjbW91c2UtZG90JywgZG9jdW1lbnQpXG5cdFx0fVxuXG5cdFx0dGhpcy5zY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xuXG4gICAgICAgIHRoaXMuY2FtZXJhID0gbmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKCA3NSwgd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHQsIDEsIDEwMDAwICk7XG4gICAgICAgIHRoaXMuY2FtZXJhLnBvc2l0aW9uLnogPSA4MDA7XG5cbiAgICAgICAgdGhpcy5yZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKHtcbiAgICAgICAgXHRhbnRpYWxpYXM6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U2l6ZSggd2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCApO1xuICAgICAgICBkb20udHJlZS5hZGQodGhpcy5lbGVtZW50LCB0aGlzLnJlbmRlcmVyLmRvbUVsZW1lbnQpXG5cbiAgICAgICAgdGhpcy5yYXljYXN0ZXIgPSBuZXcgVEhSRUUuUmF5Y2FzdGVyKCk7XG4gICAgICAgIHRoaXMubW91c2UgPSBuZXcgVEhSRUUuVmVjdG9yMigpO1xuICAgICAgICB0aGlzLmludGVyc2VjdGlvbiA9IHVuZGVmaW5lZFxuXG4gICAgICAgIHRoaXMua2ViYWIgPSBuZXcgVEhSRUUuT2JqZWN0M0QoKVxuICAgICAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLmtlYmFiKVxuXG4gICAgICAgIHRoaXMubWVhdFBhcnRpY2xlcyA9IE1lYXRQYXJ0aWNsZXModGhpcy5zY2VuZSlcblxuICAgICAgICB2YXIgcGxhbmVHZW9tZXRyeSA9IG5ldyBUSFJFRS5QbGFuZUdlb21ldHJ5KCAxMjAwLCA0MDAsIDEwLCAxMCApO1xuICAgICAgICB2YXIgcGxhbmVUZXh0dXJlID0gVXRpbHMuTG9hZFRleHR1cmUoXCJncmFkaWVudC1za3ktMTE3Mjk2OC5qcGdcIilcbiAgICAgICAgdmFyIHBsYW5lTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICAgICAgICBcdGNvbG9yOiAweGZmZmZmZixcbiAgICAgICAgXHRtYXA6IHBsYW5lVGV4dHVyZSxcbiAgICAgICAgXHRzaWRlOiBUSFJFRS5Eb3VibGVTaWRlXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmJhY2tncm91bmQgPSBuZXcgVEhSRUUuTWVzaChwbGFuZUdlb21ldHJ5LCBwbGFuZU1hdGVyaWFsKVxuICAgICAgICB0aGlzLmJhY2tncm91bmQuc2NhbGUuc2V0KDEwLCAxMCwgMTApXG4gICAgICAgIHRoaXMuYmFja2dyb3VuZC5wb3NpdGlvbi56ID0gLTYwMFxuICAgICAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLmJhY2tncm91bmQpXG5cbiAgICAgICAgdmFyIGFtYmllbnRMID0gbmV3IFRIUkVFLkFtYmllbnRMaWdodCggMHhmZmZmZmYgKTtcblxuXHRcdHZhciBkaXJlY3Rpb25hbExpZ2h0ID0gbmV3IFRIUkVFLkRpcmVjdGlvbmFsTGlnaHQoIDB4ZmZmZmZmLCAwLjcgKTtcblx0XHRkaXJlY3Rpb25hbExpZ2h0LnBvc2l0aW9uLnNldCggLTQwLCAxNywgMTAwIClcblx0XHRHVUkuc2V0RGlyZWN0aW9uYWxMaWdodCgnQSAnLCBkaXJlY3Rpb25hbExpZ2h0KVxuXG5cdFx0dmFyIGRpcmVjdGlvbmFsTGlnaHQyID0gbmV3IFRIUkVFLkRpcmVjdGlvbmFsTGlnaHQoIDB4ZmZmZmZmLCAxLjAgKTtcblx0XHRkaXJlY3Rpb25hbExpZ2h0Mi5wb3NpdGlvbi5zZXQoIC0xMDAsIDcyLCAtMTggKVxuXHRcdEdVSS5zZXREaXJlY3Rpb25hbExpZ2h0KCdCICcsIGRpcmVjdGlvbmFsTGlnaHQyKVxuXG5cdFx0dmFyIGRpcmVjdGlvbmFsTGlnaHQzID0gbmV3IFRIUkVFLkRpcmVjdGlvbmFsTGlnaHQoIDB4ZmZmZmZmLCAxLjAgKTtcblx0XHRkaXJlY3Rpb25hbExpZ2h0My5wb3NpdGlvbi5zZXQoIDEwMCwgMTcsIC01MCApXG5cdFx0R1VJLnNldERpcmVjdGlvbmFsTGlnaHQoJ0MgJywgZGlyZWN0aW9uYWxMaWdodDMpXG5cbiAgICAgICAgdGhpcy5saWdodHMgPSB7XG4gICAgICAgIFx0YW1iaWVudDogYW1iaWVudEwsXG4gICAgICAgIFx0ZGlyMTogZGlyZWN0aW9uYWxMaWdodCxcbiAgICAgICAgXHRkaXIyOiBkaXJlY3Rpb25hbExpZ2h0MixcbiAgICAgICAgXHRkaXIzOiBkaXJlY3Rpb25hbExpZ2h0MyxcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHRoaXMubGlnaHRzLmFtYmllbnQpXG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHRoaXMubGlnaHRzLmRpcjEpXG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHRoaXMubGlnaHRzLmRpcjIpXG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHRoaXMubGlnaHRzLmRpcjMpXG5cbiAgICAgICAgdmFyIG1hbmlmZXN0ID0gW1xuICAgICAgICBcdHsgaWQ6IEFwcENvbnN0YW50cy5LRUJBQi5CQVNFLCBzcmM6IFwibWVzaC9rZWJhYl9iYXNlLmpzXCIgfSxcbiAgICAgICAgXHR7IGlkOiBBcHBDb25zdGFudHMuS0VCQUIuVE9NQVRPLCBzcmM6IFwibWVzaC90b21hdG8uanNcIiB9LFxuICAgICAgICBcdHsgaWQ6IEFwcENvbnN0YW50cy5LRUJBQi5TSUxWRVIsIHNyYzogXCJtZXNoL3NpbHZlci5qc1wiIH0sXG4gICAgICAgIFx0eyBpZDogQXBwQ29uc3RhbnRzLktFQkFCLlBBUlRJQ0xFLCBzcmM6IFwibWVzaC9tZWF0LXBhcnRpY2xlLmpzXCIgfSxcbiAgICAgICAgXVxuICAgICAgICB0aGlzLmxvYWRBc3NldHMobWFuaWZlc3QpXG5cbiAgICAgICAgTGVhcC5sb29wKChmcmFtZSk9PiB7XG4gICAgICAgIFx0dmFyIGhhbmQgPSBmcmFtZS5oYW5kc1swXVxuXHRcdFx0aWYoaGFuZCkge1xuXHRcdFx0XHRsZXQgc2l6ZSA9IDUwXG5cdFx0XHRcdGxldCB4ID0gKHdpbmRvdy5pbm5lcldpZHRoICogMC40NSkgKyBoYW5kLnBhbG1Qb3NpdGlvblswXVxuXHRcdFx0XHRsZXQgeSA9ICh3aW5kb3cuaW5uZXJIZWlnaHQgKiAwLjkpIC0gaGFuZC5wYWxtUG9zaXRpb25bMV1cblx0XHRcdFx0dGhpcy5tb3VzZS54ID0gKHggLyB3aW5kb3cuaW5uZXJXaWR0aCkgKiAyIC0gMVxuXHRcdFx0XHR0aGlzLm1vdXNlLnkgPSAtKHkgLyB3aW5kb3cuaW5uZXJIZWlnaHQpICogMiArIDFcblx0XHRcdFx0VXRpbHMuVHJhbnNsYXRlKHRoaXMuZG90LmVsLCB4IC0gKHNpemUvMiksIHkgLSAoc2l6ZS8yKSwgMSlcblx0XHRcdH1cblx0XHR9KTtcblxuICAgICAgICB0aGlzLmFuaW1hdGUoKVxuXHRcdHN1cGVyLmNvbXBvbmVudERpZE1vdW50KClcblx0fVxuXHRtb3VzZU1vdmUoZSkge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHR0aGlzLm1vdXNlLnggPSAoIGUuY2xpZW50WCAvIHdpbmRvdy5pbm5lcldpZHRoICkgKiAyIC0gMTtcblx0XHR0aGlzLm1vdXNlLnkgPSAtICggZS5jbGllbnRZIC8gd2luZG93LmlubmVySGVpZ2h0ICkgKiAyICsgMTtcblx0fVxuXHRsb2FkQXNzZXRzKG1hbmlmZXN0KSB7XG5cdFx0dmFyIGpzb25Mb2FkZXIgPSBuZXcgVEhSRUUuSlNPTkxvYWRlcigpO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbWFuaWZlc3QubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBhc3NldCA9IG1hbmlmZXN0W2ldXG5cdFx0XHRqc29uTG9hZGVyLmxvYWQoIGFzc2V0LmlkLCBhc3NldC5zcmMsIHRoaXMub25HZW9tZXRyeUxvYWRlZCApO1xuXHRcdH07XG5cdH1cblx0b25HZW9tZXRyeUxvYWRlZChpZCwgZ2VvbWV0cnkpIHtcblx0XHRzd2l0Y2goaWQpIHtcblx0XHRcdGNhc2UgQXBwQ29uc3RhbnRzLktFQkFCLkJBU0U6IFxuXHRcdFx0XHR0aGlzLnNldHVwS2ViYWJCYXNlKGdlb21ldHJ5KVxuXHRcdFx0XHRicmVha1xuXHRcdFx0Y2FzZSBBcHBDb25zdGFudHMuS0VCQUIuVE9NQVRPOiBcblx0XHRcdFx0dGhpcy5zZXR1cFRvbWF0byhnZW9tZXRyeSlcblx0XHRcdFx0YnJlYWtcblx0XHRcdGNhc2UgQXBwQ29uc3RhbnRzLktFQkFCLlNJTFZFUjogXG5cdFx0XHRcdHRoaXMuc2V0dXBTaWx2ZXJCYXNlKGdlb21ldHJ5KVxuXHRcdFx0XHRicmVha1xuXHRcdFx0Y2FzZSBBcHBDb25zdGFudHMuS0VCQUIuUEFSVElDTEU6IFxuXHRcdFx0XHR0aGlzLm1lYXRQYXJ0aWNsZXMuc2V0dXAoZ2VvbWV0cnkpXG5cdFx0XHRcdGJyZWFrXG5cdFx0fVxuXHR9XG5cdHNjYWxlR2VvbWV0cnlNYXRyaXgoZ2VvbWV0cnkpIHtcblx0XHRnZW9tZXRyeS5hcHBseU1hdHJpeCggbmV3IFRIUkVFLk1hdHJpeDQoKS5tdWx0aXBseVNjYWxhciggMC41ICkgKTtcblx0fVxuXHRzZXR1cEtlYmFiQmFzZShnZW9tZXRyeSkge1xuXHRcdHZhciB0ZXh0dXJlID0gVXRpbHMuTG9hZFRleHR1cmUoXCJTaGF3YXJtYS1kaWZmLmpwZ1wiKVxuXHRcdHZhciBidW1wID0gVXRpbHMuTG9hZFRleHR1cmUoIFwiU2hhd2FybWEtYnVtcC5qcGdcIiApO1xuXHRcdHRoaXMuc2NhbGVHZW9tZXRyeU1hdHJpeChnZW9tZXRyeSlcblx0XHR2YXIgZGlmZnVzZUNvbG9yID0gbmV3IFRIUkVFLkNvbG9yKCAweGZmZmZmZiApXG5cdFx0dmFyIG1ldGFsbmVzcyA9IDAuNVxuXHRcdHZhciByb3VnaG5lc3MgPSAxLjBcblx0XHR2YXIgYnVtcFNjYWxlID0gMVxuXHRcdHZhciBtYXRlcmlhbCA9IE1hdGVyaWFscy5NZXNoU3RhbmRhcmRNYXRlcmlhbCgna2ViYWInLCB7XG5cdFx0XHRtYXA6IHRleHR1cmUsXG5cdFx0XHRidW1wTWFwOiBidW1wLFxuXHRcdFx0YnVtcFNjYWxlOiBidW1wU2NhbGUsXG5cdFx0XHRjb2xvcjogZGlmZnVzZUNvbG9yLFxuXHRcdFx0bWV0YWxuZXNzOiBtZXRhbG5lc3MsXG5cdFx0XHRyb3VnaG5lc3M6IHJvdWdobmVzc1xuXHRcdH0gKVxuXHRcdHZhciBob2xkZXIgPSBuZXcgVEhSRUUuT2JqZWN0M0QoKVxuXHRcdHZhciBtZXNoID0gbmV3IFRIUkVFLk1lc2goIGdlb21ldHJ5LCBtYXRlcmlhbCApO1xuXHRcdHRoaXMua2ViYWJCYXNlID0gbWVzaFxuXHRcdHRoaXMua2ViYWIuYWRkKG1lc2gpXG5cdH1cblx0c2V0dXBTaWx2ZXJCYXNlKGdlb21ldHJ5KSB7XG5cdFx0dmFyIHRleHR1cmUgPSBVdGlscy5Mb2FkVGV4dHVyZShcIlNoYXdhcm1hLWRpZmYuanBnXCIpXG5cdFx0dmFyIGJ1bXAgPSBVdGlscy5Mb2FkVGV4dHVyZSggXCJTaGF3YXJtYS1idW1wLmpwZ1wiICk7XG5cdFx0dGhpcy5zY2FsZUdlb21ldHJ5TWF0cml4KGdlb21ldHJ5KVxuXHRcdHZhciBkaWZmdXNlQ29sb3IgPSBuZXcgVEhSRUUuQ29sb3IoIDB4ZTBlMGUwIClcblx0XHR2YXIgbWV0YWxuZXNzID0gMC41NlxuXHRcdHZhciByb3VnaG5lc3MgPSAwLjdcblx0XHR2YXIgYnVtcFNjYWxlID0gMVxuXHRcdHZhciBtYXRlcmlhbCA9IE1hdGVyaWFscy5NZXNoU3RhbmRhcmRNYXRlcmlhbCgnc2lsdmVyJywge1xuXHRcdFx0Y29sb3I6IGRpZmZ1c2VDb2xvcixcblx0XHRcdG1ldGFsbmVzczogbWV0YWxuZXNzLFxuXHRcdFx0cm91Z2huZXNzOiByb3VnaG5lc3Ncblx0XHR9IClcblx0XHR2YXIgaG9sZGVyID0gbmV3IFRIUkVFLk9iamVjdDNEKClcblx0XHR2YXIgbWVzaCA9IG5ldyBUSFJFRS5NZXNoKCBnZW9tZXRyeSwgbWF0ZXJpYWwgKTtcblx0XHR0aGlzLmtlYmFiLmFkZChtZXNoKVxuXHR9XG5cdHNldHVwVG9tYXRvKGdlb21ldHJ5KSB7XG5cdFx0dmFyIHRleHR1cmUgPSBVdGlscy5Mb2FkVGV4dHVyZShcIlRvbWF0b19Ta2luLmpwZ1wiKVxuXHRcdHZhciBidW1wID0gVXRpbHMuTG9hZFRleHR1cmUoIFwiVG9tYXRvX3NraW5fYnVtcC5qcGdcIiApO1xuXHRcdHRoaXMuc2NhbGVHZW9tZXRyeU1hdHJpeChnZW9tZXRyeSlcblx0XHR2YXIgZGlmZnVzZUNvbG9yID0gbmV3IFRIUkVFLkNvbG9yKCAweGZmZmZmZiApXG5cdFx0dmFyIG1ldGFsbmVzcyA9IDAuNVxuXHRcdHZhciByb3VnaG5lc3MgPSAxLjBcblx0XHR2YXIgYnVtcFNjYWxlID0gMVxuXHRcdHZhciBtYXRlcmlhbCA9IE1hdGVyaWFscy5NZXNoU3RhbmRhcmRNYXRlcmlhbCgndG9tYXRvJywge1xuXHRcdFx0bWFwOiB0ZXh0dXJlLFxuXHRcdFx0YnVtcE1hcDogYnVtcCxcblx0XHRcdGJ1bXBTY2FsZTogYnVtcFNjYWxlLFxuXHRcdFx0Y29sb3I6IGRpZmZ1c2VDb2xvcixcblx0XHRcdG1ldGFsbmVzczogbWV0YWxuZXNzLFxuXHRcdFx0cm91Z2huZXNzOiByb3VnaG5lc3Ncblx0XHR9IClcblx0XHR2YXIgaG9sZGVyID0gbmV3IFRIUkVFLk9iamVjdDNEKClcblx0XHR2YXIgbWVzaCA9IG5ldyBUSFJFRS5NZXNoKCBnZW9tZXRyeSwgbWF0ZXJpYWwgKTtcblx0XHR0aGlzLmtlYmFiLmFkZChtZXNoKVxuXHR9XG5cdGFuaW1hdGUoKSB7XG5cdFx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuYW5pbWF0ZSlcblxuICAgICAgICB0aGlzLmtlYmFiLnJvdGF0aW9uLnkgKz0gMC4wMDZcblxuICAgICAgICB0aGlzLnJheWNhc3Rlci5zZXRGcm9tQ2FtZXJhKCB0aGlzLm1vdXNlLCB0aGlzLmNhbWVyYSApO1xuXG4gICAgICAgIGlmKHRoaXMua2ViYWJCYXNlICE9IHVuZGVmaW5lZCkge1xuICAgICAgICBcdHZhciBpbnRlcnNlY3Rpb25zID0gdGhpcy5yYXljYXN0ZXIuaW50ZXJzZWN0T2JqZWN0cyggW3RoaXMua2ViYWJCYXNlXSApO1xuICAgICAgICBcdHRoaXMuaW50ZXJzZWN0aW9uID0gKCBpbnRlcnNlY3Rpb25zLmxlbmd0aCApID4gMCA/IGludGVyc2VjdGlvbnNbIDAgXSA6IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm1lYXRQYXJ0aWNsZXMudXBkYXRlKHRoaXMuaW50ZXJzZWN0aW9uKVxuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlciggdGhpcy5zY2VuZSwgdGhpcy5jYW1lcmEgKTtcblx0fVxuXHRyZXNpemUoKSB7XG5cdFx0dGhpcy5jYW1lcmEuYXNwZWN0ID0gd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cdCAgICB0aGlzLmNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG5cdCAgICB0aGlzLnJlbmRlcmVyLnNldFNpemUoIHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQgKTtcblxuXHRcdHN1cGVyLnJlc2l6ZSgpXG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXBwVGVtcGxhdGVcblxuIiwiaW1wb3J0IEFwcENvbnN0YW50cyBmcm9tICdBcHBDb25zdGFudHMnXG5pbXBvcnQgQXBwRGlzcGF0Y2hlciBmcm9tICdBcHBEaXNwYXRjaGVyJ1xuaW1wb3J0IEFwcFN0b3JlIGZyb20gJ0FwcFN0b3JlJ1xuXG5mdW5jdGlvbiBfcHJvY2VlZFRyYW5zaXRpb25JbkFjdGlvbihwYWdlSWQpIHtcbiAgICBBcHBEaXNwYXRjaGVyLmhhbmRsZVZpZXdBY3Rpb24oe1xuICAgICAgICBhY3Rpb25UeXBlOiBBcHBDb25zdGFudHMuUEFHRV9BU1NFVFNfTE9BREVELFxuICAgICAgICBpdGVtOiBwYWdlSWRcbiAgICB9KSAgXG59XG5cbnZhciBBcHBBY3Rpb25zID0ge1xuICAgIHBhZ2VIYXNoZXJDaGFuZ2VkOiBmdW5jdGlvbihwYWdlSWQpIHtcbiAgICAgICAgQXBwRGlzcGF0Y2hlci5oYW5kbGVWaWV3QWN0aW9uKHtcbiAgICAgICAgICAgIGFjdGlvblR5cGU6IEFwcENvbnN0YW50cy5QQUdFX0hBU0hFUl9DSEFOR0VELFxuICAgICAgICAgICAgaXRlbTogcGFnZUlkXG4gICAgICAgIH0pXG4gICAgfSxcbiAgICBsb2FkUGFnZUFzc2V0czogZnVuY3Rpb24ocGFnZUlkKSB7XG4gICAgICAgIHZhciBtYW5pZmVzdCA9IEFwcFN0b3JlLnBhZ2VBc3NldHNUb0xvYWQoKVxuICAgICAgICBpZihtYW5pZmVzdC5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICBfcHJvY2VlZFRyYW5zaXRpb25JbkFjdGlvbihwYWdlSWQpXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgQXBwU3RvcmUuUHJlbG9hZGVyLmxvYWQobWFuaWZlc3QsICgpPT57XG4gICAgICAgICAgICAgICAgX3Byb2NlZWRUcmFuc2l0aW9uSW5BY3Rpb24ocGFnZUlkKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH0sXG4gICAgd2luZG93UmVzaXplOiBmdW5jdGlvbih3aW5kb3dXLCB3aW5kb3dIKSB7XG4gICAgICAgIEFwcERpc3BhdGNoZXIuaGFuZGxlVmlld0FjdGlvbih7XG4gICAgICAgICAgICBhY3Rpb25UeXBlOiBBcHBDb25zdGFudHMuV0lORE9XX1JFU0laRSxcbiAgICAgICAgICAgIGl0ZW06IHsgd2luZG93Vzp3aW5kb3dXLCB3aW5kb3dIOndpbmRvd0ggfVxuICAgICAgICB9KVxuICAgIH0sXG4gICAgcHhDb250YWluZXJJc1JlYWR5OiBmdW5jdGlvbihjb21wb25lbnQpIHtcbiAgICAgICAgQXBwRGlzcGF0Y2hlci5oYW5kbGVWaWV3QWN0aW9uKHtcbiAgICAgICAgICAgIGFjdGlvblR5cGU6IEFwcENvbnN0YW50cy5QWF9DT05UQUlORVJfSVNfUkVBRFksXG4gICAgICAgICAgICBpdGVtOiBjb21wb25lbnRcbiAgICAgICAgfSkgICAgICAgICAgICBcbiAgICB9LFxuICAgIHB4QWRkQ2hpbGQ6IGZ1bmN0aW9uKGNoaWxkKSB7XG4gICAgICAgIEFwcERpc3BhdGNoZXIuaGFuZGxlVmlld0FjdGlvbih7XG4gICAgICAgICAgICBhY3Rpb25UeXBlOiBBcHBDb25zdGFudHMuUFhfQ09OVEFJTkVSX0FERF9DSElMRCxcbiAgICAgICAgICAgIGl0ZW06IGNoaWxkXG4gICAgICAgIH0pICAgICAgICAgICAgXG4gICAgfSxcbiAgICBweFJlbW92ZUNoaWxkOiBmdW5jdGlvbihjaGlsZCkge1xuICAgICAgICBBcHBEaXNwYXRjaGVyLmhhbmRsZVZpZXdBY3Rpb24oe1xuICAgICAgICAgICAgYWN0aW9uVHlwZTogQXBwQ29uc3RhbnRzLlBYX0NPTlRBSU5FUl9SRU1PVkVfQ0hJTEQsXG4gICAgICAgICAgICBpdGVtOiBjaGlsZFxuICAgICAgICB9KSAgICAgICAgICAgIFxuICAgIH0sXG4gICAgb3BlbkZ1bkZhY3Q6IGZ1bmN0aW9uKCkge1xuICAgICAgICBBcHBEaXNwYXRjaGVyLmhhbmRsZVZpZXdBY3Rpb24oe1xuICAgICAgICAgICAgYWN0aW9uVHlwZTogQXBwQ29uc3RhbnRzLk9QRU5fRlVOX0ZBQ1QsXG4gICAgICAgICAgICBpdGVtOiB1bmRlZmluZWRcbiAgICAgICAgfSlcbiAgICB9LFxuICAgIGNsb3NlRnVuRmFjdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIEFwcERpc3BhdGNoZXIuaGFuZGxlVmlld0FjdGlvbih7XG4gICAgICAgICAgICBhY3Rpb25UeXBlOiBBcHBDb25zdGFudHMuQ0xPU0VfRlVOX0ZBQ1QsXG4gICAgICAgICAgICBpdGVtOiB1bmRlZmluZWRcbiAgICAgICAgfSkgIFxuICAgIH0sXG4gICAgY2VsbE1vdXNlRW50ZXI6IGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgIEFwcERpc3BhdGNoZXIuaGFuZGxlVmlld0FjdGlvbih7XG4gICAgICAgICAgICBhY3Rpb25UeXBlOiBBcHBDb25zdGFudHMuQ0VMTF9NT1VTRV9FTlRFUixcbiAgICAgICAgICAgIGl0ZW06IGlkXG4gICAgICAgIH0pIFxuICAgIH0sXG4gICAgY2VsbE1vdXNlTGVhdmU6IGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgIEFwcERpc3BhdGNoZXIuaGFuZGxlVmlld0FjdGlvbih7XG4gICAgICAgICAgICBhY3Rpb25UeXBlOiBBcHBDb25zdGFudHMuQ0VMTF9NT1VTRV9MRUFWRSxcbiAgICAgICAgICAgIGl0ZW06IGlkXG4gICAgICAgIH0pXG4gICAgfSxcbiAgICBvcGVuRmVlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIEFwcERpc3BhdGNoZXIuaGFuZGxlVmlld0FjdGlvbih7XG4gICAgICAgICAgICBhY3Rpb25UeXBlOiBBcHBDb25zdGFudHMuT1BFTl9GRUVELFxuICAgICAgICAgICAgaXRlbTogdW5kZWZpbmVkXG4gICAgICAgIH0pICBcbiAgICB9LFxuICAgIG9wZW5HcmlkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgQXBwRGlzcGF0Y2hlci5oYW5kbGVWaWV3QWN0aW9uKHtcbiAgICAgICAgICAgIGFjdGlvblR5cGU6IEFwcENvbnN0YW50cy5PUEVOX0dSSUQsXG4gICAgICAgICAgICBpdGVtOiB1bmRlZmluZWRcbiAgICAgICAgfSkgIFxuICAgIH0sXG4gICAgYXBwU3RhcnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBBcHBEaXNwYXRjaGVyLmhhbmRsZVZpZXdBY3Rpb24oe1xuICAgICAgICAgICAgYWN0aW9uVHlwZTogQXBwQ29uc3RhbnRzLkFQUF9TVEFSVCxcbiAgICAgICAgICAgIGl0ZW06IHVuZGVmaW5lZFxuICAgICAgICB9KSAgICBcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFwcEFjdGlvbnNcblxuXG4gICAgICBcbiIsIlxuZXhwb3J0IGRlZmF1bHQgKHBhcmVudCwgdGV4dHVyZSwgZ2VvbWV0cnksIGFuaW1hdG9yKT0+IHtcblx0dmFyIHNjb3BlO1xuXHR2YXIgY2xvY2sgPSBuZXcgVEhSRUUuQ2xvY2soKTtcblx0XG5cdC8vIGNvbnNvbGUubG9nKHBhcmVudCwgdGV4dHVyZSwgZ2VvbWV0cnksIGFuaW1hdG9yKVxuXHRsZXQgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoIHtcblx0XHRtYXA6IHRleHR1cmUsXG5cdFx0dHJhbnNwYXJlbnQ6IHRydWUsIFxuXHRcdG9wYWNpdHk6IDEsXG5cdFx0c2lkZTogVEhSRUUuRG91YmxlU2lkZVxuXHR9ICk7XG5cdGxldCBtZXNoID0gbmV3IFRIUkVFLk1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKTtcblx0bGV0IHNjYWxlID0gMzAwXG5cdG1lc2guc2NhbGUuc2V0KHNjYWxlLCBzY2FsZSwgc2NhbGUpXG5cdHBhcmVudC5hZGQobWVzaCk7XG5cblx0c2NvcGUgPSB7XG5cdFx0bWVzaDogbWVzaCxcblx0XHR1cGRhdGU6ICgpPT4ge1xuXHRcdFx0dmFyIGRlbHRhID0gY2xvY2suZ2V0RGVsdGEoKTsgXG5cdFx0XHRhbmltYXRvci51cGRhdGUoMTAwMCAqIGRlbHRhKTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gc2NvcGVcbn0iLCJpbXBvcnQgR1VJQ29udHJvbGxlciBmcm9tICdHVUlDb250cm9sbGVyJ1xuXG5mdW5jdGlvbiBfZ2V0R1VJKCkge1xuXHRpZihHVUkuZ3VpID09IHVuZGVmaW5lZCkge1xuXHRcdEdVSS5ndWkgPSBuZXcgZGF0LkdVSSgpO1xuXHRcdHJldHVybiBHVUkuZ3VpXG5cdH1lbHNle1xuXHRcdHJldHVybiBHVUkuZ3VpXG5cdH1cbn1cblxudmFyIEdVSSA9IHtcblx0Z3VpOiB1bmRlZmluZWQsXG5cdHNldFN0YW5kYXJkTWF0ZXJpYWw6IGZ1bmN0aW9uKGlkLCBtYXRlcmlhbCkge1xuXHRcdC8vIHZhciBndWkgPSBfZ2V0R1VJKClcblx0XHQvLyB2YXIgZm9sZGVyID0gZ3VpLmFkZEZvbGRlcihpZCArICcgU3RhbmRhcmRNYXRlcmlhbCcpO1xuXHRcdC8vIG5ldyBHVUlDb250cm9sbGVyKGZvbGRlciwgbWF0ZXJpYWwsICdtZXRhbG5lc3MnLCB7IGZyb206IDAsIHRvOiAzIH0pXG5cdFx0Ly8gbmV3IEdVSUNvbnRyb2xsZXIoZm9sZGVyLCBtYXRlcmlhbCwgJ3JvdWdobmVzcycsIHsgZnJvbTogMCwgdG86IDMgfSlcblx0XHQvLyBuZXcgR1VJQ29udHJvbGxlcihmb2xkZXIsIG1hdGVyaWFsLCAnYnVtcFNjYWxlJywgeyBmcm9tOiAwLCB0bzogMyB9KVxuXHRcdC8vIG5ldyBHVUlDb250cm9sbGVyKGZvbGRlciwgbWF0ZXJpYWwsICdjb2xvcicsIHsgY29sb3I6IFsgMCwgMCwgMCBdIH0pXG5cdFx0Ly8gbmV3IEdVSUNvbnRyb2xsZXIoZm9sZGVyLCBtYXRlcmlhbCwgJ2VtaXNzaXZlJywgeyBjb2xvcjogWyAwLCAwLCAwIF0gfSlcblx0XHQvLyBmb2xkZXIub3BlbigpXG5cdH0sXG5cdHNldFBob25nTWF0ZXJpYWw6IGZ1bmN0aW9uKGlkLCBtYXRlcmlhbCkge1xuXHRcdC8vIHZhciBndWkgPSBfZ2V0R1VJKClcblx0XHQvLyB2YXIgZm9sZGVyID0gZ3VpLmFkZEZvbGRlcihpZCArICcgUGhvbmdNYXRlcmlhbCcpO1xuXHRcdC8vIG5ldyBHVUlDb250cm9sbGVyKGZvbGRlciwgbWF0ZXJpYWwsICdzaGluaW5lc3MnLCB7IGZyb206IDAsIHRvOiA1MCB9KVxuXHRcdC8vIG5ldyBHVUlDb250cm9sbGVyKGZvbGRlciwgbWF0ZXJpYWwsICdyZWZsZWN0aXZpdHknLCB7IGZyb206IDAsIHRvOiA1IH0pXG5cdFx0Ly8gbmV3IEdVSUNvbnRyb2xsZXIoZm9sZGVyLCBtYXRlcmlhbCwgJ2NvbG9yJywgeyBjb2xvcjogWyAwLCAwLCAwIF0gfSlcblx0XHQvLyBuZXcgR1VJQ29udHJvbGxlcihmb2xkZXIsIG1hdGVyaWFsLCAnZW1pc3NpdmUnLCB7IGNvbG9yOiBbIDAsIDAsIDAgXSB9KVxuXHRcdC8vIG5ldyBHVUlDb250cm9sbGVyKGZvbGRlciwgbWF0ZXJpYWwsICdzcGVjdWxhcicsIHsgY29sb3I6IFsgMCwgMCwgMCBdIH0pXG5cdFx0Ly8gZm9sZGVyLm9wZW4oKVxuXHR9LFxuXHRzZXREaXJlY3Rpb25hbExpZ2h0OiBmdW5jdGlvbihpZCwgbGlnaHQpIHtcblx0XHQvLyB2YXIgZ3VpID0gX2dldEdVSSgpXG5cdFx0Ly8gdmFyIGZvbGRlciA9IGd1aS5hZGRGb2xkZXIoaWQgKyAnIERpcmVjdGlvbmFsTGlnaHQnKTtcblx0XHQvLyBuZXcgR1VJQ29udHJvbGxlcihmb2xkZXIsIGxpZ2h0LCAncG9zaXRpb24nLCB7IHg6MTAwLCB5OjEwMCwgejoxMDAgfSlcblx0XHQvLyBuZXcgR1VJQ29udHJvbGxlcihmb2xkZXIsIGxpZ2h0LCAnaW50ZW5zaXR5JywgeyBmcm9tOiAwLCB0bzogNTAgfSlcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBHVUkiLCJpbXBvcnQgVXRpbHMgZnJvbSAnVXRpbHMnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdVSUNvbnRyb2xsZXIge1xuXHRjb25zdHJ1Y3Rvcihmb2xkZXIsIHByb3BzLCBpZCwgdmFycykge1xuXHRcdHRoaXMucHJvcHMgPSBwcm9wc1xuXHRcdHRoaXMuaWQgPSBpZFxuXG5cdFx0aWYodmFycy5mcm9tICE9IHVuZGVmaW5lZCAmJiB2YXJzLnRvICE9IHVuZGVmaW5lZCkge1xuXHRcdFx0dmFyIGNvbnRyb2xsZXIgPSBmb2xkZXIuYWRkKHByb3BzLCBpZCwgdmFycy5mcm9tLCB2YXJzLnRvKTtcblx0XHRcdGNvbnRyb2xsZXIub25DaGFuZ2UoKHZhbHVlKT0+IHtcblx0XHRcdFx0cHJvcHNbaWRdID0gdmFsdWVcblx0XHRcdH0pXG5cdFx0fWVsc2UgaWYodmFycy5jb2xvciAhPSB1bmRlZmluZWQpIHtcblx0XHRcdHZhciBjb250cm9sbGVyID0gZm9sZGVyLmFkZENvbG9yKHByb3BzLCBpZCwgdmFycy5jb2xvcik7XG5cdFx0XHRjb250cm9sbGVyLm9uQ2hhbmdlKCh2YWx1ZSk9PiB7XG5cdFx0XHRcdHZhciBoZXggPSBVdGlscy5yZ2JUb0hleChNYXRoLnJvdW5kKHZhbHVlLnIpLCBNYXRoLnJvdW5kKHZhbHVlLmcpLCBNYXRoLnJvdW5kKHZhbHVlLmIpKVxuXHRcdFx0XHR2YXIgY29sb3IgPSBuZXcgVEhSRUUuQ29sb3IoaGV4KVxuXHRcdFx0XHRwcm9wc1tpZF0gPSBjb2xvclxuXHRcdFx0XHRjb25zb2xlLmxvZyhpZCwgaGV4KVxuXHRcdFx0fSlcblx0XHR9ZWxzZSBpZih2YXJzLnggIT0gdW5kZWZpbmVkICYmIHZhcnMueSAhPSB1bmRlZmluZWQgJiYgdmFycy56ICE9IHVuZGVmaW5lZCkge1xuXHRcdFx0Zm9sZGVyLmFkZChwcm9wcy5wb3NpdGlvbiwgJ3gnLCAtdmFycy54LCB2YXJzLngpO1xuXHRcdFx0Zm9sZGVyLmFkZChwcm9wcy5wb3NpdGlvbiwgJ3knLCAtdmFycy55LCB2YXJzLnkpO1xuXHRcdFx0Zm9sZGVyLmFkZChwcm9wcy5wb3NpdGlvbiwgJ3onLCAtdmFycy56LCB2YXJzLnopO1xuXHRcdH1cblxuXHR9XG5cdGFkZFZhbHVlKCkge1xuXG5cdH1cbn1cbiIsImltcG9ydCBHVUkgZnJvbSAnR1VJJ1xuXG5mdW5jdGlvbiBfY2hlY2tTaGFkaW5nKHByb3BzKSB7XG5cdHZhciBzaGFkaW5nID0gcHJvcHMuc2hhZGluZyB8fCBUSFJFRS5TbW9vdGhTaGFkaW5nXG5cdHByb3BzLnNoYWRpbmcgPSBzaGFkaW5nXG59XG5cbnZhciBNYXRlcmlhbHMgPSB7XG5cdE1lc2hTdGFuZGFyZE1hdGVyaWFsOiBmdW5jdGlvbihpZCwgcHJvcHMpIHtcblx0XHRfY2hlY2tTaGFkaW5nKHByb3BzKVxuXHRcdHZhciBtYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoU3RhbmRhcmRNYXRlcmlhbCggcHJvcHMgKVxuXHRcdEdVSS5zZXRTdGFuZGFyZE1hdGVyaWFsKGlkLCBtYXRlcmlhbClcblx0XHRyZXR1cm4gbWF0ZXJpYWxcblx0fSxcblx0TWVzaFBob25nTWF0ZXJpYWw6IGZ1bmN0aW9uKGlkLCBwcm9wcykge1xuXHRcdF9jaGVja1NoYWRpbmcocHJvcHMpXG5cdFx0dmFyIG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hQaG9uZ01hdGVyaWFsKCBwcm9wcyApXG5cdFx0R1VJLnNldFBob25nTWF0ZXJpYWwoaWQsIG1hdGVyaWFsKVxuXHRcdHJldHVybiBtYXRlcmlhbFxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1hdGVyaWFscyIsImltcG9ydCBVdGlscyBmcm9tICdVdGlscydcbmltcG9ydCBUZXh0dXJlQW5pbWF0b3IgZnJvbSAnVGV4dHVyZUFuaW1hdG9yJ1xuaW1wb3J0IEFuaW1hdGVkUGFydGljbGUgZnJvbSAnQW5pbWF0ZWRQYXJ0aWNsZSdcblxuZXhwb3J0IGRlZmF1bHQgKG1hdGVyaWFsLCBhbmltVGV4dHVyZXMpPT4ge1xuXHR2YXIgc2NvcGU7XG5cdHZhciBtZWF0TWVzaCA9IG5ldyBUSFJFRS5NZXNoKClcblx0dmFyIGludGVyc2VjdGlvbjtcblx0Y29uc3QgVVAgPSAnVVAnXG5cdGNvbnN0IERPV04gPSAnRE9XTidcblx0bGV0IGFuaW1TdGF0ZSA9IERPV05cblx0bGV0IGNvbnRhaW5lciA9IG5ldyBUSFJFRS5PYmplY3QzRCgpXG5cdGxldCBhbmltQ29udGFpbmVyID0gbmV3IFRIUkVFLk9iamVjdDNEKClcblx0Y29udGFpbmVyLmFkZChtZWF0TWVzaClcblx0Y29udGFpbmVyLmFkZChhbmltQ29udGFpbmVyKVxuXHRtZWF0TWVzaC5tYXRlcmlhbCA9IG1hdGVyaWFsXG5cdGNvbnRhaW5lci5wb3NpdGlvbi54ID0gMFxuXHRjb250YWluZXIudmVsb2NpdHkgPSBuZXcgVEhSRUUuVmVjdG9yMygwLCAwLCAwKVxuXHRjb250YWluZXIub2Zmc2V0ID0gbmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgMClcblx0Y29udGFpbmVyLm9mZnNldFVwID0gbmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgMClcblx0Y29udGFpbmVyLmRpciA9IE1hdGgucmFuZG9tKCkgKiAxID4gMC40NSA/IDEgOiAtMVxuXHRjb250YWluZXIub3BhY2l0eSA9IDBcblxuXHRsZXQgdGV4dHVyZSA9IGFuaW1UZXh0dXJlc1swXS50ZXhcblx0Ly8gbGV0IGFuaW1hdG9yID0gbmV3IFRleHR1cmVBbmltYXRvciggdGV4dHVyZSwgYW5pbVRleHR1cmVzWzBdLmhvcml6LCBhbmltVGV4dHVyZXNbMF0udmVydCwgYW5pbVRleHR1cmVzWzBdLnRvdGFsLCBhbmltVGV4dHVyZXNbMF0uZHVyYXRpb24gKTsgLy8gdGV4dHVyZSwgI2hvcml6LCAjdmVydCwgI3RvdGFsLCBkdXJhdGlvbi5cblx0bGV0IGFuaW1hdG9yID0gdW5kZWZpbmVkXG5cdGxldCBnZW9tZXRyeSA9IG5ldyBUSFJFRS5QbGFuZUdlb21ldHJ5KDEwMCwgMTAwLCAxLCAxKTtcblx0bGV0IGFuaW1hdGVkUGFydGljbGUgPSBBbmltYXRlZFBhcnRpY2xlKGFuaW1Db250YWluZXIsIHRleHR1cmUsIGdlb21ldHJ5LCBhbmltYXRvcilcblxuXHR2YXIgcmVzZXRNZXNoID0gKCkgPT4ge1xuXHRcdGxldCBzY2FsZSA9IFV0aWxzLlJhbmQoMC4wMDEsIDAuMDA1LCA0KVxuXHRcdGNvbnRhaW5lci5zY2FsZS5zZXQoc2NhbGUsIHNjYWxlLCBzY2FsZSlcblx0XHRjb250YWluZXIudmVsb2NpdHkueSA9IFV0aWxzLlJhbmQoMywgMTIsIDMpXG5cdFx0Y29udGFpbmVyLm9mZnNldC54ID0gTWF0aC5yYWRpYW5zKFV0aWxzLlJhbmQoLTUwLCA1MCwgMCkpXG5cdFx0Y29udGFpbmVyLm9mZnNldFVwLnggPSBNYXRoLnJhZGlhbnMoVXRpbHMuUmFuZCg0MDAsIDgwMCwgMCkpXG5cdFx0Y29udGFpbmVyLnJvdGF0aW9uLnggPSBNYXRoLnJhZGlhbnMoVXRpbHMuUmFuZCgtMTgwLCAxODAsIDApKVxuXHRcdGNvbnRhaW5lci5yb3RhdGlvbi55ID0gTWF0aC5yYWRpYW5zKFV0aWxzLlJhbmQoLTE4MCwgMTgwLCAwKSlcblx0XHRjb250YWluZXIucm90YXRpb24ueiA9IE1hdGgucmFkaWFucyhVdGlscy5SYW5kKC0xODAsIDE4MCwgMCkpXG5cdFx0Y29udGFpbmVyLm9wYWNpdHkgPSAxXG5cdFx0bWVhdE1lc2gubWF0ZXJpYWwub3BhY2l0eSA9IGNvbnRhaW5lci5vcGFjaXR5XG5cdFx0YW5pbWF0ZWRQYXJ0aWNsZS5tZXNoLm1hdGVyaWFsLm9wYWNpdHkgPSAwXG5cdFx0bWVhdE1lc2gucG9zaXRpb24ueSA9IDBcblx0fVxuXHRyZXNldE1lc2goKVxuXHRcblx0c2NvcGUgPSB7XG5cdFx0Z2VvbWV0cnlBZGRUbzogKGdlb21ldHJ5LCBwYXJlbnQpID0+IHtcblx0XHRcdG1lYXRNZXNoLmdlb21ldHJ5ID0gZ2VvbWV0cnlcblx0XHRcdHBhcmVudC5hZGQoY29udGFpbmVyKVxuXHRcdH0sXG5cdFx0dXBkYXRlOiAoaW50ZXIpPT4ge1xuXHRcdFx0aW50ZXJzZWN0aW9uID0gaW50ZXJcblxuXHRcdFx0aWYoYW5pbVN0YXRlID09PSBET1dOKSB7XG5cdFx0XHRcdGNvbnRhaW5lci5wb3NpdGlvbi55IC09IGNvbnRhaW5lci52ZWxvY2l0eS55XG5cdFx0XHRcdGNvbnRhaW5lci5yb3RhdGlvbi54ICs9IDAuMDA1XG5cdFx0XHRcdGNvbnRhaW5lci5yb3RhdGlvbi55ICs9IDAuMDA2XG5cdFx0XHRcdGNvbnRhaW5lci5yb3RhdGlvbi56ICs9IDAuMDA4XG5cdFx0XHRcdGNvbnRhaW5lci5wb3NpdGlvbi54ICs9IGNvbnRhaW5lci5vZmZzZXQueFxuXHRcdFx0XHRhbmltYXRlZFBhcnRpY2xlLm1lc2gubWF0ZXJpYWwub3BhY2l0eSA9IDBcblx0XHRcdFx0aWYoY29udGFpbmVyLnBvc2l0aW9uLnkgPCAtNTAwKSB7XG5cdFx0XHRcdFx0YW5pbVN0YXRlID0gVVBcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIGlmKGFuaW1TdGF0ZSA9PT0gVVApIHtcblx0XHRcdFx0Y29udGFpbmVyLnBvc2l0aW9uLnkgKz0gKGNvbnRhaW5lci52ZWxvY2l0eS55IC0gY29udGFpbmVyLnBvc2l0aW9uLnkpICogMC4wMlxuXHRcdFx0XHRjb250YWluZXIucG9zaXRpb24ueCArPSBjb250YWluZXIub2Zmc2V0VXAueCAqIGNvbnRhaW5lci5kaXJcblx0XHRcdFx0aWYoY29udGFpbmVyLnBvc2l0aW9uLnkgPiAtMjAwKSBjb250YWluZXIub3BhY2l0eSArPSAoMC4wMDEgLSBjb250YWluZXIub3BhY2l0eSkgKiAwLjJcblx0XHRcdFx0Y29udGFpbmVyLnJvdGF0aW9uLnggKz0gMC4wMDVcblx0XHRcdFx0Y29udGFpbmVyLnJvdGF0aW9uLnkgKz0gMC4wMDZcblx0XHRcdFx0Y29udGFpbmVyLnJvdGF0aW9uLnogKz0gMC4wMDhcblx0XHRcdFx0bWVhdE1lc2gubWF0ZXJpYWwub3BhY2l0eSA9IDBcblx0XHRcdFx0bWVhdE1lc2gucG9zaXRpb24ueSA9IDEzMDBcblx0XHRcdFx0YW5pbWF0ZWRQYXJ0aWNsZS5tZXNoLm1hdGVyaWFsLm9wYWNpdHkgPSBjb250YWluZXIub3BhY2l0eVxuXHRcdFx0XHRpZihjb250YWluZXIub3BhY2l0eSA8IDAuMDEpIHtcblx0XHRcdFx0XHRzY29wZS5yZXNldCgpXG5cdFx0XHRcdFx0YW5pbVN0YXRlID0gRE9XTlxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHQvLyBhbmltYXRlZFBhcnRpY2xlLnVwZGF0ZSgpXG5cdFx0fSxcblx0XHRyZXNldDogKCk9PiB7XG5cdFx0XHRpZihpbnRlcnNlY3Rpb24pIHtcblx0XHRcdFx0Y29udGFpbmVyLnBvc2l0aW9uLnggPSBpbnRlcnNlY3Rpb24ucG9pbnQueFxuXHRcdFx0XHRjb250YWluZXIucG9zaXRpb24ueSA9IGludGVyc2VjdGlvbi5wb2ludC55XG5cdFx0XHRcdGNvbnRhaW5lci5wb3NpdGlvbi56ID0gMjAwXG5cdFx0XHRcdHJlc2V0TWVzaCgpXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHNjb3BlXG59IiwiaW1wb3J0IE1lYXRQYXJ0aWNsZSBmcm9tICdNZWF0UGFydGljbGUnXG5pbXBvcnQgVXRpbHMgZnJvbSAnVXRpbHMnXG5pbXBvcnQgQW5pbWF0ZWRQYXJ0aWNsZSBmcm9tICdBbmltYXRlZFBhcnRpY2xlJ1xuXG5leHBvcnQgZGVmYXVsdCAoY29udGFpbmVyKT0+IHtcblx0dmFyIHNjb3BlO1xuXHRsZXQgcGFyZW50ID0gbmV3IFRIUkVFLk9iamVjdDNEKClcblx0bGV0IGludGVyc2VjdGlvbjtcblxuXHRjb25zdCBNRUFUX1BBUlRJQ0xFU19OVU0gPSA4MFxuXHRsZXQgbWVhdFRleHR1cmUgPSBVdGlscy5Mb2FkVGV4dHVyZShcIlNoYXdhcm1hLWRpZmYuanBnXCIpXG5cdGxldCBtZWF0RGlmZnVzZUNvbG9yID0gbmV3IFRIUkVFLkNvbG9yKCAweGZmZmZmZiApXG5cdGxldCBtZWF0TWV0YWxuZXNzID0gMC41XG5cdGxldCBtZWF0Um91Z2huZXNzID0gMS4wXG5cblxuXHRsZXQgYW5pbVRleHR1cmVzID0gW1xuXHRcdHtcblx0XHRcdHRleDogbmV3IFRIUkVFLkltYWdlVXRpbHMubG9hZFRleHR1cmUoICdpbWFnZS90ZXh0dXJlcy9jYXQucG5nJyApLFxuXHRcdFx0aG9yaXpvbnRhbDogNCwgXG5cdFx0XHR2ZXJ0aWNhbDogMSwgXG5cdFx0XHR0b3RhbDogNCwgXG5cdFx0XHRkdXJhdGlvbjogMTUwXG5cdFx0fVxuXHRdXG5cblx0bGV0IHBhcnRpY2xlcyA9IFtdXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgTUVBVF9QQVJUSUNMRVNfTlVNOyBpKyspIHtcblx0XHRsZXQgbWVhdE1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsKHtcblx0XHRcdG1hcDogbWVhdFRleHR1cmUsXG5cdFx0XHRjb2xvcjogbWVhdERpZmZ1c2VDb2xvcixcblx0XHRcdG1ldGFsbmVzczogbWVhdE1ldGFsbmVzcyxcblx0XHRcdHJvdWdobmVzczogbWVhdFJvdWdobmVzcyxcblx0XHRcdHRyYW5zcGFyZW50OiB0cnVlXG5cdFx0fSlcblx0XHRwYXJ0aWNsZXNbaV0gPSBNZWF0UGFydGljbGUobWVhdE1hdGVyaWFsLCBhbmltVGV4dHVyZXMpXG5cdH1cblxuXHRjb250YWluZXIuYWRkKHBhcmVudClcblxuXHRzY29wZSA9IHtcblx0XHR1cGRhdGU6IChpbnRlcik9PiB7XG5cdFx0XHRpbnRlcnNlY3Rpb24gPSBpbnRlclxuXHRcdFx0cGFydGljbGVzLmZvckVhY2gocCA9PiB7XG5cdFx0XHRcdHAudXBkYXRlKGludGVyc2VjdGlvbilcblx0XHRcdH0pXG5cdFx0fSxcblx0XHRzZXR1cDogKGdlb21ldHJ5KT0+IHtcblxuXHRcdFx0cGFydGljbGVzLmZvckVhY2gocGFydGljbGUgPT4ge1xuXHRcdFx0XHRwYXJ0aWNsZS5nZW9tZXRyeUFkZFRvKGdlb21ldHJ5LCBwYXJlbnQpXG5cdFx0XHRcdHBhcnRpY2xlLnJlc2V0KClcblx0XHRcdH0pXG5cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gc2NvcGVcbn0iLCJleHBvcnQgZGVmYXVsdCAodGV4dHVyZSwgdGlsZXNIb3JpeiwgdGlsZXNWZXJ0LCBudW1UaWxlcywgdGlsZURpc3BEdXJhdGlvbik9PiB7XG5cdHZhciBzY29wZTtcblxuXHQvLyBub3RlOiB0ZXh0dXJlIHBhc3NlZCBieSByZWZlcmVuY2UsIHdpbGwgYmUgdXBkYXRlZCBieSB0aGUgdXBkYXRlIGZ1bmN0aW9uLlxuXHRcdFxuXHR2YXIgdGlsZXNIb3Jpem9udGFsID0gdGlsZXNIb3Jpejtcblx0dmFyIHRpbGVzVmVydGljYWwgPSB0aWxlc1ZlcnQ7XG5cdC8vIGhvdyBtYW55IGltYWdlcyBkb2VzIHRoaXMgc3ByaXRlc2hlZXQgY29udGFpbj9cblx0Ly8gIHVzdWFsbHkgZXF1YWxzIHRpbGVzSG9yaXogKiB0aWxlc1ZlcnQsIGJ1dCBub3QgbmVjZXNzYXJpbHksXG5cdC8vICBpZiB0aGVyZSBhdCBibGFuayB0aWxlcyBhdCB0aGUgYm90dG9tIG9mIHRoZSBzcHJpdGVzaGVldC4gXG5cdHZhciBudW1iZXJPZlRpbGVzID0gbnVtVGlsZXM7XG5cdHRleHR1cmUud3JhcFMgPSB0ZXh0dXJlLndyYXBUID0gVEhSRUUuUmVwZWF0V3JhcHBpbmc7IFxuXHR0ZXh0dXJlLnJlcGVhdC5zZXQoIDEgLyB0aWxlc0hvcml6b250YWwsIDEgLyB0aWxlc1ZlcnRpY2FsICk7XG5cblx0Ly8gaG93IGxvbmcgc2hvdWxkIGVhY2ggaW1hZ2UgYmUgZGlzcGxheWVkP1xuXHR2YXIgdGlsZURpc3BsYXlEdXJhdGlvbiA9IHRpbGVEaXNwRHVyYXRpb247XG5cblx0Ly8gaG93IGxvbmcgaGFzIHRoZSBjdXJyZW50IGltYWdlIGJlZW4gZGlzcGxheWVkP1xuXHR2YXIgY3VycmVudERpc3BsYXlUaW1lID0gMDtcblxuXHQvLyB3aGljaCBpbWFnZSBpcyBjdXJyZW50bHkgYmVpbmcgZGlzcGxheWVkP1xuXHR2YXIgY3VycmVudFRpbGUgPSAwO1xuXHRcblx0c2NvcGUgPSB7XG5cdFx0dXBkYXRlOiAobWlsbGlTZWMpPT4ge1xuXHRcdFx0Y3VycmVudERpc3BsYXlUaW1lICs9IG1pbGxpU2VjO1xuXHRcdFx0d2hpbGUgKGN1cnJlbnREaXNwbGF5VGltZSA+IHRpbGVEaXNwbGF5RHVyYXRpb24pXG5cdFx0XHR7XG5cdFx0XHRcdGN1cnJlbnREaXNwbGF5VGltZSAtPSB0aWxlRGlzcGxheUR1cmF0aW9uO1xuXHRcdFx0XHRjdXJyZW50VGlsZSsrO1xuXHRcdFx0XHRpZiAoY3VycmVudFRpbGUgPT0gbnVtYmVyT2ZUaWxlcylcblx0XHRcdFx0XHRjdXJyZW50VGlsZSA9IDA7XG5cdFx0XHRcdHZhciBjdXJyZW50Q29sdW1uID0gY3VycmVudFRpbGUgJSB0aWxlc0hvcml6b250YWw7XG5cdFx0XHRcdHRleHR1cmUub2Zmc2V0LnggPSBjdXJyZW50Q29sdW1uIC8gdGlsZXNIb3Jpem9udGFsO1xuXHRcdFx0XHR2YXIgY3VycmVudFJvdyA9IE1hdGguZmxvb3IoIGN1cnJlbnRUaWxlIC8gdGlsZXNIb3Jpem9udGFsICk7XG5cdFx0XHRcdHRleHR1cmUub2Zmc2V0LnkgPSBjdXJyZW50Um93IC8gdGlsZXNWZXJ0aWNhbDtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gc2NvcGVcbn0iLCJleHBvcnQgZGVmYXVsdCB7XG5cdFdJTkRPV19SRVNJWkU6ICdXSU5ET1dfUkVTSVpFJyxcblx0UEFHRV9IQVNIRVJfQ0hBTkdFRDogJ1BBR0VfSEFTSEVSX0NIQU5HRUQnLFxuXHRQQUdFX0FTU0VUU19MT0FERUQ6ICdQQUdFX0FTU0VUU19MT0FERUQnLFxuXHRBUFBfU1RBUlQ6ICdBUFBfU1RBUlQnLFxuXG5cdExBTkRTQ0FQRTogJ0xBTkRTQ0FQRScsXG5cdFBPUlRSQUlUOiAnUE9SVFJBSVQnLFxuXG5cdEZPUldBUkQ6ICdGT1JXQVJEJyxcblx0QkFDS1dBUkQ6ICdCQUNLV0FSRCcsXG5cblx0TEVGVDogJ0xFRlQnLFxuXHRSSUdIVDogJ1JJR0hUJyxcblx0VE9QOiAnVE9QJyxcblx0Qk9UVE9NOiAnQk9UVE9NJyxcblxuXHRLRUJBQjoge1xuXHRcdEJBU0U6ICdCQVNFJyxcblx0XHRTSUxWRVI6ICdTSUxWRVInLFxuXHRcdFRPTUFUTzogJ1RPTUFUTycsXG5cdFx0UEFSVElDTEU6ICdQQVJUSUNMRScsXG5cdH0sXG5cblx0RU5WSVJPTk1FTlRTOiB7XG5cdFx0UFJFUFJPRDoge1xuXHRcdFx0c3RhdGljOiAnJ1xuXHRcdH0sXG5cdFx0UFJPRDoge1xuXHRcdFx0XCJzdGF0aWNcIjogSlNfdXJsX3N0YXRpYyArICcvJ1xuXHRcdH1cblx0fSxcblxuXHRNRURJQV9HTE9CQUxfVzogMTkyMCxcblx0TUVESUFfR0xPQkFMX0g6IDEwODAsXG5cblx0TUlOX01JRERMRV9XOiA5NjAsXG5cdE1RX1hTTUFMTDogMzIwLFxuXHRNUV9TTUFMTDogNDgwLFxuXHRNUV9NRURJVU06IDc2OCxcblx0TVFfTEFSR0U6IDEwMjQsXG5cdE1RX1hMQVJHRTogMTI4MCxcblx0TVFfWFhMQVJHRTogMTY4MCxcbn0iLCJpbXBvcnQgRmx1eCBmcm9tICdmbHV4J1xuaW1wb3J0IGFzc2lnbiBmcm9tICdvYmplY3QtYXNzaWduJ1xuXG52YXIgQXBwRGlzcGF0Y2hlciA9IGFzc2lnbihuZXcgRmx1eC5EaXNwYXRjaGVyKCksIHtcblx0aGFuZGxlVmlld0FjdGlvbjogZnVuY3Rpb24oYWN0aW9uKSB7XG5cdFx0dGhpcy5kaXNwYXRjaCh7XG5cdFx0XHRzb3VyY2U6ICdWSUVXX0FDVElPTicsXG5cdFx0XHRhY3Rpb246IGFjdGlvblxuXHRcdH0pO1xuXHR9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgQXBwRGlzcGF0Y2hlciIsImltcG9ydCBBcHBBY3Rpb25zIGZyb20gJ0FwcEFjdGlvbnMnXG5pbXBvcnQgZG9tIGZyb20gJ2RvbS1oYW5kJ1xuICAgIFx0XG5jbGFzcyBHbG9iYWxFdmVudHMge1xuXHRpbml0KCkge1xuXHRcdGRvbS5ldmVudC5vbih3aW5kb3csICdyZXNpemUnLCB0aGlzLnJlc2l6ZSlcblx0fVxuXHRyZXNpemUoKSB7XG5cdFx0QXBwQWN0aW9ucy53aW5kb3dSZXNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodClcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBHbG9iYWxFdmVudHNcbiIsImltcG9ydCBBcHBTdG9yZSBmcm9tICdBcHBTdG9yZSdcblxuY2xhc3MgUHJlbG9hZGVyICB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMucXVldWUgPSBuZXcgY3JlYXRlanMuTG9hZFF1ZXVlKGZhbHNlKVxuXHRcdHRoaXMucXVldWUub24oXCJjb21wbGV0ZVwiLCB0aGlzLm9uTWFuaWZlc3RMb2FkQ29tcGxldGVkLCB0aGlzKVxuXHRcdHRoaXMuY3VycmVudExvYWRlZENhbGxiYWNrID0gdW5kZWZpbmVkXG5cdFx0dGhpcy5hbGxNYW5pZmVzdHMgPSBbXVxuXHR9XG5cdGxvYWQobWFuaWZlc3QsIG9uTG9hZGVkKSB7XG5cblx0XHRpZih0aGlzLmFsbE1hbmlmZXN0cy5sZW5ndGggPiAwKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuYWxsTWFuaWZlc3RzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdHZhciBtID0gdGhpcy5hbGxNYW5pZmVzdHNbaV1cblx0XHRcdFx0aWYobS5sZW5ndGggPT0gbWFuaWZlc3QubGVuZ3RoICYmIG1bMF0uaWQgPT0gbWFuaWZlc3RbMF0uaWQgJiYgbVttLmxlbmd0aC0xXS5pZCA9PSBtYW5pZmVzdFttYW5pZmVzdC5sZW5ndGgtMV0uaWQpIHtcblx0XHRcdFx0XHRvbkxvYWRlZCgpXHRcblx0XHRcdFx0XHRyZXR1cm5cblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHR0aGlzLmFsbE1hbmlmZXN0cy5wdXNoKG1hbmlmZXN0KVxuXHRcdHRoaXMuY3VycmVudExvYWRlZENhbGxiYWNrID0gb25Mb2FkZWRcbiAgICAgICAgdGhpcy5xdWV1ZS5sb2FkTWFuaWZlc3QobWFuaWZlc3QpXG5cdH1cblx0b25NYW5pZmVzdExvYWRDb21wbGV0ZWQoKSB7XG5cdFx0dGhpcy5jdXJyZW50TG9hZGVkQ2FsbGJhY2soKVxuXHR9XG5cdGdldENvbnRlbnRCeUlkKGlkKSB7XG5cdFx0cmV0dXJuIHRoaXMucXVldWUuZ2V0UmVzdWx0KGlkKVxuXHR9XG5cdGdldEltYWdlVVJMKGlkKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0Q29udGVudEJ5SWQoaWQpLmdldEF0dHJpYnV0ZShcInNyY1wiKVxuXHR9XG5cdGdldEltYWdlU2l6ZShpZCkge1xuXHRcdHZhciBjb250ZW50ID0gdGhpcy5nZXRDb250ZW50QnlJZChpZClcblx0XHRyZXR1cm4geyB3aWR0aDogY29udGVudC5uYXR1cmFsV2lkdGgsIGhlaWdodDogY29udGVudC5uYXR1cmFsSGVpZ2h0IH1cblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBQcmVsb2FkZXJcbiIsImltcG9ydCBoYXNoZXIgZnJvbSAnaGFzaGVyJ1xuaW1wb3J0IEFwcEFjdGlvbnMgZnJvbSAnQXBwQWN0aW9ucydcbmltcG9ydCBjcm9zc3JvYWRzIGZyb20gJ2Nyb3Nzcm9hZHMnXG5pbXBvcnQgQXBwU3RvcmUgZnJvbSAnQXBwU3RvcmUnXG5pbXBvcnQgZGF0YSBmcm9tICdHbG9iYWxEYXRhJ1xuaW1wb3J0IEFwcENvbnN0YW50cyBmcm9tICdBcHBDb25zdGFudHMnXG5cbmNsYXNzIFJvdXRlciB7XG5cdGluaXQoKSB7XG5cdFx0dGhpcy5yb3V0aW5nID0gZGF0YS5yb3V0aW5nXG5cdFx0dGhpcy5zZXR1cFJvdXRlcygpXG5cdFx0dGhpcy5maXJzdFBhc3MgPSB0cnVlXG5cdFx0dGhpcy5uZXdIYXNoRm91bmRlZCA9IGZhbHNlXG5cdFx0aGFzaGVyLm5ld0hhc2ggPSB1bmRlZmluZWRcblx0XHRoYXNoZXIub2xkSGFzaCA9IHVuZGVmaW5lZFxuXG5cdFx0Ly8gcmVtb3ZlIHRoZSBhbmFseXRpY3MgcGFyYW1ldGVyc1xuXHRcdHZhciBsb2MgPSBBcHBTdG9yZS5EZXRlY3Rvci5pc1NhZmFyaSA/IGxvY2F0aW9uLmhhc2ggOiB3aW5kb3cubG9jYXRpb24uaGFzaFxuXHRcdHZhciBoYXNoID0gbG9jLnNwbGl0KCc/Jylcblx0XHR3aW5kb3cubG9jYXRpb24uaGFzaCA9IGhhc2hbMF1cblxuXHRcdGhhc2hlci5pbml0aWFsaXplZC5hZGQodGhpcy5kaWRIYXNoZXJDaGFuZ2UuYmluZCh0aGlzKSlcblx0XHRoYXNoZXIuY2hhbmdlZC5hZGQodGhpcy5kaWRIYXNoZXJDaGFuZ2UuYmluZCh0aGlzKSlcblx0XHR0aGlzLnNldHVwQ3Jvc3Nyb2FkcygpXG5cdH1cblx0YmVnaW5Sb3V0aW5nKCkge1xuXHRcdGhhc2hlci5pbml0KClcblx0fVxuXHRzZXR1cENyb3Nzcm9hZHMoKSB7XG5cdCBcdHZhciByb3V0ZXMgPSBoYXNoZXIucm91dGVzXG5cdCBcdGZvciAodmFyIGkgPSAwOyBpIDwgcm91dGVzLmxlbmd0aDsgaSsrKSB7XG5cdCBcdFx0dmFyIHJvdXRlID0gcm91dGVzW2ldXG5cdCBcdFx0Y3Jvc3Nyb2Fkcy5hZGRSb3V0ZShyb3V0ZSwgdGhpcy5vblBhcnNlVXJsLmJpbmQodGhpcykpXG5cdCBcdH07XG5cdFx0Y3Jvc3Nyb2Fkcy5hZGRSb3V0ZSgnJywgdGhpcy5vblBhcnNlVXJsLmJpbmQodGhpcykpXG5cdH1cblx0b25QYXJzZVVybCgpIHtcblx0XHR0aGlzLmFzc2lnblJvdXRlKClcblx0fVxuXHRvbkRlZmF1bHRVUkxIYW5kbGVyKCkge1xuXHRcdHRoaXMuc2VuZFRvRGVmYXVsdCgpXG5cdH1cblx0YXNzaWduUm91dGUoaWQpIHtcblx0XHR2YXIgaGFzaCA9IGhhc2hlci5nZXRIYXNoKClcblx0XHR2YXIgcGFydHMgPSB0aGlzLmdldFVSTFBhcnRzKGhhc2gpXG5cdFx0dGhpcy51cGRhdGVQYWdlUm91dGUoaGFzaCwgcGFydHMsIHBhcnRzWzBdLCAocGFydHNbMV0gPT0gdW5kZWZpbmVkKSA/ICcnIDogcGFydHNbMV0pXG5cdFx0dGhpcy5uZXdIYXNoRm91bmRlZCA9IHRydWVcblx0fVxuXHRnZXRVUkxQYXJ0cyh1cmwpIHtcblx0XHR2YXIgaGFzaCA9IHVybFxuXHRcdHJldHVybiBoYXNoLnNwbGl0KCcvJylcblx0fVxuXHR1cGRhdGVQYWdlUm91dGUoaGFzaCwgcGFydHMsIHBhcmVudCwgdGFyZ2V0KSB7XG5cdFx0aGFzaGVyLm9sZEhhc2ggPSBoYXNoZXIubmV3SGFzaFxuXHRcdGhhc2hlci5uZXdIYXNoID0ge1xuXHRcdFx0aGFzaDogaGFzaCxcblx0XHRcdHBhcnRzOiBwYXJ0cyxcblx0XHRcdHBhcmVudDogcGFyZW50LFxuXHRcdFx0dGFyZ2V0OiB0YXJnZXRcblx0XHR9XG5cdFx0aGFzaGVyLm5ld0hhc2gudHlwZSA9IGhhc2hlci5uZXdIYXNoLmhhc2ggPT0gJycgPyBBcHBDb25zdGFudHMuSE9NRSA6IEFwcENvbnN0YW50cy5ESVBUWVFVRVxuXHRcdC8vIElmIGZpcnN0IHBhc3Mgc2VuZCB0aGUgYWN0aW9uIGZyb20gQXBwLmpzIHdoZW4gYWxsIGFzc2V0cyBhcmUgcmVhZHlcblx0XHRpZih0aGlzLmZpcnN0UGFzcykge1xuXHRcdFx0dGhpcy5maXJzdFBhc3MgPSBmYWxzZVxuXHRcdH1lbHNle1xuXHRcdFx0QXBwQWN0aW9ucy5wYWdlSGFzaGVyQ2hhbmdlZCgpXG5cdFx0fVxuXHR9XG5cdGRpZEhhc2hlckNoYW5nZShuZXdIYXNoLCBvbGRIYXNoKSB7XG5cdFx0dGhpcy5uZXdIYXNoRm91bmRlZCA9IGZhbHNlXG5cdFx0Y3Jvc3Nyb2Fkcy5wYXJzZShuZXdIYXNoKVxuXHRcdGlmKHRoaXMubmV3SGFzaEZvdW5kZWQpIHJldHVyblxuXHRcdC8vIElmIFVSTCBkb24ndCBtYXRjaCBhIHBhdHRlcm4sIHNlbmQgdG8gZGVmYXVsdFxuXHRcdHRoaXMub25EZWZhdWx0VVJMSGFuZGxlcigpXG5cdH1cblx0c2VuZFRvRGVmYXVsdCgpIHtcblx0XHRoYXNoZXIuc2V0SGFzaChBcHBTdG9yZS5kZWZhdWx0Um91dGUoKSlcblx0fVxuXHRzZXR1cFJvdXRlcygpIHtcblx0XHRoYXNoZXIucm91dGVzID0gW11cblx0XHRoYXNoZXIuZGlwdHlxdWVSb3V0ZXMgPSBbXVxuXHRcdHZhciBpID0gMCwgaztcblx0XHRmb3IoayBpbiB0aGlzLnJvdXRpbmcpIHtcblx0XHRcdGhhc2hlci5yb3V0ZXNbaV0gPSBrXG5cdFx0XHRpZihrLmxlbmd0aCA+IDIpIGhhc2hlci5kaXB0eXF1ZVJvdXRlcy5wdXNoKGspXG5cdFx0XHRpKytcblx0XHR9XG5cdH1cblx0c3RhdGljIGdldEJhc2VVUkwoKSB7XG5cdFx0cmV0dXJuIGRvY3VtZW50LlVSTC5zcGxpdChcIiNcIilbMF1cblx0fVxuXHRzdGF0aWMgZ2V0SGFzaCgpIHtcblx0XHRyZXR1cm4gaGFzaGVyLmdldEhhc2goKVxuXHR9XG5cdHN0YXRpYyBnZXRSb3V0ZXMoKSB7XG5cdFx0cmV0dXJuIGhhc2hlci5yb3V0ZXNcblx0fVxuXHRzdGF0aWMgZ2V0RGlwdHlxdWVSb3V0ZXMoKSB7XG5cdFx0cmV0dXJuIGhhc2hlci5kaXB0eXF1ZVJvdXRlc1xuXHR9XG5cdHN0YXRpYyBnZXROZXdIYXNoKCkge1xuXHRcdHJldHVybiBoYXNoZXIubmV3SGFzaFxuXHR9XG5cdHN0YXRpYyBnZXRPbGRIYXNoKCkge1xuXHRcdHJldHVybiBoYXNoZXIub2xkSGFzaFxuXHR9XG5cdHN0YXRpYyBzZXRIYXNoKGhhc2gpIHtcblx0XHRoYXNoZXIuc2V0SGFzaChoYXNoKVxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFJvdXRlclxuIiwiaW1wb3J0IEFwcERpc3BhdGNoZXIgZnJvbSAnQXBwRGlzcGF0Y2hlcidcbmltcG9ydCBBcHBDb25zdGFudHMgZnJvbSAnQXBwQ29uc3RhbnRzJ1xuaW1wb3J0IHtFdmVudEVtaXR0ZXIyfSBmcm9tICdldmVudGVtaXR0ZXIyJ1xuaW1wb3J0IGFzc2lnbiBmcm9tICdvYmplY3QtYXNzaWduJ1xuaW1wb3J0IGRhdGEgZnJvbSAnR2xvYmFsRGF0YSdcbmltcG9ydCBSb3V0ZXIgZnJvbSAnUm91dGVyJ1xuaW1wb3J0IGlzUmV0aW5hIGZyb20gJ2lzLXJldGluYSdcblxuZnVuY3Rpb24gX2dldENvbnRlbnRTY29wZSgpIHtcbiAgICB2YXIgaGFzaE9iaiA9IFJvdXRlci5nZXROZXdIYXNoKClcbiAgICByZXR1cm4gQXBwU3RvcmUuZ2V0Um91dGVQYXRoU2NvcGVCeUlkKGhhc2hPYmouaGFzaClcbn1cbmZ1bmN0aW9uIF9nZXRQYWdlQXNzZXRzVG9Mb2FkKCkge1xuICAgIHZhciBzY29wZSA9IF9nZXRDb250ZW50U2NvcGUoKVxuICAgIHZhciBoYXNoT2JqID0gUm91dGVyLmdldE5ld0hhc2goKVxuICAgIHZhciB0eXBlID0gX2dldFR5cGVPZlBhZ2UoKVxuICAgIHZhciBtYW5pZmVzdDtcblxuICAgIGlmKHR5cGUgIT0gQXBwQ29uc3RhbnRzLkhPTUUpIHtcbiAgICAgICAgdmFyIGZpbGVuYW1lcyA9IFtcbiAgICAgICAgICAgICdjaGFyYWN0ZXInICsgX2dldEltYWdlRGV2aWNlRXh0ZW5zaW9uKCkgKycucG5nJyxcbiAgICAgICAgICAgICdjaGFyYWN0ZXItYmcuanBnJyxcbiAgICAgICAgICAgICdzaG9lLWJnLmpwZydcbiAgICAgICAgXVxuICAgICAgICBtYW5pZmVzdCA9IF9hZGRCYXNlUGF0aHNUb1VybHMoZmlsZW5hbWVzLCBoYXNoT2JqLnBhcmVudCwgaGFzaE9iai50YXJnZXQsIHR5cGUpXG4gICAgfVxuXG4gICAgLy8gSW4gY2FzZSBvZiBleHRyYSBhc3NldHNcbiAgICBpZihzY29wZS5hc3NldHMgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhciBhc3NldHMgPSBzY29wZS5hc3NldHNcbiAgICAgICAgdmFyIGFzc2V0c01hbmlmZXN0O1xuICAgICAgICBpZih0eXBlID09IEFwcENvbnN0YW50cy5IT01FKSB7XG4gICAgICAgICAgICBhc3NldHNNYW5pZmVzdCA9IF9hZGRCYXNlUGF0aHNUb1VybHMoYXNzZXRzLCAnaG9tZScsIGhhc2hPYmoudGFyZ2V0LCB0eXBlKVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGFzc2V0c01hbmlmZXN0ID0gX2FkZEJhc2VQYXRoc1RvVXJscyhhc3NldHMsIGhhc2hPYmoucGFyZW50LCBoYXNoT2JqLnRhcmdldCwgdHlwZSkgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgbWFuaWZlc3QgPSAobWFuaWZlc3QgPT0gdW5kZWZpbmVkKSA/IGFzc2V0c01hbmlmZXN0IDogbWFuaWZlc3QuY29uY2F0KGFzc2V0c01hbmlmZXN0KVxuICAgIH1cblxuICAgIHJldHVybiBtYW5pZmVzdFxufVxuZnVuY3Rpb24gX2FkZEJhc2VQYXRoc1RvVXJscyh1cmxzLCBwYWdlSWQsIHRhcmdldElkLCB0eXBlKSB7XG4gICAgdmFyIGJhc2VQYXRoID0gKHR5cGUgPT0gQXBwQ29uc3RhbnRzLkhPTUUpID8gX2dldEhvbWVQYWdlQXNzZXRzQmFzZVBhdGgoKSA6IF9nZXRQYWdlQXNzZXRzQmFzZVBhdGhCeUlkKHBhZ2VJZCwgdGFyZ2V0SWQpXG4gICAgdmFyIG1hbmlmZXN0ID0gW11cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHVybHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHNwbGl0dGVyID0gdXJsc1tpXS5zcGxpdCgnLicpXG4gICAgICAgIHZhciBmaWxlTmFtZSA9IHNwbGl0dGVyWzBdXG4gICAgICAgIHZhciBleHRlbnNpb24gPSBzcGxpdHRlclsxXVxuICAgICAgICB2YXIgaWQgPSBwYWdlSWQgKyAnLSdcbiAgICAgICAgaWYodGFyZ2V0SWQpIGlkICs9IHRhcmdldElkICsgJy0nXG4gICAgICAgIGlkICs9IGZpbGVOYW1lXG4gICAgICAgIG1hbmlmZXN0W2ldID0ge1xuICAgICAgICAgICAgaWQ6IGlkLFxuICAgICAgICAgICAgc3JjOiBiYXNlUGF0aCArIGZpbGVOYW1lICsgJy4nICsgZXh0ZW5zaW9uXG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG1hbmlmZXN0XG59XG5mdW5jdGlvbiBfZ2V0UGFnZUFzc2V0c0Jhc2VQYXRoQnlJZChpZCwgYXNzZXRHcm91cElkKSB7XG4gICAgcmV0dXJuIEFwcFN0b3JlLmJhc2VNZWRpYVBhdGgoKSArICdpbWFnZS9kaXB0eXF1ZS8nICsgaWQgKyAnLycgKyBhc3NldEdyb3VwSWQgKyAnLydcbn1cbmZ1bmN0aW9uIF9nZXRIb21lUGFnZUFzc2V0c0Jhc2VQYXRoKCkge1xuICAgIHJldHVybiBBcHBTdG9yZS5iYXNlTWVkaWFQYXRoKCkgKyAnaW1hZ2UvaG9tZS8nXG59XG5mdW5jdGlvbiBfZ2V0SW1hZ2VEZXZpY2VFeHRlbnNpb24oKSB7XG4gICAgdmFyIHJldGluYSA9IF9pc1JldGluYSgpXG4gICAgdmFyIHN0ciA9ICdAMXgnXG4gICAgaWYocmV0aW5hID09IHRydWUpIHN0ciA9ICdAMngnXG4gICAgcmV0dXJuIHN0clxufVxuZnVuY3Rpb24gX2lzUmV0aW5hKCkge1xuICAgIHJldHVybiBpc1JldGluYSgpXG59XG5mdW5jdGlvbiBfZ2V0RGV2aWNlUmF0aW8oKSB7XG4gICAgdmFyIHNjYWxlID0gKHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvID09IHVuZGVmaW5lZCkgPyAxIDogd2luZG93LmRldmljZVBpeGVsUmF0aW9cbiAgICByZXR1cm4gKHNjYWxlID4gMSkgPyAyIDogMVxufVxuZnVuY3Rpb24gX2dldFR5cGVPZlBhZ2UoaGFzaCkge1xuICAgIHZhciBoID0gaGFzaCB8fCBSb3V0ZXIuZ2V0TmV3SGFzaCgpXG4gICAgaWYoaC5wYXJ0cy5sZW5ndGggPT0gMikgcmV0dXJuIEFwcENvbnN0YW50cy5ESVBUWVFVRVxuICAgIGVsc2UgcmV0dXJuIEFwcENvbnN0YW50cy5IT01FXG59XG5mdW5jdGlvbiBfZ2V0UGFnZUNvbnRlbnQoKSB7XG4gICAgdmFyIGhhc2hPYmogPSBSb3V0ZXIuZ2V0TmV3SGFzaCgpXG4gICAgdmFyIGhhc2ggPSBoYXNoT2JqLmhhc2gubGVuZ3RoIDwgMSA/ICcvJyA6IGhhc2hPYmouaGFzaFxuICAgIHZhciBjb250ZW50ID0gZGF0YS5yb3V0aW5nW2hhc2hdXG4gICAgcmV0dXJuIGNvbnRlbnRcbn1cbmZ1bmN0aW9uIF9nZXRDb250ZW50QnlMYW5nKGxhbmcpIHtcbiAgICByZXR1cm4gZGF0YS5jb250ZW50LmxhbmdbbGFuZ11cbn1cbmZ1bmN0aW9uIF9nZXRHbG9iYWxDb250ZW50KCkge1xuICAgIHJldHVybiBfZ2V0Q29udGVudEJ5TGFuZyhBcHBTdG9yZS5sYW5nKCkpXG59XG5mdW5jdGlvbiBfZ2V0QXBwRGF0YSgpIHtcbiAgICByZXR1cm4gZGF0YVxufVxuZnVuY3Rpb24gX2dldERlZmF1bHRSb3V0ZSgpIHtcbiAgICByZXR1cm4gZGF0YVsnZGVmYXVsdC1yb3V0ZSddXG59XG5mdW5jdGlvbiBfd2luZG93V2lkdGhIZWlnaHQoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdzogd2luZG93LmlubmVyV2lkdGgsXG4gICAgICAgIGg6IHdpbmRvdy5pbm5lckhlaWdodFxuICAgIH1cbn1cbmZ1bmN0aW9uIF9nZXREaXB0eXF1ZVNob2VzKCkge1xuICAgIHZhciBoYXNoT2JqID0gUm91dGVyLmdldE5ld0hhc2goKVxuICAgIHZhciBiYXNldXJsID0gX2dldFBhZ2VBc3NldHNCYXNlUGF0aEJ5SWQoaGFzaE9iai5wYXJlbnQsIGhhc2hPYmoudGFyZ2V0KVxuICAgIHJldHVybiBfZ2V0Q29udGVudFNjb3BlKCkuc2hvZXNcbn1cblxudmFyIEFwcFN0b3JlID0gYXNzaWduKHt9LCBFdmVudEVtaXR0ZXIyLnByb3RvdHlwZSwge1xuICAgIGVtaXRDaGFuZ2U6IGZ1bmN0aW9uKHR5cGUsIGl0ZW0pIHtcbiAgICAgICAgdGhpcy5lbWl0KHR5cGUsIGl0ZW0pXG4gICAgfSxcbiAgICBwYWdlQ29udGVudDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBfZ2V0UGFnZUNvbnRlbnQoKVxuICAgIH0sXG4gICAgYXBwRGF0YTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBfZ2V0QXBwRGF0YSgpXG4gICAgfSxcbiAgICBkZWZhdWx0Um91dGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gX2dldERlZmF1bHRSb3V0ZSgpXG4gICAgfSxcbiAgICBnbG9iYWxDb250ZW50OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIF9nZXRHbG9iYWxDb250ZW50KClcbiAgICB9LFxuICAgIHBhZ2VBc3NldHNUb0xvYWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gX2dldFBhZ2VBc3NldHNUb0xvYWQoKVxuICAgIH0sXG4gICAgZ2V0Um91dGVQYXRoU2NvcGVCeUlkOiBmdW5jdGlvbihpZCkge1xuICAgICAgICBpZCA9IGlkLmxlbmd0aCA8IDEgPyAnLycgOiBpZFxuICAgICAgICByZXR1cm4gZGF0YS5yb3V0aW5nW2lkXVxuICAgIH0sXG4gICAgYmFzZU1lZGlhUGF0aDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBBcHBTdG9yZS5nZXRFbnZpcm9ubWVudCgpLnN0YXRpY1xuICAgIH0sXG4gICAgZ2V0UGFnZUFzc2V0c0Jhc2VQYXRoQnlJZDogZnVuY3Rpb24ocGFyZW50LCB0YXJnZXQpIHtcbiAgICAgICAgcmV0dXJuIF9nZXRQYWdlQXNzZXRzQmFzZVBhdGhCeUlkKHBhcmVudCwgdGFyZ2V0KVxuICAgIH0sXG4gICAgZ2V0RW52aXJvbm1lbnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gQXBwQ29uc3RhbnRzLkVOVklST05NRU5UU1tFTlZdXG4gICAgfSxcbiAgICBnZXRUeXBlT2ZQYWdlOiBmdW5jdGlvbihoYXNoKSB7XG4gICAgICAgIHJldHVybiBfZ2V0VHlwZU9mUGFnZShoYXNoKVxuICAgIH0sXG4gICAgZ2V0SG9tZVZpZGVvczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBkYXRhWydob21lLXZpZGVvcyddXG4gICAgfSxcbiAgICBnZW5lcmFsSW5mb3M6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gZGF0YS5jb250ZW50XG4gICAgfSxcbiAgICBkaXB0eXF1ZVNob2VzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIF9nZXREaXB0eXF1ZVNob2VzKClcbiAgICB9LFxuICAgIGdldE5leHREaXB0eXF1ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBoYXNoT2JqID0gUm91dGVyLmdldE5ld0hhc2goKVxuICAgICAgICB2YXIgcm91dGVzID0gUm91dGVyLmdldERpcHR5cXVlUm91dGVzKClcbiAgICAgICAgdmFyIGN1cnJlbnQgPSBoYXNoT2JqLmhhc2hcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByb3V0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciByb3V0ZSA9IHJvdXRlc1tpXVxuICAgICAgICAgICAgaWYocm91dGUgPT0gY3VycmVudCkge1xuICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IChpKzEpID4gcm91dGVzLmxlbmd0aC0xID8gMCA6IChpKzEpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJvdXRlc1tpbmRleF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGdldFByZXZpb3VzRGlwdHlxdWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgaGFzaE9iaiA9IFJvdXRlci5nZXROZXdIYXNoKClcbiAgICAgICAgdmFyIHJvdXRlcyA9IFJvdXRlci5nZXREaXB0eXF1ZVJvdXRlcygpXG4gICAgICAgIHZhciBjdXJyZW50ID0gaGFzaE9iai5oYXNoXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcm91dGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgcm91dGUgPSByb3V0ZXNbaV1cbiAgICAgICAgICAgIGlmKHJvdXRlID09IGN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSAoaS0xKSA8IDAgPyByb3V0ZXMubGVuZ3RoLTEgOiAoaS0xKVxuICAgICAgICAgICAgICAgIHJldHVybiByb3V0ZXNbaW5kZXhdXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSxcbiAgICBnZXREaXB0eXF1ZVBhZ2VJbmRleDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBoYXNoT2JqID0gUm91dGVyLmdldE5ld0hhc2goKVxuICAgICAgICB2YXIgcm91dGVzID0gUm91dGVyLmdldERpcHR5cXVlUm91dGVzKClcbiAgICAgICAgdmFyIGN1cnJlbnQgPSBoYXNoT2JqLmhhc2hcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByb3V0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciByb3V0ZSA9IHJvdXRlc1tpXVxuICAgICAgICAgICAgaWYocm91dGUgPT0gY3VycmVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSxcbiAgICBnZXRJbWFnZURldmljZUV4dGVuc2lvbjogX2dldEltYWdlRGV2aWNlRXh0ZW5zaW9uLFxuICAgIGdldFByZXZpZXdVcmxCeUhhc2g6IGZ1bmN0aW9uKGhhc2gpIHtcbiAgICAgICAgcmV0dXJuIEFwcFN0b3JlLmJhc2VNZWRpYVBhdGgoKSArICdpbWFnZS9kaXB0eXF1ZS8nICsgaGFzaCArICcvcHJldmlldy5naWYnXG4gICAgfSxcbiAgICBnZXRGZWVkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGRhdGEuZmVlZFxuICAgIH0sXG4gICAgbGFuZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBkZWZhdWx0TGFuZyA9IHRydWVcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxhbmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgbGFuZyA9IGRhdGEubGFuZ3NbaV1cbiAgICAgICAgICAgIGlmKGxhbmcgPT0gSlNfbGFuZykge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRMYW5nID0gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIChkZWZhdWx0TGFuZyA9PSB0cnVlKSA/ICdlbicgOiBKU19sYW5nXG4gICAgfSxcbiAgICBXaW5kb3c6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gX3dpbmRvd1dpZHRoSGVpZ2h0KClcbiAgICB9LFxuICAgIGFkZFBYQ2hpbGQ6IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgQXBwU3RvcmUuUFhDb250YWluZXIuYWRkKGl0ZW0uY2hpbGQpXG4gICAgfSxcbiAgICByZW1vdmVQWENoaWxkOiBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgIEFwcFN0b3JlLlBYQ29udGFpbmVyLnJlbW92ZShpdGVtLmNoaWxkKVxuICAgIH0sXG4gICAgUGFyZW50OiB1bmRlZmluZWQsXG4gICAgQ2FudmFzOiB1bmRlZmluZWQsXG4gICAgRnJvbnRCbG9jazogdW5kZWZpbmVkLFxuICAgIE9yaWVudGF0aW9uOiBBcHBDb25zdGFudHMuTEFORFNDQVBFLFxuICAgIERldGVjdG9yOiB7XG4gICAgICAgIGlzTW9iaWxlOiB1bmRlZmluZWRcbiAgICB9LFxuICAgIGRpc3BhdGNoZXJJbmRleDogQXBwRGlzcGF0Y2hlci5yZWdpc3RlcihmdW5jdGlvbihwYXlsb2FkKXtcbiAgICAgICAgdmFyIGFjdGlvbiA9IHBheWxvYWQuYWN0aW9uXG4gICAgICAgIHN3aXRjaChhY3Rpb24uYWN0aW9uVHlwZSkge1xuICAgICAgICAgICAgY2FzZSBBcHBDb25zdGFudHMuV0lORE9XX1JFU0laRTpcbiAgICAgICAgICAgICAgICBBcHBTdG9yZS5XaW5kb3cudyA9IGFjdGlvbi5pdGVtLndpbmRvd1dcbiAgICAgICAgICAgICAgICBBcHBTdG9yZS5XaW5kb3cuaCA9IGFjdGlvbi5pdGVtLndpbmRvd0hcbiAgICAgICAgICAgICAgICBBcHBTdG9yZS5PcmllbnRhdGlvbiA9IChBcHBTdG9yZS5XaW5kb3cudyA+IEFwcFN0b3JlLldpbmRvdy5oKSA/IEFwcENvbnN0YW50cy5MQU5EU0NBUEUgOiBBcHBDb25zdGFudHMuUE9SVFJBSVRcbiAgICAgICAgICAgICAgICBBcHBTdG9yZS5lbWl0Q2hhbmdlKGFjdGlvbi5hY3Rpb25UeXBlKVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIEFwcFN0b3JlLmVtaXRDaGFuZ2UoYWN0aW9uLmFjdGlvblR5cGUsIGFjdGlvbi5pdGVtKSBcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgfSlcbn0pXG5cblxuZXhwb3J0IGRlZmF1bHQgQXBwU3RvcmVcblxuIiwiaW1wb3J0IEFwcENvbnN0YW50cyBmcm9tICdBcHBDb25zdGFudHMnXG5pbXBvcnQgZG9tIGZyb20gJ2RvbS1oYW5kJ1xuXG5jbGFzcyBVdGlscyB7XG5cdHN0YXRpYyBOb3JtYWxpemVNb3VzZUNvb3JkcyhlLCBvYmpXcmFwcGVyKSB7XG5cdFx0dmFyIHBvc3ggPSAwO1xuXHRcdHZhciBwb3N5ID0gMDtcblx0XHRpZiAoIWUpIHZhciBlID0gd2luZG93LmV2ZW50O1xuXHRcdGlmIChlLnBhZ2VYIHx8IGUucGFnZVkpIFx0e1xuXHRcdFx0cG9zeCA9IGUucGFnZVg7XG5cdFx0XHRwb3N5ID0gZS5wYWdlWTtcblx0XHR9XG5cdFx0ZWxzZSBpZiAoZS5jbGllbnRYIHx8IGUuY2xpZW50WSkgXHR7XG5cdFx0XHRwb3N4ID0gZS5jbGllbnRYICsgZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0XG5cdFx0XHRcdCsgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbExlZnQ7XG5cdFx0XHRwb3N5ID0gZS5jbGllbnRZICsgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3Bcblx0XHRcdFx0KyBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xuXHRcdH1cblx0XHRvYmpXcmFwcGVyLnggPSBwb3N4XG5cdFx0b2JqV3JhcHBlci55ID0gcG9zeVxuXHRcdHJldHVybiBvYmpXcmFwcGVyXG5cdH1cblx0c3RhdGljIFJlc2l6ZVBvc2l0aW9uUHJvcG9ydGlvbmFsbHkod2luZG93Vywgd2luZG93SCwgY29udGVudFcsIGNvbnRlbnRILCBvcmllbnRhdGlvbikge1xuXHRcdHZhciBhc3BlY3RSYXRpbyA9IGNvbnRlbnRXIC8gY29udGVudEhcblx0XHRpZihvcmllbnRhdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRpZihvcmllbnRhdGlvbiA9PSBBcHBDb25zdGFudHMuTEFORFNDQVBFKSB7XG5cdFx0XHRcdHZhciBzY2FsZSA9ICh3aW5kb3dXIC8gY29udGVudFcpICogMVxuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdHZhciBzY2FsZSA9ICh3aW5kb3dIIC8gY29udGVudEgpICogMVxuXHRcdFx0fVxuXHRcdH1lbHNle1xuXHRcdFx0dmFyIHNjYWxlID0gKCh3aW5kb3dXIC8gd2luZG93SCkgPCBhc3BlY3RSYXRpbykgPyAod2luZG93SCAvIGNvbnRlbnRIKSAqIDEgOiAod2luZG93VyAvIGNvbnRlbnRXKSAqIDFcblx0XHR9XG5cdFx0dmFyIG5ld1cgPSBjb250ZW50VyAqIHNjYWxlXG5cdFx0dmFyIG5ld0ggPSBjb250ZW50SCAqIHNjYWxlXG5cdFx0dmFyIGNzcyA9IHtcblx0XHRcdHdpZHRoOiBuZXdXLFxuXHRcdFx0aGVpZ2h0OiBuZXdILFxuXHRcdFx0bGVmdDogKHdpbmRvd1cgPj4gMSkgLSAobmV3VyA+PiAxKSxcblx0XHRcdHRvcDogKHdpbmRvd0ggPj4gMSkgLSAobmV3SCA+PiAxKSxcblx0XHRcdHNjYWxlOiBzY2FsZVxuXHRcdH1cblx0XHRcblx0XHRyZXR1cm4gY3NzXG5cdH1cblx0c3RhdGljIENhcGl0YWxpemVGaXJzdExldHRlcihzdHJpbmcpIHtcblx0ICAgIHJldHVybiBzdHJpbmcuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHJpbmcuc2xpY2UoMSk7XG5cdH1cblx0c3RhdGljIFN1cHBvcnRXZWJHTCgpIHtcblx0XHR0cnkge1xuXHRcdFx0dmFyIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdjYW52YXMnICk7XG5cdFx0XHRyZXR1cm4gISEgKCB3aW5kb3cuV2ViR0xSZW5kZXJpbmdDb250ZXh0ICYmICggY2FudmFzLmdldENvbnRleHQoICd3ZWJnbCcgKSB8fCBjYW52YXMuZ2V0Q29udGV4dCggJ2V4cGVyaW1lbnRhbC13ZWJnbCcgKSApICk7XG5cdFx0fSBjYXRjaCAoIGUgKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHR9XG5cdHN0YXRpYyBEZXN0cm95VmlkZW8odmlkZW8pIHtcbiAgICAgICAgdmlkZW8ucGF1c2UoKTtcbiAgICAgICAgdmlkZW8uc3JjID0gJyc7XG4gICAgICAgIHZhciBjaGlsZHJlbiA9IHZpZGVvLmNoaWxkTm9kZXNcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICBcdHZhciBjaGlsZCA9IGNoaWxkcmVuW2ldXG4gICAgICAgIFx0Y2hpbGQuc2V0QXR0cmlidXRlKCdzcmMnLCAnJyk7XG4gICAgICAgIFx0Ly8gV29ya2luZyB3aXRoIGEgcG9seWZpbGwgb3IgdXNlIGpxdWVyeVxuICAgICAgICBcdGRvbS50cmVlLnJlbW92ZShjaGlsZClcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgRGVzdHJveVZpZGVvVGV4dHVyZSh0ZXh0dXJlKSB7XG4gICAgXHR2YXIgdmlkZW8gPSB0ZXh0dXJlLmJhc2VUZXh0dXJlLnNvdXJjZVxuICAgICAgICBVdGlscy5EZXN0cm95VmlkZW8odmlkZW8pXG4gICAgfVxuICAgIHN0YXRpYyBSYW5kKG1pbiwgbWF4LCBkZWNpbWFscykge1xuICAgICAgICB2YXIgcmFuZG9tTnVtID0gTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluXG4gICAgICAgIGlmKGRlY2ltYWxzID09IHVuZGVmaW5lZCkge1xuICAgICAgICBcdHJldHVybiByYW5kb21OdW1cbiAgICAgICAgfWVsc2V7XG5cdCAgICAgICAgdmFyIGQgPSBNYXRoLnBvdygxMCwgZGVjaW1hbHMpXG5cdCAgICAgICAgcmV0dXJuIH5+KChkICogcmFuZG9tTnVtKSArIDAuNSkgLyBkXG4gICAgICAgIH1cblx0fVxuXHRzdGF0aWMgR2V0SW1nVXJsSWQodXJsKSB7XG5cdFx0dmFyIHNwbGl0ID0gdXJsLnNwbGl0KCcvJylcblx0XHRyZXR1cm4gc3BsaXRbc3BsaXQubGVuZ3RoLTFdLnNwbGl0KCcuJylbMF1cblx0fVxuXHRzdGF0aWMgU3R5bGUoZGl2LCBzdHlsZSkge1xuICAgIFx0ZGl2LnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IHN0eWxlXG5cdFx0ZGl2LnN0eWxlLm1velRyYW5zZm9ybSAgICA9IHN0eWxlXG5cdFx0ZGl2LnN0eWxlLm1zVHJhbnNmb3JtICAgICA9IHN0eWxlXG5cdFx0ZGl2LnN0eWxlLm9UcmFuc2Zvcm0gICAgICA9IHN0eWxlXG5cdFx0ZGl2LnN0eWxlLnRyYW5zZm9ybSAgICAgICA9IHN0eWxlXG4gICAgfVxuICAgIHN0YXRpYyBUcmFuc2xhdGUoZGl2LCB4LCB5LCB6KSB7XG4gICAgXHRpZiAoJ3dlYmtpdFRyYW5zZm9ybScgaW4gZG9jdW1lbnQuYm9keS5zdHlsZSB8fCAnbW96VHJhbnNmb3JtJyBpbiBkb2N1bWVudC5ib2R5LnN0eWxlIHx8ICdvVHJhbnNmb3JtJyBpbiBkb2N1bWVudC5ib2R5LnN0eWxlIHx8ICd0cmFuc2Zvcm0nIGluIGRvY3VtZW50LmJvZHkuc3R5bGUpIHtcbiAgICBcdFx0VXRpbHMuU3R5bGUoZGl2LCAndHJhbnNsYXRlM2QoJyt4KydweCwnK3krJ3B4LCcreisncHgpJylcblx0XHR9ZWxzZXtcblx0XHRcdGRpdi5zdHlsZS50b3AgPSB5ICsgJ3B4J1xuXHRcdFx0ZGl2LnN0eWxlLmxlZnQgPSB4ICsgJ3B4J1xuXHRcdH1cbiAgICB9XG4gICAgc3RhdGljIFNwcmluZ1RvKGl0ZW0sIHRvUG9zaXRpb24sIGluZGV4KSB7XG4gICAgXHR2YXIgZHggPSB0b1Bvc2l0aW9uLnggLSBpdGVtLnBvc2l0aW9uLnhcbiAgICBcdHZhciBkeSA9IHRvUG9zaXRpb24ueSAtIGl0ZW0ucG9zaXRpb24ueVxuXHRcdHZhciBhbmdsZSA9IE1hdGguYXRhbjIoZHksIGR4KVxuXHRcdHZhciB0YXJnZXRYID0gdG9Qb3NpdGlvbi54IC0gTWF0aC5jb3MoYW5nbGUpICogKGl0ZW0uY29uZmlnLmxlbmd0aCAqIGluZGV4KVxuXHRcdHZhciB0YXJnZXRZID0gdG9Qb3NpdGlvbi55IC0gTWF0aC5zaW4oYW5nbGUpICogKGl0ZW0uY29uZmlnLmxlbmd0aCAqIGluZGV4KVxuXHRcdGl0ZW0udmVsb2NpdHkueCArPSAodGFyZ2V0WCAtIGl0ZW0ucG9zaXRpb24ueCkgKiBpdGVtLmNvbmZpZy5zcHJpbmdcblx0XHRpdGVtLnZlbG9jaXR5LnkgKz0gKHRhcmdldFkgLSBpdGVtLnBvc2l0aW9uLnkpICogaXRlbS5jb25maWcuc3ByaW5nXG5cdFx0aXRlbS52ZWxvY2l0eS54ICo9IGl0ZW0uY29uZmlnLmZyaWN0aW9uXG5cdFx0aXRlbS52ZWxvY2l0eS55ICo9IGl0ZW0uY29uZmlnLmZyaWN0aW9uXG4gICAgfVxuICAgIHN0YXRpYyBTcHJpbmdUb1NjYWxlKGl0ZW0sIHRvU2NhbGUsIGluZGV4KSB7XG4gICAgXHR2YXIgZHggPSB0b1NjYWxlLnggLSBpdGVtLnNjYWxlLnhcbiAgICBcdHZhciBkeSA9IHRvU2NhbGUueSAtIGl0ZW0uc2NhbGUueVxuXHRcdHZhciBhbmdsZSA9IE1hdGguYXRhbjIoZHksIGR4KVxuXHRcdHZhciB0YXJnZXRYID0gdG9TY2FsZS54IC0gTWF0aC5jb3MoYW5nbGUpICogKGl0ZW0uY29uZmlnLmxlbmd0aCAqIGluZGV4KVxuXHRcdHZhciB0YXJnZXRZID0gdG9TY2FsZS55IC0gTWF0aC5zaW4oYW5nbGUpICogKGl0ZW0uY29uZmlnLmxlbmd0aCAqIGluZGV4KVxuXHRcdGl0ZW0udmVsb2NpdHlTY2FsZS54ICs9ICh0YXJnZXRYIC0gaXRlbS5zY2FsZS54KSAqIGl0ZW0uY29uZmlnLnNwcmluZ1xuXHRcdGl0ZW0udmVsb2NpdHlTY2FsZS55ICs9ICh0YXJnZXRZIC0gaXRlbS5zY2FsZS55KSAqIGl0ZW0uY29uZmlnLnNwcmluZ1xuXHRcdGl0ZW0udmVsb2NpdHlTY2FsZS54ICo9IGl0ZW0uY29uZmlnLmZyaWN0aW9uXG5cdFx0aXRlbS52ZWxvY2l0eVNjYWxlLnkgKj0gaXRlbS5jb25maWcuZnJpY3Rpb25cbiAgICB9XG4gICAgc3RhdGljIExvYWRUZXh0dXJlKHVybCkge1xuXHRcdHZhciB1cmkgPSAnaW1hZ2UvdGV4dHVyZXMvJyArIHVybFxuXHRcdHZhciB0ZXh0dXJlID0gVEhSRUUuSW1hZ2VVdGlscy5sb2FkVGV4dHVyZSggdXJpICk7XG5cdFx0dGV4dHVyZS53cmFwUyA9IHRleHR1cmUud3JhcFQgPSBUSFJFRS5SZXBlYXRXcmFwcGluZztcblx0XHR0ZXh0dXJlLmFuaXNvdHJvcHkgPSAxNjtcblx0XHRyZXR1cm4gdGV4dHVyZVxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFV0aWxzXG4iLCIvLyBodHRwOi8vcGF1bGlyaXNoLmNvbS8yMDExL3JlcXVlc3RhbmltYXRpb25mcmFtZS1mb3Itc21hcnQtYW5pbWF0aW5nL1xuLy8gaHR0cDovL215Lm9wZXJhLmNvbS9lbW9sbGVyL2Jsb2cvMjAxMS8xMi8yMC9yZXF1ZXN0YW5pbWF0aW9uZnJhbWUtZm9yLXNtYXJ0LWVyLWFuaW1hdGluZ1xuIFxuLy8gcmVxdWVzdEFuaW1hdGlvbkZyYW1lIHBvbHlmaWxsIGJ5IEVyaWsgTcO2bGxlci4gZml4ZXMgZnJvbSBQYXVsIElyaXNoIGFuZCBUaW5vIFppamRlbFxuIFxuLy8gTUlUIGxpY2Vuc2VcbiBcbihmdW5jdGlvbigpIHtcbiAgICB2YXIgbGFzdFRpbWUgPSAwO1xuICAgIHZhciB2ZW5kb3JzID0gWydtcycsICdtb3onLCAnd2Via2l0JywgJ28nXTtcbiAgICBmb3IodmFyIHggPSAwOyB4IDwgdmVuZG9ycy5sZW5ndGggJiYgIXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWU7ICsreCkge1xuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gd2luZG93W3ZlbmRvcnNbeF0rJ1JlcXVlc3RBbmltYXRpb25GcmFtZSddO1xuICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgPSB3aW5kb3dbdmVuZG9yc1t4XSsnQ2FuY2VsQW5pbWF0aW9uRnJhbWUnXSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfHwgd2luZG93W3ZlbmRvcnNbeF0rJ0NhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSddO1xuICAgIH1cbiBcbiAgICBpZiAoIXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUpXG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSBmdW5jdGlvbihjYWxsYmFjaywgZWxlbWVudCkge1xuICAgICAgICAgICAgdmFyIGN1cnJUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgICAgICB2YXIgdGltZVRvQ2FsbCA9IE1hdGgubWF4KDAsIDE2IC0gKGN1cnJUaW1lIC0gbGFzdFRpbWUpKTtcbiAgICAgICAgICAgIHZhciBpZCA9IHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkgeyBjYWxsYmFjayhjdXJyVGltZSArIHRpbWVUb0NhbGwpOyB9LCBcbiAgICAgICAgICAgICAgdGltZVRvQ2FsbCk7XG4gICAgICAgICAgICBsYXN0VGltZSA9IGN1cnJUaW1lICsgdGltZVRvQ2FsbDtcbiAgICAgICAgICAgIHJldHVybiBpZDtcbiAgICAgICAgfTtcbiBcbiAgICBpZiAoIXdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSlcbiAgICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lID0gZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChpZCk7XG4gICAgICAgIH07XG59KCkpOyIsImltcG9ydCBzbHVnIGZyb20gJ3RvLXNsdWctY2FzZSdcbmltcG9ydCBkb20gZnJvbSAnZG9tLWhhbmQnXG5cbmNsYXNzIEJhc2VDb21wb25lbnQge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLmRvbUlzUmVhZHkgPSBmYWxzZVxuXHRcdHRoaXMuY29tcG9uZW50RGlkTW91bnQgPSB0aGlzLmNvbXBvbmVudERpZE1vdW50LmJpbmQodGhpcylcblx0fVxuXHRjb21wb25lbnRXaWxsTW91bnQoKSB7XG5cdH1cblx0Y29tcG9uZW50RGlkTW91bnQoKSB7XG5cdFx0dGhpcy5kb21Jc1JlYWR5ID0gdHJ1ZVxuXHRcdHRoaXMucmVzaXplKClcblx0fVxuXHRyZW5kZXIoY2hpbGRJZCwgcGFyZW50SWQsIHRlbXBsYXRlLCBvYmplY3QpIHtcblx0XHR0aGlzLmNvbXBvbmVudFdpbGxNb3VudCgpXG5cdFx0dGhpcy5jaGlsZElkID0gY2hpbGRJZFxuXHRcdHRoaXMucGFyZW50SWQgPSBwYXJlbnRJZFxuXHRcdFxuXHRcdGlmKGRvbS5pc0RvbShwYXJlbnRJZCkpIHtcblx0XHRcdHRoaXMucGFyZW50ID0gcGFyZW50SWRcblx0XHR9ZWxzZXtcblx0XHRcdHZhciBpZCA9IHRoaXMucGFyZW50SWQuaW5kZXhPZignIycpID4gLTEgPyB0aGlzLnBhcmVudElkLnNwbGl0KCcjJylbMV0gOiB0aGlzLnBhcmVudElkXG5cdFx0XHR0aGlzLnBhcmVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKVxuXHRcdH1cblxuXHRcdGlmKHRlbXBsYXRlID09IHVuZGVmaW5lZCkge1xuXHRcdFx0dGhpcy5lbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jylcblx0XHR9ZWxzZSB7XG5cdFx0XHR0aGlzLmVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXHRcdFx0dmFyIHQgPSB0ZW1wbGF0ZShvYmplY3QpXG5cdFx0XHR0aGlzLmVsZW1lbnQuaW5uZXJIVE1MID0gdFxuXHRcdH1cblx0XHRpZih0aGlzLmVsZW1lbnQuZ2V0QXR0cmlidXRlKCdpZCcpID09IHVuZGVmaW5lZCkgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSgnaWQnLCBzbHVnKGNoaWxkSWQpKVxuXHRcdGRvbS50cmVlLmFkZCh0aGlzLnBhcmVudCwgdGhpcy5lbGVtZW50KVxuXG5cdFx0c2V0VGltZW91dCh0aGlzLmNvbXBvbmVudERpZE1vdW50LCAwKVxuXHR9XG5cdHJlbW92ZSgpIHtcblx0XHR0aGlzLmNvbXBvbmVudFdpbGxVbm1vdW50KClcblx0XHR0aGlzLmVsZW1lbnQucmVtb3ZlKClcblx0fVxuXHRyZXNpemUoKSB7XG5cdH1cblx0Y29tcG9uZW50V2lsbFVubW91bnQoKSB7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQmFzZUNvbXBvbmVudFxuXG4iLCJtb2R1bGUuZXhwb3J0cz17XG5cdFwiY29udGVudFwiOiB7XG5cdFx0XCJ0d2l0dGVyX3VybFwiOiBcImh0dHBzOi8vdHdpdHRlci5jb20vY2FtcGVyXCIsXG5cdFx0XCJmYWNlYm9va191cmxcIjogXCJodHRwczovL3d3dy5mYWNlYm9vay5jb20vQ2FtcGVyXCIsXG5cdFx0XCJpbnN0YWdyYW1fdXJsXCI6IFwiaHR0cHM6Ly9pbnN0YWdyYW0uY29tL2NhbXBlci9cIixcblx0XHRcImxhYl91cmxcIjogXCJodHRwOi8vd3d3LmNhbXBlci5jb20vbGFiXCIsXG5cdFx0XCJtZW5fc2hvcF91cmxcIjogXCJodHRwOi8vd3d3LmNhbXBlci5jb20vaW50L21lbi9zaG9lcy9zczE2X2luc3BpcmF0aW9uXCIsXG5cdFx0XCJ3b21lbl9zaG9wX3VybFwiOiBcImh0dHA6Ly93d3cuY2FtcGVyLmNvbS9pbnQvd29tZW4vc2hvZXMvc3MxNl9pbnNwaXJhdGlvblwiLFxuXHRcdFwibGFuZ1wiOiB7XG5cdFx0XHRcImVuXCI6IHtcblx0XHRcdFx0XCJob21lXCI6IFwiTUFQXCIsXG5cdFx0XHRcdFwiZ3JpZFwiOiBcIklOREVYXCIsXG5cdFx0XHRcdFwibGFiXCI6IFwiTEFCXCIsXG5cdFx0XHRcdFwiY2FtcGVyX2xhYlwiOiBcIkNhbXBlciBMYWJcIixcblx0XHRcdFx0XCJzaG9wX3RpdGxlXCI6IFwiU2hvcFwiLFxuXHRcdFx0XHRcInNob3BfbWVuXCI6IFwiTWVuXCIsXG5cdFx0XHRcdFwic2hvcF93b21lblwiOiBcIldvbWVuXCIsXG5cdFx0XHRcdFwibWFwX3R4dFwiOiBcIk1BUFwiXG5cdFx0XHR9LFxuXHRcdFx0XCJmclwiOiB7XG5cdFx0XHRcdFwiaG9tZVwiOiBcIk1BUFwiLFxuXHRcdFx0XHRcImdyaWRcIjogXCJJTkRFWFwiLFxuXHRcdFx0XHRcImxhYlwiOiBcIkxBQlwiLFxuXHRcdFx0XHRcImNhbXBlcl9sYWJcIjogXCJDYW1wZXIgTGFiXCIsXG5cdFx0XHRcdFwic2hvcF90aXRsZVwiOiBcIkFjaGV0ZXJcIixcblx0XHRcdFx0XCJzaG9wX21lblwiOiBcImhvbW1lXCIsXG5cdFx0XHRcdFwic2hvcF93b21lblwiOiBcImZlbW1lXCIsXG5cdFx0XHRcdFwibWFwX3R4dFwiOiBcIk1BUFwiXG5cdFx0XHR9LFxuXHRcdFx0XCJlc1wiOiB7XG5cdFx0XHRcdFwiaG9tZVwiOiBcIk1BUFwiLFxuXHRcdFx0XHRcImdyaWRcIjogXCJJTkRFWFwiLFxuXHRcdFx0XHRcImxhYlwiOiBcIkxBQlwiLFxuXHRcdFx0XHRcImNhbXBlcl9sYWJcIjogXCJDYW1wZXIgTGFiXCIsXG5cdFx0XHRcdFwic2hvcF90aXRsZVwiOiBcIkNvbXByYXJcIixcblx0XHRcdFx0XCJzaG9wX21lblwiOiBcImhvbWJyZVwiLFxuXHRcdFx0XHRcInNob3Bfd29tZW5cIjogXCJtdWplclwiLFxuXHRcdFx0XHRcIm1hcF90eHRcIjogXCJNQVBcIlxuXHRcdFx0fSxcblx0XHRcdFwiaXRcIjoge1xuXHRcdFx0XHRcImhvbWVcIjogXCJNQVBcIixcblx0XHRcdFx0XCJncmlkXCI6IFwiSU5ERVhcIixcblx0XHRcdFx0XCJsYWJcIjogXCJMQUJcIixcblx0XHRcdFx0XCJjYW1wZXJfbGFiXCI6IFwiQ2FtcGVyIExhYlwiLFxuXHRcdFx0XHRcInNob3BfdGl0bGVcIjogXCJBY3F1aXNpdGlcIixcblx0XHRcdFx0XCJzaG9wX21lblwiOiBcInVvbW9cIixcblx0XHRcdFx0XCJzaG9wX3dvbWVuXCI6IFwiZG9ubmFcIixcblx0XHRcdFx0XCJtYXBfdHh0XCI6IFwiTUFQXCJcblx0XHRcdH0sXG5cdFx0XHRcImRlXCI6IHtcblx0XHRcdFx0XCJob21lXCI6IFwiTUFQXCIsXG5cdFx0XHRcdFwiZ3JpZFwiOiBcIklOREVYXCIsXG5cdFx0XHRcdFwibGFiXCI6IFwiTEFCXCIsXG5cdFx0XHRcdFwiY2FtcGVyX2xhYlwiOiBcIkNhbXBlciBMYWJcIixcblx0XHRcdFx0XCJzaG9wX3RpdGxlXCI6IFwiU2hvcFwiLFxuXHRcdFx0XHRcInNob3BfbWVuXCI6IFwiSGVycmVuXCIsXG5cdFx0XHRcdFwic2hvcF93b21lblwiOiBcIkRhbWVuXCIsXG5cdFx0XHRcdFwibWFwX3R4dFwiOiBcIk1BUFwiXG5cdFx0XHR9LFxuXHRcdFx0XCJwdFwiOiB7XG5cdFx0XHRcdFwiaG9tZVwiOiBcIk1BUFwiLFxuXHRcdFx0XHRcImdyaWRcIjogXCJJTkRFWFwiLFxuXHRcdFx0XHRcImxhYlwiOiBcIkxBQlwiLFxuXHRcdFx0XHRcImNhbXBlcl9sYWJcIjogXCJDYW1wZXIgTGFiXCIsXG5cdFx0XHRcdFwic2hvcF90aXRsZVwiOiBcIkNvbXByZVwiLFxuXHRcdFx0XHRcInNob3BfbWVuXCI6IFwiSG9tZW5cIixcblx0XHRcdFx0XCJzaG9wX3dvbWVuXCI6IFwiTXVsaGVyXCIsXG5cdFx0XHRcdFwibWFwX3R4dFwiOiBcIk1BUFwiXG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdFwibGFuZ3NcIjogW1wiZW5cIiwgXCJmclwiLCBcImVzXCIsIFwiaXRcIiwgXCJkZVwiLCBcInB0XCJdLFxuXG5cdFwiaG9tZS12aWRlb3NcIjogW1xuXHRcdFwiZGVpYS1kdWIubXA0XCIsXG5cdFx0XCJkZWlhLW1hdGVvLm1wNFwiLFxuXHRcdFwiZGVpYS1tYXJ0YS5tcDRcIixcblx0XHRcImVzLXRyZW5jLWlzYW11Lm1wNFwiLFxuXHRcdFwiZXMtdHJlbmMtYmVsdWdhLm1wNFwiLFxuXHRcdFwiYXJlbGx1Zi1jYXBhcy5tcDRcIixcblx0XHRcImFyZWxsdWYtcGVsb3Rhcy5tcDRcIixcblx0XHRcImFyZWxsdWYtbWFydGEubXA0XCIsXG5cdFx0XCJhcmVsbHVmLWtvYmFyYWgubXA0XCIsXG5cdFx0XCJhcmVsbHVmLWR1Yi5tcDRcIixcblx0XHRcImFyZWxsdWYtcGFyYWRpc2UubXA0XCJcblx0XSxcblxuXHRcImZlZWRcIjogW1xuXHRcdHtcblx0XHRcdFwiaWRcIjogXCJkZWlhXCIsXG5cdFx0XHRcInBlcnNvblwiOiBcIm1hdGVvXCIsXG5cdFx0XHRcInRpbWVcIjogXCIyIG1pbiBhZ29cIixcblx0XHRcdFwibWVkaWFcIjoge1xuXHRcdFx0XHRcInR5cGVcIjogXCJpbWFnZVwiLFxuXHRcdFx0XHRcImlkXCI6IFwic2hvZVwiXG5cdFx0XHR9LFxuXHRcdFx0XCJjb21tZW50c1wiOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRcInBlcnNvbi1uYW1lXCI6IFwibWF0ZW9cIixcblx0XHRcdFx0XHRcInBlcnNvbi10ZXh0XCI6IFwiRXN0cmVubyBDYW1wZXJzIHBhcmEgbnVlc3RybyB3ZWVrZW5kIGVuIERlaWEgQE1hcnRhXCJcblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdH0se1xuXHRcdFx0XCJpZFwiOiBcImRlaWFcIixcblx0XHRcdFwicGVyc29uXCI6IFwibWF0ZW9cIixcblx0XHRcdFwidGltZVwiOiBcIjIgbWluIGFnb1wiLFxuXHRcdFx0XCJtZWRpYVwiOiB7XG5cdFx0XHRcdFwidHlwZVwiOiBcImltYWdlXCIsXG5cdFx0XHRcdFwiaWRcIjogXCJjaGFyYWN0ZXJcIlxuXHRcdFx0fSxcblx0XHRcdFwiY29tbWVudHNcIjogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0XCJwZXJzb24tbmFtZVwiOiBcIm1hdGVvXCIsXG5cdFx0XHRcdFx0XCJwZXJzb24tdGV4dFwiOiBcIlByb2ZpbGUgcGljPyBtYXliZT8gbWF5YmUgYmFieT9cIlxuXHRcdFx0XHR9XG5cdFx0XHRdXG5cdFx0fSx7XG5cdFx0XHRcImlkXCI6IFwiZGVpYVwiLFxuXHRcdFx0XCJwZXJzb25cIjogXCJtYXRlb1wiLFxuXHRcdFx0XCJ0aW1lXCI6IFwiMiBtaW4gYWdvXCIsXG5cdFx0XHRcIm1lZGlhXCI6IHtcblx0XHRcdFx0XCJ0eXBlXCI6IFwidmlkZW9cIixcblx0XHRcdFx0XCJpZFwiOiBcImZ1bi1mYWN0XCJcblx0XHRcdH0sXG5cdFx0XHRcImNvbW1lbnRzXCI6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdFwicGVyc29uLW5hbWVcIjogXCJtYXRlb1wiLFxuXHRcdFx0XHRcdFwicGVyc29uLXRleHRcIjogXCJNZSBiZWluZyBtZeKApiBIZWhlIDopIDxzcGFuPiNjYW1wZXI8L3NwYW4+XCJcblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdH0se1xuXHRcdFx0XCJpZFwiOiBcImRlaWFcIixcblx0XHRcdFwicGVyc29uXCI6IFwibWF0ZW9cIixcblx0XHRcdFwidGltZVwiOiBcIjIgbWluIGFnb1wiLFxuXHRcdFx0XCJtZWRpYVwiOiB7XG5cdFx0XHRcdFwidHlwZVwiOiBcInZpZGVvXCIsXG5cdFx0XHRcdFwiaWRcIjogXCJjaGFyYWN0ZXJcIlxuXHRcdFx0fSxcblx0XHRcdFwiY29tbWVudHNcIjogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0XCJwZXJzb24tbmFtZVwiOiBcIm1hcnRhXCIsXG5cdFx0XHRcdFx0XCJwZXJzb24tdGV4dFwiOiBcIlBvcnF1ZSBlc2EgY2FyYSBkZSBlbW8/PyBATWF0ZW8gbG9sISEgI1NlbGZpZVZpZGVvICNNYWxsb3JjYUJ5Q2FtcGVyXCJcblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdH0se1xuXHRcdFx0XCJpZFwiOiBcImRlaWFcIixcblx0XHRcdFwicGVyc29uXCI6IFwiZHViXCIsXG5cdFx0XHRcInRpbWVcIjogXCIyIG1pbiBhZ29cIixcblx0XHRcdFwibWVkaWFcIjoge1xuXHRcdFx0XHRcInR5cGVcIjogXCJpbWFnZVwiLFxuXHRcdFx0XHRcImlkXCI6IFwic2hvZVwiXG5cdFx0XHR9LFxuXHRcdFx0XCJjb21tZW50c1wiOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRcInBlcnNvbi1uYW1lXCI6IFwiZHViXCIsXG5cdFx0XHRcdFx0XCJwZXJzb24tdGV4dFwiOiBcIlRoZXNlIHNob2VzIGFyZSB0aGUgc2hvZXMgTWlya28gd291bGQgd2VhciBpZiBoZSB3YXMgc3RpbGwgYWxpdmUgYW5kIGtpY2tpbidcIlxuXHRcdFx0XHR9XG5cdFx0XHRdXG5cdFx0fSx7XG5cdFx0XHRcImlkXCI6IFwiZGVpYVwiLFxuXHRcdFx0XCJwZXJzb25cIjogXCJkdWJcIixcblx0XHRcdFwidGltZVwiOiBcIjIgbWluIGFnb1wiLFxuXHRcdFx0XCJtZWRpYVwiOiB7XG5cdFx0XHRcdFwidHlwZVwiOiBcImltYWdlXCIsXG5cdFx0XHRcdFwiaWRcIjogXCJjaGFyYWN0ZXJcIlxuXHRcdFx0fSxcblx0XHRcdFwiY29tbWVudHNcIjogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0XCJwZXJzb24tbmFtZVwiOiBcIm1hdGVvXCIsXG5cdFx0XHRcdFx0XCJwZXJzb24tdGV4dFwiOiBcIlBvcnF1ZSBubyB2aWVuZXMgYSBEZWlhIGNvbiBATWFydGEgeSBjb25taWdvIGVsIHByb3hpbW8gd2Vla2VuZD8/XCJcblx0XHRcdFx0fSx7XG5cdFx0XHRcdFx0XCJwZXJzb24tbmFtZVwiOiBcImR1YlwiLFxuXHRcdFx0XHRcdFwicGVyc29uLXRleHRcIjogXCJObyBwdWVkb29vb2/igKYgdGVuZ28gY2xhc2VzIGRlIHBpbnR1cmEgeSBtaSBtYWRyZSB2aWVuZSBhIHZpc2l0YXIgI2hlYXZ5bWV0YWxcIlxuXHRcdFx0XHR9XG5cdFx0XHRdXG5cdFx0fSx7XG5cdFx0XHRcImlkXCI6IFwiZGVpYVwiLFxuXHRcdFx0XCJwZXJzb25cIjogXCJkdWJcIixcblx0XHRcdFwidGltZVwiOiBcIjIgbWluIGFnb1wiLFxuXHRcdFx0XCJtZWRpYVwiOiB7XG5cdFx0XHRcdFwidHlwZVwiOiBcInZpZGVvXCIsXG5cdFx0XHRcdFwiaWRcIjogXCJmdW4tZmFjdFwiXG5cdFx0XHR9LFxuXHRcdFx0XCJjb21tZW50c1wiOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRcInBlcnNvbi1uYW1lXCI6IFwibWF0ZW9cIixcblx0XHRcdFx0XHRcInBlcnNvbi10ZXh0XCI6IFwiTWUgYmVpbmcgbWXigKYgSGVoZSA6KSA8c3Bhbj4jY2FtcGVyPC9zcGFuPlwiXG5cdFx0XHRcdH1cblx0XHRcdF1cblx0XHR9LHtcblx0XHRcdFwiaWRcIjogXCJkZWlhXCIsXG5cdFx0XHRcInBlcnNvblwiOiBcImR1YlwiLFxuXHRcdFx0XCJ0aW1lXCI6IFwiMiBtaW4gYWdvXCIsXG5cdFx0XHRcIm1lZGlhXCI6IHtcblx0XHRcdFx0XCJ0eXBlXCI6IFwidmlkZW9cIixcblx0XHRcdFx0XCJpZFwiOiBcImNoYXJhY3RlclwiXG5cdFx0XHR9LFxuXHRcdFx0XCJjb21tZW50c1wiOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRcInBlcnNvbi1uYW1lXCI6IFwiZHViXCIsXG5cdFx0XHRcdFx0XCJwZXJzb24tdGV4dFwiOiBcIiNhcnRzZWxmaWVcIlxuXHRcdFx0XHR9XG5cdFx0XHRdXG5cdFx0fSx7XG5cdFx0XHRcImlkXCI6IFwiZGVpYVwiLFxuXHRcdFx0XCJwZXJzb25cIjogXCJtYXJ0YVwiLFxuXHRcdFx0XCJ0aW1lXCI6IFwiMiBtaW4gYWdvXCIsXG5cdFx0XHRcIm1lZGlhXCI6IHtcblx0XHRcdFx0XCJ0eXBlXCI6IFwiaW1hZ2VcIixcblx0XHRcdFx0XCJpZFwiOiBcInNob2VcIlxuXHRcdFx0fSxcblx0XHRcdFwiY29tbWVudHNcIjogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0XCJwZXJzb24tbmFtZVwiOiBcIm1hcnRhXCIsXG5cdFx0XHRcdFx0XCJwZXJzb24tdGV4dFwiOiBcIkRlZXAgYmx1ZSAjY2FtcGVyc2hvZXNcIlxuXHRcdFx0XHR9XG5cdFx0XHRdXG5cdFx0fSx7XG5cdFx0XHRcImlkXCI6IFwiZGVpYVwiLFxuXHRcdFx0XCJwZXJzb25cIjogXCJtYXJ0YVwiLFxuXHRcdFx0XCJ0aW1lXCI6IFwiMiBtaW4gYWdvXCIsXG5cdFx0XHRcIm1lZGlhXCI6IHtcblx0XHRcdFx0XCJ0eXBlXCI6IFwiaW1hZ2VcIixcblx0XHRcdFx0XCJpZFwiOiBcImNoYXJhY3RlclwiXG5cdFx0XHR9LFxuXHRcdFx0XCJjb21tZW50c1wiOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRcInBlcnNvbi1uYW1lXCI6IFwibWFydGFcIixcblx0XHRcdFx0XHRcInBlcnNvbi10ZXh0XCI6IFwiVGhhbmtzIGZvciB0aGUgZmxvd2VycyBATWF0ZW8gc29vbyBjdXV1dGUuXCJcblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdH0se1xuXHRcdFx0XCJpZFwiOiBcImRlaWFcIixcblx0XHRcdFwicGVyc29uXCI6IFwibWFydGFcIixcblx0XHRcdFwidGltZVwiOiBcIjIgbWluIGFnb1wiLFxuXHRcdFx0XCJtZWRpYVwiOiB7XG5cdFx0XHRcdFwidHlwZVwiOiBcInZpZGVvXCIsXG5cdFx0XHRcdFwiaWRcIjogXCJmdW4tZmFjdFwiXG5cdFx0XHR9LFxuXHRcdFx0XCJjb21tZW50c1wiOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRcInBlcnNvbi1uYW1lXCI6IFwibWFydGFcIixcblx0XHRcdFx0XHRcInBlcnNvbi10ZXh0XCI6IFwiTWUgYmVpbmcgbWXigKYgSGVoZSA6KSA8c3Bhbj4jY2FtcGVyPC9zcGFuPlwiXG5cdFx0XHRcdH1cblx0XHRcdF1cblx0XHR9LHtcblx0XHRcdFwiaWRcIjogXCJkZWlhXCIsXG5cdFx0XHRcInBlcnNvblwiOiBcIm1hcnRhXCIsXG5cdFx0XHRcInRpbWVcIjogXCIyIG1pbiBhZ29cIixcblx0XHRcdFwibWVkaWFcIjoge1xuXHRcdFx0XHRcInR5cGVcIjogXCJ2aWRlb1wiLFxuXHRcdFx0XHRcImlkXCI6IFwiY2hhcmFjdGVyXCJcblx0XHRcdH0sXG5cdFx0XHRcImNvbW1lbnRzXCI6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdFwicGVyc29uLW5hbWVcIjogXCJtYXJ0YVwiLFxuXHRcdFx0XHRcdFwicGVyc29uLXRleHRcIjogXCJMYXMgZmxvcmVzIHF1ZSBAbWF0ZW8gbWUgcmVnYWxvLiAjTWFsbG9yY2FCeUNhbXBlclwiXG5cdFx0XHRcdH1cblx0XHRcdF1cblx0XHR9LHtcblx0XHRcdFwiaWRcIjogXCJlcy10cmVuY1wiLFxuXHRcdFx0XCJwZXJzb25cIjogXCJiZWx1Z2FcIixcblx0XHRcdFwidGltZVwiOiBcIjIgbWluIGFnb1wiLFxuXHRcdFx0XCJtZWRpYVwiOiB7XG5cdFx0XHRcdFwidHlwZVwiOiBcImltYWdlXCIsXG5cdFx0XHRcdFwiaWRcIjogXCJzaG9lXCJcblx0XHRcdH0sXG5cdFx0XHRcImNvbW1lbnRzXCI6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdFwicGVyc29uLW5hbWVcIjogXCJiZWx1Z2FcIixcblx0XHRcdFx0XHRcInBlcnNvbi10ZXh0XCI6IFwiTWUgYmVpbmcgbWUuLi4gSGVoZSA6KSAjY2FtcGVyc2hvZXMgI0JlbHVnYVwiXG5cdFx0XHRcdH1cblx0XHRcdF1cblx0XHR9LHtcblx0XHRcdFwiaWRcIjogXCJlcy10cmVuY1wiLFxuXHRcdFx0XCJwZXJzb25cIjogXCJiZWx1Z2FcIixcblx0XHRcdFwidGltZVwiOiBcIjIgbWluIGFnb1wiLFxuXHRcdFx0XCJtZWRpYVwiOiB7XG5cdFx0XHRcdFwidHlwZVwiOiBcImltYWdlXCIsXG5cdFx0XHRcdFwiaWRcIjogXCJjaGFyYWN0ZXJcIlxuXHRcdFx0fSxcblx0XHRcdFwiY29tbWVudHNcIjogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0XCJwZXJzb24tbmFtZVwiOiBcImJlbHVnYVwiLFxuXHRcdFx0XHRcdFwicGVyc29uLXRleHRcIjogXCJFcyBUcmVuYyBpcyB0aGUgcGxhY2UgdG8gYmUuIFwiXG5cdFx0XHRcdH1cblx0XHRcdF1cblx0XHR9LHtcblx0XHRcdFwiaWRcIjogXCJlcy10cmVuY1wiLFxuXHRcdFx0XCJwZXJzb25cIjogXCJiZWx1Z2FcIixcblx0XHRcdFwidGltZVwiOiBcIjIgbWluIGFnb1wiLFxuXHRcdFx0XCJtZWRpYVwiOiB7XG5cdFx0XHRcdFwidHlwZVwiOiBcInZpZGVvXCIsXG5cdFx0XHRcdFwiaWRcIjogXCJmdW4tZmFjdFwiXG5cdFx0XHR9LFxuXHRcdFx0XCJjb21tZW50c1wiOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRcInBlcnNvbi1uYW1lXCI6IFwiYmVsdWdhXCIsXG5cdFx0XHRcdFx0XCJwZXJzb24tdGV4dFwiOiBcIk1lIGJlaW5nIG1l4oCmIEhlaGUgOikgPHNwYW4+I2NhbXBlcjwvc3Bhbj5cIlxuXHRcdFx0XHR9XG5cdFx0XHRdXG5cdFx0fSx7XG5cdFx0XHRcImlkXCI6IFwiZXMtdHJlbmNcIixcblx0XHRcdFwicGVyc29uXCI6IFwiYmVsdWdhXCIsXG5cdFx0XHRcInRpbWVcIjogXCIyIG1pbiBhZ29cIixcblx0XHRcdFwibWVkaWFcIjoge1xuXHRcdFx0XHRcInR5cGVcIjogXCJ2aWRlb1wiLFxuXHRcdFx0XHRcImlkXCI6IFwiY2hhcmFjdGVyXCJcblx0XHRcdH0sXG5cdFx0XHRcImNvbW1lbnRzXCI6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdFwicGVyc29uLW5hbWVcIjogXCJiZWx1Z2FcIixcblx0XHRcdFx0XHRcInBlcnNvbi10ZXh0XCI6IFwiQWxsIHRoaXMgc21va2UgaXMgbm90IHdoYXQgeW91IHRoaW5rIGl0IGlzICNIaWdob25MaWZlXCJcblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdH0se1xuXHRcdFx0XCJpZFwiOiBcImVzLXRyZW5jXCIsXG5cdFx0XHRcInBlcnNvblwiOiBcImlzYW11XCIsXG5cdFx0XHRcInRpbWVcIjogXCIyIG1pbiBhZ29cIixcblx0XHRcdFwibWVkaWFcIjoge1xuXHRcdFx0XHRcInR5cGVcIjogXCJpbWFnZVwiLFxuXHRcdFx0XHRcImlkXCI6IFwic2hvZVwiXG5cdFx0XHR9LFxuXHRcdFx0XCJjb21tZW50c1wiOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRcInBlcnNvbi1uYW1lXCI6IFwiaXNhbXVcIixcblx0XHRcdFx0XHRcInBlcnNvbi10ZXh0XCI6IFwiU3VwZXJuYXR1cmFsIGJlYXV0eS4gSSBsb3ZlIHRoZSBuZXcgI21lXCJcblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdH0se1xuXHRcdFx0XCJpZFwiOiBcImVzLXRyZW5jXCIsXG5cdFx0XHRcInBlcnNvblwiOiBcImlzYW11XCIsXG5cdFx0XHRcInRpbWVcIjogXCIyIG1pbiBhZ29cIixcblx0XHRcdFwibWVkaWFcIjoge1xuXHRcdFx0XHRcInR5cGVcIjogXCJpbWFnZVwiLFxuXHRcdFx0XHRcImlkXCI6IFwiY2hhcmFjdGVyXCJcblx0XHRcdH0sXG5cdFx0XHRcImNvbW1lbnRzXCI6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdFwicGVyc29uLW5hbWVcIjogXCJpc2FtdVwiLFxuXHRcdFx0XHRcdFwicGVyc29uLXRleHRcIjogXCJTbyBjYWxtIGF0IEVzIFRyZW5jLlwiXG5cdFx0XHRcdH1cblx0XHRcdF1cblx0XHR9LHtcblx0XHRcdFwiaWRcIjogXCJlcy10cmVuY1wiLFxuXHRcdFx0XCJwZXJzb25cIjogXCJpc2FtdVwiLFxuXHRcdFx0XCJ0aW1lXCI6IFwiMiBtaW4gYWdvXCIsXG5cdFx0XHRcIm1lZGlhXCI6IHtcblx0XHRcdFx0XCJ0eXBlXCI6IFwidmlkZW9cIixcblx0XHRcdFx0XCJpZFwiOiBcImZ1bi1mYWN0XCJcblx0XHRcdH0sXG5cdFx0XHRcImNvbW1lbnRzXCI6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdFwicGVyc29uLW5hbWVcIjogXCJpc2FtdVwiLFxuXHRcdFx0XHRcdFwicGVyc29uLXRleHRcIjogXCJNZSBiZWluZyBtZeKApiBIZWhlIDopIDxzcGFuPiNjYW1wZXI8L3NwYW4+XCJcblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdH0se1xuXHRcdFx0XCJpZFwiOiBcImVzLXRyZW5jXCIsXG5cdFx0XHRcInBlcnNvblwiOiBcImlzYW11XCIsXG5cdFx0XHRcInRpbWVcIjogXCIyIG1pbiBhZ29cIixcblx0XHRcdFwibWVkaWFcIjoge1xuXHRcdFx0XHRcInR5cGVcIjogXCJ2aWRlb1wiLFxuXHRcdFx0XHRcImlkXCI6IFwiY2hhcmFjdGVyXCJcblx0XHRcdH0sXG5cdFx0XHRcImNvbW1lbnRzXCI6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdFwicGVyc29uLW5hbWVcIjogXCJpc2FtdVwiLFxuXHRcdFx0XHRcdFwicGVyc29uLXRleHRcIjogXCJIaWlpaSEhISA6KSAjTWFsbG9yY2FCeUNhbXBlclwiXG5cdFx0XHRcdH1cblx0XHRcdF1cblx0XHR9LFxuXG5cdFx0e1xuXHRcdFx0XCJpZFwiOiBcImFyZWxsdWZcIixcblx0XHRcdFwicGVyc29uXCI6IFwiY2FwYXNcIixcblx0XHRcdFwidGltZVwiOiBcIjIgbWluIGFnb1wiLFxuXHRcdFx0XCJtZWRpYVwiOiB7XG5cdFx0XHRcdFwidHlwZVwiOiBcImltYWdlXCIsXG5cdFx0XHRcdFwiaWRcIjogXCJzaG9lXCJcblx0XHRcdH0sXG5cdFx0XHRcImNvbW1lbnRzXCI6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdFwicGVyc29uLW5hbWVcIjogXCJjYXBhc1wiLFxuXHRcdFx0XHRcdFwicGVyc29uLXRleHRcIjogXCJOZXcgY29sb3JzLiBTYW1lIGVuZXJneVwiXG5cdFx0XHRcdH1cblx0XHRcdF1cblx0XHR9LHtcblx0XHRcdFwiaWRcIjogXCJhcmVsbHVmXCIsXG5cdFx0XHRcInBlcnNvblwiOiBcImNhcGFzXCIsXG5cdFx0XHRcInRpbWVcIjogXCIyIG1pbiBhZ29cIixcblx0XHRcdFwibWVkaWFcIjoge1xuXHRcdFx0XHRcInR5cGVcIjogXCJpbWFnZVwiLFxuXHRcdFx0XHRcImlkXCI6IFwiY2hhcmFjdGVyXCJcblx0XHRcdH0sXG5cdFx0XHRcImNvbW1lbnRzXCI6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdFwicGVyc29uLW5hbWVcIjogXCJjYXBhc1wiLFxuXHRcdFx0XHRcdFwicGVyc29uLXRleHRcIjogXCJMYXN0IG5pZ2h0IHdhcyBpbi1zYW5lLlwiXG5cdFx0XHRcdH1cblx0XHRcdF1cblx0XHR9LHtcblx0XHRcdFwiaWRcIjogXCJhcmVsbHVmXCIsXG5cdFx0XHRcInBlcnNvblwiOiBcImNhcGFzXCIsXG5cdFx0XHRcInRpbWVcIjogXCIyIG1pbiBhZ29cIixcblx0XHRcdFwibWVkaWFcIjoge1xuXHRcdFx0XHRcInR5cGVcIjogXCJ2aWRlb1wiLFxuXHRcdFx0XHRcImlkXCI6IFwiZnVuLWZhY3RcIlxuXHRcdFx0fSxcblx0XHRcdFwiY29tbWVudHNcIjogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0XCJwZXJzb24tbmFtZVwiOiBcImNhcGFzXCIsXG5cdFx0XHRcdFx0XCJwZXJzb24tdGV4dFwiOiBcIk1lIGJlaW5nIG1l4oCmIEhlaGUgOikgPHNwYW4+I2NhbXBlcjwvc3Bhbj5cIlxuXHRcdFx0XHR9XG5cdFx0XHRdXG5cdFx0fSx7XG5cdFx0XHRcImlkXCI6IFwiYXJlbGx1ZlwiLFxuXHRcdFx0XCJwZXJzb25cIjogXCJjYXBhc1wiLFxuXHRcdFx0XCJ0aW1lXCI6IFwiMiBtaW4gYWdvXCIsXG5cdFx0XHRcIm1lZGlhXCI6IHtcblx0XHRcdFx0XCJ0eXBlXCI6IFwidmlkZW9cIixcblx0XHRcdFx0XCJpZFwiOiBcImNoYXJhY3RlclwiXG5cdFx0XHR9LFxuXHRcdFx0XCJjb21tZW50c1wiOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRcInBlcnNvbi1uYW1lXCI6IFwiY2FwYXNcIixcblx0XHRcdFx0XHRcInBlcnNvbi10ZXh0XCI6IFwiU28gbXVjaCBmdW4gTWFsbG9yY2EgI01hbGxvcmNhQnlDYW1wZXJcIlxuXHRcdFx0XHR9XG5cdFx0XHRdXG5cdFx0fSxcblxuXHRcdHtcblx0XHRcdFwiaWRcIjogXCJhcmVsbHVmXCIsXG5cdFx0XHRcInBlcnNvblwiOiBcInBlbG90YXNcIixcblx0XHRcdFwidGltZVwiOiBcIjIgbWluIGFnb1wiLFxuXHRcdFx0XCJtZWRpYVwiOiB7XG5cdFx0XHRcdFwidHlwZVwiOiBcImltYWdlXCIsXG5cdFx0XHRcdFwiaWRcIjogXCJzaG9lXCJcblx0XHRcdH0sXG5cdFx0XHRcImNvbW1lbnRzXCI6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdFwicGVyc29uLW5hbWVcIjogXCJwZWxvdGFzXCIsXG5cdFx0XHRcdFx0XCJwZXJzb24tdGV4dFwiOiBcIkNoZWNrIG91dCBteSBtb2xkZWQgUGVsb3Rhc1wiXG5cdFx0XHRcdH1cblx0XHRcdF1cblx0XHR9LHtcblx0XHRcdFwiaWRcIjogXCJhcmVsbHVmXCIsXG5cdFx0XHRcInBlcnNvblwiOiBcInBlbG90YXNcIixcblx0XHRcdFwidGltZVwiOiBcIjIgbWluIGFnb1wiLFxuXHRcdFx0XCJtZWRpYVwiOiB7XG5cdFx0XHRcdFwidHlwZVwiOiBcImltYWdlXCIsXG5cdFx0XHRcdFwiaWRcIjogXCJjaGFyYWN0ZXJcIlxuXHRcdFx0fSxcblx0XHRcdFwiY29tbWVudHNcIjogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0XCJwZXJzb24tbmFtZVwiOiBcInBlbG90YXNcIixcblx0XHRcdFx0XHRcInBlcnNvbi10ZXh0XCI6IFwiUmlkZXJzIG9mIE1hbGxvcmRhICNjYW1wZXJzaG9lc1wiXG5cdFx0XHRcdH1cblx0XHRcdF1cblx0XHR9LHtcblx0XHRcdFwiaWRcIjogXCJhcmVsbHVmXCIsXG5cdFx0XHRcInBlcnNvblwiOiBcInBlbG90YXNcIixcblx0XHRcdFwidGltZVwiOiBcIjIgbWluIGFnb1wiLFxuXHRcdFx0XCJtZWRpYVwiOiB7XG5cdFx0XHRcdFwidHlwZVwiOiBcInZpZGVvXCIsXG5cdFx0XHRcdFwiaWRcIjogXCJmdW4tZmFjdFwiXG5cdFx0XHR9LFxuXHRcdFx0XCJjb21tZW50c1wiOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRcInBlcnNvbi1uYW1lXCI6IFwicGVsb3Rhc1wiLFxuXHRcdFx0XHRcdFwicGVyc29uLXRleHRcIjogXCJXaGF0IGhhcHBlbnMgaW4gQXJlbGx1ZiBzdGF5cyBpbiAjQXJlbGx1ZlwiXG5cdFx0XHRcdH1cblx0XHRcdF1cblx0XHR9LHtcblx0XHRcdFwiaWRcIjogXCJhcmVsbHVmXCIsXG5cdFx0XHRcInBlcnNvblwiOiBcInBlbG90YXNcIixcblx0XHRcdFwidGltZVwiOiBcIjIgbWluIGFnb1wiLFxuXHRcdFx0XCJtZWRpYVwiOiB7XG5cdFx0XHRcdFwidHlwZVwiOiBcInZpZGVvXCIsXG5cdFx0XHRcdFwiaWRcIjogXCJjaGFyYWN0ZXJcIlxuXHRcdFx0fSxcblx0XHRcdFwiY29tbWVudHNcIjogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0XCJwZXJzb24tbmFtZVwiOiBcInBlbG90YXNcIixcblx0XHRcdFx0XHRcInBlcnNvbi10ZXh0XCI6IFwiTm8gbm9uc2Vuc2UgI3NlbGZpZSAjTWFsbG9yY2FCeUNhbXBlclwiXG5cdFx0XHRcdH1cblx0XHRcdF1cblx0XHR9LFxuXG5cdFx0e1xuXHRcdFx0XCJpZFwiOiBcImFyZWxsdWZcIixcblx0XHRcdFwicGVyc29uXCI6IFwibWFydGFcIixcblx0XHRcdFwidGltZVwiOiBcIjIgbWluIGFnb1wiLFxuXHRcdFx0XCJtZWRpYVwiOiB7XG5cdFx0XHRcdFwidHlwZVwiOiBcImltYWdlXCIsXG5cdFx0XHRcdFwiaWRcIjogXCJzaG9lXCJcblx0XHRcdH0sXG5cdFx0XHRcImNvbW1lbnRzXCI6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdFwicGVyc29uLW5hbWVcIjogXCJtYXJ0YVwiLFxuXHRcdFx0XHRcdFwicGVyc29uLXRleHRcIjogXCJUaGVzZSBuZXcgQ2FtcGVycyBhcmUgRGEgYm9tYlwiXG5cdFx0XHRcdH1cblx0XHRcdF1cblx0XHR9LHtcblx0XHRcdFwiaWRcIjogXCJhcmVsbHVmXCIsXG5cdFx0XHRcInBlcnNvblwiOiBcIm1hcnRhXCIsXG5cdFx0XHRcInRpbWVcIjogXCIyIG1pbiBhZ29cIixcblx0XHRcdFwibWVkaWFcIjoge1xuXHRcdFx0XHRcInR5cGVcIjogXCJpbWFnZVwiLFxuXHRcdFx0XHRcImlkXCI6IFwiY2hhcmFjdGVyXCJcblx0XHRcdH0sXG5cdFx0XHRcImNvbW1lbnRzXCI6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdFwicGVyc29uLW5hbWVcIjogXCJtYXJ0YVwiLFxuXHRcdFx0XHRcdFwicGVyc29uLXRleHRcIjogXCJJJ20gbm90IGdvaW5nIGluIHRoZSBwb29sIGxpa2UgdGhpcy5cIlxuXHRcdFx0XHR9XG5cdFx0XHRdXG5cdFx0fSx7XG5cdFx0XHRcImlkXCI6IFwiYXJlbGx1ZlwiLFxuXHRcdFx0XCJwZXJzb25cIjogXCJtYXJ0YVwiLFxuXHRcdFx0XCJ0aW1lXCI6IFwiMiBtaW4gYWdvXCIsXG5cdFx0XHRcIm1lZGlhXCI6IHtcblx0XHRcdFx0XCJ0eXBlXCI6IFwidmlkZW9cIixcblx0XHRcdFx0XCJpZFwiOiBcImZ1bi1mYWN0XCJcblx0XHRcdH0sXG5cdFx0XHRcImNvbW1lbnRzXCI6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdFwicGVyc29uLW5hbWVcIjogXCJtYXJ0YVwiLFxuXHRcdFx0XHRcdFwicGVyc29uLXRleHRcIjogXCJNZSBiZWluZyBtZeKApiBIZWhlIDopIDxzcGFuPiNjYW1wZXI8L3NwYW4+XCJcblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdH0se1xuXHRcdFx0XCJpZFwiOiBcImFyZWxsdWZcIixcblx0XHRcdFwicGVyc29uXCI6IFwibWFydGFcIixcblx0XHRcdFwidGltZVwiOiBcIjIgbWluIGFnb1wiLFxuXHRcdFx0XCJtZWRpYVwiOiB7XG5cdFx0XHRcdFwidHlwZVwiOiBcInZpZGVvXCIsXG5cdFx0XHRcdFwiaWRcIjogXCJjaGFyYWN0ZXJcIlxuXHRcdFx0fSxcblx0XHRcdFwiY29tbWVudHNcIjogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0XCJwZXJzb24tbmFtZVwiOiBcIm1hcnRhXCIsXG5cdFx0XHRcdFx0XCJwZXJzb24tdGV4dFwiOiBcIkFmdGVyIHBhcnR5LiBBZnRlciBsaWZlICNTZWxmaWVMaWZlICNNYWxsb3JjYUJ5Q2FtcGVyXCJcblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdH0sXG5cblx0XHR7XG5cdFx0XHRcImlkXCI6IFwiYXJlbGx1ZlwiLFxuXHRcdFx0XCJwZXJzb25cIjogXCJrb2JhcmFoXCIsXG5cdFx0XHRcInRpbWVcIjogXCIyIG1pbiBhZ29cIixcblx0XHRcdFwibWVkaWFcIjoge1xuXHRcdFx0XHRcInR5cGVcIjogXCJpbWFnZVwiLFxuXHRcdFx0XHRcImlkXCI6IFwic2hvZVwiXG5cdFx0XHR9LFxuXHRcdFx0XCJjb21tZW50c1wiOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRcInBlcnNvbi1uYW1lXCI6IFwia29iYXJhaFwiLFxuXHRcdFx0XHRcdFwicGVyc29uLXRleHRcIjogXCJJIGRhcmUgeW91XCJcblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdH0se1xuXHRcdFx0XCJpZFwiOiBcImFyZWxsdWZcIixcblx0XHRcdFwicGVyc29uXCI6IFwia29iYXJhaFwiLFxuXHRcdFx0XCJ0aW1lXCI6IFwiMiBtaW4gYWdvXCIsXG5cdFx0XHRcIm1lZGlhXCI6IHtcblx0XHRcdFx0XCJ0eXBlXCI6IFwiaW1hZ2VcIixcblx0XHRcdFx0XCJpZFwiOiBcImNoYXJhY3RlclwiXG5cdFx0XHR9LFxuXHRcdFx0XCJjb21tZW50c1wiOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRcInBlcnNvbi1uYW1lXCI6IFwia29iYXJhaFwiLFxuXHRcdFx0XHRcdFwicGVyc29uLXRleHRcIjogXCJXaXNoIHlvdSB3ZXJlIGhlcmUgI2FyZWxsdWZcIlxuXHRcdFx0XHR9XG5cdFx0XHRdXG5cdFx0fSx7XG5cdFx0XHRcImlkXCI6IFwiYXJlbGx1ZlwiLFxuXHRcdFx0XCJwZXJzb25cIjogXCJrb2JhcmFoXCIsXG5cdFx0XHRcInRpbWVcIjogXCIyIG1pbiBhZ29cIixcblx0XHRcdFwibWVkaWFcIjoge1xuXHRcdFx0XHRcInR5cGVcIjogXCJ2aWRlb1wiLFxuXHRcdFx0XHRcImlkXCI6IFwiZnVuLWZhY3RcIlxuXHRcdFx0fSxcblx0XHRcdFwiY29tbWVudHNcIjogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0XCJwZXJzb24tbmFtZVwiOiBcImtvYmFyYWhcIixcblx0XHRcdFx0XHRcInBlcnNvbi10ZXh0XCI6IFwiSGF0ZXJzIHdpbGwgc2F5IGl0J3MgUGhvdG9zaG9wXCJcblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdH0se1xuXHRcdFx0XCJpZFwiOiBcImFyZWxsdWZcIixcblx0XHRcdFwicGVyc29uXCI6IFwia29iYXJhaFwiLFxuXHRcdFx0XCJ0aW1lXCI6IFwiMiBtaW4gYWdvXCIsXG5cdFx0XHRcIm1lZGlhXCI6IHtcblx0XHRcdFx0XCJ0eXBlXCI6IFwidmlkZW9cIixcblx0XHRcdFx0XCJpZFwiOiBcImNoYXJhY3RlclwiXG5cdFx0XHR9LFxuXHRcdFx0XCJjb21tZW50c1wiOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRcInBlcnNvbi1uYW1lXCI6IFwia29iYXJhaFwiLFxuXHRcdFx0XHRcdFwicGVyc29uLXRleHRcIjogXCJDYWxsIG1lIFBhbmRlbW9uaWEgI01hbGxvcmNhQnlDYW1wZXJcIlxuXHRcdFx0XHR9XG5cdFx0XHRdXG5cdFx0fSxcblxuXHRcdHtcblx0XHRcdFwiaWRcIjogXCJhcmVsbHVmXCIsXG5cdFx0XHRcInBlcnNvblwiOiBcImR1YlwiLFxuXHRcdFx0XCJ0aW1lXCI6IFwiMiBtaW4gYWdvXCIsXG5cdFx0XHRcIm1lZGlhXCI6IHtcblx0XHRcdFx0XCJ0eXBlXCI6IFwiaW1hZ2VcIixcblx0XHRcdFx0XCJpZFwiOiBcInNob2VcIlxuXHRcdFx0fSxcblx0XHRcdFwiY29tbWVudHNcIjogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0XCJwZXJzb24tbmFtZVwiOiBcImR1YlwiLFxuXHRcdFx0XHRcdFwicGVyc29uLXRleHRcIjogXCJNeSBuZXcgQ2FtcGVycyBhcmUgdGhlIFNVViBvZiBzaG9lc1wiXG5cdFx0XHRcdH1cblx0XHRcdF1cblx0XHR9LHtcblx0XHRcdFwiaWRcIjogXCJhcmVsbHVmXCIsXG5cdFx0XHRcInBlcnNvblwiOiBcImR1YlwiLFxuXHRcdFx0XCJ0aW1lXCI6IFwiMiBtaW4gYWdvXCIsXG5cdFx0XHRcIm1lZGlhXCI6IHtcblx0XHRcdFx0XCJ0eXBlXCI6IFwiaW1hZ2VcIixcblx0XHRcdFx0XCJpZFwiOiBcImNoYXJhY3RlclwiXG5cdFx0XHR9LFxuXHRcdFx0XCJjb21tZW50c1wiOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRcInBlcnNvbi1uYW1lXCI6IFwiZHViXCIsXG5cdFx0XHRcdFx0XCJwZXJzb24tdGV4dFwiOiBcIkZyZWUgZGl2aW5nIGV4Y3Vyc2lvbnMgdGhpcyBhZnRlcm5vb24gYXQgI2FyZWxsdWYuIFBNIG1lIGlmIGludGVyZXN0ZWRcIlxuXHRcdFx0XHR9XG5cdFx0XHRdXG5cdFx0fSx7XG5cdFx0XHRcImlkXCI6IFwiYXJlbGx1ZlwiLFxuXHRcdFx0XCJwZXJzb25cIjogXCJkdWJcIixcblx0XHRcdFwidGltZVwiOiBcIjIgbWluIGFnb1wiLFxuXHRcdFx0XCJtZWRpYVwiOiB7XG5cdFx0XHRcdFwidHlwZVwiOiBcInZpZGVvXCIsXG5cdFx0XHRcdFwiaWRcIjogXCJmdW4tZmFjdFwiXG5cdFx0XHR9LFxuXHRcdFx0XCJjb21tZW50c1wiOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRcInBlcnNvbi1uYW1lXCI6IFwiZHViXCIsXG5cdFx0XHRcdFx0XCJwZXJzb24tdGV4dFwiOiBcIk1lIGJlaW5nIG1l4oCmIEhlaGUgOikgPHNwYW4+I2NhbXBlcjwvc3Bhbj5cIlxuXHRcdFx0XHR9XG5cdFx0XHRdXG5cdFx0fSx7XG5cdFx0XHRcImlkXCI6IFwiYXJlbGx1ZlwiLFxuXHRcdFx0XCJwZXJzb25cIjogXCJkdWJcIixcblx0XHRcdFwidGltZVwiOiBcIjIgbWluIGFnb1wiLFxuXHRcdFx0XCJtZWRpYVwiOiB7XG5cdFx0XHRcdFwidHlwZVwiOiBcInZpZGVvXCIsXG5cdFx0XHRcdFwiaWRcIjogXCJjaGFyYWN0ZXJcIlxuXHRcdFx0fSxcblx0XHRcdFwiY29tbWVudHNcIjogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0XCJwZXJzb24tbmFtZVwiOiBcImR1YlwiLFxuXHRcdFx0XHRcdFwicGVyc29uLXRleHRcIjogXCJQZWFjZSBZ4oCZYWxsICNNYWxsb3JjYUJ5Q2FtcGVyXCJcblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdH0sXG5cblx0XHR7XG5cdFx0XHRcImlkXCI6IFwiYXJlbGx1ZlwiLFxuXHRcdFx0XCJwZXJzb25cIjogXCJwYXJhZGlzZVwiLFxuXHRcdFx0XCJ0aW1lXCI6IFwiMiBtaW4gYWdvXCIsXG5cdFx0XHRcIm1lZGlhXCI6IHtcblx0XHRcdFx0XCJ0eXBlXCI6IFwiaW1hZ2VcIixcblx0XHRcdFx0XCJpZFwiOiBcInNob2VcIlxuXHRcdFx0fSxcblx0XHRcdFwiY29tbWVudHNcIjogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0XCJwZXJzb24tbmFtZVwiOiBcInBhcmFkaXNlXCIsXG5cdFx0XHRcdFx0XCJwZXJzb24tdGV4dFwiOiBcIkJvbGQgYW5kIEJlYXV0aWZ1bFwiXG5cdFx0XHRcdH1cblx0XHRcdF1cblx0XHR9LHtcblx0XHRcdFwiaWRcIjogXCJhcmVsbHVmXCIsXG5cdFx0XHRcInBlcnNvblwiOiBcInBhcmFkaXNlXCIsXG5cdFx0XHRcInRpbWVcIjogXCIyIG1pbiBhZ29cIixcblx0XHRcdFwibWVkaWFcIjoge1xuXHRcdFx0XHRcInR5cGVcIjogXCJpbWFnZVwiLFxuXHRcdFx0XHRcImlkXCI6IFwiY2hhcmFjdGVyXCJcblx0XHRcdH0sXG5cdFx0XHRcImNvbW1lbnRzXCI6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdFwicGVyc29uLW5hbWVcIjogXCJwYXJhZGlzZVwiLFxuXHRcdFx0XHRcdFwicGVyc29uLXRleHRcIjogXCJEZXRveCBieSB0aGUgcG9vbC4gTXVjaCBuZWVkZWQuXCJcblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdH0se1xuXHRcdFx0XCJpZFwiOiBcImFyZWxsdWZcIixcblx0XHRcdFwicGVyc29uXCI6IFwicGFyYWRpc2VcIixcblx0XHRcdFwidGltZVwiOiBcIjIgbWluIGFnb1wiLFxuXHRcdFx0XCJtZWRpYVwiOiB7XG5cdFx0XHRcdFwidHlwZVwiOiBcInZpZGVvXCIsXG5cdFx0XHRcdFwiaWRcIjogXCJmdW4tZmFjdFwiXG5cdFx0XHR9LFxuXHRcdFx0XCJjb21tZW50c1wiOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRcInBlcnNvbi1uYW1lXCI6IFwicGFyYWRpc2VcIixcblx0XHRcdFx0XHRcInBlcnNvbi10ZXh0XCI6IFwiU2VsZmllIG9uIHdhdGVyc2xpZGUgbGlrZSBhIGJvc3MgI1NlbGZpZVJpZGVcIlxuXHRcdFx0XHR9XG5cdFx0XHRdXG5cdFx0fSx7XG5cdFx0XHRcImlkXCI6IFwiYXJlbGx1ZlwiLFxuXHRcdFx0XCJwZXJzb25cIjogXCJwYXJhZGlzZVwiLFxuXHRcdFx0XCJ0aW1lXCI6IFwiMiBtaW4gYWdvXCIsXG5cdFx0XHRcIm1lZGlhXCI6IHtcblx0XHRcdFx0XCJ0eXBlXCI6IFwidmlkZW9cIixcblx0XHRcdFx0XCJpZFwiOiBcImNoYXJhY3RlclwiXG5cdFx0XHR9LFxuXHRcdFx0XCJjb21tZW50c1wiOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRcInBlcnNvbi1uYW1lXCI6IFwicGFyYWRpc2VcIixcblx0XHRcdFx0XHRcInBlcnNvbi10ZXh0XCI6IFwiSSBhbSBub3QgYSBiaW1iby5cIlxuXHRcdFx0XHR9XG5cdFx0XHRdXG5cdFx0fVxuXHRdLFxuXG5cdFwiZGVmYXVsdC1yb3V0ZVwiOiBcIlwiLFxuXG5cdFwicm91dGluZ1wiOiB7XG5cdFx0XCIvXCI6IHtcblx0XHRcdFwidGV4dHNcIjoge1xuXHRcdFx0XHRcImVuXCI6IHtcblx0XHRcdFx0XHRcImdlbmVyaWNcIjogXCJUaGUgU3ByaW5nL1N1bW1lciAyMDE2IGNvbGxlY3Rpb24gaXMgaW5zcGlyZWQgYnkgTWFsbG9yY2EsIHRoZSBNZWRpdGVycmFuZWFuIGlzbGFuZCB0aGF0IENhbXBlciBjYWxscyBob21lLiBPdXIgdmlzaW9uIG9mIHRoaXMgc3VubnkgcGFyYWRpc2UgaGlnaGxpZ2h0cyB0aHJlZSBob3Qgc3BvdHM6IERlaWEsIEVzIFRyZW5jLCBhbmQgQXJlbGx1Zi4gRm9yIHVzLCBNYWxsb3JjYSBpc27igJl0IGp1c3QgYSBkZXN0aW5hdGlvbiwgaXTigJlzIGEgc3RhdGUgb2YgbWluZC4gI01hbGxvcmNhQnlDYW1wZXJcIixcblx0XHRcdFx0XHRcImRlaWFcIjogXCJUaGUgdmlsbGFnZSBvZiBEZWlhIGhhcyBsb25nIGF0dHJhY3RlZCBib3RoIHJldGlyZWVzIGFuZCByb2NrIHN0YXJzIHdpdGggaXRzIHBpY3R1cmVzcXVlIHNjZW5lcnkgYW5kIGNoaWxsIHZpYmUuIFRoZSBzZWVtaW5nbHkgc2xlZXB5IGNvdW50cnlzaWRlIGhhcyBhIGJvaGVtaWFuIHNwaXJpdCB1bmlxdWUgdG8gdGhpcyBtb3VudGFpbiBlbmNsYXZlLiAjRGVpYUJ5Q2FtcGVyXCIsXG5cdFx0XHRcdFx0XCJhcmVsbHVmXCI6IFwiVGhlIGZpc3QtcHVtcGluZyByYWdlcnMgb2YgQXJlbmFsIGFuZCB1bmJyaWRsZWQgZGViYXVjaGVyeSBvZiBNYWdhbHVmIG1lZXQgaW4gQXJlbGx1ZiwgYW4gaW1hZ2luZWQgYnV0IGVwaWMgcGFydCBvZiBvdXIgdmlzaW9uIG9mIHRoaXMgYmVsb3ZlZCBpc2xhbmQuIEl04oCZcyBhbGwgbmVvbiBhbmQgbm9uLXN0b3AgcGFydHlpbmcgaW4gdGhlIHN1bW1lciBzdW4g4oCTIHF1aXRlIGxpdGVyYWxseSBhIGhvdCBtZXNzLiAjQXJlbGx1ZkJ5Q2FtcGVyXCIsXG5cdFx0XHRcdFx0XCJlcy10cmVuY1wiOiBcIlRoaXMgY29hc3RhbCB3aWxkZXJuZXNzIGJvYXN0cyBicmVhdGh0YWtpbmcgYmVhY2hlcyBhbmQgYSBzZXJlbmUgYXRtb3NwaGVyZS4gVGhlIHNlYXNpZGUgaGFzIGFuIHVudGFtZWQgeWV0IHBlYWNlZnVsIGZlZWxpbmcgdGhhdCBpcyBib3RoIGluc3BpcmluZyBhbmQgc29vdGhpbmcuICNFc1RyZW5jQnlDYW1wZXJcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHRcImZyXCI6IHtcblx0XHRcdFx0XHRcImdlbmVyaWNcIjogXCJMYSBjb2xsZWN0aW9uIFByaW50ZW1wcy/DiXTDqSAyMDE2IHPigJlpbnNwaXJlIGRlIE1ham9ycXVlLCBs4oCZw65sZSBtw6lkaXRlcnJhbsOpZW5uZSBkJ2/DuSBDYW1wZXIgZXN0IG9yaWdpbmFpcmUuIE5vdHJlIHZpc2lvbiBkZSBjZSBwYXJhZGlzIGVuc29sZWlsbMOpIHNlIHJlZmzDqHRlIGRhbnMgdHJvaXMgbGlldXggaW5jb250b3VybmFibGVzIDogRGVpYSwgRXMgVHJlbmMgZXQgQXJlbGx1Zi4gUG91ciBub3VzLCBNYWpvcnF1ZSBlc3QgcGx1cyBxdeKAmXVuZSBzaW1wbGUgZGVzdGluYXRpb24gOiBj4oCZZXN0IHVuIMOpdGF0IGTigJllc3ByaXQuICNNYWxsb3JjYUJ5Q2FtcGVyXCIsXG5cdFx0XHRcdFx0XCJkZWlhXCI6IFwiTGUgdmlsbGFnZSBkZSBEZWlhIGF0dGlyZSBkZXB1aXMgbG9uZ3RlbXBzIGxlcyByZXRyYWl0w6lzIGNvbW1lIGxlcyByb2NrIHN0YXJzIGdyw6JjZSDDoCBzZXMgcGF5c2FnZXMgcGl0dG9yZXNxdWVzIGV0IHNvbiBhbWJpYW5jZSBkw6ljb250cmFjdMOpZS4gU2EgY2FtcGFnbmUgZOKAmWFwcGFyZW5jZSB0cmFucXVpbGxlIGFmZmljaGUgdW4gZXNwcml0IGJvaMOobWUgY2FyYWN0w6lyaXN0aXF1ZSBkZSBjZXR0ZSBlbmNsYXZlIG1vbnRhZ25ldXNlLiAjRGVpYUJ5Q2FtcGVyXCIsXG5cdFx0XHRcdFx0XCJhcmVsbHVmXCI6IFwiTOKAmWV4YWx0YXRpb24gZOKAmUFyZW5hbCBldCBsZXMgc29pcsOpZXMgZMOpYnJpZMOpZXMgZGUgTWFnYWx1ZiBzZSByZWpvaWduZW50IMOgIEFyZWxsdWYsIHVuIGxpZXUgaW1hZ2luYWlyZSBtYWlzIGNlbnRyYWwgZGFucyBub3RyZSB2aXNpb24gZGUgY2V0dGUgw65sZSBhZG9yw6llLiBUb3V0IHkgZXN0IHF1ZXN0aW9uIGRlIGZsdW8gZXQgZGUgZsOqdGVzIHNhbnMgZmluIGF1IHNvbGVpbCBkZSBs4oCZw6l0w6kgOiB1biBqb3lldXggYmF6YXIsIGVuIHNvbW1lLiAjQXJlbGx1ZkJ5Q2FtcGVyXCIsXG5cdFx0XHRcdFx0XCJlcy10cmVuY1wiOiBcIkNldHRlIG5hdHVyZSBzYXV2YWdlIGPDtHRpw6hyZSBqb3VpdCBk4oCZdW5lIHN1cGVyYmUgcGxhZ2UgZXQgZOKAmXVuZSBhdG1vc3Bow6hyZSBjYWxtZS4gTGUgYm9yZCBkZSBtZXIgYSB1biBjw7R0w6kgw6AgbGEgZm9pcyB0cmFucXVpbGxlIGV0IGluZG9tcHTDqSBxdWkgaW5zcGlyZSBhdXRhbnQgcXXigJlpbCBhcGFpc2UuICNFc1RyZW5jQnlDYW1wZXJcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHRcImVzXCI6IHtcblx0XHRcdFx0XHRcImdlbmVyaWNcIjogXCJMYSBjb2xlY2Npw7NuIHByaW1hdmVyYS92ZXJhbm8gMjAxNiBlc3TDoSBpbnNwaXJhZGEgZW4gTWFsbG9yY2EsIGxhIGlzbGEgbWVkaXRlcnLDoW5lYSBxdWUgQ2FtcGVyIGNvbnNpZGVyYSBzdSBob2dhci4gTnVlc3RyYSB2aXNpw7NuIGRlIGVzdGUgcGFyYcOtc28gc29sZWFkbyBkZXN0YWNhIHRyZXMgbHVnYXJlcyBpbXBvcnRhbnRlczogRGVpYSwgRXMgVHJlbmMgeSBBcmVsbHVmLiBQYXJhIG5vc290cm9zLCBNYWxsb3JjYSBubyBlcyB0YW4gc29sbyB1biBkZXN0aW5vLCBlcyB1biBlc3RhZG8gZGUgw6FuaW1vLiAjTWFsbG9yY2FCeUNhbXBlclwiLFxuXHRcdFx0XHRcdFwiZGVpYVwiOiBcIkxvcyBob3Jpem9udGVzIHBpbnRvcmVzY29zIHkgbGEgdHJhbnF1aWxpZGFkIGRlbCBwdWVibG8gZGUgRGVpYSBsbGV2YW4gbXVjaG8gdGllbXBvIGNhdXRpdmFuZG8gdGFudG8gYSBhcnRpc3RhcyByZXRpcmFkb3MgY29tbyBhIGVzdHJlbGxhcyBkZWwgcm9jay4gRWwgcGFpc2FqZSBydXJhbCBkZSBhcGFyZW50ZSBjYWxtYSBwb3NlZSB1biBlc3DDrXJpdHUgYm9oZW1pbyBwcm9waW8gZGUgZXN0ZSBlbmNsYXZlIG1vbnRhw7Fvc28uICNEZWlhQnlDYW1wZXJcIixcblx0XHRcdFx0XHRcImFyZWxsdWZcIjogXCJMYSBsb2N1cmEgZmllc3RlcmEgZGUgU+KAmUFyZW5hbCB5IGVsIGRlc2VuZnJlbm8gZGUgTWFnYWx1ZiBzZSByZcO6bmVuIGVuIEFyZWxsdWYsIHVuYSBjcmVhY2nDs24gZGVudHJvIGRlIG51ZXN0cmEgdmlzacOzbiBkZSBlc3RhIHF1ZXJpZGEgaXNsYS4gVG9kbyBnaXJhIGVuIHRvcm5vIGFsIG5lw7NuIHkgbGEgZmllc3RhIHNpbiBmaW4gYmFqbyBlbCBzb2wuIEVuIGRlZmluaXRpdmEsIHVuYSBjb21iaW5hY2nDs24gZXhwbG9zaXZhLiAjQXJlbGx1ZkJ5Q2FtcGVyXCIsXG5cdFx0XHRcdFx0XCJlcy10cmVuY1wiOiBcIkVzdGUgZXNwYWNpbyBuYXR1cmFsIHZpcmdlbiBjdWVudGEgY29uIHVuYSBwbGF5YSBpbXByZXNpb25hbnRlIHkgdW4gYW1iaWVudGUgc2VyZW5vLiBMYSBjb3N0YSwgc2FsdmFqZSB5IHBhY8OtZmljYSBhbCBtaXNtbyB0aWVtcG8sIHRyYW5zbWl0ZSB1bmEgc2Vuc2FjacOzbiBldm9jYWRvcmEgeSByZWxhamFudGUuICNFc1RyZW5jQnlDYW1wZXJcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHRcIml0XCI6IHtcblx0XHRcdFx0XHRcImdlbmVyaWNcIjogXCJMYSBjb2xsZXppb25lIFByaW1hdmVyYS9Fc3RhdGUgMjAxNiDDqCBpc3BpcmF0YSBhIE1haW9yY2EsIGzigJlpc29sYSBkZWwgTWVkaXRlcnJhbmVvIGNoZSBoYSBkYXRvIGkgbmF0YWxpIGEgQ2FtcGVyLiBMYSBub3N0cmEgdmlzaW9uZSBkaSBxdWVzdG8gcGFyYWRpc28gYXNzb2xhdG8gc2kgc29mZmVybWEgc3UgdHJlIGx1b2doaSBzaW1ib2xvOiBEZWlhLCBFcyBUcmVuYyBlIEFyZWxsdWYuIFBlciBub2ksIE1haW9yY2Egbm9uIMOoIHVuYSBzZW1wbGljZSBtZXRhLCDDqCB1bm8gc3RhdG8gZCdhbmltby4gI01hbGxvcmNhQnlDYW1wZXJcIixcblx0XHRcdFx0XHRcImRlaWFcIjogXCJEYSB0ZW1wbywgaWwgdmlsbGFnZ2lvIGRpIERlaWEgYXR0aXJhIHBlbnNpb25hdGkgZSByb2NrIHN0YXIgY29uIGlsIHN1byBwYWVzYWdnaW8gcGl0dG9yZXNjbyBlIGwnYXRtb3NmZXJhIHJpbGFzc2F0YS4gTGEgY2FtcGFnbmEgYXBwYXJlbnRlbWVudGUgc29ubm9sZW50YSBoYSB1bm8gc3Bpcml0byBib2jDqW1pZW4gdGlwaWNvIGRpIHF1ZXN0byBwYWVzaW5vIGRpIG1vbnRhZ25hLiAjRGVpYUJ5Q2FtcGVyXCIsXG5cdFx0XHRcdFx0XCJhcmVsbHVmXCI6IFwiR2xpIHNjYXRlbmF0aSBmZXN0YWlvbGkgZGkgQXJlbmFsIGUgbGEgc2ZyZW5hdGEgZGlzc29sdXRlenphIGRpIE1hZ2FsdWYgc2kgZm9uZG9ubyBpbiBBcmVsbHVmLCB1bmEgcGFydGUgaW1tYWdpbmFyaWEgbWEgZXBpY2EgZGVsbGEgbm9zdHJhIHZpc2lvbmUgZGkgcXVlc3RhIGFkb3JhdGEgaXNvbGEuIMOIIHVuIHR1cmJpbmlvIGRpIGx1Y2kgYWwgbmVvbiBlIGZlc3RlIGluaW50ZXJyb3R0ZSBzb3R0byBpbCBzb2xlIGVzdGl2bywgdW4gY2FvcyBwYXp6ZXNjby4gI0FyZWxsdWZCeUNhbXBlclwiLFxuXHRcdFx0XHRcdFwiZXMtdHJlbmNcIjogXCJRdWVzdCdhcmVhIHByb3RldHRhIHZhbnRhIHVuYSBzcGlhZ2dpYSBtb3p6YWZpYXRvIGUgdW4nYXRtb3NmZXJhIHNlcmVuYS4gSWwgbGl0b3JhbGUgaGEgdW4gY2hlIGRpIHNlbHZhZ2dpbywgbWEgcGFjaWZpY28sIGNoZSDDqCBzdWdnZXN0aXZvIGUgcmlsYXNzYW50ZSBhbCB0ZW1wbyBzdGVzc28uICNFc1RyZW5jQnlDYW1wZXJcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHRcImRlXCI6IHtcblx0XHRcdFx0XHRcImdlbmVyaWNcIjogXCJEaWUgS29sbGVrdGlvbiBGcsO8aGphaHIvU29tbWVyIDIwMTYgaGF0IHNpY2ggdm9uIE1hbGxvcmNhIGluc3BpcmllcmVuIGxhc3NlbiwgZGVyIE1pdHRlbG1lZXJpbnNlbCwgYXVmIGRlciBDYW1wZXIgenUgSGF1c2UgaXN0LiBVbnNlcmUgVmlzaW9uIGRlcyBTb25uZW5wYXJhZGllc2VzIGJlZmFzc3Qgc2ljaCBtaXQgZHJlaSBIb3RzcG90czogRGVpYSwgRXMgVHJlbmMgdW5kIEFyZWxsdWYuIEbDvHIgdW5zIGlzdCBNYWxsb3JjYSBtZWhyIGFscyBudXIgZWluIFJlaXNlemllbCwgZXMgaXN0IGVpbmUgTGViZW5zZWluc3RlbGx1bmcuICNNYWxsb3JjYUJ5Q2FtcGVyXCIsXG5cdFx0XHRcdFx0XCJkZWlhXCI6IFwiRGVyIE9ydCBEZWlhIG1pdCBzZWluZXIgbWFsZXJpc2NoZW4gTGFuZHNjaGFmdCB1bmQgTMOkc3NpZ2tlaXQgemllaHQgc2VpdCB2aWVsZW4gSmFocmVuIG5pY2h0IG51ciBQZW5zaW9uw6RyZSwgc29uZGVybiBhdWNoIFJvY2tzdGFycyBhbi4gRGllIHZlcnNjaGxhZmVuIGFubXV0ZW5kZSBHZWdlbmQgdmVyc3Byw7xodCBlaW5lbiBnYW56IGJlc29uZGVyZW4gQm9oZW1pYW4tQ2hhcm1lLCBkZXIgZWluemlnYXJ0aWcgaXN0IGbDvHIgZGllc2UgR2ViaXJnc2Vua2xhdmUuICNEZWlhQnlDYW1wZXJcIixcblx0XHRcdFx0XHRcImFyZWxsdWZcIjogXCJEaWUgZ2VzdMOkaGx0ZW4gS8O2cnBlciB2b24gQXJlbmFsIHVuZCBkaWUgdW5nZXrDvGdlbHRlIE9mZmVuaGVpdCB2b24gTWFnYWx1ZiB0cmVmZmVuIGluIEFyZWxsdWYgYXVmZWluYW5kZXIg4oCTIGVpbiBmYW50YXNpZXZvbGxlcyB1bmQgZG9jaCB1bWZhc3NlbmRlcyBFbGVtZW50IHVuc2VyZXIgVmlzaW9uIGRlciBiZWxpZWJ0ZW4gSW5zZWwuIEVpbiBTb21tZXIgYXVzIGVuZGxvc2VuIFBhcnR5cyBpbiBOZW9uZmFyYmVuIOKAkyBlaW4gZWNodCBoZWnDn2VyIE9ydC4gI0FyZWxsdWZCeUNhbXBlclwiLFxuXHRcdFx0XHRcdFwiZXMtdHJlbmNcIjogXCJEaWVzZXIgdW5iZXLDvGhydGUgS8O8c3RlbnN0cmVpZmVuIHZlcmbDvGd0IMO8YmVyIGVpbmVuIGF0ZW1iZXJhdWJlbmRlbiBTdHJhbmQgdW5kIGVpbmUgYmVydWhpZ2VuZGUgQXRtb3NwaMOkcmUuIERhcyBNZWVyIGlzdCB1bmdlesOkaG10IHVuZCBmcmllZHZvbGwgenVnbGVpY2ggdW5kIGRpZW50IGFscyBRdWVsbGUgZGVyIEluc3BpcmF0aW9uIGViZW5zbyB3aWUgYWxzIFJ1aGVwb2wuICNFc1RyZW5jQnlDYW1wZXJcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHRcInB0XCI6IHtcblx0XHRcdFx0XHRcImdlbmVyaWNcIjogXCJBIGNvbGXDp8OjbyBwcmltYXZlcmEvdmVyw6NvIDIwMTYgdGVtIE1haW9yY2EgY29tbyBpbnNwaXJhw6fDo28sIGEgaWxoYSBtZWRpdGVycsOibmVhIHF1ZSBhIENhbXBlciBjaGFtYSBkZSBjYXNhLiBBIG5vc3NhIHZpc8OjbyBkZXN0ZSBwYXJhw61zbyBzb2xhcmVuZ28gcmVhbMOnYSB0csOqcyBsb2NhaXMgaW1wb3J0YW50ZXM6IERlaWEsIEVzIFRyZW5jIGUgQXJlbGx1Zi4gUGFyYSBuw7NzLCBNYWlvcmNhIG7Do28gw6kgc8OzIHVtIGRlc3Rpbm8gZGUgZsOpcmlhcywgbWFzIHRhbWLDqW0gdW0gZXN0YWRvIGRlIGVzcMOtcml0by4gI01hbGxvcmNhQnlDYW1wZXJcIixcblx0XHRcdFx0XHRcImRlaWFcIjogXCJBIGFsZGVpYSBkZSBEZWlhIHNlbXByZSBhdHJhaXUgcmVmb3JtYWRvcyBlIGVzdHJlbGFzIGRlIHJvY2sgZGV2aWRvIMOgIHN1YSBwYWlzYWdlbSBwaXRvcmVzY2EgZSBhbWJpZW50ZSBkZXNjb250cmHDrWRvLiBFc3RhIGFsZGVpYSBjYW1wZXN0cmUgYXBhcmVudGVtZW50ZSBwYWNhdGEgdGVtIHVtIGVzcMOtcml0byBib8OpbWlvLCBleGNsdXNpdm8gZGVzdGUgZW5jbGF2ZSBtb250YW5ob3NvLiAjRGVpYUJ5Q2FtcGVyXCIsXG5cdFx0XHRcdFx0XCJhcmVsbHVmXCI6IFwiQXMgZ3JhbmRlcyBmZXN0YXMgZGUgQXJlbmFsIGUgYSBkaXZlcnPDo28gc2VtIGxpbWl0ZXMgZGUgTWFnYWx1ZiByZcO6bmVtLXNlIGVtIEFyZWxsdWYsIHVtYSBwYXJ0ZSBpbWFnaW5hZGEgbWFzIMOpcGljYSBkYSBub3NzYSB2aXPDo28gZGVzdGEgaWxoYSB0w6NvIGFtYWRhIHBvciBuw7NzLiBBIGNvbWJpbmHDp8OjbyBwZXJmZWl0YSBlbnRyZSB0b25zIG7DqW9uIGUgZmVzdGFzIGltcGFyw6F2ZWlzIHNvYiBvIHNvbCBkZSB2ZXLDo28gKHVtYSBtaXN0dXJhIGJlbSBxdWVudGUsIG5hIHJlYWxpZGFkZSkuICNBcmVsbHVmQnlDYW1wZXJcIixcblx0XHRcdFx0XHRcImVzLXRyZW5jXCI6IFwiRXN0YSB2YXN0YSByZWdpw6NvIGNvc3RlaXJhIHBvc3N1aSBwcmFpYXMgaW1wcmVzc2lvbmFudGVzIGUgdW0gYW1iaWVudGUgc2VyZW5vLiBPIGxpdG9yYWwgdGVtIHVtYSBhdG1vc2ZlcmEgc2VsdmFnZW0gZSB0cmFucXVpbGEgYW8gbWVzbW8gdGVtcG8sIHF1ZSDDqSB0YW50byBpbnNwaXJhZG9yYSBjb21vIHJlbGF4YW50ZS4gI0VzVHJlbmNCeUNhbXBlclwiXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRcImFzc2V0c1wiOiBbXG5cdFx0XHRcdFwiYmFja2dyb3VuZC5qcGdcIixcblx0XHRcdFx0XCJkaXNwbGFjZW1lbnQuanBnXCIsXG5cdFx0XHRcdFwidmlkZW8tc2hvdHMvYXJlbGx1Zi1jYXBhcy5qcGdcIixcblx0XHRcdFx0XCJ2aWRlby1zaG90cy9hcmVsbHVmLWR1Yi5qcGdcIixcblx0XHRcdFx0XCJ2aWRlby1zaG90cy9hcmVsbHVmLWtvYmFyYWguanBnXCIsXG5cdFx0XHRcdFwidmlkZW8tc2hvdHMvYXJlbGx1Zi1wYXJhZGlzZS5qcGdcIixcblx0XHRcdFx0XCJ2aWRlby1zaG90cy9hcmVsbHVmLXBlbG90YXMuanBnXCIsXG5cdFx0XHRcdFwidmlkZW8tc2hvdHMvYXJlbGx1Zi1tYXJ0YS5qcGdcIixcblx0XHRcdFx0XCJ2aWRlby1zaG90cy9kZWlhLWR1Yi5qcGdcIixcblx0XHRcdFx0XCJ2aWRlby1zaG90cy9kZWlhLW1hcnRhLmpwZ1wiLFxuXHRcdFx0XHRcInZpZGVvLXNob3RzL2RlaWEtbWF0ZW8uanBnXCIsXG5cdFx0XHRcdFwidmlkZW8tc2hvdHMvZXMtdHJlbmMtYmVsdWdhLmpwZ1wiLFxuXHRcdFx0XHRcInZpZGVvLXNob3RzL2VzLXRyZW5jLWlzYW11LmpwZ1wiXG5cdFx0XHRdXG5cdFx0fSxcblxuICAgICAgICBcImRlaWEvZHViXCI6IHtcbiAgICAgICAgXHRcInNlbGZpZS1zdGljay12aWRlby11cmxcIjogXCJodHRwOi8vZW1iZWQud2lzdGlhLmNvbS9kZWxpdmVyaWVzLzEzYmJiNjExOTUxNjQ4NzNkODIzYTNiOTFhMmM4MmFjY2VmYjNlZGQvZGVpYS1kdWIubXA0XCIsXG4gICAgICAgIFx0XCJhbWJpZW50LWNvbG9yXCI6IHtcbiAgICAgICAgXHRcdFwiZnJvbVwiOiB7IFwiaFwiOiAxODgsIFwic1wiOiA4NSwgXCJ2XCI6IDYxIH0sXG4gICAgICAgIFx0XHRcInRvXCI6IHsgXCJoXCI6IDM1NywgXCJzXCI6IDk3LCBcInZcIjogMjYgfSxcbiAgICAgICAgXHRcdFwic2VsZmllLXN0aWNrXCI6IHsgXCJoXCI6IDM1OSwgXCJzXCI6IDkzLCBcInZcIjogNTEgfVxuICAgICAgICBcdH0sXG4gICAgICAgIFx0XCJmdW4tZmFjdC12aWRlby11cmxcIjogXCJodHRwOi8vZW1iZWQud2lzdGlhLmNvbS9kZWxpdmVyaWVzL2I3NDFlZWIxNzM3YTY4MmY1NjQ2Y2JhMTdlMDQwNjMwYTFkZDAxOGEvZGVpYS1kdWIubXA0XCIsXG4gICAgICAgIFx0XCJmYWN0XCI6IHtcbiAgICAgICAgXHRcdFwiZW5cIjogXCJCcmVha2luZyB1cCB2aWEgdGV4dCBtZXNzYWdlLiBub3QgYSB2ZXJ5IGRlaWEgdGhpbmcgdG8gZG9cIlxuICAgICAgICBcdH0sXG4gICAgICAgIFx0XCJzaG9wLXVybFwiOiBcImh0dHA6Ly93d3cuY2FtcGVyLmNvbS9pbnQvbWVuL3Nob2VzL2R1Yl9kZWlhX3NzMjAxNlwiLFxuICAgICAgICBcdFwid2lzdGlhLWNoYXJhY3Rlci1pZFwiOiBcImF6amMyamg2MmpcIixcbiAgICAgICAgXHRcIndpc3RpYS1mdW4taWRcIjogXCJsbmZ2YzNhZzUwXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJkZWlhL21hdGVvXCI6IHtcbiAgICAgICAgXHRcInNlbGZpZS1zdGljay12aWRlby11cmxcIjogXCJodHRwOi8vZW1iZWQud2lzdGlhLmNvbS9kZWxpdmVyaWVzL2U0MjQ4ODlhYzAyNmY3MGU1NDRhZjAzMDM1ZTcxODdmMzQ5NDE3MDUvZGVpYS1tYXRlby5tcDRcIixcbiAgICAgICAgXHRcImFtYmllbnQtY29sb3JcIjoge1xuICAgICAgICBcdFx0XCJmcm9tXCI6IHsgXCJoXCI6IDM3LCBcInNcIjogODksIFwidlwiOiA4MyB9LFxuICAgICAgICBcdFx0XCJ0b1wiOiB7IFwiaFwiOiA4LCBcInNcIjogODYsIFwidlwiOiA1NyB9LFxuICAgICAgICBcdFx0XCJzZWxmaWUtc3RpY2tcIjogeyBcImhcIjogOCwgXCJzXCI6IDg2LCBcInZcIjogNTcgfVxuICAgICAgICBcdH0sXG4gICAgICAgIFx0XCJmdW4tZmFjdC12aWRlby11cmxcIjogXCJodHRwOi8vZW1iZWQud2lzdGlhLmNvbS9kZWxpdmVyaWVzLzM0NGM3MTEyMzg5Nzc0OTBjMDczMDUwOWU3M2JhMTE3Zjk0NjQzMzgvZGVpYS1tYXRlby5tcDRcIixcbiAgICAgICAgXHRcImZhY3RcIjoge1xuICAgICAgICBcdFx0XCJlblwiOiBcImJ1eXMgYW4gYXRlbGllciBhdCBkZWlhLiBzdGFydHMgY2FyZWVyIGFzIGFuIGFydGlzdFwiXG4gICAgICAgIFx0fSxcbiAgICAgICAgXHRcInNob3AtdXJsXCI6IFwiaHR0cDovL3d3dy5jYW1wZXIuY29tL2ludC9tZW4vc2hvZXMvbWF0ZW9fZGVpYV9zczIwMTZcIixcbiAgICAgICAgXHRcIndpc3RpYS1jaGFyYWN0ZXItaWRcIjogXCI2aGV0MWtuaWszXCIsXG4gICAgICAgIFx0XCJ3aXN0aWEtZnVuLWlkXCI6IFwiNnAzMmx5dmRxb1wiXG4gICAgICAgIH0sXG5cbiAgICAgICAgXCJkZWlhL21hcnRhXCI6IHtcbiAgICAgICAgXHRcInNlbGZpZS1zdGljay12aWRlby11cmxcIjogXCJodHRwOi8vZW1iZWQud2lzdGlhLmNvbS9kZWxpdmVyaWVzLzRiYjZlNDg1YjcxN2JmN2RiZGQ1Yzk0MWZhZmEyYjE4ODRlOTA4MzgvZGVpYS1tYXJ0YS5tcDRcIixcbiAgICAgICAgXHRcImFtYmllbnQtY29sb3JcIjoge1xuICAgICAgICBcdFx0XCJmcm9tXCI6IHsgXCJoXCI6IDM0NiwgXCJzXCI6IDcwLCBcInZcIjogNTUgfSxcbiAgICAgICAgXHRcdFwidG9cIjogeyBcImhcIjogMjQ0LCBcInNcIjogMjksIFwidlwiOiA3MyB9LFxuICAgICAgICBcdFx0XCJzZWxmaWUtc3RpY2tcIjogeyBcImhcIjogMjQ0LCBcInNcIjogMjksIFwidlwiOiA3MyB9XG4gICAgICAgIFx0fSxcbiAgICAgICAgXHRcImZ1bi1mYWN0LXZpZGVvLXVybFwiOiBcImh0dHA6Ly9lbWJlZC53aXN0aWEuY29tL2RlbGl2ZXJpZXMvZDE1OWI1NWZmOGNlY2M5Y2JkOGMwYzEyZWUyNzgxZTJlZGEyM2U5My9kZWlhLW1hcnRhLm1wNFwiLFxuICAgICAgICBcdFwiZmFjdFwiOiB7XG4gICAgICAgIFx0XHRcImVuXCI6IFwiRk9NTyBvZiBub3QgYmVpbmcgYXQgZGVpYVwiXG4gICAgICAgIFx0fSxcbiAgICAgICAgXHRcInNob3AtdXJsXCI6IFwiaHR0cDovL3d3dy5jYW1wZXIuY29tL2ludC93b21lbi9zaG9lcy9tYXJ0YV9kZWlhX3NzMjAxNlwiLFxuICAgICAgICBcdFwid2lzdGlhLWNoYXJhY3Rlci1pZFwiOiBcInRvcm8ycGU0NjlcIixcbiAgICAgICAgXHRcIndpc3RpYS1mdW4taWRcIjogXCJiZ2t4N2dtazEzXCJcbiAgICAgICAgfSxcblxuICAgICAgICBcImVzLXRyZW5jL2JlbHVnYVwiOiB7XG4gICAgICAgIFx0XCJzZWxmaWUtc3RpY2stdmlkZW8tdXJsXCI6IFwiaHR0cDovL2VtYmVkLndpc3RpYS5jb20vZGVsaXZlcmllcy8yMzQ0NGQzYzg2OTNlNTlmODA3OWY4MjdkZDE4MmM1ZTMzNDEzODc3L2VzLXRyZW5jLWJlbHVnYS5tcDRcIixcbiAgICAgICAgXHRcImFtYmllbnQtY29sb3JcIjoge1xuICAgICAgICBcdFx0XCJmcm9tXCI6IHsgXCJoXCI6IDIxMiwgXCJzXCI6IDEwLCBcInZcIjogNjkgfSxcbiAgICAgICAgXHRcdFwidG9cIjogeyBcImhcIjogMTkzLCBcInNcIjogMTIsIFwidlwiOiA0NSB9LFxuICAgICAgICBcdFx0XCJzZWxmaWUtc3RpY2tcIjogeyBcImhcIjogMTkzLCBcInNcIjogMCwgXCJ2XCI6IDQ1IH1cbiAgICAgICAgXHR9LFxuICAgICAgICBcdFwiZnVuLWZhY3QtdmlkZW8tdXJsXCI6IFwiaHR0cDovL2VtYmVkLndpc3RpYS5jb20vZGVsaXZlcmllcy83MDQ1NWFkNzNhZjdiN2UzNWU5ZTY3NDEwOTkyOWMzYjcwMjk0MDY0L2VzLXRyZW5jLWJlbHVnYS5tcDRcIixcbiAgICAgICAgXHRcImZhY3RcIjoge1xuICAgICAgICBcdFx0XCJlblwiOiBcIkVzIFRyZW5jIG51ZGlzdCBQQVJUWSBCT1lcIlxuICAgICAgICBcdH0sXG4gICAgICAgIFx0XCJzaG9wLXVybFwiOiBcImh0dHA6Ly93d3cuY2FtcGVyLmNvbS9pbnQvbWVuL3Nob2VzL2JlbHVnYV9lc190cmVuY19zczIwMTZcIixcbiAgICAgICAgXHRcIndpc3RpYS1jaGFyYWN0ZXItaWRcIjogXCJmbzExMnpoN3B2XCIsXG4gICAgICAgIFx0XCJ3aXN0aWEtZnVuLWlkXCI6IFwiOTdidnB6aHRuYlwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiZXMtdHJlbmMvaXNhbXVcIjoge1xuICAgICAgICBcdFwic2VsZmllLXN0aWNrLXZpZGVvLXVybFwiOiBcImh0dHA6Ly9lbWJlZC53aXN0aWEuY29tL2RlbGl2ZXJpZXMvNmVhZmFlN2YxYjNiYzQxZDg1Njk3MzU1N2EyZjUxNTk4YzgyNDFhNi9lcy10cmVuYy1pc2FtdS5tcDRcIixcbiAgICAgICAgXHRcImFtYmllbnQtY29sb3JcIjoge1xuICAgICAgICBcdFx0XCJmcm9tXCI6IHsgXCJoXCI6IDIxMCwgXCJzXCI6IDEsIFwidlwiOiA3NCB9LFxuICAgICAgICBcdFx0XCJ0b1wiOiB7IFwiaFwiOiAyMSwgXCJzXCI6IDM1LCBcInZcIjogNzIgfSxcbiAgICAgICAgXHRcdFwic2VsZmllLXN0aWNrXCI6IHsgXCJoXCI6IDIwLCBcInNcIjogNDUsIFwidlwiOiAzMCB9XG4gICAgICAgIFx0fSxcbiAgICAgICAgXHRcImZ1bi1mYWN0LXZpZGVvLXVybFwiOiBcImh0dHA6Ly9lbWJlZC53aXN0aWEuY29tL2RlbGl2ZXJpZXMvMDY2NzlmM2ViZDY5NmU5YzQyZmQxM2NmOWRiZGFlZmZlOWIxZjg3My9lcy10cmVuYy1pc2FtdS5tcDRcIixcbiAgICAgICAgXHRcImZhY3RcIjoge1xuICAgICAgICBcdFx0XCJlblwiOiBcIlVGTyBzaWdodGluZyBhdCBlcyB0cmVuY1wiXG4gICAgICAgIFx0fSxcbiAgICAgICAgXHRcInNob3AtdXJsXCI6IFwiaHR0cDovL3d3dy5jYW1wZXIuY29tL2ludC93b21lbi9zaG9lcy9pc2FtdV9lc190cmVuY19zczIwMTZcIixcbiAgICAgICAgXHRcIndpc3RpYS1jaGFyYWN0ZXItaWRcIjogXCIxeHNhYnE3eWV5XCIsXG4gICAgICAgIFx0XCJ3aXN0aWEtZnVuLWlkXCI6IFwieG5sbnllZTgzb1wiXG4gICAgICAgIH0sXG5cblx0XHRcImFyZWxsdWYvY2FwYXNcIjoge1xuXHRcdFx0XCJzZWxmaWUtc3RpY2stdmlkZW8tdXJsXCI6IFwiaHR0cDovL2VtYmVkLndpc3RpYS5jb20vZGVsaXZlcmllcy84NDBhM2Y2NzI5YjFmNTJmNDQ2YWFlNmRhZWM5MzlhM2VjYTRjMGMxL2FyZWxsdWYtY2FwYXMubXA0XCIsXG4gICAgICAgIFx0XCJhbWJpZW50LWNvbG9yXCI6IHtcbiAgICAgICAgXHRcdFwiZnJvbVwiOiB7IFwiaFwiOiAwLCBcInNcIjogMCwgXCJ2XCI6IDAgfSxcbiAgICAgICAgXHRcdFwidG9cIjogeyBcImhcIjogOCwgXCJzXCI6IDc2LCBcInZcIjogOTEgfSxcbiAgICAgICAgXHRcdFwic2VsZmllLXN0aWNrXCI6IHsgXCJoXCI6IDgsIFwic1wiOiA3NiwgXCJ2XCI6IDkxIH1cbiAgICAgICAgXHR9LFxuICAgICAgICBcdFwiZnVuLWZhY3QtdmlkZW8tdXJsXCI6IFwiaHR0cDovL2VtYmVkLndpc3RpYS5jb20vZGVsaXZlcmllcy80OGZmMWM1OGI4NmIwODkxMjY4MWI0ZmRmM2I3NTQ3Yzc1Nzc2NmQ3L2FyZWxsdWYtY2FwYXMubXA0XCIsXG4gICAgICAgIFx0XCJmYWN0XCI6IHtcbiAgICAgICAgXHRcdFwiZW5cIjogXCJNRUFOV0hJTEUgSU4gQVJFTExVRlwiXG4gICAgICAgIFx0fSxcbiAgICAgICAgXHRcInNob3AtdXJsXCI6IFwiaHR0cDovL3d3dy5jYW1wZXIuY29tL2ludC9tZW4vc2hvZXMvY2FwYXNfYXJlbGx1Zl9zczIwMTZcIixcbiAgICAgICAgXHRcIndpc3RpYS1jaGFyYWN0ZXItaWRcIjogXCJ6N29yNjhkYTF2XCIsXG4gICAgICAgIFx0XCJ3aXN0aWEtZnVuLWlkXCI6IFwia2ZjMHUxdnZocFwiXG5cdFx0fSxcbiAgICAgICAgXCJhcmVsbHVmL3BlbG90YXNcIjoge1xuICAgICAgICBcdFwic2VsZmllLXN0aWNrLXZpZGVvLXVybFwiOiBcImh0dHA6Ly9lbWJlZC53aXN0aWEuY29tL2RlbGl2ZXJpZXMvM2RjZmQ3MGM3MDcyNjkyZWEzYTczOWFlZjUzNzZiMDI2YjA0YjY3NS9hcmVsbHVmLXBlbG90YXMubXA0XCIsXG4gICAgICAgIFx0XCJhbWJpZW50LWNvbG9yXCI6IHtcbiAgICAgICAgXHRcdFwiZnJvbVwiOiB7IFwiaFwiOiAyMTEsIFwic1wiOiA5NSwgXCJ2XCI6IDI5IH0sXG4gICAgICAgIFx0XHRcInRvXCI6IHsgXCJoXCI6IDIyLCBcInNcIjogMzUsIFwidlwiOiA3OSB9LFxuICAgICAgICBcdFx0XCJzZWxmaWUtc3RpY2tcIjogeyBcImhcIjogMjMzLCBcInNcIjogMzUsIFwidlwiOiAxMCB9XG4gICAgICAgIFx0fSxcbiAgICAgICAgXHRcImZ1bi1mYWN0LXZpZGVvLXVybFwiOiBcImh0dHA6Ly9lbWJlZC53aXN0aWEuY29tL2RlbGl2ZXJpZXMvYWMxNmQ1M2M0ZjllOGZkNjkzMDc3OWUyMzc4NTQ2ODdkY2YyNDFlOC9hcmVsbHVmLXBlbG90YXMubXA0XCIsXG4gICAgICAgIFx0XCJmYWN0XCI6IHtcbiAgICAgICAgXHRcdFwiZW5cIjogXCJXSEFUIEhBUFBFTlMgSU4gQVJFTExVRiBTVEFZUyBJTiBBUkVMTFVGXCJcbiAgICAgICAgXHR9LFxuICAgICAgICBcdFwic2hvcC11cmxcIjogXCJodHRwOi8vd3d3LmNhbXBlci5jb20vaW50L21lbi9zaG9lcy9wZWxvdGFzX2FyZWxsdWZfc3MyMDE2XCIsXG4gICAgICAgIFx0XCJ3aXN0aWEtY2hhcmFjdGVyLWlkXCI6IFwiZjlkbzJxbHdualwiLFxuICAgICAgICBcdFwid2lzdGlhLWZ1bi1pZFwiOiBcImt5amtid2NuNnZcIlxuICAgICAgICB9LFxuICAgICAgICBcImFyZWxsdWYvbWFydGFcIjoge1xuICAgICAgICBcdFwic2VsZmllLXN0aWNrLXZpZGVvLXVybFwiOiBcImh0dHA6Ly9lbWJlZC53aXN0aWEuY29tL2RlbGl2ZXJpZXMvOWI5NDcxZGNiZTFmOTRmZjdiMzUwODg0MWY2OGZmMTViZTE5MmVlNC9hcmVsbHVmLW1hcnRhLm1wNFwiLFxuICAgICAgICBcdFwiYW1iaWVudC1jb2xvclwiOiB7XG4gICAgICAgIFx0XHRcImZyb21cIjogeyBcImhcIjogMjAwLCBcInNcIjogNTcsIFwidlwiOiA4MSB9LFxuICAgICAgICBcdFx0XCJ0b1wiOiB7IFwiaFwiOiAyMDEsIFwic1wiOiAxMDAsIFwidlwiOiA2OSB9LFxuICAgICAgICBcdFx0XCJzZWxmaWUtc3RpY2tcIjogeyBcImhcIjogMjAxLCBcInNcIjogMTAwLCBcInZcIjogNjkgfVxuICAgICAgICBcdH0sXG4gICAgICAgIFx0XCJmdW4tZmFjdC12aWRlby11cmxcIjogXCJodHRwOi8vZW1iZWQud2lzdGlhLmNvbS9kZWxpdmVyaWVzLzViOWQyNzA2MTAwZTVlYTBkMzE3MTQzZTIzNzRkNmJkNmM5NjA3YjEvYXJlbGx1Zi1tYXJ0YS5tcDRcIixcbiAgICAgICAgXHRcImZhY3RcIjoge1xuICAgICAgICBcdFx0XCJlblwiOiBcIkJBRCBUUklQIEFUIFRIRSBIT1RFTCBQT09MXCJcbiAgICAgICAgXHR9LFxuICAgICAgICBcdFwic2hvcC11cmxcIjogXCJodHRwOi8vd3d3LmNhbXBlci5jb20vaW50L3dvbWVuL3Nob2VzL21hcnRhX2FyZWxsdWZfc3MyMDE2XCIsXG4gICAgICAgIFx0XCJ3aXN0aWEtY2hhcmFjdGVyLWlkXCI6IFwicHBrbWZkbDVqcVwiLFxuICAgICAgICBcdFwid2lzdGlhLWZ1bi1pZFwiOiBcInI2NGlqMm9qaDNcIlxuICAgICAgICB9LFxuICAgICAgICBcImFyZWxsdWYva29iYXJhaFwiOiB7XG4gICAgICAgIFx0XCJzZWxmaWUtc3RpY2stdmlkZW8tdXJsXCI6IFwiaHR0cDovL2VtYmVkLndpc3RpYS5jb20vZGVsaXZlcmllcy8yOTgwZjE0Y2M4YmQ5OTEyYjE0ZGNhNDZhNGNkNGE4NWZhMDQ3NzRjL2FyZWxsdWYta29iYXJhaC5tcDRcIixcbiAgICAgICAgXHRcImFtYmllbnQtY29sb3JcIjoge1xuICAgICAgICBcdFx0XCJmcm9tXCI6IHsgXCJoXCI6IDI2NCwgXCJzXCI6IDY5LCBcInZcIjogNDEgfSxcbiAgICAgICAgXHRcdFwidG9cIjogeyBcImhcIjogMzQ0LCBcInNcIjogNTYsIFwidlwiOiAxMDAgfSxcbiAgICAgICAgXHRcdFwic2VsZmllLXN0aWNrXCI6IHsgXCJoXCI6IDM0NCwgXCJzXCI6IDQxLCBcInZcIjogMTAwIH1cbiAgICAgICAgXHR9LFxuICAgICAgICBcdFwiZnVuLWZhY3QtdmlkZW8tdXJsXCI6IFwiaHR0cDovL2VtYmVkLndpc3RpYS5jb20vZGVsaXZlcmllcy82MmU1NGVhYzFkODk4OWFiOWRlMjM4ZmEzZjdjNmQ4ZGI0ZDlkZThkL2FyZWxsdWYta29iYXJhaC5tcDRcIixcbiAgICAgICAgXHRcImZhY3RcIjoge1xuICAgICAgICBcdFx0XCJlblwiOiBcIkhhdGVycyB3aWxsIHNheSBpdCdzIFBob3Rvc2hvcFwiXG4gICAgICAgIFx0fSxcbiAgICAgICAgXHRcInNob3AtdXJsXCI6IFwiaHR0cDovL3d3dy5jYW1wZXIuY29tL2ludC93b21lbi9zaG9lcy9rb2JhcmFoX2FyZWxsdWZfc3MyMDE2XCIsXG4gICAgICAgIFx0XCJ3aXN0aWEtY2hhcmFjdGVyLWlkXCI6IFwiOXhlNXZqenlib1wiLFxuICAgICAgICBcdFwid2lzdGlhLWZ1bi1pZFwiOiBcIm83OWRxcGhwc2xcIlxuICAgICAgICB9LFxuXHRcdFwiYXJlbGx1Zi9kdWJcIjoge1xuXHRcdFx0XCJzZWxmaWUtc3RpY2stdmlkZW8tdXJsXCI6IFwiaHR0cDovL2VtYmVkLndpc3RpYS5jb20vZGVsaXZlcmllcy8yMmIzNjBjOGNhMzk5Njk2OTg1MzEzZGRlOTliYTgzZDRlYzk3MmI3L2FyZWxsdWYtZHViLm1wNFwiLFxuICAgICAgICBcdFwiYW1iaWVudC1jb2xvclwiOiB7XG4gICAgICAgIFx0XHRcImZyb21cIjogeyBcImhcIjogMTk2LCBcInNcIjogNTIsIFwidlwiOiAzMyB9LFxuICAgICAgICBcdFx0XCJ0b1wiOiB7IFwiaFwiOiAxNSwgXCJzXCI6IDg0LCBcInZcIjogMTAwIH0sXG4gICAgICAgIFx0XHRcInNlbGZpZS1zdGlja1wiOiB7IFwiaFwiOiAxNSwgXCJzXCI6IDg0LCBcInZcIjogMTAwIH1cbiAgICAgICAgXHR9LFxuICAgICAgICBcdFwiZnVuLWZhY3QtdmlkZW8tdXJsXCI6IFwiaHR0cDovL2VtYmVkLndpc3RpYS5jb20vZGVsaXZlcmllcy85ODdiZGFiMDEyOTc5ODIyYjgxODYzNzgzN2NjMjg4NDE0Y2VmOGYzL2FyZWxsdWYtZHViLm1wNFwiLFxuICAgICAgICBcdFwiZmFjdFwiOiB7XG4gICAgICAgIFx0XHRcImVuXCI6IFwiV0hFTiBZT1UgQ0FOJ1QgS0VFUCBUSEUgQVJST1cgT04gVEhFIENFTlRFUiBMSU5FXCJcbiAgICAgICAgXHR9LFxuICAgICAgICBcdFwic2hvcC11cmxcIjogXCJodHRwOi8vd3d3LmNhbXBlci5jb20vaW50L21lbi9zaG9lcy9kdWJfYXJlbGx1Zl9zczIwMTZcIixcbiAgICAgICAgXHRcIndpc3RpYS1jaGFyYWN0ZXItaWRcIjogXCJkbGc1YXp5NWFyXCIsXG4gICAgICAgIFx0XCJ3aXN0aWEtZnVuLWlkXCI6IFwicXBoajlwM3Q1aFwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiYXJlbGx1Zi9wYXJhZGlzZVwiOiB7XG4gICAgICAgIFx0XCJzZWxmaWUtc3RpY2stdmlkZW8tdXJsXCI6IFwiaHR0cDovL2VtYmVkLndpc3RpYS5jb20vZGVsaXZlcmllcy9hODE5YzM3M2Y5Nzc3ODUyZjM5NjdjZTAyM2JjZmIwZDkxMTUzODZmL2FyZWxsdWYtcGFyYWRpc2UubXA0XCIsXG4gICAgICAgIFx0XCJhbWJpZW50LWNvbG9yXCI6IHtcbiAgICAgICAgXHRcdFwiZnJvbVwiOiB7IFwiaFwiOiA1OSwgXCJzXCI6IDE5LCBcInZcIjogOTkgfSxcbiAgICAgICAgXHRcdFwidG9cIjogeyBcImhcIjogMjA3LCBcInNcIjogMzEsIFwidlwiOiAxMDAgfSxcbiAgICAgICAgXHRcdFwic2VsZmllLXN0aWNrXCI6IHsgXCJoXCI6IDE4MywgXCJzXCI6IDcxLCBcInZcIjogNjQgfVxuICAgICAgICBcdH0sXG4gICAgICAgIFx0XCJmdW4tZmFjdC12aWRlby11cmxcIjogXCJodHRwOi8vZW1iZWQud2lzdGlhLmNvbS9kZWxpdmVyaWVzLzVkYzE5NzI2ZWZhN2IyZTc1NmM4MDUzNGQ0M2ZhNjAwY2M2MWYxNzgvYXJlbGx1Zi1wYXJhZGlzZS5tcDRcIixcbiAgICAgICAgXHRcImZhY3RcIjoge1xuICAgICAgICBcdFx0XCJlblwiOiBcIlNFTEZJRSBPTiBXQVRFUlNMSURFIExJS0UgQSBCT1NTXCJcbiAgICAgICAgXHR9LFxuICAgICAgICBcdFwic2hvcC11cmxcIjogXCJodHRwOi8vd3d3LmNhbXBlci5jb20vaW50L3dvbWVuL3Nob2VzL3BhcmFkaXNlX2FyZWxsdWZfc3MyMDE2XCIsXG4gICAgICAgIFx0XCJ3aXN0aWEtY2hhcmFjdGVyLWlkXCI6IFwiaDg5eTBrdXd5MlwiLFxuICAgICAgICBcdFwid2lzdGlhLWZ1bi1pZFwiOiBcIjM0M3Qxc24ybnBcIlxuICAgICAgICB9XG5cblx0fVxufSJdfQ==
