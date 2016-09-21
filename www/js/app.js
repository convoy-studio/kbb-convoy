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

var _Messages = require('./components/Messages');

var _Messages2 = _interopRequireDefault(_Messages);

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
				el: _domHand2['default'].select('#mouse-dot', document),
				x: -200,
				y: -200
			};

			this.scene = new THREE.Scene();

			this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
			this.camera.position.z = 900;

			this.renderer = new THREE.WebGLRenderer({
				antialias: true
			});
			this.renderer.setSize(window.innerWidth, window.innerHeight);
			_domHand2['default'].tree.add(this.element, this.renderer.domElement);

			this.raycaster = new THREE.Raycaster();
			this.mouse = new THREE.Vector2(500, 500);
			this.intersection = undefined;
			this.intersectionCounter = 0;

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
					var x = window.innerWidth * 0.45 + hand.palmPosition[0];
					var y = window.innerHeight * 0.9 - hand.palmPosition[1];
					_this.updateMousePosition(x, y);
				}
			});

			this.messages = (0, _Messages2['default'])(_domHand2['default'].select('#messages', document));

			this.animate();
			_get(Object.getPrototypeOf(AppTemplate.prototype), 'componentDidMount', this).call(this);
		}
	}, {
		key: 'updateMousePosition',
		value: function updateMousePosition(x, y) {
			var size = 50;
			this.mouse.x = x / window.innerWidth * 2 - 1;
			this.mouse.y = -(y / window.innerHeight) * 2 + 1;
			var newX = x - (size >> 1);
			var newY = y - (size >> 1);
			this.dot.x += (newX - this.dot.x) * 0.6;
			this.dot.y += (newY - this.dot.y) * 0.6;
			_Utils2['default'].Translate(this.dot.el, this.dot.x, this.dot.y, 1);
		}
	}, {
		key: 'mouseMove',
		value: function mouseMove(e) {
			e.preventDefault();
			this.updateMousePosition(e.clientX, e.clientY);
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

			if (this.intersection) this.intersectionCounter++;
			if (this.intersectionCounter > 350) {
				this.messages.showMsg();
				this.intersectionCounter = 0;
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
			this.messages.resize();

			_get(Object.getPrototypeOf(AppTemplate.prototype), 'resize', this).call(this);
		}
	}]);

	return AppTemplate;
})(_BaseComponent3['default']);

exports['default'] = AppTemplate;
module.exports = exports['default'];

},{"./../pager/components/BaseComponent":"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/pager/components/BaseComponent.js","./actions/AppActions":"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/actions/AppActions.js","./components/GUI":"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/components/GUI.js","./components/Materials":"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/components/Materials.js","./components/MeatParticles":"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/components/MeatParticles.js","./components/Messages":"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/components/Messages.js","./constants/AppConstants":"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/constants/AppConstants.js","./stores/AppStore":"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/stores/AppStore.js","./utils/Utils":"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/utils/Utils.js","dom-hand":"dom-hand"}],"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/actions/AppActions.js":[function(require,module,exports){
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

exports["default"] = function (parent, texture, geometry, animator, scale) {
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
	mesh.scale.set(scale, scale, scale);
	parent.add(mesh);

	scope = {
		scale: scale,
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
	var counter = 0;
	var force = _Utils2['default'].Rand(-.1, .1, 3);
	var animState = DOWN;
	var container = new THREE.Object3D();
	var animContainer = new THREE.Object3D();
	var particleIndex = 0;
	container.add(meatMesh);
	container.add(animContainer);
	meatMesh.material = material;
	container.position.x = 0;
	container.velocity = new THREE.Vector3(0, 0, 0);
	container.offset = new THREE.Vector3(0, 0, 0);
	container.offsetUp = new THREE.Vector3(0, 0, 0);
	container.dir = Math.random() * 1 > 0.45 ? 1 : -1;
	container.opacity = 0;

	var animator = undefined;
	var geometry = new THREE.PlaneGeometry(100, 100, 1, 1);
	var animatedParticles = [];
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = animTextures[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var animTex = _step.value;

			var p = (0, _AnimatedParticle2['default'])(animContainer, animTex.tex, geometry, animator, animTex.scale);
			p.mesh.scale.set(0, 0, 0);
			animatedParticles.push(p);
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

	var animatedParticle = animatedParticles[particleIndex];
	setInterval(function () {
		particleIndex++;
		if (particleIndex > animatedParticles.length - 1) particleIndex = 0;
		TweenMax.to(animatedParticle.mesh.scale, 0.5, { x: 0, y: 0, z: 0, ease: Expo.easeOut });
		setTimeout(function () {
			animatedParticle = animatedParticles[particleIndex];
		}, 0.6);
	}, 14000);

	var resetMesh = function resetMesh() {
		var scale = _Utils2['default'].Rand(0.001, 0.004, 4);
		container.scale.set(scale, scale, scale);
		container.velocity.y = _Utils2['default'].Rand(10, 20, 3);
		container.offset.x = Math.radians(_Utils2['default'].Rand(-50, 50, 0));
		container.offsetUp.x = _Utils2['default'].Rand(10, 200, 0);
		container.rotation.x = Math.radians(_Utils2['default'].Rand(-180, 180, 0));
		container.rotation.y = Math.radians(_Utils2['default'].Rand(-180, 180, 0));
		container.rotation.z = Math.radians(_Utils2['default'].Rand(-180, 180, 0));
		container.opacity = 1;
		meatMesh.scale.set(1, 1, 1);
		meatMesh.material.opacity = container.opacity;
		animatedParticle.mesh.scale.set(animatedParticle.scale, animatedParticle.scale, animatedParticle.scale);
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
			counter += force;
			intersection = inter;

			if (animState === DOWN) {
				container.position.y -= container.velocity.y * 0.5;
				container.rotation.x += 0.002;
				container.rotation.y += 0.003;
				container.rotation.z += 0.005;
				container.position.x += container.offset.x;
				animatedParticle.mesh.material.opacity = 0;
				if (container.position.y < -600) {
					animState = UP;
				}
			} else if (animState === UP) {
				container.position.y += container.velocity.y * 0.2;
				container.position.x = Math.sin(counter) * container.offsetUp.x;
				container.position.z = Math.cos(counter) * container.offsetUp.x;
				if (container.position.y > 50) container.opacity += (0.001 - container.opacity) * 0.5;
				container.rotation.x = 0;
				container.rotation.y = 0;
				container.rotation.z = 0;
				meatMesh.material.opacity = 0;
				meatMesh.scale.set(0, 0, 0);

				animatedParticle.mesh.material.opacity = container.opacity;
				if (container.opacity < 0.01) {
					scope.reset();
					animState = DOWN;
				}
			}
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

	var MEAT_PARTICLES_NUM = 100;
	var meatTexture = _Utils2['default'].LoadTexture("Shawarma-diff.jpg");
	var meatDiffuseColor = new THREE.Color(0xffffff);
	var meatMetalness = 0.5;
	var meatRoughness = 1.0;

	var animTextures = [{
		tex: new THREE.ImageUtils.loadTexture('image/textures/favorite-icon.png'),
		horizontal: 4,
		vertical: 1,
		total: 4,
		duration: 150,
		scale: 100
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

},{"./../utils/Utils":"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/utils/Utils.js","./AnimatedParticle":"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/components/AnimatedParticle.js","./MeatParticle":"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/components/MeatParticle.js"}],"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/components/Messages.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _domHand = require('dom-hand');

var _domHand2 = _interopRequireDefault(_domHand);

exports['default'] = function (parent) {
	var scope;
	var msgs = _domHand2['default'].select.all('.msg', parent);
	var oldItem = undefined,
	    newItem = undefined;
	var currentIndex = 0;
	var items = [];

	msgs.forEach(function (msg) {
		items.push({
			el: msg,
			size: [0, 0],
			tweenIn: undefined,
			tweenOut: undefined
		});
	});

	scope = {
		showMsg: function showMsg() {
			currentIndex++;
			if (currentIndex > items.length - 1) currentIndex = 0;

			oldItem = newItem;
			newItem = items[currentIndex];

			setTimeout(function () {
				return newItem.tweenIn.play(0);
			}, 0);
			setTimeout(function () {
				return newItem.tweenOut.play(0);
			}, 1200);
		},
		resize: function resize() {
			items.forEach(function (item) {
				var size = _domHand2['default'].size(item.el);
				item.size[0] = size[0];
				item.size[1] = size[1];
				item.el.style.left = (window.innerWidth >> 1) - (item.size[0] >> 1) + 'px';
				item.el.style.top = (window.innerHeight >> 1) - (item.size[1] >> 1) + 'px';

				item.tweenIn = TweenMax.fromTo(item.el, 0.6, { scale: 0.6, opacity: 0 }, { scale: 1, paused: true, opacity: 1, force3D: true, ease: Elastic.easeOut });
				item.tweenOut = TweenMax.to(item.el, 0.3, { scale: 2.4, opacity: 0, force3D: true, paused: true, ease: Expo.easeInOut });
			});
		}
	};

	return scope;
};

module.exports = exports['default'];

},{"dom-hand":"dom-hand"}],"/Users/panagiotisthomoglou/Projects/kbb-convoy/src/js/app/components/TextureAnimator.js":[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvcGFuYWdpb3Rpc3Rob21vZ2xvdS9Qcm9qZWN0cy9rYmItY29udm95L3NyYy9qcy9NYWluLmpzIiwiL1VzZXJzL3BhbmFnaW90aXN0aG9tb2dsb3UvUHJvamVjdHMva2JiLWNvbnZveS9zcmMvanMvYXBwL0FwcC5qcyIsIi9Vc2Vycy9wYW5hZ2lvdGlzdGhvbW9nbG91L1Byb2plY3RzL2tiYi1jb252b3kvc3JjL2pzL2FwcC9BcHBUZW1wbGF0ZS5qcyIsIi9Vc2Vycy9wYW5hZ2lvdGlzdGhvbW9nbG91L1Byb2plY3RzL2tiYi1jb252b3kvc3JjL2pzL2FwcC9hY3Rpb25zL0FwcEFjdGlvbnMuanMiLCIvVXNlcnMvcGFuYWdpb3Rpc3Rob21vZ2xvdS9Qcm9qZWN0cy9rYmItY29udm95L3NyYy9qcy9hcHAvY29tcG9uZW50cy9BbmltYXRlZFBhcnRpY2xlLmpzIiwiL1VzZXJzL3BhbmFnaW90aXN0aG9tb2dsb3UvUHJvamVjdHMva2JiLWNvbnZveS9zcmMvanMvYXBwL2NvbXBvbmVudHMvR1VJLmpzIiwiL1VzZXJzL3BhbmFnaW90aXN0aG9tb2dsb3UvUHJvamVjdHMva2JiLWNvbnZveS9zcmMvanMvYXBwL2NvbXBvbmVudHMvR1VJQ29udHJvbGxlci5qcyIsIi9Vc2Vycy9wYW5hZ2lvdGlzdGhvbW9nbG91L1Byb2plY3RzL2tiYi1jb252b3kvc3JjL2pzL2FwcC9jb21wb25lbnRzL01hdGVyaWFscy5qcyIsIi9Vc2Vycy9wYW5hZ2lvdGlzdGhvbW9nbG91L1Byb2plY3RzL2tiYi1jb252b3kvc3JjL2pzL2FwcC9jb21wb25lbnRzL01lYXRQYXJ0aWNsZS5qcyIsIi9Vc2Vycy9wYW5hZ2lvdGlzdGhvbW9nbG91L1Byb2plY3RzL2tiYi1jb252b3kvc3JjL2pzL2FwcC9jb21wb25lbnRzL01lYXRQYXJ0aWNsZXMuanMiLCIvVXNlcnMvcGFuYWdpb3Rpc3Rob21vZ2xvdS9Qcm9qZWN0cy9rYmItY29udm95L3NyYy9qcy9hcHAvY29tcG9uZW50cy9NZXNzYWdlcy5qcyIsIi9Vc2Vycy9wYW5hZ2lvdGlzdGhvbW9nbG91L1Byb2plY3RzL2tiYi1jb252b3kvc3JjL2pzL2FwcC9jb21wb25lbnRzL1RleHR1cmVBbmltYXRvci5qcyIsIi9Vc2Vycy9wYW5hZ2lvdGlzdGhvbW9nbG91L1Byb2plY3RzL2tiYi1jb252b3kvc3JjL2pzL2FwcC9jb25zdGFudHMvQXBwQ29uc3RhbnRzLmpzIiwiL1VzZXJzL3BhbmFnaW90aXN0aG9tb2dsb3UvUHJvamVjdHMva2JiLWNvbnZveS9zcmMvanMvYXBwL2Rpc3BhdGNoZXJzL0FwcERpc3BhdGNoZXIuanMiLCIvVXNlcnMvcGFuYWdpb3Rpc3Rob21vZ2xvdS9Qcm9qZWN0cy9rYmItY29udm95L3NyYy9qcy9hcHAvc2VydmljZXMvR2xvYmFsRXZlbnRzLmpzIiwiL1VzZXJzL3BhbmFnaW90aXN0aG9tb2dsb3UvUHJvamVjdHMva2JiLWNvbnZveS9zcmMvanMvYXBwL3NlcnZpY2VzL1ByZWxvYWRlci5qcyIsIi9Vc2Vycy9wYW5hZ2lvdGlzdGhvbW9nbG91L1Byb2plY3RzL2tiYi1jb252b3kvc3JjL2pzL2FwcC9zZXJ2aWNlcy9Sb3V0ZXIuanMiLCIvVXNlcnMvcGFuYWdpb3Rpc3Rob21vZ2xvdS9Qcm9qZWN0cy9rYmItY29udm95L3NyYy9qcy9hcHAvc3RvcmVzL0FwcFN0b3JlLmpzIiwiL1VzZXJzL3BhbmFnaW90aXN0aG9tb2dsb3UvUHJvamVjdHMva2JiLWNvbnZveS9zcmMvanMvYXBwL3V0aWxzL1V0aWxzLmpzIiwiL1VzZXJzL3BhbmFnaW90aXN0aG9tb2dsb3UvUHJvamVjdHMva2JiLWNvbnZveS9zcmMvanMvYXBwL3V0aWxzL3JhZi5qcyIsIi9Vc2Vycy9wYW5hZ2lvdGlzdGhvbW9nbG91L1Byb2plY3RzL2tiYi1jb252b3kvc3JjL2pzL3BhZ2VyL2NvbXBvbmVudHMvQmFzZUNvbXBvbmVudC5qcyIsInd3dy9kYXRhL2RhdGEuanNvbiJd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T0FBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQTtHQUNyQjs7O1NBQ0ssa0JBQUcsRUFDUjs7O1NBQ21CLGdDQUFHLEVBQ3RCOzs7UUExQ0ksYUFBYTs7O3FCQTZDSixhQUFhOzs7O0FDaEQ1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vIEF2b2lkIGNvbnNvbGUgZXJyb3JzIGZvciB0aGUgSUUgY3JhcHB5IGJyb3dzZXJzXG5pZiAoICEgd2luZG93LmNvbnNvbGUgKSBjb25zb2xlID0geyBsb2c6IGZ1bmN0aW9uKCl7fSB9O1xuXG5pbXBvcnQgQXBwU3RvcmUgZnJvbSAnQXBwU3RvcmUnXG5pbXBvcnQgVXRpbHMgZnJvbSAnVXRpbHMnXG5pbXBvcnQgQXBwIGZyb20gJ0FwcCdcbmltcG9ydCBUd2Vlbk1heCBmcm9tICdnc2FwJ1xuaW1wb3J0IHJhZiBmcm9tICdyYWYnXG5pbXBvcnQgTW9iaWxlRGV0ZWN0IGZyb20gJ21vYmlsZS1kZXRlY3QnXG5pbXBvcnQgZG9tIGZyb20gJ2RvbS1oYW5kJ1xuXG52YXIgbWQgPSBuZXcgTW9iaWxlRGV0ZWN0KHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50KVxuXG5BcHBTdG9yZS5EZXRlY3Rvci5pc1NhZmFyaSA9IChuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ1NhZmFyaScpICE9IC0xICYmIG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignQ2hyb21lJykgPT0gLTEpXG5BcHBTdG9yZS5EZXRlY3Rvci5pc0ZpcmVmb3ggPSBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkuaW5kZXhPZignZmlyZWZveCcpICE9IC0xXG5BcHBTdG9yZS5EZXRlY3Rvci5pc01vYmlsZSA9IChtZC5tb2JpbGUoKSB8fCBtZC50YWJsZXQoKSkgPyB0cnVlIDogZmFsc2VcbkFwcFN0b3JlLlBhcmVudCA9IGRvbS5zZWxlY3QoJyNhcHAtY29udGFpbmVyJylcbkFwcFN0b3JlLkRldGVjdG9yLm9sZElFID0gZG9tLmNsYXNzZXMuY29udGFpbnMoQXBwU3RvcmUuUGFyZW50LCAnaWU2JykgfHwgZG9tLmNsYXNzZXMuY29udGFpbnMoQXBwU3RvcmUuUGFyZW50LCAnaWU3JykgfHwgZG9tLmNsYXNzZXMuY29udGFpbnMoQXBwU3RvcmUuUGFyZW50LCAnaWU4JylcbkFwcFN0b3JlLkRldGVjdG9yLmlzU3VwcG9ydFdlYkdMID0gVXRpbHMuU3VwcG9ydFdlYkdMKClcbmlmKEFwcFN0b3JlLkRldGVjdG9yLm9sZElFKSBBcHBTdG9yZS5EZXRlY3Rvci5pc01vYmlsZSA9IHRydWVcblxudmFyIGFwcCA9IG5ldyBBcHAoKVx0XG5cbmFwcC5pbml0KClcblxuIiwiaW1wb3J0IEFwcFN0b3JlIGZyb20gJ0FwcFN0b3JlJ1xuaW1wb3J0IEFwcEFjdGlvbnMgZnJvbSAnQXBwQWN0aW9ucydcbmltcG9ydCBBcHBUZW1wbGF0ZSBmcm9tICdBcHBUZW1wbGF0ZSdcbmltcG9ydCBSb3V0ZXIgZnJvbSAnUm91dGVyJ1xuaW1wb3J0IEdFdmVudHMgZnJvbSAnR2xvYmFsRXZlbnRzJ1xuaW1wb3J0IFByZWxvYWRlciBmcm9tICdQcmVsb2FkZXInXG5pbXBvcnQgQXBwQ29uc3RhbnRzIGZyb20gJ0FwcENvbnN0YW50cydcbmltcG9ydCBkb20gZnJvbSAnZG9tLWhhbmQnXG5cbmNsYXNzIEFwcCB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMub25BcHBSZWFkeSA9IHRoaXMub25BcHBSZWFkeS5iaW5kKHRoaXMpXG5cdFx0dGhpcy5sb2FkTWFpbkFzc2V0cyA9IHRoaXMubG9hZE1haW5Bc3NldHMuYmluZCh0aGlzKVxuXHR9XG5cdGluaXQoKSB7XG5cblx0XHRNYXRoLnJhZGlhbnMgPSBmdW5jdGlvbihkZWdyZWVzKSB7XG5cdFx0XHRyZXR1cm4gZGVncmVlcyAqIE1hdGguUEkgLyAxODA7XG5cdFx0fTtcblx0XHQgXG5cdFx0Ly8gQ29udmVydHMgZnJvbSByYWRpYW5zIHRvIGRlZ3JlZXMuXG5cdFx0TWF0aC5kZWdyZWVzID0gZnVuY3Rpb24ocmFkaWFucykge1xuXHRcdFx0cmV0dXJuIHJhZGlhbnMgKiAxODAgLyBNYXRoLlBJO1xuXHRcdH07XG5cblx0XHQvLyBJbml0IHJvdXRlclxuXHRcdHRoaXMucm91dGVyID0gbmV3IFJvdXRlcigpXG5cdFx0dGhpcy5yb3V0ZXIuaW5pdCgpXG5cblx0XHRBcHBTdG9yZS5QcmVsb2FkZXIgPSBuZXcgUHJlbG9hZGVyKClcblxuXHRcdC8vIEluaXQgZ2xvYmFsIGV2ZW50c1xuXHRcdHdpbmRvdy5HbG9iYWxFdmVudHMgPSBuZXcgR0V2ZW50cygpXG5cdFx0R2xvYmFsRXZlbnRzLmluaXQoKVxuXG5cdFx0dmFyIGFwcFRlbXBsYXRlID0gbmV3IEFwcFRlbXBsYXRlKClcblx0XHRhcHBUZW1wbGF0ZS5pc1JlYWR5ID0gdGhpcy5sb2FkTWFpbkFzc2V0c1xuXHRcdGFwcFRlbXBsYXRlLnJlbmRlcignI2FwcC1jb250YWluZXInKVxuXG5cdFx0Ly8gU3RhcnQgcm91dGluZ1xuXHRcdHRoaXMucm91dGVyLmJlZ2luUm91dGluZygpXG5cdH1cblx0bG9hZE1haW5Bc3NldHMoKSB7XG5cdFx0dGhpcy5vbkFwcFJlYWR5KClcblx0fVxuXHRvbkFwcFJlYWR5KCkge1xuXHRcdEFwcEFjdGlvbnMuYXBwU3RhcnQoKVxuXHRcdEFwcEFjdGlvbnMucGFnZUhhc2hlckNoYW5nZWQoKVxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFwcFxuICAgIFx0XG4iLCJpbXBvcnQgQmFzZUNvbXBvbmVudCBmcm9tICdCYXNlQ29tcG9uZW50J1xuaW1wb3J0IEFwcFN0b3JlIGZyb20gJ0FwcFN0b3JlJ1xuaW1wb3J0IEFwcENvbnN0YW50cyBmcm9tICdBcHBDb25zdGFudHMnXG5pbXBvcnQgQXBwQWN0aW9ucyBmcm9tICdBcHBBY3Rpb25zJ1xuaW1wb3J0IGRvbSBmcm9tICdkb20taGFuZCdcbmltcG9ydCBNYXRlcmlhbHMgZnJvbSAnTWF0ZXJpYWxzJ1xuaW1wb3J0IFV0aWxzIGZyb20gJ1V0aWxzJ1xuaW1wb3J0IEdVSSBmcm9tICdHVUknXG5pbXBvcnQgTWVhdFBhcnRpY2xlcyBmcm9tICdNZWF0UGFydGljbGVzJ1xuaW1wb3J0IE1lc3NhZ2VzIGZyb20gJ01lc3NhZ2VzJ1xuXG5jbGFzcyBBcHBUZW1wbGF0ZSBleHRlbmRzIEJhc2VDb21wb25lbnQge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpXG5cdFx0dGhpcy5yZXNpemUgPSB0aGlzLnJlc2l6ZS5iaW5kKHRoaXMpXG5cdFx0dGhpcy5hbmltYXRlID0gdGhpcy5hbmltYXRlLmJpbmQodGhpcylcblx0XHR0aGlzLm1vdXNlTW92ZSA9IHRoaXMubW91c2VNb3ZlLmJpbmQodGhpcylcblx0XHR0aGlzLm9uR2VvbWV0cnlMb2FkZWQgPSB0aGlzLm9uR2VvbWV0cnlMb2FkZWQuYmluZCh0aGlzKVxuXHR9XG5cdHJlbmRlcihwYXJlbnQpIHtcblx0XHRzdXBlci5yZW5kZXIoJ0FwcFRlbXBsYXRlJywgcGFyZW50LCB1bmRlZmluZWQpXG5cdH1cblx0Y29tcG9uZW50RGlkTW91bnQoKSB7XG5cblx0XHRBcHBTdG9yZS5vbihBcHBDb25zdGFudHMuV0lORE9XX1JFU0laRSwgdGhpcy5yZXNpemUpXG5cdFx0ZG9tLmV2ZW50KHdpbmRvdywgJ21vdXNlbW92ZScsIHRoaXMubW91c2VNb3ZlKVxuXG5cdFx0dGhpcy5kb3QgPSB7XG5cdFx0XHRlbDogZG9tLnNlbGVjdCgnI21vdXNlLWRvdCcsIGRvY3VtZW50KSxcblx0XHRcdHg6IC0yMDAsXG5cdFx0XHR5Oi0yMDBcblx0XHR9XG5cblx0XHR0aGlzLnNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKCk7XG5cbiAgICAgICAgdGhpcy5jYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoIDc1LCB3aW5kb3cuaW5uZXJXaWR0aCAvIHdpbmRvdy5pbm5lckhlaWdodCwgMSwgMTAwMDAgKTtcbiAgICAgICAgdGhpcy5jYW1lcmEucG9zaXRpb24ueiA9IDkwMDtcblxuICAgICAgICB0aGlzLnJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoe1xuICAgICAgICBcdGFudGlhbGlhczogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTaXplKCB3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0ICk7XG4gICAgICAgIGRvbS50cmVlLmFkZCh0aGlzLmVsZW1lbnQsIHRoaXMucmVuZGVyZXIuZG9tRWxlbWVudClcblxuICAgICAgICB0aGlzLnJheWNhc3RlciA9IG5ldyBUSFJFRS5SYXljYXN0ZXIoKTtcbiAgICAgICAgdGhpcy5tb3VzZSA9IG5ldyBUSFJFRS5WZWN0b3IyKDUwMCwgNTAwKTtcbiAgICAgICAgdGhpcy5pbnRlcnNlY3Rpb24gPSB1bmRlZmluZWRcbiAgICAgICAgdGhpcy5pbnRlcnNlY3Rpb25Db3VudGVyID0gMFxuXG4gICAgICAgIHRoaXMua2ViYWIgPSBuZXcgVEhSRUUuT2JqZWN0M0QoKVxuICAgICAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLmtlYmFiKVxuXG4gICAgICAgIHRoaXMubWVhdFBhcnRpY2xlcyA9IE1lYXRQYXJ0aWNsZXModGhpcy5zY2VuZSlcblxuICAgICAgICB2YXIgcGxhbmVHZW9tZXRyeSA9IG5ldyBUSFJFRS5QbGFuZUdlb21ldHJ5KCAxMjAwLCA0MDAsIDEwLCAxMCApO1xuICAgICAgICB2YXIgcGxhbmVUZXh0dXJlID0gVXRpbHMuTG9hZFRleHR1cmUoXCJncmFkaWVudC1za3ktMTE3Mjk2OC5qcGdcIilcbiAgICAgICAgdmFyIHBsYW5lTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICAgICAgICBcdGNvbG9yOiAweGZmZmZmZixcbiAgICAgICAgXHRtYXA6IHBsYW5lVGV4dHVyZSxcbiAgICAgICAgXHRzaWRlOiBUSFJFRS5Eb3VibGVTaWRlXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmJhY2tncm91bmQgPSBuZXcgVEhSRUUuTWVzaChwbGFuZUdlb21ldHJ5LCBwbGFuZU1hdGVyaWFsKVxuICAgICAgICB0aGlzLmJhY2tncm91bmQuc2NhbGUuc2V0KDEwLCAxMCwgMTApXG4gICAgICAgIHRoaXMuYmFja2dyb3VuZC5wb3NpdGlvbi56ID0gLTYwMFxuICAgICAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLmJhY2tncm91bmQpXG5cbiAgICAgICAgdmFyIGFtYmllbnRMID0gbmV3IFRIUkVFLkFtYmllbnRMaWdodCggMHhmZmZmZmYgKTtcblxuXHRcdHZhciBkaXJlY3Rpb25hbExpZ2h0ID0gbmV3IFRIUkVFLkRpcmVjdGlvbmFsTGlnaHQoIDB4ZmZmZmZmLCAwLjcgKTtcblx0XHRkaXJlY3Rpb25hbExpZ2h0LnBvc2l0aW9uLnNldCggLTQwLCAxNywgMTAwIClcblx0XHRHVUkuc2V0RGlyZWN0aW9uYWxMaWdodCgnQSAnLCBkaXJlY3Rpb25hbExpZ2h0KVxuXG5cdFx0dmFyIGRpcmVjdGlvbmFsTGlnaHQyID0gbmV3IFRIUkVFLkRpcmVjdGlvbmFsTGlnaHQoIDB4ZmZmZmZmLCAxLjAgKTtcblx0XHRkaXJlY3Rpb25hbExpZ2h0Mi5wb3NpdGlvbi5zZXQoIC0xMDAsIDcyLCAtMTggKVxuXHRcdEdVSS5zZXREaXJlY3Rpb25hbExpZ2h0KCdCICcsIGRpcmVjdGlvbmFsTGlnaHQyKVxuXG5cdFx0dmFyIGRpcmVjdGlvbmFsTGlnaHQzID0gbmV3IFRIUkVFLkRpcmVjdGlvbmFsTGlnaHQoIDB4ZmZmZmZmLCAxLjAgKTtcblx0XHRkaXJlY3Rpb25hbExpZ2h0My5wb3NpdGlvbi5zZXQoIDEwMCwgMTcsIC01MCApXG5cdFx0R1VJLnNldERpcmVjdGlvbmFsTGlnaHQoJ0MgJywgZGlyZWN0aW9uYWxMaWdodDMpXG5cbiAgICAgICAgdGhpcy5saWdodHMgPSB7XG4gICAgICAgIFx0YW1iaWVudDogYW1iaWVudEwsXG4gICAgICAgIFx0ZGlyMTogZGlyZWN0aW9uYWxMaWdodCxcbiAgICAgICAgXHRkaXIyOiBkaXJlY3Rpb25hbExpZ2h0MixcbiAgICAgICAgXHRkaXIzOiBkaXJlY3Rpb25hbExpZ2h0MyxcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHRoaXMubGlnaHRzLmFtYmllbnQpXG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHRoaXMubGlnaHRzLmRpcjEpXG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHRoaXMubGlnaHRzLmRpcjIpXG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHRoaXMubGlnaHRzLmRpcjMpXG5cbiAgICAgICAgdmFyIG1hbmlmZXN0ID0gW1xuICAgICAgICBcdHsgaWQ6IEFwcENvbnN0YW50cy5LRUJBQi5CQVNFLCBzcmM6IFwibWVzaC9rZWJhYl9iYXNlLmpzXCIgfSxcbiAgICAgICAgXHR7IGlkOiBBcHBDb25zdGFudHMuS0VCQUIuVE9NQVRPLCBzcmM6IFwibWVzaC90b21hdG8uanNcIiB9LFxuICAgICAgICBcdHsgaWQ6IEFwcENvbnN0YW50cy5LRUJBQi5TSUxWRVIsIHNyYzogXCJtZXNoL3NpbHZlci5qc1wiIH0sXG4gICAgICAgIFx0eyBpZDogQXBwQ29uc3RhbnRzLktFQkFCLlBBUlRJQ0xFLCBzcmM6IFwibWVzaC9tZWF0LXBhcnRpY2xlLmpzXCIgfSxcbiAgICAgICAgXVxuICAgICAgICB0aGlzLmxvYWRBc3NldHMobWFuaWZlc3QpXG5cbiAgICAgICAgTGVhcC5sb29wKChmcmFtZSk9PiB7XG4gICAgICAgIFx0dmFyIGhhbmQgPSBmcmFtZS5oYW5kc1swXVxuXHRcdFx0aWYoaGFuZCkge1xuXHRcdFx0XHRsZXQgeCA9ICh3aW5kb3cuaW5uZXJXaWR0aCAqIDAuNDUpICsgaGFuZC5wYWxtUG9zaXRpb25bMF1cblx0XHRcdFx0bGV0IHkgPSAod2luZG93LmlubmVySGVpZ2h0ICogMC45KSAtIGhhbmQucGFsbVBvc2l0aW9uWzFdXG5cdFx0XHRcdHRoaXMudXBkYXRlTW91c2VQb3NpdGlvbih4LCB5KVxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0dGhpcy5tZXNzYWdlcyA9IE1lc3NhZ2VzKGRvbS5zZWxlY3QoJyNtZXNzYWdlcycsIGRvY3VtZW50KSlcblxuICAgICAgICB0aGlzLmFuaW1hdGUoKVxuXHRcdHN1cGVyLmNvbXBvbmVudERpZE1vdW50KClcblx0fVxuXHR1cGRhdGVNb3VzZVBvc2l0aW9uKHgsIHkpIHtcblx0XHRjb25zdCBzaXplID0gNTBcblx0XHR0aGlzLm1vdXNlLnggPSAoIHggLyB3aW5kb3cuaW5uZXJXaWR0aCApICogMiAtIDE7XG5cdFx0dGhpcy5tb3VzZS55ID0gLSAoIHkgLyB3aW5kb3cuaW5uZXJIZWlnaHQgKSAqIDIgKyAxO1xuXHRcdGNvbnN0IG5ld1ggPSB4IC0gKHNpemUgPj4gMSlcblx0XHRjb25zdCBuZXdZID0geSAtIChzaXplID4+IDEpXG5cdFx0dGhpcy5kb3QueCArPSAobmV3WCAtIHRoaXMuZG90LngpICogMC42XG5cdFx0dGhpcy5kb3QueSArPSAobmV3WSAtIHRoaXMuZG90LnkpICogMC42XG5cdFx0VXRpbHMuVHJhbnNsYXRlKHRoaXMuZG90LmVsLCB0aGlzLmRvdC54LCB0aGlzLmRvdC55LCAxKVxuXHR9XG4gXHRtb3VzZU1vdmUoZSkge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHR0aGlzLnVwZGF0ZU1vdXNlUG9zaXRpb24oZS5jbGllbnRYLCBlLmNsaWVudFkpXG5cdH1cblx0bG9hZEFzc2V0cyhtYW5pZmVzdCkge1xuXHRcdHZhciBqc29uTG9hZGVyID0gbmV3IFRIUkVFLkpTT05Mb2FkZXIoKTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1hbmlmZXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgYXNzZXQgPSBtYW5pZmVzdFtpXVxuXHRcdFx0anNvbkxvYWRlci5sb2FkKCBhc3NldC5pZCwgYXNzZXQuc3JjLCB0aGlzLm9uR2VvbWV0cnlMb2FkZWQgKTtcblx0XHR9O1xuXHR9XG5cdG9uR2VvbWV0cnlMb2FkZWQoaWQsIGdlb21ldHJ5KSB7XG5cdFx0c3dpdGNoKGlkKSB7XG5cdFx0XHRjYXNlIEFwcENvbnN0YW50cy5LRUJBQi5CQVNFOiBcblx0XHRcdFx0dGhpcy5zZXR1cEtlYmFiQmFzZShnZW9tZXRyeSlcblx0XHRcdFx0YnJlYWtcblx0XHRcdGNhc2UgQXBwQ29uc3RhbnRzLktFQkFCLlRPTUFUTzogXG5cdFx0XHRcdHRoaXMuc2V0dXBUb21hdG8oZ2VvbWV0cnkpXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRjYXNlIEFwcENvbnN0YW50cy5LRUJBQi5TSUxWRVI6IFxuXHRcdFx0XHR0aGlzLnNldHVwU2lsdmVyQmFzZShnZW9tZXRyeSlcblx0XHRcdFx0YnJlYWtcblx0XHRcdGNhc2UgQXBwQ29uc3RhbnRzLktFQkFCLlBBUlRJQ0xFOiBcblx0XHRcdFx0dGhpcy5tZWF0UGFydGljbGVzLnNldHVwKGdlb21ldHJ5KVxuXHRcdFx0XHRicmVha1xuXHRcdH1cblx0fVxuXHRzY2FsZUdlb21ldHJ5TWF0cml4KGdlb21ldHJ5KSB7XG5cdFx0Z2VvbWV0cnkuYXBwbHlNYXRyaXgoIG5ldyBUSFJFRS5NYXRyaXg0KCkubXVsdGlwbHlTY2FsYXIoIDAuNSApICk7XG5cdH1cblx0c2V0dXBLZWJhYkJhc2UoZ2VvbWV0cnkpIHtcblx0XHR2YXIgdGV4dHVyZSA9IFV0aWxzLkxvYWRUZXh0dXJlKFwiU2hhd2FybWEtZGlmZi5qcGdcIilcblx0XHR2YXIgYnVtcCA9IFV0aWxzLkxvYWRUZXh0dXJlKCBcIlNoYXdhcm1hLWJ1bXAuanBnXCIgKTtcblx0XHR0aGlzLnNjYWxlR2VvbWV0cnlNYXRyaXgoZ2VvbWV0cnkpXG5cdFx0dmFyIGRpZmZ1c2VDb2xvciA9IG5ldyBUSFJFRS5Db2xvciggMHhmZmZmZmYgKVxuXHRcdHZhciBtZXRhbG5lc3MgPSAwLjVcblx0XHR2YXIgcm91Z2huZXNzID0gMS4wXG5cdFx0dmFyIGJ1bXBTY2FsZSA9IDFcblx0XHR2YXIgbWF0ZXJpYWwgPSBNYXRlcmlhbHMuTWVzaFN0YW5kYXJkTWF0ZXJpYWwoJ2tlYmFiJywge1xuXHRcdFx0bWFwOiB0ZXh0dXJlLFxuXHRcdFx0YnVtcE1hcDogYnVtcCxcblx0XHRcdGJ1bXBTY2FsZTogYnVtcFNjYWxlLFxuXHRcdFx0Y29sb3I6IGRpZmZ1c2VDb2xvcixcblx0XHRcdG1ldGFsbmVzczogbWV0YWxuZXNzLFxuXHRcdFx0cm91Z2huZXNzOiByb3VnaG5lc3Ncblx0XHR9IClcblx0XHR2YXIgaG9sZGVyID0gbmV3IFRIUkVFLk9iamVjdDNEKClcblx0XHR2YXIgbWVzaCA9IG5ldyBUSFJFRS5NZXNoKCBnZW9tZXRyeSwgbWF0ZXJpYWwgKTtcblx0XHR0aGlzLmtlYmFiQmFzZSA9IG1lc2hcblx0XHR0aGlzLmtlYmFiLmFkZChtZXNoKVxuXHR9XG5cdHNldHVwU2lsdmVyQmFzZShnZW9tZXRyeSkge1xuXHRcdHZhciB0ZXh0dXJlID0gVXRpbHMuTG9hZFRleHR1cmUoXCJTaGF3YXJtYS1kaWZmLmpwZ1wiKVxuXHRcdHZhciBidW1wID0gVXRpbHMuTG9hZFRleHR1cmUoIFwiU2hhd2FybWEtYnVtcC5qcGdcIiApO1xuXHRcdHRoaXMuc2NhbGVHZW9tZXRyeU1hdHJpeChnZW9tZXRyeSlcblx0XHR2YXIgZGlmZnVzZUNvbG9yID0gbmV3IFRIUkVFLkNvbG9yKCAweGUwZTBlMCApXG5cdFx0dmFyIG1ldGFsbmVzcyA9IDAuNTZcblx0XHR2YXIgcm91Z2huZXNzID0gMC43XG5cdFx0dmFyIGJ1bXBTY2FsZSA9IDFcblx0XHR2YXIgbWF0ZXJpYWwgPSBNYXRlcmlhbHMuTWVzaFN0YW5kYXJkTWF0ZXJpYWwoJ3NpbHZlcicsIHtcblx0XHRcdGNvbG9yOiBkaWZmdXNlQ29sb3IsXG5cdFx0XHRtZXRhbG5lc3M6IG1ldGFsbmVzcyxcblx0XHRcdHJvdWdobmVzczogcm91Z2huZXNzXG5cdFx0fSApXG5cdFx0dmFyIGhvbGRlciA9IG5ldyBUSFJFRS5PYmplY3QzRCgpXG5cdFx0dmFyIG1lc2ggPSBuZXcgVEhSRUUuTWVzaCggZ2VvbWV0cnksIG1hdGVyaWFsICk7XG5cdFx0dGhpcy5rZWJhYi5hZGQobWVzaClcblx0fVxuXHRzZXR1cFRvbWF0byhnZW9tZXRyeSkge1xuXHRcdHZhciB0ZXh0dXJlID0gVXRpbHMuTG9hZFRleHR1cmUoXCJUb21hdG9fU2tpbi5qcGdcIilcblx0XHR2YXIgYnVtcCA9IFV0aWxzLkxvYWRUZXh0dXJlKCBcIlRvbWF0b19za2luX2J1bXAuanBnXCIgKTtcblx0XHR0aGlzLnNjYWxlR2VvbWV0cnlNYXRyaXgoZ2VvbWV0cnkpXG5cdFx0dmFyIGRpZmZ1c2VDb2xvciA9IG5ldyBUSFJFRS5Db2xvciggMHhmZmZmZmYgKVxuXHRcdHZhciBtZXRhbG5lc3MgPSAwLjVcblx0XHR2YXIgcm91Z2huZXNzID0gMS4wXG5cdFx0dmFyIGJ1bXBTY2FsZSA9IDFcblx0XHR2YXIgbWF0ZXJpYWwgPSBNYXRlcmlhbHMuTWVzaFN0YW5kYXJkTWF0ZXJpYWwoJ3RvbWF0bycsIHtcblx0XHRcdG1hcDogdGV4dHVyZSxcblx0XHRcdGJ1bXBNYXA6IGJ1bXAsXG5cdFx0XHRidW1wU2NhbGU6IGJ1bXBTY2FsZSxcblx0XHRcdGNvbG9yOiBkaWZmdXNlQ29sb3IsXG5cdFx0XHRtZXRhbG5lc3M6IG1ldGFsbmVzcyxcblx0XHRcdHJvdWdobmVzczogcm91Z2huZXNzXG5cdFx0fSApXG5cdFx0dmFyIGhvbGRlciA9IG5ldyBUSFJFRS5PYmplY3QzRCgpXG5cdFx0dmFyIG1lc2ggPSBuZXcgVEhSRUUuTWVzaCggZ2VvbWV0cnksIG1hdGVyaWFsICk7XG5cdFx0dGhpcy5rZWJhYi5hZGQobWVzaClcblx0fVxuXHRhbmltYXRlKCkge1xuXHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1hdGUpXG5cbiAgICAgICAgdGhpcy5rZWJhYi5yb3RhdGlvbi55ICs9IDAuMDA2XG5cbiAgICAgICAgdGhpcy5yYXljYXN0ZXIuc2V0RnJvbUNhbWVyYSggdGhpcy5tb3VzZSwgdGhpcy5jYW1lcmEgKTtcblxuICAgICAgICBpZih0aGlzLmtlYmFiQmFzZSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgXHR2YXIgaW50ZXJzZWN0aW9ucyA9IHRoaXMucmF5Y2FzdGVyLmludGVyc2VjdE9iamVjdHMoIFt0aGlzLmtlYmFiQmFzZV0gKTtcbiAgICAgICAgXHR0aGlzLmludGVyc2VjdGlvbiA9ICggaW50ZXJzZWN0aW9ucy5sZW5ndGggKSA+IDAgPyBpbnRlcnNlY3Rpb25zWyAwIF0gOiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodGhpcy5pbnRlcnNlY3Rpb24pIHRoaXMuaW50ZXJzZWN0aW9uQ291bnRlcisrXG4gICAgICAgIGlmKHRoaXMuaW50ZXJzZWN0aW9uQ291bnRlciA+IDM1MCkge1xuICAgICAgICBcdHRoaXMubWVzc2FnZXMuc2hvd01zZygpXG4gICAgICAgIFx0dGhpcy5pbnRlcnNlY3Rpb25Db3VudGVyID0gMFxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tZWF0UGFydGljbGVzLnVwZGF0ZSh0aGlzLmludGVyc2VjdGlvbilcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXIoIHRoaXMuc2NlbmUsIHRoaXMuY2FtZXJhICk7XG5cdH1cblx0cmVzaXplKCkge1xuXHRcdHRoaXMuY2FtZXJhLmFzcGVjdCA9IHdpbmRvdy5pbm5lcldpZHRoIC8gd2luZG93LmlubmVySGVpZ2h0O1xuXHQgICAgdGhpcy5jYW1lcmEudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuXHQgICAgdGhpcy5yZW5kZXJlci5zZXRTaXplKCB3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0ICk7XG5cdCAgICB0aGlzLm1lc3NhZ2VzLnJlc2l6ZSgpXG5cblx0XHRzdXBlci5yZXNpemUoKVxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFwcFRlbXBsYXRlXG5cbiIsImltcG9ydCBBcHBDb25zdGFudHMgZnJvbSAnQXBwQ29uc3RhbnRzJ1xuaW1wb3J0IEFwcERpc3BhdGNoZXIgZnJvbSAnQXBwRGlzcGF0Y2hlcidcbmltcG9ydCBBcHBTdG9yZSBmcm9tICdBcHBTdG9yZSdcblxuZnVuY3Rpb24gX3Byb2NlZWRUcmFuc2l0aW9uSW5BY3Rpb24ocGFnZUlkKSB7XG4gICAgQXBwRGlzcGF0Y2hlci5oYW5kbGVWaWV3QWN0aW9uKHtcbiAgICAgICAgYWN0aW9uVHlwZTogQXBwQ29uc3RhbnRzLlBBR0VfQVNTRVRTX0xPQURFRCxcbiAgICAgICAgaXRlbTogcGFnZUlkXG4gICAgfSkgIFxufVxuXG52YXIgQXBwQWN0aW9ucyA9IHtcbiAgICBwYWdlSGFzaGVyQ2hhbmdlZDogZnVuY3Rpb24ocGFnZUlkKSB7XG4gICAgICAgIEFwcERpc3BhdGNoZXIuaGFuZGxlVmlld0FjdGlvbih7XG4gICAgICAgICAgICBhY3Rpb25UeXBlOiBBcHBDb25zdGFudHMuUEFHRV9IQVNIRVJfQ0hBTkdFRCxcbiAgICAgICAgICAgIGl0ZW06IHBhZ2VJZFxuICAgICAgICB9KVxuICAgIH0sXG4gICAgbG9hZFBhZ2VBc3NldHM6IGZ1bmN0aW9uKHBhZ2VJZCkge1xuICAgICAgICB2YXIgbWFuaWZlc3QgPSBBcHBTdG9yZS5wYWdlQXNzZXRzVG9Mb2FkKClcbiAgICAgICAgaWYobWFuaWZlc3QubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgX3Byb2NlZWRUcmFuc2l0aW9uSW5BY3Rpb24ocGFnZUlkKVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIEFwcFN0b3JlLlByZWxvYWRlci5sb2FkKG1hbmlmZXN0LCAoKT0+e1xuICAgICAgICAgICAgICAgIF9wcm9jZWVkVHJhbnNpdGlvbkluQWN0aW9uKHBhZ2VJZClcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHdpbmRvd1Jlc2l6ZTogZnVuY3Rpb24od2luZG93Vywgd2luZG93SCkge1xuICAgICAgICBBcHBEaXNwYXRjaGVyLmhhbmRsZVZpZXdBY3Rpb24oe1xuICAgICAgICAgICAgYWN0aW9uVHlwZTogQXBwQ29uc3RhbnRzLldJTkRPV19SRVNJWkUsXG4gICAgICAgICAgICBpdGVtOiB7IHdpbmRvd1c6d2luZG93Vywgd2luZG93SDp3aW5kb3dIIH1cbiAgICAgICAgfSlcbiAgICB9LFxuICAgIHB4Q29udGFpbmVySXNSZWFkeTogZnVuY3Rpb24oY29tcG9uZW50KSB7XG4gICAgICAgIEFwcERpc3BhdGNoZXIuaGFuZGxlVmlld0FjdGlvbih7XG4gICAgICAgICAgICBhY3Rpb25UeXBlOiBBcHBDb25zdGFudHMuUFhfQ09OVEFJTkVSX0lTX1JFQURZLFxuICAgICAgICAgICAgaXRlbTogY29tcG9uZW50XG4gICAgICAgIH0pICAgICAgICAgICAgXG4gICAgfSxcbiAgICBweEFkZENoaWxkOiBmdW5jdGlvbihjaGlsZCkge1xuICAgICAgICBBcHBEaXNwYXRjaGVyLmhhbmRsZVZpZXdBY3Rpb24oe1xuICAgICAgICAgICAgYWN0aW9uVHlwZTogQXBwQ29uc3RhbnRzLlBYX0NPTlRBSU5FUl9BRERfQ0hJTEQsXG4gICAgICAgICAgICBpdGVtOiBjaGlsZFxuICAgICAgICB9KSAgICAgICAgICAgIFxuICAgIH0sXG4gICAgcHhSZW1vdmVDaGlsZDogZnVuY3Rpb24oY2hpbGQpIHtcbiAgICAgICAgQXBwRGlzcGF0Y2hlci5oYW5kbGVWaWV3QWN0aW9uKHtcbiAgICAgICAgICAgIGFjdGlvblR5cGU6IEFwcENvbnN0YW50cy5QWF9DT05UQUlORVJfUkVNT1ZFX0NISUxELFxuICAgICAgICAgICAgaXRlbTogY2hpbGRcbiAgICAgICAgfSkgICAgICAgICAgICBcbiAgICB9LFxuICAgIG9wZW5GdW5GYWN0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgQXBwRGlzcGF0Y2hlci5oYW5kbGVWaWV3QWN0aW9uKHtcbiAgICAgICAgICAgIGFjdGlvblR5cGU6IEFwcENvbnN0YW50cy5PUEVOX0ZVTl9GQUNULFxuICAgICAgICAgICAgaXRlbTogdW5kZWZpbmVkXG4gICAgICAgIH0pXG4gICAgfSxcbiAgICBjbG9zZUZ1bkZhY3Q6IGZ1bmN0aW9uKCkge1xuICAgICAgICBBcHBEaXNwYXRjaGVyLmhhbmRsZVZpZXdBY3Rpb24oe1xuICAgICAgICAgICAgYWN0aW9uVHlwZTogQXBwQ29uc3RhbnRzLkNMT1NFX0ZVTl9GQUNULFxuICAgICAgICAgICAgaXRlbTogdW5kZWZpbmVkXG4gICAgICAgIH0pICBcbiAgICB9LFxuICAgIGNlbGxNb3VzZUVudGVyOiBmdW5jdGlvbihpZCkge1xuICAgICAgICBBcHBEaXNwYXRjaGVyLmhhbmRsZVZpZXdBY3Rpb24oe1xuICAgICAgICAgICAgYWN0aW9uVHlwZTogQXBwQ29uc3RhbnRzLkNFTExfTU9VU0VfRU5URVIsXG4gICAgICAgICAgICBpdGVtOiBpZFxuICAgICAgICB9KSBcbiAgICB9LFxuICAgIGNlbGxNb3VzZUxlYXZlOiBmdW5jdGlvbihpZCkge1xuICAgICAgICBBcHBEaXNwYXRjaGVyLmhhbmRsZVZpZXdBY3Rpb24oe1xuICAgICAgICAgICAgYWN0aW9uVHlwZTogQXBwQ29uc3RhbnRzLkNFTExfTU9VU0VfTEVBVkUsXG4gICAgICAgICAgICBpdGVtOiBpZFxuICAgICAgICB9KVxuICAgIH0sXG4gICAgb3BlbkZlZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBBcHBEaXNwYXRjaGVyLmhhbmRsZVZpZXdBY3Rpb24oe1xuICAgICAgICAgICAgYWN0aW9uVHlwZTogQXBwQ29uc3RhbnRzLk9QRU5fRkVFRCxcbiAgICAgICAgICAgIGl0ZW06IHVuZGVmaW5lZFxuICAgICAgICB9KSAgXG4gICAgfSxcbiAgICBvcGVuR3JpZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIEFwcERpc3BhdGNoZXIuaGFuZGxlVmlld0FjdGlvbih7XG4gICAgICAgICAgICBhY3Rpb25UeXBlOiBBcHBDb25zdGFudHMuT1BFTl9HUklELFxuICAgICAgICAgICAgaXRlbTogdW5kZWZpbmVkXG4gICAgICAgIH0pICBcbiAgICB9LFxuICAgIGFwcFN0YXJ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgQXBwRGlzcGF0Y2hlci5oYW5kbGVWaWV3QWN0aW9uKHtcbiAgICAgICAgICAgIGFjdGlvblR5cGU6IEFwcENvbnN0YW50cy5BUFBfU1RBUlQsXG4gICAgICAgICAgICBpdGVtOiB1bmRlZmluZWRcbiAgICAgICAgfSkgICAgXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBcHBBY3Rpb25zXG5cblxuICAgICAgXG4iLCJcbmV4cG9ydCBkZWZhdWx0IChwYXJlbnQsIHRleHR1cmUsIGdlb21ldHJ5LCBhbmltYXRvciwgc2NhbGUpPT4ge1xuXHR2YXIgc2NvcGU7XG5cdHZhciBjbG9jayA9IG5ldyBUSFJFRS5DbG9jaygpO1xuXHRcblx0Ly8gY29uc29sZS5sb2cocGFyZW50LCB0ZXh0dXJlLCBnZW9tZXRyeSwgYW5pbWF0b3IpXG5cdGxldCBtYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCgge1xuXHRcdG1hcDogdGV4dHVyZSxcblx0XHR0cmFuc3BhcmVudDogdHJ1ZSwgXG5cdFx0b3BhY2l0eTogMSxcblx0XHRzaWRlOiBUSFJFRS5Eb3VibGVTaWRlXG5cdH0gKTtcblx0bGV0IG1lc2ggPSBuZXcgVEhSRUUuTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpO1xuXHRtZXNoLnNjYWxlLnNldChzY2FsZSwgc2NhbGUsIHNjYWxlKVxuXHRwYXJlbnQuYWRkKG1lc2gpO1xuXG5cdHNjb3BlID0ge1xuXHRcdHNjYWxlOiBzY2FsZSxcblx0XHRtZXNoOiBtZXNoLFxuXHRcdHVwZGF0ZTogKCk9PiB7XG5cdFx0XHR2YXIgZGVsdGEgPSBjbG9jay5nZXREZWx0YSgpOyBcblx0XHRcdGFuaW1hdG9yLnVwZGF0ZSgxMDAwICogZGVsdGEpO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBzY29wZVxufSIsImltcG9ydCBHVUlDb250cm9sbGVyIGZyb20gJ0dVSUNvbnRyb2xsZXInXG5cbmZ1bmN0aW9uIF9nZXRHVUkoKSB7XG5cdGlmKEdVSS5ndWkgPT0gdW5kZWZpbmVkKSB7XG5cdFx0R1VJLmd1aSA9IG5ldyBkYXQuR1VJKCk7XG5cdFx0cmV0dXJuIEdVSS5ndWlcblx0fWVsc2V7XG5cdFx0cmV0dXJuIEdVSS5ndWlcblx0fVxufVxuXG52YXIgR1VJID0ge1xuXHRndWk6IHVuZGVmaW5lZCxcblx0c2V0U3RhbmRhcmRNYXRlcmlhbDogZnVuY3Rpb24oaWQsIG1hdGVyaWFsKSB7XG5cdFx0Ly8gdmFyIGd1aSA9IF9nZXRHVUkoKVxuXHRcdC8vIHZhciBmb2xkZXIgPSBndWkuYWRkRm9sZGVyKGlkICsgJyBTdGFuZGFyZE1hdGVyaWFsJyk7XG5cdFx0Ly8gbmV3IEdVSUNvbnRyb2xsZXIoZm9sZGVyLCBtYXRlcmlhbCwgJ21ldGFsbmVzcycsIHsgZnJvbTogMCwgdG86IDMgfSlcblx0XHQvLyBuZXcgR1VJQ29udHJvbGxlcihmb2xkZXIsIG1hdGVyaWFsLCAncm91Z2huZXNzJywgeyBmcm9tOiAwLCB0bzogMyB9KVxuXHRcdC8vIG5ldyBHVUlDb250cm9sbGVyKGZvbGRlciwgbWF0ZXJpYWwsICdidW1wU2NhbGUnLCB7IGZyb206IDAsIHRvOiAzIH0pXG5cdFx0Ly8gbmV3IEdVSUNvbnRyb2xsZXIoZm9sZGVyLCBtYXRlcmlhbCwgJ2NvbG9yJywgeyBjb2xvcjogWyAwLCAwLCAwIF0gfSlcblx0XHQvLyBuZXcgR1VJQ29udHJvbGxlcihmb2xkZXIsIG1hdGVyaWFsLCAnZW1pc3NpdmUnLCB7IGNvbG9yOiBbIDAsIDAsIDAgXSB9KVxuXHRcdC8vIGZvbGRlci5vcGVuKClcblx0fSxcblx0c2V0UGhvbmdNYXRlcmlhbDogZnVuY3Rpb24oaWQsIG1hdGVyaWFsKSB7XG5cdFx0Ly8gdmFyIGd1aSA9IF9nZXRHVUkoKVxuXHRcdC8vIHZhciBmb2xkZXIgPSBndWkuYWRkRm9sZGVyKGlkICsgJyBQaG9uZ01hdGVyaWFsJyk7XG5cdFx0Ly8gbmV3IEdVSUNvbnRyb2xsZXIoZm9sZGVyLCBtYXRlcmlhbCwgJ3NoaW5pbmVzcycsIHsgZnJvbTogMCwgdG86IDUwIH0pXG5cdFx0Ly8gbmV3IEdVSUNvbnRyb2xsZXIoZm9sZGVyLCBtYXRlcmlhbCwgJ3JlZmxlY3Rpdml0eScsIHsgZnJvbTogMCwgdG86IDUgfSlcblx0XHQvLyBuZXcgR1VJQ29udHJvbGxlcihmb2xkZXIsIG1hdGVyaWFsLCAnY29sb3InLCB7IGNvbG9yOiBbIDAsIDAsIDAgXSB9KVxuXHRcdC8vIG5ldyBHVUlDb250cm9sbGVyKGZvbGRlciwgbWF0ZXJpYWwsICdlbWlzc2l2ZScsIHsgY29sb3I6IFsgMCwgMCwgMCBdIH0pXG5cdFx0Ly8gbmV3IEdVSUNvbnRyb2xsZXIoZm9sZGVyLCBtYXRlcmlhbCwgJ3NwZWN1bGFyJywgeyBjb2xvcjogWyAwLCAwLCAwIF0gfSlcblx0XHQvLyBmb2xkZXIub3BlbigpXG5cdH0sXG5cdHNldERpcmVjdGlvbmFsTGlnaHQ6IGZ1bmN0aW9uKGlkLCBsaWdodCkge1xuXHRcdC8vIHZhciBndWkgPSBfZ2V0R1VJKClcblx0XHQvLyB2YXIgZm9sZGVyID0gZ3VpLmFkZEZvbGRlcihpZCArICcgRGlyZWN0aW9uYWxMaWdodCcpO1xuXHRcdC8vIG5ldyBHVUlDb250cm9sbGVyKGZvbGRlciwgbGlnaHQsICdwb3NpdGlvbicsIHsgeDoxMDAsIHk6MTAwLCB6OjEwMCB9KVxuXHRcdC8vIG5ldyBHVUlDb250cm9sbGVyKGZvbGRlciwgbGlnaHQsICdpbnRlbnNpdHknLCB7IGZyb206IDAsIHRvOiA1MCB9KVxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdVSSIsImltcG9ydCBVdGlscyBmcm9tICdVdGlscydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR1VJQ29udHJvbGxlciB7XG5cdGNvbnN0cnVjdG9yKGZvbGRlciwgcHJvcHMsIGlkLCB2YXJzKSB7XG5cdFx0dGhpcy5wcm9wcyA9IHByb3BzXG5cdFx0dGhpcy5pZCA9IGlkXG5cblx0XHRpZih2YXJzLmZyb20gIT0gdW5kZWZpbmVkICYmIHZhcnMudG8gIT0gdW5kZWZpbmVkKSB7XG5cdFx0XHR2YXIgY29udHJvbGxlciA9IGZvbGRlci5hZGQocHJvcHMsIGlkLCB2YXJzLmZyb20sIHZhcnMudG8pO1xuXHRcdFx0Y29udHJvbGxlci5vbkNoYW5nZSgodmFsdWUpPT4ge1xuXHRcdFx0XHRwcm9wc1tpZF0gPSB2YWx1ZVxuXHRcdFx0fSlcblx0XHR9ZWxzZSBpZih2YXJzLmNvbG9yICE9IHVuZGVmaW5lZCkge1xuXHRcdFx0dmFyIGNvbnRyb2xsZXIgPSBmb2xkZXIuYWRkQ29sb3IocHJvcHMsIGlkLCB2YXJzLmNvbG9yKTtcblx0XHRcdGNvbnRyb2xsZXIub25DaGFuZ2UoKHZhbHVlKT0+IHtcblx0XHRcdFx0dmFyIGhleCA9IFV0aWxzLnJnYlRvSGV4KE1hdGgucm91bmQodmFsdWUuciksIE1hdGgucm91bmQodmFsdWUuZyksIE1hdGgucm91bmQodmFsdWUuYikpXG5cdFx0XHRcdHZhciBjb2xvciA9IG5ldyBUSFJFRS5Db2xvcihoZXgpXG5cdFx0XHRcdHByb3BzW2lkXSA9IGNvbG9yXG5cdFx0XHRcdGNvbnNvbGUubG9nKGlkLCBoZXgpXG5cdFx0XHR9KVxuXHRcdH1lbHNlIGlmKHZhcnMueCAhPSB1bmRlZmluZWQgJiYgdmFycy55ICE9IHVuZGVmaW5lZCAmJiB2YXJzLnogIT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRmb2xkZXIuYWRkKHByb3BzLnBvc2l0aW9uLCAneCcsIC12YXJzLngsIHZhcnMueCk7XG5cdFx0XHRmb2xkZXIuYWRkKHByb3BzLnBvc2l0aW9uLCAneScsIC12YXJzLnksIHZhcnMueSk7XG5cdFx0XHRmb2xkZXIuYWRkKHByb3BzLnBvc2l0aW9uLCAneicsIC12YXJzLnosIHZhcnMueik7XG5cdFx0fVxuXG5cdH1cblx0YWRkVmFsdWUoKSB7XG5cblx0fVxufVxuIiwiaW1wb3J0IEdVSSBmcm9tICdHVUknXG5cbmZ1bmN0aW9uIF9jaGVja1NoYWRpbmcocHJvcHMpIHtcblx0dmFyIHNoYWRpbmcgPSBwcm9wcy5zaGFkaW5nIHx8IFRIUkVFLlNtb290aFNoYWRpbmdcblx0cHJvcHMuc2hhZGluZyA9IHNoYWRpbmdcbn1cblxudmFyIE1hdGVyaWFscyA9IHtcblx0TWVzaFN0YW5kYXJkTWF0ZXJpYWw6IGZ1bmN0aW9uKGlkLCBwcm9wcykge1xuXHRcdF9jaGVja1NoYWRpbmcocHJvcHMpXG5cdFx0dmFyIG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsKCBwcm9wcyApXG5cdFx0R1VJLnNldFN0YW5kYXJkTWF0ZXJpYWwoaWQsIG1hdGVyaWFsKVxuXHRcdHJldHVybiBtYXRlcmlhbFxuXHR9LFxuXHRNZXNoUGhvbmdNYXRlcmlhbDogZnVuY3Rpb24oaWQsIHByb3BzKSB7XG5cdFx0X2NoZWNrU2hhZGluZyhwcm9wcylcblx0XHR2YXIgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaFBob25nTWF0ZXJpYWwoIHByb3BzIClcblx0XHRHVUkuc2V0UGhvbmdNYXRlcmlhbChpZCwgbWF0ZXJpYWwpXG5cdFx0cmV0dXJuIG1hdGVyaWFsXG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWF0ZXJpYWxzIiwiaW1wb3J0IFV0aWxzIGZyb20gJ1V0aWxzJ1xuaW1wb3J0IFRleHR1cmVBbmltYXRvciBmcm9tICdUZXh0dXJlQW5pbWF0b3InXG5pbXBvcnQgQW5pbWF0ZWRQYXJ0aWNsZSBmcm9tICdBbmltYXRlZFBhcnRpY2xlJ1xuXG5leHBvcnQgZGVmYXVsdCAobWF0ZXJpYWwsIGFuaW1UZXh0dXJlcyk9PiB7XG5cdHZhciBzY29wZTtcblx0dmFyIG1lYXRNZXNoID0gbmV3IFRIUkVFLk1lc2goKVxuXHR2YXIgaW50ZXJzZWN0aW9uO1xuXHRjb25zdCBVUCA9ICdVUCdcblx0Y29uc3QgRE9XTiA9ICdET1dOJ1xuXHRsZXQgY291bnRlciA9IDBcblx0bGV0IGZvcmNlID0gVXRpbHMuUmFuZCgtLjEsIC4xLCAzKVxuXHRsZXQgYW5pbVN0YXRlID0gRE9XTlxuXHRsZXQgY29udGFpbmVyID0gbmV3IFRIUkVFLk9iamVjdDNEKClcblx0bGV0IGFuaW1Db250YWluZXIgPSBuZXcgVEhSRUUuT2JqZWN0M0QoKVxuXHRsZXQgcGFydGljbGVJbmRleCA9IDBcblx0Y29udGFpbmVyLmFkZChtZWF0TWVzaClcblx0Y29udGFpbmVyLmFkZChhbmltQ29udGFpbmVyKVxuXHRtZWF0TWVzaC5tYXRlcmlhbCA9IG1hdGVyaWFsXG5cdGNvbnRhaW5lci5wb3NpdGlvbi54ID0gMFxuXHRjb250YWluZXIudmVsb2NpdHkgPSBuZXcgVEhSRUUuVmVjdG9yMygwLCAwLCAwKVxuXHRjb250YWluZXIub2Zmc2V0ID0gbmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgMClcblx0Y29udGFpbmVyLm9mZnNldFVwID0gbmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgMClcblx0Y29udGFpbmVyLmRpciA9IE1hdGgucmFuZG9tKCkgKiAxID4gMC40NSA/IDEgOiAtMVxuXHRjb250YWluZXIub3BhY2l0eSA9IDBcblxuXHRsZXQgYW5pbWF0b3IgPSB1bmRlZmluZWRcblx0bGV0IGdlb21ldHJ5ID0gbmV3IFRIUkVFLlBsYW5lR2VvbWV0cnkoMTAwLCAxMDAsIDEsIDEpO1xuXHRsZXQgYW5pbWF0ZWRQYXJ0aWNsZXMgPSBbXVxuXHRmb3IgKGxldCBhbmltVGV4IG9mIGFuaW1UZXh0dXJlcykge1xuXHRcdGxldCBwID0gQW5pbWF0ZWRQYXJ0aWNsZShhbmltQ29udGFpbmVyLCBhbmltVGV4LnRleCwgZ2VvbWV0cnksIGFuaW1hdG9yLCBhbmltVGV4LnNjYWxlKVxuXHRcdHAubWVzaC5zY2FsZS5zZXQoMCwgMCwgMClcblx0XHRhbmltYXRlZFBhcnRpY2xlcy5wdXNoKHApXG5cdH1cblxuXHRsZXQgYW5pbWF0ZWRQYXJ0aWNsZSA9IGFuaW1hdGVkUGFydGljbGVzW3BhcnRpY2xlSW5kZXhdXG5cdHNldEludGVydmFsKCgpPT57XG5cdFx0cGFydGljbGVJbmRleCsrXG5cdFx0aWYocGFydGljbGVJbmRleCA+IGFuaW1hdGVkUGFydGljbGVzLmxlbmd0aC0xKSBwYXJ0aWNsZUluZGV4ID0gMFxuXHRcdFR3ZWVuTWF4LnRvKGFuaW1hdGVkUGFydGljbGUubWVzaC5zY2FsZSwgMC41LCB7IHg6MCwgeTowLCB6OjAsIGVhc2U6RXhwby5lYXNlT3V0IH0pXG5cdFx0c2V0VGltZW91dCgoKT0+IHtcblx0XHRcdGFuaW1hdGVkUGFydGljbGUgPSBhbmltYXRlZFBhcnRpY2xlc1twYXJ0aWNsZUluZGV4XVxuXHRcdH0sIDAuNilcblx0fSwgMTQwMDApXG5cblx0dmFyIHJlc2V0TWVzaCA9ICgpID0+IHtcblx0XHRsZXQgc2NhbGUgPSBVdGlscy5SYW5kKDAuMDAxLCAwLjAwNCwgNClcblx0XHRjb250YWluZXIuc2NhbGUuc2V0KHNjYWxlLCBzY2FsZSwgc2NhbGUpXG5cdFx0Y29udGFpbmVyLnZlbG9jaXR5LnkgPSBVdGlscy5SYW5kKDEwLCAyMCwgMylcblx0XHRjb250YWluZXIub2Zmc2V0LnggPSBNYXRoLnJhZGlhbnMoVXRpbHMuUmFuZCgtNTAsIDUwLCAwKSlcblx0XHRjb250YWluZXIub2Zmc2V0VXAueCA9IFV0aWxzLlJhbmQoMTAsIDIwMCwgMClcblx0XHRjb250YWluZXIucm90YXRpb24ueCA9IE1hdGgucmFkaWFucyhVdGlscy5SYW5kKC0xODAsIDE4MCwgMCkpXG5cdFx0Y29udGFpbmVyLnJvdGF0aW9uLnkgPSBNYXRoLnJhZGlhbnMoVXRpbHMuUmFuZCgtMTgwLCAxODAsIDApKVxuXHRcdGNvbnRhaW5lci5yb3RhdGlvbi56ID0gTWF0aC5yYWRpYW5zKFV0aWxzLlJhbmQoLTE4MCwgMTgwLCAwKSlcblx0XHRjb250YWluZXIub3BhY2l0eSA9IDFcblx0XHRtZWF0TWVzaC5zY2FsZS5zZXQoMSwgMSwgMSlcblx0XHRtZWF0TWVzaC5tYXRlcmlhbC5vcGFjaXR5ID0gY29udGFpbmVyLm9wYWNpdHlcblx0XHRhbmltYXRlZFBhcnRpY2xlLm1lc2guc2NhbGUuc2V0KGFuaW1hdGVkUGFydGljbGUuc2NhbGUsIGFuaW1hdGVkUGFydGljbGUuc2NhbGUsIGFuaW1hdGVkUGFydGljbGUuc2NhbGUpXG5cdFx0YW5pbWF0ZWRQYXJ0aWNsZS5tZXNoLm1hdGVyaWFsLm9wYWNpdHkgPSAwXG5cdFx0bWVhdE1lc2gucG9zaXRpb24ueSA9IDBcblx0fVxuXHRyZXNldE1lc2goKVxuXHRcblx0c2NvcGUgPSB7XG5cdFx0Z2VvbWV0cnlBZGRUbzogKGdlb21ldHJ5LCBwYXJlbnQpID0+IHtcblx0XHRcdG1lYXRNZXNoLmdlb21ldHJ5ID0gZ2VvbWV0cnlcblx0XHRcdHBhcmVudC5hZGQoY29udGFpbmVyKVxuXHRcdH0sXG5cdFx0dXBkYXRlOiAoaW50ZXIpPT4ge1xuXHRcdFx0Y291bnRlciArPSBmb3JjZVxuXHRcdFx0aW50ZXJzZWN0aW9uID0gaW50ZXJcblxuXHRcdFx0aWYoYW5pbVN0YXRlID09PSBET1dOKSB7XG5cdFx0XHRcdGNvbnRhaW5lci5wb3NpdGlvbi55IC09IGNvbnRhaW5lci52ZWxvY2l0eS55ICogMC41XG5cdFx0XHRcdGNvbnRhaW5lci5yb3RhdGlvbi54ICs9IDAuMDAyXG5cdFx0XHRcdGNvbnRhaW5lci5yb3RhdGlvbi55ICs9IDAuMDAzXG5cdFx0XHRcdGNvbnRhaW5lci5yb3RhdGlvbi56ICs9IDAuMDA1XG5cdFx0XHRcdGNvbnRhaW5lci5wb3NpdGlvbi54ICs9IGNvbnRhaW5lci5vZmZzZXQueFxuXHRcdFx0XHRhbmltYXRlZFBhcnRpY2xlLm1lc2gubWF0ZXJpYWwub3BhY2l0eSA9IDBcblx0XHRcdFx0aWYoY29udGFpbmVyLnBvc2l0aW9uLnkgPCAtNjAwKSB7XG5cdFx0XHRcdFx0YW5pbVN0YXRlID0gVVBcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIGlmKGFuaW1TdGF0ZSA9PT0gVVApIHtcblx0XHRcdFx0Y29udGFpbmVyLnBvc2l0aW9uLnkgKz0gY29udGFpbmVyLnZlbG9jaXR5LnkgKiAwLjJcblx0XHRcdFx0Y29udGFpbmVyLnBvc2l0aW9uLnggPSBNYXRoLnNpbihjb3VudGVyKSAqIGNvbnRhaW5lci5vZmZzZXRVcC54XG5cdFx0XHRcdGNvbnRhaW5lci5wb3NpdGlvbi56ID0gTWF0aC5jb3MoY291bnRlcikgKiBjb250YWluZXIub2Zmc2V0VXAueFxuXHRcdFx0XHRpZihjb250YWluZXIucG9zaXRpb24ueSA+IDUwKSBjb250YWluZXIub3BhY2l0eSArPSAoMC4wMDEgLSBjb250YWluZXIub3BhY2l0eSkgKiAwLjVcblx0XHRcdFx0Y29udGFpbmVyLnJvdGF0aW9uLnggPSAwXG5cdFx0XHRcdGNvbnRhaW5lci5yb3RhdGlvbi55ID0gMFxuXHRcdFx0XHRjb250YWluZXIucm90YXRpb24ueiA9IDBcblx0XHRcdFx0bWVhdE1lc2gubWF0ZXJpYWwub3BhY2l0eSA9IDBcblx0XHRcdFx0bWVhdE1lc2guc2NhbGUuc2V0KDAsIDAsIDApXG5cdFx0XHRcdFxuXHRcdFx0XHRhbmltYXRlZFBhcnRpY2xlLm1lc2gubWF0ZXJpYWwub3BhY2l0eSA9IGNvbnRhaW5lci5vcGFjaXR5XG5cdFx0XHRcdGlmKGNvbnRhaW5lci5vcGFjaXR5IDwgMC4wMSkge1xuXHRcdFx0XHRcdHNjb3BlLnJlc2V0KClcblx0XHRcdFx0XHRhbmltU3RhdGUgPSBET1dOXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LFxuXHRcdHJlc2V0OiAoKT0+IHtcblx0XHRcdGlmKGludGVyc2VjdGlvbikge1xuXHRcdFx0XHRjb250YWluZXIucG9zaXRpb24ueCA9IGludGVyc2VjdGlvbi5wb2ludC54XG5cdFx0XHRcdGNvbnRhaW5lci5wb3NpdGlvbi55ID0gaW50ZXJzZWN0aW9uLnBvaW50Lnlcblx0XHRcdFx0Y29udGFpbmVyLnBvc2l0aW9uLnogPSAyMDBcblx0XHRcdFx0cmVzZXRNZXNoKClcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gc2NvcGVcbn0iLCJpbXBvcnQgTWVhdFBhcnRpY2xlIGZyb20gJ01lYXRQYXJ0aWNsZSdcbmltcG9ydCBVdGlscyBmcm9tICdVdGlscydcbmltcG9ydCBBbmltYXRlZFBhcnRpY2xlIGZyb20gJ0FuaW1hdGVkUGFydGljbGUnXG5cbmV4cG9ydCBkZWZhdWx0IChjb250YWluZXIpPT4ge1xuXHR2YXIgc2NvcGU7XG5cdGxldCBwYXJlbnQgPSBuZXcgVEhSRUUuT2JqZWN0M0QoKVxuXHRsZXQgaW50ZXJzZWN0aW9uO1xuXG5cdGNvbnN0IE1FQVRfUEFSVElDTEVTX05VTSA9IDEwMFxuXHRsZXQgbWVhdFRleHR1cmUgPSBVdGlscy5Mb2FkVGV4dHVyZShcIlNoYXdhcm1hLWRpZmYuanBnXCIpXG5cdGxldCBtZWF0RGlmZnVzZUNvbG9yID0gbmV3IFRIUkVFLkNvbG9yKCAweGZmZmZmZiApXG5cdGxldCBtZWF0TWV0YWxuZXNzID0gMC41XG5cdGxldCBtZWF0Um91Z2huZXNzID0gMS4wXG5cblx0bGV0IGFuaW1UZXh0dXJlcyA9IFtcblx0XHR7XG5cdFx0XHR0ZXg6IG5ldyBUSFJFRS5JbWFnZVV0aWxzLmxvYWRUZXh0dXJlKCAnaW1hZ2UvdGV4dHVyZXMvZmF2b3JpdGUtaWNvbi5wbmcnICksXG5cdFx0XHRob3Jpem9udGFsOiA0LCBcblx0XHRcdHZlcnRpY2FsOiAxLCBcblx0XHRcdHRvdGFsOiA0LCBcblx0XHRcdGR1cmF0aW9uOiAxNTAsXG5cdFx0XHRzY2FsZTogMTAwXG5cdFx0fVxuXHRdXG5cblx0bGV0IHBhcnRpY2xlcyA9IFtdXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgTUVBVF9QQVJUSUNMRVNfTlVNOyBpKyspIHtcblx0XHRsZXQgbWVhdE1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsKHtcblx0XHRcdG1hcDogbWVhdFRleHR1cmUsXG5cdFx0XHRjb2xvcjogbWVhdERpZmZ1c2VDb2xvcixcblx0XHRcdG1ldGFsbmVzczogbWVhdE1ldGFsbmVzcyxcblx0XHRcdHJvdWdobmVzczogbWVhdFJvdWdobmVzcyxcblx0XHRcdHRyYW5zcGFyZW50OiB0cnVlXG5cdFx0fSlcblx0XHRwYXJ0aWNsZXNbaV0gPSBNZWF0UGFydGljbGUobWVhdE1hdGVyaWFsLCBhbmltVGV4dHVyZXMpXG5cdH1cblxuXHRjb250YWluZXIuYWRkKHBhcmVudClcblxuXHRzY29wZSA9IHtcblx0XHR1cGRhdGU6IChpbnRlcik9PiB7XG5cdFx0XHRpbnRlcnNlY3Rpb24gPSBpbnRlclxuXHRcdFx0cGFydGljbGVzLmZvckVhY2gocCA9PiB7XG5cdFx0XHRcdHAudXBkYXRlKGludGVyc2VjdGlvbilcblx0XHRcdH0pXG5cdFx0fSxcblx0XHRzZXR1cDogKGdlb21ldHJ5KT0+IHtcblxuXHRcdFx0cGFydGljbGVzLmZvckVhY2gocGFydGljbGUgPT4ge1xuXHRcdFx0XHRwYXJ0aWNsZS5nZW9tZXRyeUFkZFRvKGdlb21ldHJ5LCBwYXJlbnQpXG5cdFx0XHRcdHBhcnRpY2xlLnJlc2V0KClcblx0XHRcdH0pXG5cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gc2NvcGVcbn0iLCJpbXBvcnQgZG9tIGZyb20gJ2RvbS1oYW5kJ1xuXG5leHBvcnQgZGVmYXVsdCAocGFyZW50KT0+IHtcblx0dmFyIHNjb3BlO1xuXHRjb25zdCBtc2dzID0gZG9tLnNlbGVjdC5hbGwoJy5tc2cnLCBwYXJlbnQpXG5cdGxldCBvbGRJdGVtLCBuZXdJdGVtO1xuXHRsZXQgY3VycmVudEluZGV4ID0gMFxuXHRsZXQgaXRlbXMgPSBbXVxuXHRcblx0bXNncy5mb3JFYWNoKChtc2cpID0+IHtcblx0XHRpdGVtcy5wdXNoKHtcblx0XHRcdGVsOiBtc2csXG5cdFx0XHRzaXplOiBbMCwwXSxcblx0XHRcdHR3ZWVuSW46IHVuZGVmaW5lZCxcblx0XHRcdHR3ZWVuT3V0OiB1bmRlZmluZWRcblx0XHR9KVxuXHR9KVxuXG5cdHNjb3BlID0ge1xuXHRcdHNob3dNc2c6ICgpID0+IHtcblx0XHRcdGN1cnJlbnRJbmRleCsrXG5cdFx0XHRpZihjdXJyZW50SW5kZXggPiBpdGVtcy5sZW5ndGggLSAxKSBjdXJyZW50SW5kZXggPSAwXG5cblx0XHRcdG9sZEl0ZW0gPSBuZXdJdGVtXG5cdFx0XHRuZXdJdGVtID0gaXRlbXNbY3VycmVudEluZGV4XVxuXG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+IG5ld0l0ZW0udHdlZW5Jbi5wbGF5KDApLCAwKVxuXHRcdFx0c2V0VGltZW91dCgoKSA9PiBuZXdJdGVtLnR3ZWVuT3V0LnBsYXkoMCksIDEyMDApXG5cdFx0fSxcblx0XHRyZXNpemU6ICgpID0+IHtcblx0XHRcdGl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcblx0XHRcdFx0bGV0IHNpemUgPSBkb20uc2l6ZShpdGVtLmVsKVxuXHRcdFx0XHRpdGVtLnNpemVbMF0gPSBzaXplWzBdXG5cdFx0XHRcdGl0ZW0uc2l6ZVsxXSA9IHNpemVbMV1cblx0XHRcdFx0aXRlbS5lbC5zdHlsZS5sZWZ0ID0gKHdpbmRvdy5pbm5lcldpZHRoID4+IDEpIC0gKGl0ZW0uc2l6ZVswXSA+PiAxKSArICdweCdcblx0XHRcdFx0aXRlbS5lbC5zdHlsZS50b3AgPSAod2luZG93LmlubmVySGVpZ2h0ID4+IDEpIC0gKGl0ZW0uc2l6ZVsxXSA+PiAxKSArICdweCdcblxuXHRcdFx0XHRpdGVtLnR3ZWVuSW4gPSBUd2Vlbk1heC5mcm9tVG8oaXRlbS5lbCwgMC42LCB7IHNjYWxlOjAuNiwgb3BhY2l0eTowIH0sIHsgc2NhbGU6MSwgcGF1c2VkOnRydWUsIG9wYWNpdHk6MSwgZm9yY2UzRDp0cnVlLCBlYXNlOkVsYXN0aWMuZWFzZU91dCB9KVxuXHRcdFx0XHRpdGVtLnR3ZWVuT3V0ID0gVHdlZW5NYXgudG8oaXRlbS5lbCwgMC4zLCB7IHNjYWxlOjIuNCwgb3BhY2l0eTowLCBmb3JjZTNEOnRydWUsIHBhdXNlZDp0cnVlLCBlYXNlOkV4cG8uZWFzZUluT3V0IH0pXG5cblx0XHRcdH0pXG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHNjb3BlXG59IiwiZXhwb3J0IGRlZmF1bHQgKHRleHR1cmUsIHRpbGVzSG9yaXosIHRpbGVzVmVydCwgbnVtVGlsZXMsIHRpbGVEaXNwRHVyYXRpb24pPT4ge1xuXHR2YXIgc2NvcGU7XG5cblx0Ly8gbm90ZTogdGV4dHVyZSBwYXNzZWQgYnkgcmVmZXJlbmNlLCB3aWxsIGJlIHVwZGF0ZWQgYnkgdGhlIHVwZGF0ZSBmdW5jdGlvbi5cblx0XHRcblx0dmFyIHRpbGVzSG9yaXpvbnRhbCA9IHRpbGVzSG9yaXo7XG5cdHZhciB0aWxlc1ZlcnRpY2FsID0gdGlsZXNWZXJ0O1xuXHQvLyBob3cgbWFueSBpbWFnZXMgZG9lcyB0aGlzIHNwcml0ZXNoZWV0IGNvbnRhaW4/XG5cdC8vICB1c3VhbGx5IGVxdWFscyB0aWxlc0hvcml6ICogdGlsZXNWZXJ0LCBidXQgbm90IG5lY2Vzc2FyaWx5LFxuXHQvLyAgaWYgdGhlcmUgYXQgYmxhbmsgdGlsZXMgYXQgdGhlIGJvdHRvbSBvZiB0aGUgc3ByaXRlc2hlZXQuIFxuXHR2YXIgbnVtYmVyT2ZUaWxlcyA9IG51bVRpbGVzO1xuXHR0ZXh0dXJlLndyYXBTID0gdGV4dHVyZS53cmFwVCA9IFRIUkVFLlJlcGVhdFdyYXBwaW5nOyBcblx0dGV4dHVyZS5yZXBlYXQuc2V0KCAxIC8gdGlsZXNIb3Jpem9udGFsLCAxIC8gdGlsZXNWZXJ0aWNhbCApO1xuXG5cdC8vIGhvdyBsb25nIHNob3VsZCBlYWNoIGltYWdlIGJlIGRpc3BsYXllZD9cblx0dmFyIHRpbGVEaXNwbGF5RHVyYXRpb24gPSB0aWxlRGlzcER1cmF0aW9uO1xuXG5cdC8vIGhvdyBsb25nIGhhcyB0aGUgY3VycmVudCBpbWFnZSBiZWVuIGRpc3BsYXllZD9cblx0dmFyIGN1cnJlbnREaXNwbGF5VGltZSA9IDA7XG5cblx0Ly8gd2hpY2ggaW1hZ2UgaXMgY3VycmVudGx5IGJlaW5nIGRpc3BsYXllZD9cblx0dmFyIGN1cnJlbnRUaWxlID0gMDtcblx0XG5cdHNjb3BlID0ge1xuXHRcdHVwZGF0ZTogKG1pbGxpU2VjKT0+IHtcblx0XHRcdGN1cnJlbnREaXNwbGF5VGltZSArPSBtaWxsaVNlYztcblx0XHRcdHdoaWxlIChjdXJyZW50RGlzcGxheVRpbWUgPiB0aWxlRGlzcGxheUR1cmF0aW9uKVxuXHRcdFx0e1xuXHRcdFx0XHRjdXJyZW50RGlzcGxheVRpbWUgLT0gdGlsZURpc3BsYXlEdXJhdGlvbjtcblx0XHRcdFx0Y3VycmVudFRpbGUrKztcblx0XHRcdFx0aWYgKGN1cnJlbnRUaWxlID09IG51bWJlck9mVGlsZXMpXG5cdFx0XHRcdFx0Y3VycmVudFRpbGUgPSAwO1xuXHRcdFx0XHR2YXIgY3VycmVudENvbHVtbiA9IGN1cnJlbnRUaWxlICUgdGlsZXNIb3Jpem9udGFsO1xuXHRcdFx0XHR0ZXh0dXJlLm9mZnNldC54ID0gY3VycmVudENvbHVtbiAvIHRpbGVzSG9yaXpvbnRhbDtcblx0XHRcdFx0dmFyIGN1cnJlbnRSb3cgPSBNYXRoLmZsb29yKCBjdXJyZW50VGlsZSAvIHRpbGVzSG9yaXpvbnRhbCApO1xuXHRcdFx0XHR0ZXh0dXJlLm9mZnNldC55ID0gY3VycmVudFJvdyAvIHRpbGVzVmVydGljYWw7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHNjb3BlXG59IiwiZXhwb3J0IGRlZmF1bHQge1xuXHRXSU5ET1dfUkVTSVpFOiAnV0lORE9XX1JFU0laRScsXG5cdFBBR0VfSEFTSEVSX0NIQU5HRUQ6ICdQQUdFX0hBU0hFUl9DSEFOR0VEJyxcblx0UEFHRV9BU1NFVFNfTE9BREVEOiAnUEFHRV9BU1NFVFNfTE9BREVEJyxcblx0QVBQX1NUQVJUOiAnQVBQX1NUQVJUJyxcblxuXHRMQU5EU0NBUEU6ICdMQU5EU0NBUEUnLFxuXHRQT1JUUkFJVDogJ1BPUlRSQUlUJyxcblxuXHRGT1JXQVJEOiAnRk9SV0FSRCcsXG5cdEJBQ0tXQVJEOiAnQkFDS1dBUkQnLFxuXG5cdExFRlQ6ICdMRUZUJyxcblx0UklHSFQ6ICdSSUdIVCcsXG5cdFRPUDogJ1RPUCcsXG5cdEJPVFRPTTogJ0JPVFRPTScsXG5cblx0S0VCQUI6IHtcblx0XHRCQVNFOiAnQkFTRScsXG5cdFx0U0lMVkVSOiAnU0lMVkVSJyxcblx0XHRUT01BVE86ICdUT01BVE8nLFxuXHRcdFBBUlRJQ0xFOiAnUEFSVElDTEUnLFxuXHR9LFxuXG5cdEVOVklST05NRU5UUzoge1xuXHRcdFBSRVBST0Q6IHtcblx0XHRcdHN0YXRpYzogJydcblx0XHR9LFxuXHRcdFBST0Q6IHtcblx0XHRcdFwic3RhdGljXCI6IEpTX3VybF9zdGF0aWMgKyAnLydcblx0XHR9XG5cdH0sXG5cblx0TUVESUFfR0xPQkFMX1c6IDE5MjAsXG5cdE1FRElBX0dMT0JBTF9IOiAxMDgwLFxuXG5cdE1JTl9NSURETEVfVzogOTYwLFxuXHRNUV9YU01BTEw6IDMyMCxcblx0TVFfU01BTEw6IDQ4MCxcblx0TVFfTUVESVVNOiA3NjgsXG5cdE1RX0xBUkdFOiAxMDI0LFxuXHRNUV9YTEFSR0U6IDEyODAsXG5cdE1RX1hYTEFSR0U6IDE2ODAsXG59IiwiaW1wb3J0IEZsdXggZnJvbSAnZmx1eCdcbmltcG9ydCBhc3NpZ24gZnJvbSAnb2JqZWN0LWFzc2lnbidcblxudmFyIEFwcERpc3BhdGNoZXIgPSBhc3NpZ24obmV3IEZsdXguRGlzcGF0Y2hlcigpLCB7XG5cdGhhbmRsZVZpZXdBY3Rpb246IGZ1bmN0aW9uKGFjdGlvbikge1xuXHRcdHRoaXMuZGlzcGF0Y2goe1xuXHRcdFx0c291cmNlOiAnVklFV19BQ1RJT04nLFxuXHRcdFx0YWN0aW9uOiBhY3Rpb25cblx0XHR9KTtcblx0fVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IEFwcERpc3BhdGNoZXIiLCJpbXBvcnQgQXBwQWN0aW9ucyBmcm9tICdBcHBBY3Rpb25zJ1xuaW1wb3J0IGRvbSBmcm9tICdkb20taGFuZCdcbiAgICBcdFxuY2xhc3MgR2xvYmFsRXZlbnRzIHtcblx0aW5pdCgpIHtcblx0XHRkb20uZXZlbnQub24od2luZG93LCAncmVzaXplJywgdGhpcy5yZXNpemUpXG5cdH1cblx0cmVzaXplKCkge1xuXHRcdEFwcEFjdGlvbnMud2luZG93UmVzaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpXG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR2xvYmFsRXZlbnRzXG4iLCJpbXBvcnQgQXBwU3RvcmUgZnJvbSAnQXBwU3RvcmUnXG5cbmNsYXNzIFByZWxvYWRlciAge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLnF1ZXVlID0gbmV3IGNyZWF0ZWpzLkxvYWRRdWV1ZShmYWxzZSlcblx0XHR0aGlzLnF1ZXVlLm9uKFwiY29tcGxldGVcIiwgdGhpcy5vbk1hbmlmZXN0TG9hZENvbXBsZXRlZCwgdGhpcylcblx0XHR0aGlzLmN1cnJlbnRMb2FkZWRDYWxsYmFjayA9IHVuZGVmaW5lZFxuXHRcdHRoaXMuYWxsTWFuaWZlc3RzID0gW11cblx0fVxuXHRsb2FkKG1hbmlmZXN0LCBvbkxvYWRlZCkge1xuXG5cdFx0aWYodGhpcy5hbGxNYW5pZmVzdHMubGVuZ3RoID4gMCkge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmFsbE1hbmlmZXN0cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHR2YXIgbSA9IHRoaXMuYWxsTWFuaWZlc3RzW2ldXG5cdFx0XHRcdGlmKG0ubGVuZ3RoID09IG1hbmlmZXN0Lmxlbmd0aCAmJiBtWzBdLmlkID09IG1hbmlmZXN0WzBdLmlkICYmIG1bbS5sZW5ndGgtMV0uaWQgPT0gbWFuaWZlc3RbbWFuaWZlc3QubGVuZ3RoLTFdLmlkKSB7XG5cdFx0XHRcdFx0b25Mb2FkZWQoKVx0XG5cdFx0XHRcdFx0cmV0dXJuXG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0dGhpcy5hbGxNYW5pZmVzdHMucHVzaChtYW5pZmVzdClcblx0XHR0aGlzLmN1cnJlbnRMb2FkZWRDYWxsYmFjayA9IG9uTG9hZGVkXG4gICAgICAgIHRoaXMucXVldWUubG9hZE1hbmlmZXN0KG1hbmlmZXN0KVxuXHR9XG5cdG9uTWFuaWZlc3RMb2FkQ29tcGxldGVkKCkge1xuXHRcdHRoaXMuY3VycmVudExvYWRlZENhbGxiYWNrKClcblx0fVxuXHRnZXRDb250ZW50QnlJZChpZCkge1xuXHRcdHJldHVybiB0aGlzLnF1ZXVlLmdldFJlc3VsdChpZClcblx0fVxuXHRnZXRJbWFnZVVSTChpZCkge1xuXHRcdHJldHVybiB0aGlzLmdldENvbnRlbnRCeUlkKGlkKS5nZXRBdHRyaWJ1dGUoXCJzcmNcIilcblx0fVxuXHRnZXRJbWFnZVNpemUoaWQpIHtcblx0XHR2YXIgY29udGVudCA9IHRoaXMuZ2V0Q29udGVudEJ5SWQoaWQpXG5cdFx0cmV0dXJuIHsgd2lkdGg6IGNvbnRlbnQubmF0dXJhbFdpZHRoLCBoZWlnaHQ6IGNvbnRlbnQubmF0dXJhbEhlaWdodCB9XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUHJlbG9hZGVyXG4iLCJpbXBvcnQgaGFzaGVyIGZyb20gJ2hhc2hlcidcbmltcG9ydCBBcHBBY3Rpb25zIGZyb20gJ0FwcEFjdGlvbnMnXG5pbXBvcnQgY3Jvc3Nyb2FkcyBmcm9tICdjcm9zc3JvYWRzJ1xuaW1wb3J0IEFwcFN0b3JlIGZyb20gJ0FwcFN0b3JlJ1xuaW1wb3J0IGRhdGEgZnJvbSAnR2xvYmFsRGF0YSdcbmltcG9ydCBBcHBDb25zdGFudHMgZnJvbSAnQXBwQ29uc3RhbnRzJ1xuXG5jbGFzcyBSb3V0ZXIge1xuXHRpbml0KCkge1xuXHRcdHRoaXMucm91dGluZyA9IGRhdGEucm91dGluZ1xuXHRcdHRoaXMuc2V0dXBSb3V0ZXMoKVxuXHRcdHRoaXMuZmlyc3RQYXNzID0gdHJ1ZVxuXHRcdHRoaXMubmV3SGFzaEZvdW5kZWQgPSBmYWxzZVxuXHRcdGhhc2hlci5uZXdIYXNoID0gdW5kZWZpbmVkXG5cdFx0aGFzaGVyLm9sZEhhc2ggPSB1bmRlZmluZWRcblxuXHRcdC8vIHJlbW92ZSB0aGUgYW5hbHl0aWNzIHBhcmFtZXRlcnNcblx0XHR2YXIgbG9jID0gQXBwU3RvcmUuRGV0ZWN0b3IuaXNTYWZhcmkgPyBsb2NhdGlvbi5oYXNoIDogd2luZG93LmxvY2F0aW9uLmhhc2hcblx0XHR2YXIgaGFzaCA9IGxvYy5zcGxpdCgnPycpXG5cdFx0d2luZG93LmxvY2F0aW9uLmhhc2ggPSBoYXNoWzBdXG5cblx0XHRoYXNoZXIuaW5pdGlhbGl6ZWQuYWRkKHRoaXMuZGlkSGFzaGVyQ2hhbmdlLmJpbmQodGhpcykpXG5cdFx0aGFzaGVyLmNoYW5nZWQuYWRkKHRoaXMuZGlkSGFzaGVyQ2hhbmdlLmJpbmQodGhpcykpXG5cdFx0dGhpcy5zZXR1cENyb3Nzcm9hZHMoKVxuXHR9XG5cdGJlZ2luUm91dGluZygpIHtcblx0XHRoYXNoZXIuaW5pdCgpXG5cdH1cblx0c2V0dXBDcm9zc3JvYWRzKCkge1xuXHQgXHR2YXIgcm91dGVzID0gaGFzaGVyLnJvdXRlc1xuXHQgXHRmb3IgKHZhciBpID0gMDsgaSA8IHJvdXRlcy5sZW5ndGg7IGkrKykge1xuXHQgXHRcdHZhciByb3V0ZSA9IHJvdXRlc1tpXVxuXHQgXHRcdGNyb3Nzcm9hZHMuYWRkUm91dGUocm91dGUsIHRoaXMub25QYXJzZVVybC5iaW5kKHRoaXMpKVxuXHQgXHR9O1xuXHRcdGNyb3Nzcm9hZHMuYWRkUm91dGUoJycsIHRoaXMub25QYXJzZVVybC5iaW5kKHRoaXMpKVxuXHR9XG5cdG9uUGFyc2VVcmwoKSB7XG5cdFx0dGhpcy5hc3NpZ25Sb3V0ZSgpXG5cdH1cblx0b25EZWZhdWx0VVJMSGFuZGxlcigpIHtcblx0XHR0aGlzLnNlbmRUb0RlZmF1bHQoKVxuXHR9XG5cdGFzc2lnblJvdXRlKGlkKSB7XG5cdFx0dmFyIGhhc2ggPSBoYXNoZXIuZ2V0SGFzaCgpXG5cdFx0dmFyIHBhcnRzID0gdGhpcy5nZXRVUkxQYXJ0cyhoYXNoKVxuXHRcdHRoaXMudXBkYXRlUGFnZVJvdXRlKGhhc2gsIHBhcnRzLCBwYXJ0c1swXSwgKHBhcnRzWzFdID09IHVuZGVmaW5lZCkgPyAnJyA6IHBhcnRzWzFdKVxuXHRcdHRoaXMubmV3SGFzaEZvdW5kZWQgPSB0cnVlXG5cdH1cblx0Z2V0VVJMUGFydHModXJsKSB7XG5cdFx0dmFyIGhhc2ggPSB1cmxcblx0XHRyZXR1cm4gaGFzaC5zcGxpdCgnLycpXG5cdH1cblx0dXBkYXRlUGFnZVJvdXRlKGhhc2gsIHBhcnRzLCBwYXJlbnQsIHRhcmdldCkge1xuXHRcdGhhc2hlci5vbGRIYXNoID0gaGFzaGVyLm5ld0hhc2hcblx0XHRoYXNoZXIubmV3SGFzaCA9IHtcblx0XHRcdGhhc2g6IGhhc2gsXG5cdFx0XHRwYXJ0czogcGFydHMsXG5cdFx0XHRwYXJlbnQ6IHBhcmVudCxcblx0XHRcdHRhcmdldDogdGFyZ2V0XG5cdFx0fVxuXHRcdGhhc2hlci5uZXdIYXNoLnR5cGUgPSBoYXNoZXIubmV3SGFzaC5oYXNoID09ICcnID8gQXBwQ29uc3RhbnRzLkhPTUUgOiBBcHBDb25zdGFudHMuRElQVFlRVUVcblx0XHQvLyBJZiBmaXJzdCBwYXNzIHNlbmQgdGhlIGFjdGlvbiBmcm9tIEFwcC5qcyB3aGVuIGFsbCBhc3NldHMgYXJlIHJlYWR5XG5cdFx0aWYodGhpcy5maXJzdFBhc3MpIHtcblx0XHRcdHRoaXMuZmlyc3RQYXNzID0gZmFsc2Vcblx0XHR9ZWxzZXtcblx0XHRcdEFwcEFjdGlvbnMucGFnZUhhc2hlckNoYW5nZWQoKVxuXHRcdH1cblx0fVxuXHRkaWRIYXNoZXJDaGFuZ2UobmV3SGFzaCwgb2xkSGFzaCkge1xuXHRcdHRoaXMubmV3SGFzaEZvdW5kZWQgPSBmYWxzZVxuXHRcdGNyb3Nzcm9hZHMucGFyc2UobmV3SGFzaClcblx0XHRpZih0aGlzLm5ld0hhc2hGb3VuZGVkKSByZXR1cm5cblx0XHQvLyBJZiBVUkwgZG9uJ3QgbWF0Y2ggYSBwYXR0ZXJuLCBzZW5kIHRvIGRlZmF1bHRcblx0XHR0aGlzLm9uRGVmYXVsdFVSTEhhbmRsZXIoKVxuXHR9XG5cdHNlbmRUb0RlZmF1bHQoKSB7XG5cdFx0aGFzaGVyLnNldEhhc2goQXBwU3RvcmUuZGVmYXVsdFJvdXRlKCkpXG5cdH1cblx0c2V0dXBSb3V0ZXMoKSB7XG5cdFx0aGFzaGVyLnJvdXRlcyA9IFtdXG5cdFx0aGFzaGVyLmRpcHR5cXVlUm91dGVzID0gW11cblx0XHR2YXIgaSA9IDAsIGs7XG5cdFx0Zm9yKGsgaW4gdGhpcy5yb3V0aW5nKSB7XG5cdFx0XHRoYXNoZXIucm91dGVzW2ldID0ga1xuXHRcdFx0aWYoay5sZW5ndGggPiAyKSBoYXNoZXIuZGlwdHlxdWVSb3V0ZXMucHVzaChrKVxuXHRcdFx0aSsrXG5cdFx0fVxuXHR9XG5cdHN0YXRpYyBnZXRCYXNlVVJMKCkge1xuXHRcdHJldHVybiBkb2N1bWVudC5VUkwuc3BsaXQoXCIjXCIpWzBdXG5cdH1cblx0c3RhdGljIGdldEhhc2goKSB7XG5cdFx0cmV0dXJuIGhhc2hlci5nZXRIYXNoKClcblx0fVxuXHRzdGF0aWMgZ2V0Um91dGVzKCkge1xuXHRcdHJldHVybiBoYXNoZXIucm91dGVzXG5cdH1cblx0c3RhdGljIGdldERpcHR5cXVlUm91dGVzKCkge1xuXHRcdHJldHVybiBoYXNoZXIuZGlwdHlxdWVSb3V0ZXNcblx0fVxuXHRzdGF0aWMgZ2V0TmV3SGFzaCgpIHtcblx0XHRyZXR1cm4gaGFzaGVyLm5ld0hhc2hcblx0fVxuXHRzdGF0aWMgZ2V0T2xkSGFzaCgpIHtcblx0XHRyZXR1cm4gaGFzaGVyLm9sZEhhc2hcblx0fVxuXHRzdGF0aWMgc2V0SGFzaChoYXNoKSB7XG5cdFx0aGFzaGVyLnNldEhhc2goaGFzaClcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBSb3V0ZXJcbiIsImltcG9ydCBBcHBEaXNwYXRjaGVyIGZyb20gJ0FwcERpc3BhdGNoZXInXG5pbXBvcnQgQXBwQ29uc3RhbnRzIGZyb20gJ0FwcENvbnN0YW50cydcbmltcG9ydCB7RXZlbnRFbWl0dGVyMn0gZnJvbSAnZXZlbnRlbWl0dGVyMidcbmltcG9ydCBhc3NpZ24gZnJvbSAnb2JqZWN0LWFzc2lnbidcbmltcG9ydCBkYXRhIGZyb20gJ0dsb2JhbERhdGEnXG5pbXBvcnQgUm91dGVyIGZyb20gJ1JvdXRlcidcbmltcG9ydCBpc1JldGluYSBmcm9tICdpcy1yZXRpbmEnXG5cbmZ1bmN0aW9uIF9nZXRDb250ZW50U2NvcGUoKSB7XG4gICAgdmFyIGhhc2hPYmogPSBSb3V0ZXIuZ2V0TmV3SGFzaCgpXG4gICAgcmV0dXJuIEFwcFN0b3JlLmdldFJvdXRlUGF0aFNjb3BlQnlJZChoYXNoT2JqLmhhc2gpXG59XG5mdW5jdGlvbiBfZ2V0UGFnZUFzc2V0c1RvTG9hZCgpIHtcbiAgICB2YXIgc2NvcGUgPSBfZ2V0Q29udGVudFNjb3BlKClcbiAgICB2YXIgaGFzaE9iaiA9IFJvdXRlci5nZXROZXdIYXNoKClcbiAgICB2YXIgdHlwZSA9IF9nZXRUeXBlT2ZQYWdlKClcbiAgICB2YXIgbWFuaWZlc3Q7XG5cbiAgICBpZih0eXBlICE9IEFwcENvbnN0YW50cy5IT01FKSB7XG4gICAgICAgIHZhciBmaWxlbmFtZXMgPSBbXG4gICAgICAgICAgICAnY2hhcmFjdGVyJyArIF9nZXRJbWFnZURldmljZUV4dGVuc2lvbigpICsnLnBuZycsXG4gICAgICAgICAgICAnY2hhcmFjdGVyLWJnLmpwZycsXG4gICAgICAgICAgICAnc2hvZS1iZy5qcGcnXG4gICAgICAgIF1cbiAgICAgICAgbWFuaWZlc3QgPSBfYWRkQmFzZVBhdGhzVG9VcmxzKGZpbGVuYW1lcywgaGFzaE9iai5wYXJlbnQsIGhhc2hPYmoudGFyZ2V0LCB0eXBlKVxuICAgIH1cblxuICAgIC8vIEluIGNhc2Ugb2YgZXh0cmEgYXNzZXRzXG4gICAgaWYoc2NvcGUuYXNzZXRzICE9IHVuZGVmaW5lZCkge1xuICAgICAgICB2YXIgYXNzZXRzID0gc2NvcGUuYXNzZXRzXG4gICAgICAgIHZhciBhc3NldHNNYW5pZmVzdDtcbiAgICAgICAgaWYodHlwZSA9PSBBcHBDb25zdGFudHMuSE9NRSkge1xuICAgICAgICAgICAgYXNzZXRzTWFuaWZlc3QgPSBfYWRkQmFzZVBhdGhzVG9VcmxzKGFzc2V0cywgJ2hvbWUnLCBoYXNoT2JqLnRhcmdldCwgdHlwZSlcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBhc3NldHNNYW5pZmVzdCA9IF9hZGRCYXNlUGF0aHNUb1VybHMoYXNzZXRzLCBoYXNoT2JqLnBhcmVudCwgaGFzaE9iai50YXJnZXQsIHR5cGUpICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIG1hbmlmZXN0ID0gKG1hbmlmZXN0ID09IHVuZGVmaW5lZCkgPyBhc3NldHNNYW5pZmVzdCA6IG1hbmlmZXN0LmNvbmNhdChhc3NldHNNYW5pZmVzdClcbiAgICB9XG5cbiAgICByZXR1cm4gbWFuaWZlc3Rcbn1cbmZ1bmN0aW9uIF9hZGRCYXNlUGF0aHNUb1VybHModXJscywgcGFnZUlkLCB0YXJnZXRJZCwgdHlwZSkge1xuICAgIHZhciBiYXNlUGF0aCA9ICh0eXBlID09IEFwcENvbnN0YW50cy5IT01FKSA/IF9nZXRIb21lUGFnZUFzc2V0c0Jhc2VQYXRoKCkgOiBfZ2V0UGFnZUFzc2V0c0Jhc2VQYXRoQnlJZChwYWdlSWQsIHRhcmdldElkKVxuICAgIHZhciBtYW5pZmVzdCA9IFtdXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB1cmxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBzcGxpdHRlciA9IHVybHNbaV0uc3BsaXQoJy4nKVxuICAgICAgICB2YXIgZmlsZU5hbWUgPSBzcGxpdHRlclswXVxuICAgICAgICB2YXIgZXh0ZW5zaW9uID0gc3BsaXR0ZXJbMV1cbiAgICAgICAgdmFyIGlkID0gcGFnZUlkICsgJy0nXG4gICAgICAgIGlmKHRhcmdldElkKSBpZCArPSB0YXJnZXRJZCArICctJ1xuICAgICAgICBpZCArPSBmaWxlTmFtZVxuICAgICAgICBtYW5pZmVzdFtpXSA9IHtcbiAgICAgICAgICAgIGlkOiBpZCxcbiAgICAgICAgICAgIHNyYzogYmFzZVBhdGggKyBmaWxlTmFtZSArICcuJyArIGV4dGVuc2lvblxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtYW5pZmVzdFxufVxuZnVuY3Rpb24gX2dldFBhZ2VBc3NldHNCYXNlUGF0aEJ5SWQoaWQsIGFzc2V0R3JvdXBJZCkge1xuICAgIHJldHVybiBBcHBTdG9yZS5iYXNlTWVkaWFQYXRoKCkgKyAnaW1hZ2UvZGlwdHlxdWUvJyArIGlkICsgJy8nICsgYXNzZXRHcm91cElkICsgJy8nXG59XG5mdW5jdGlvbiBfZ2V0SG9tZVBhZ2VBc3NldHNCYXNlUGF0aCgpIHtcbiAgICByZXR1cm4gQXBwU3RvcmUuYmFzZU1lZGlhUGF0aCgpICsgJ2ltYWdlL2hvbWUvJ1xufVxuZnVuY3Rpb24gX2dldEltYWdlRGV2aWNlRXh0ZW5zaW9uKCkge1xuICAgIHZhciByZXRpbmEgPSBfaXNSZXRpbmEoKVxuICAgIHZhciBzdHIgPSAnQDF4J1xuICAgIGlmKHJldGluYSA9PSB0cnVlKSBzdHIgPSAnQDJ4J1xuICAgIHJldHVybiBzdHJcbn1cbmZ1bmN0aW9uIF9pc1JldGluYSgpIHtcbiAgICByZXR1cm4gaXNSZXRpbmEoKVxufVxuZnVuY3Rpb24gX2dldERldmljZVJhdGlvKCkge1xuICAgIHZhciBzY2FsZSA9ICh3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyA9PSB1bmRlZmluZWQpID8gMSA6IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvXG4gICAgcmV0dXJuIChzY2FsZSA+IDEpID8gMiA6IDFcbn1cbmZ1bmN0aW9uIF9nZXRUeXBlT2ZQYWdlKGhhc2gpIHtcbiAgICB2YXIgaCA9IGhhc2ggfHwgUm91dGVyLmdldE5ld0hhc2goKVxuICAgIGlmKGgucGFydHMubGVuZ3RoID09IDIpIHJldHVybiBBcHBDb25zdGFudHMuRElQVFlRVUVcbiAgICBlbHNlIHJldHVybiBBcHBDb25zdGFudHMuSE9NRVxufVxuZnVuY3Rpb24gX2dldFBhZ2VDb250ZW50KCkge1xuICAgIHZhciBoYXNoT2JqID0gUm91dGVyLmdldE5ld0hhc2goKVxuICAgIHZhciBoYXNoID0gaGFzaE9iai5oYXNoLmxlbmd0aCA8IDEgPyAnLycgOiBoYXNoT2JqLmhhc2hcbiAgICB2YXIgY29udGVudCA9IGRhdGEucm91dGluZ1toYXNoXVxuICAgIHJldHVybiBjb250ZW50XG59XG5mdW5jdGlvbiBfZ2V0Q29udGVudEJ5TGFuZyhsYW5nKSB7XG4gICAgcmV0dXJuIGRhdGEuY29udGVudC5sYW5nW2xhbmddXG59XG5mdW5jdGlvbiBfZ2V0R2xvYmFsQ29udGVudCgpIHtcbiAgICByZXR1cm4gX2dldENvbnRlbnRCeUxhbmcoQXBwU3RvcmUubGFuZygpKVxufVxuZnVuY3Rpb24gX2dldEFwcERhdGEoKSB7XG4gICAgcmV0dXJuIGRhdGFcbn1cbmZ1bmN0aW9uIF9nZXREZWZhdWx0Um91dGUoKSB7XG4gICAgcmV0dXJuIGRhdGFbJ2RlZmF1bHQtcm91dGUnXVxufVxuZnVuY3Rpb24gX3dpbmRvd1dpZHRoSGVpZ2h0KCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHc6IHdpbmRvdy5pbm5lcldpZHRoLFxuICAgICAgICBoOiB3aW5kb3cuaW5uZXJIZWlnaHRcbiAgICB9XG59XG5mdW5jdGlvbiBfZ2V0RGlwdHlxdWVTaG9lcygpIHtcbiAgICB2YXIgaGFzaE9iaiA9IFJvdXRlci5nZXROZXdIYXNoKClcbiAgICB2YXIgYmFzZXVybCA9IF9nZXRQYWdlQXNzZXRzQmFzZVBhdGhCeUlkKGhhc2hPYmoucGFyZW50LCBoYXNoT2JqLnRhcmdldClcbiAgICByZXR1cm4gX2dldENvbnRlbnRTY29wZSgpLnNob2VzXG59XG5cbnZhciBBcHBTdG9yZSA9IGFzc2lnbih7fSwgRXZlbnRFbWl0dGVyMi5wcm90b3R5cGUsIHtcbiAgICBlbWl0Q2hhbmdlOiBmdW5jdGlvbih0eXBlLCBpdGVtKSB7XG4gICAgICAgIHRoaXMuZW1pdCh0eXBlLCBpdGVtKVxuICAgIH0sXG4gICAgcGFnZUNvbnRlbnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gX2dldFBhZ2VDb250ZW50KClcbiAgICB9LFxuICAgIGFwcERhdGE6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gX2dldEFwcERhdGEoKVxuICAgIH0sXG4gICAgZGVmYXVsdFJvdXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIF9nZXREZWZhdWx0Um91dGUoKVxuICAgIH0sXG4gICAgZ2xvYmFsQ29udGVudDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBfZ2V0R2xvYmFsQ29udGVudCgpXG4gICAgfSxcbiAgICBwYWdlQXNzZXRzVG9Mb2FkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIF9nZXRQYWdlQXNzZXRzVG9Mb2FkKClcbiAgICB9LFxuICAgIGdldFJvdXRlUGF0aFNjb3BlQnlJZDogZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgaWQgPSBpZC5sZW5ndGggPCAxID8gJy8nIDogaWRcbiAgICAgICAgcmV0dXJuIGRhdGEucm91dGluZ1tpZF1cbiAgICB9LFxuICAgIGJhc2VNZWRpYVBhdGg6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gQXBwU3RvcmUuZ2V0RW52aXJvbm1lbnQoKS5zdGF0aWNcbiAgICB9LFxuICAgIGdldFBhZ2VBc3NldHNCYXNlUGF0aEJ5SWQ6IGZ1bmN0aW9uKHBhcmVudCwgdGFyZ2V0KSB7XG4gICAgICAgIHJldHVybiBfZ2V0UGFnZUFzc2V0c0Jhc2VQYXRoQnlJZChwYXJlbnQsIHRhcmdldClcbiAgICB9LFxuICAgIGdldEVudmlyb25tZW50OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIEFwcENvbnN0YW50cy5FTlZJUk9OTUVOVFNbRU5WXVxuICAgIH0sXG4gICAgZ2V0VHlwZU9mUGFnZTogZnVuY3Rpb24oaGFzaCkge1xuICAgICAgICByZXR1cm4gX2dldFR5cGVPZlBhZ2UoaGFzaClcbiAgICB9LFxuICAgIGdldEhvbWVWaWRlb3M6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gZGF0YVsnaG9tZS12aWRlb3MnXVxuICAgIH0sXG4gICAgZ2VuZXJhbEluZm9zOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGRhdGEuY29udGVudFxuICAgIH0sXG4gICAgZGlwdHlxdWVTaG9lczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBfZ2V0RGlwdHlxdWVTaG9lcygpXG4gICAgfSxcbiAgICBnZXROZXh0RGlwdHlxdWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgaGFzaE9iaiA9IFJvdXRlci5nZXROZXdIYXNoKClcbiAgICAgICAgdmFyIHJvdXRlcyA9IFJvdXRlci5nZXREaXB0eXF1ZVJvdXRlcygpXG4gICAgICAgIHZhciBjdXJyZW50ID0gaGFzaE9iai5oYXNoXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcm91dGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgcm91dGUgPSByb3V0ZXNbaV1cbiAgICAgICAgICAgIGlmKHJvdXRlID09IGN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSAoaSsxKSA+IHJvdXRlcy5sZW5ndGgtMSA/IDAgOiAoaSsxKVxuICAgICAgICAgICAgICAgIHJldHVybiByb3V0ZXNbaW5kZXhdXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSxcbiAgICBnZXRQcmV2aW91c0RpcHR5cXVlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGhhc2hPYmogPSBSb3V0ZXIuZ2V0TmV3SGFzaCgpXG4gICAgICAgIHZhciByb3V0ZXMgPSBSb3V0ZXIuZ2V0RGlwdHlxdWVSb3V0ZXMoKVxuICAgICAgICB2YXIgY3VycmVudCA9IGhhc2hPYmouaGFzaFxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJvdXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHJvdXRlID0gcm91dGVzW2ldXG4gICAgICAgICAgICBpZihyb3V0ZSA9PSBjdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gKGktMSkgPCAwID8gcm91dGVzLmxlbmd0aC0xIDogKGktMSlcbiAgICAgICAgICAgICAgICByZXR1cm4gcm91dGVzW2luZGV4XVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0sXG4gICAgZ2V0RGlwdHlxdWVQYWdlSW5kZXg6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgaGFzaE9iaiA9IFJvdXRlci5nZXROZXdIYXNoKClcbiAgICAgICAgdmFyIHJvdXRlcyA9IFJvdXRlci5nZXREaXB0eXF1ZVJvdXRlcygpXG4gICAgICAgIHZhciBjdXJyZW50ID0gaGFzaE9iai5oYXNoXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcm91dGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgcm91dGUgPSByb3V0ZXNbaV1cbiAgICAgICAgICAgIGlmKHJvdXRlID09IGN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0sXG4gICAgZ2V0SW1hZ2VEZXZpY2VFeHRlbnNpb246IF9nZXRJbWFnZURldmljZUV4dGVuc2lvbixcbiAgICBnZXRQcmV2aWV3VXJsQnlIYXNoOiBmdW5jdGlvbihoYXNoKSB7XG4gICAgICAgIHJldHVybiBBcHBTdG9yZS5iYXNlTWVkaWFQYXRoKCkgKyAnaW1hZ2UvZGlwdHlxdWUvJyArIGhhc2ggKyAnL3ByZXZpZXcuZ2lmJ1xuICAgIH0sXG4gICAgZ2V0RmVlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBkYXRhLmZlZWRcbiAgICB9LFxuICAgIGxhbmc6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZGVmYXVsdExhbmcgPSB0cnVlXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5sYW5ncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGxhbmcgPSBkYXRhLmxhbmdzW2ldXG4gICAgICAgICAgICBpZihsYW5nID09IEpTX2xhbmcpIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0TGFuZyA9IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiAoZGVmYXVsdExhbmcgPT0gdHJ1ZSkgPyAnZW4nIDogSlNfbGFuZ1xuICAgIH0sXG4gICAgV2luZG93OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIF93aW5kb3dXaWR0aEhlaWdodCgpXG4gICAgfSxcbiAgICBhZGRQWENoaWxkOiBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgIEFwcFN0b3JlLlBYQ29udGFpbmVyLmFkZChpdGVtLmNoaWxkKVxuICAgIH0sXG4gICAgcmVtb3ZlUFhDaGlsZDogZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICBBcHBTdG9yZS5QWENvbnRhaW5lci5yZW1vdmUoaXRlbS5jaGlsZClcbiAgICB9LFxuICAgIFBhcmVudDogdW5kZWZpbmVkLFxuICAgIENhbnZhczogdW5kZWZpbmVkLFxuICAgIEZyb250QmxvY2s6IHVuZGVmaW5lZCxcbiAgICBPcmllbnRhdGlvbjogQXBwQ29uc3RhbnRzLkxBTkRTQ0FQRSxcbiAgICBEZXRlY3Rvcjoge1xuICAgICAgICBpc01vYmlsZTogdW5kZWZpbmVkXG4gICAgfSxcbiAgICBkaXNwYXRjaGVySW5kZXg6IEFwcERpc3BhdGNoZXIucmVnaXN0ZXIoZnVuY3Rpb24ocGF5bG9hZCl7XG4gICAgICAgIHZhciBhY3Rpb24gPSBwYXlsb2FkLmFjdGlvblxuICAgICAgICBzd2l0Y2goYWN0aW9uLmFjdGlvblR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgQXBwQ29uc3RhbnRzLldJTkRPV19SRVNJWkU6XG4gICAgICAgICAgICAgICAgQXBwU3RvcmUuV2luZG93LncgPSBhY3Rpb24uaXRlbS53aW5kb3dXXG4gICAgICAgICAgICAgICAgQXBwU3RvcmUuV2luZG93LmggPSBhY3Rpb24uaXRlbS53aW5kb3dIXG4gICAgICAgICAgICAgICAgQXBwU3RvcmUuT3JpZW50YXRpb24gPSAoQXBwU3RvcmUuV2luZG93LncgPiBBcHBTdG9yZS5XaW5kb3cuaCkgPyBBcHBDb25zdGFudHMuTEFORFNDQVBFIDogQXBwQ29uc3RhbnRzLlBPUlRSQUlUXG4gICAgICAgICAgICAgICAgQXBwU3RvcmUuZW1pdENoYW5nZShhY3Rpb24uYWN0aW9uVHlwZSlcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBBcHBTdG9yZS5lbWl0Q2hhbmdlKGFjdGlvbi5hY3Rpb25UeXBlLCBhY3Rpb24uaXRlbSkgXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgIH0pXG59KVxuXG5cbmV4cG9ydCBkZWZhdWx0IEFwcFN0b3JlXG5cbiIsImltcG9ydCBBcHBDb25zdGFudHMgZnJvbSAnQXBwQ29uc3RhbnRzJ1xuaW1wb3J0IGRvbSBmcm9tICdkb20taGFuZCdcblxuY2xhc3MgVXRpbHMge1xuXHRzdGF0aWMgTm9ybWFsaXplTW91c2VDb29yZHMoZSwgb2JqV3JhcHBlcikge1xuXHRcdHZhciBwb3N4ID0gMDtcblx0XHR2YXIgcG9zeSA9IDA7XG5cdFx0aWYgKCFlKSB2YXIgZSA9IHdpbmRvdy5ldmVudDtcblx0XHRpZiAoZS5wYWdlWCB8fCBlLnBhZ2VZKSBcdHtcblx0XHRcdHBvc3ggPSBlLnBhZ2VYO1xuXHRcdFx0cG9zeSA9IGUucGFnZVk7XG5cdFx0fVxuXHRcdGVsc2UgaWYgKGUuY2xpZW50WCB8fCBlLmNsaWVudFkpIFx0e1xuXHRcdFx0cG9zeCA9IGUuY2xpZW50WCArIGRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdFxuXHRcdFx0XHQrIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0O1xuXHRcdFx0cG9zeSA9IGUuY2xpZW50WSArIGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wXG5cdFx0XHRcdCsgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcblx0XHR9XG5cdFx0b2JqV3JhcHBlci54ID0gcG9zeFxuXHRcdG9ialdyYXBwZXIueSA9IHBvc3lcblx0XHRyZXR1cm4gb2JqV3JhcHBlclxuXHR9XG5cdHN0YXRpYyBSZXNpemVQb3NpdGlvblByb3BvcnRpb25hbGx5KHdpbmRvd1csIHdpbmRvd0gsIGNvbnRlbnRXLCBjb250ZW50SCwgb3JpZW50YXRpb24pIHtcblx0XHR2YXIgYXNwZWN0UmF0aW8gPSBjb250ZW50VyAvIGNvbnRlbnRIXG5cdFx0aWYob3JpZW50YXRpb24gIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0aWYob3JpZW50YXRpb24gPT0gQXBwQ29uc3RhbnRzLkxBTkRTQ0FQRSkge1xuXHRcdFx0XHR2YXIgc2NhbGUgPSAod2luZG93VyAvIGNvbnRlbnRXKSAqIDFcblx0XHRcdH1lbHNle1xuXHRcdFx0XHR2YXIgc2NhbGUgPSAod2luZG93SCAvIGNvbnRlbnRIKSAqIDFcblx0XHRcdH1cblx0XHR9ZWxzZXtcblx0XHRcdHZhciBzY2FsZSA9ICgod2luZG93VyAvIHdpbmRvd0gpIDwgYXNwZWN0UmF0aW8pID8gKHdpbmRvd0ggLyBjb250ZW50SCkgKiAxIDogKHdpbmRvd1cgLyBjb250ZW50VykgKiAxXG5cdFx0fVxuXHRcdHZhciBuZXdXID0gY29udGVudFcgKiBzY2FsZVxuXHRcdHZhciBuZXdIID0gY29udGVudEggKiBzY2FsZVxuXHRcdHZhciBjc3MgPSB7XG5cdFx0XHR3aWR0aDogbmV3Vyxcblx0XHRcdGhlaWdodDogbmV3SCxcblx0XHRcdGxlZnQ6ICh3aW5kb3dXID4+IDEpIC0gKG5ld1cgPj4gMSksXG5cdFx0XHR0b3A6ICh3aW5kb3dIID4+IDEpIC0gKG5ld0ggPj4gMSksXG5cdFx0XHRzY2FsZTogc2NhbGVcblx0XHR9XG5cdFx0XG5cdFx0cmV0dXJuIGNzc1xuXHR9XG5cdHN0YXRpYyBDYXBpdGFsaXplRmlyc3RMZXR0ZXIoc3RyaW5nKSB7XG5cdCAgICByZXR1cm4gc3RyaW5nLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyaW5nLnNsaWNlKDEpO1xuXHR9XG5cdHN0YXRpYyBTdXBwb3J0V2ViR0woKSB7XG5cdFx0dHJ5IHtcblx0XHRcdHZhciBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnY2FudmFzJyApO1xuXHRcdFx0cmV0dXJuICEhICggd2luZG93LldlYkdMUmVuZGVyaW5nQ29udGV4dCAmJiAoIGNhbnZhcy5nZXRDb250ZXh0KCAnd2ViZ2wnICkgfHwgY2FudmFzLmdldENvbnRleHQoICdleHBlcmltZW50YWwtd2ViZ2wnICkgKSApO1xuXHRcdH0gY2F0Y2ggKCBlICkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0fVxuXHRzdGF0aWMgRGVzdHJveVZpZGVvKHZpZGVvKSB7XG4gICAgICAgIHZpZGVvLnBhdXNlKCk7XG4gICAgICAgIHZpZGVvLnNyYyA9ICcnO1xuICAgICAgICB2YXIgY2hpbGRyZW4gPSB2aWRlby5jaGlsZE5vZGVzXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgXHR2YXIgY2hpbGQgPSBjaGlsZHJlbltpXVxuICAgICAgICBcdGNoaWxkLnNldEF0dHJpYnV0ZSgnc3JjJywgJycpO1xuICAgICAgICBcdC8vIFdvcmtpbmcgd2l0aCBhIHBvbHlmaWxsIG9yIHVzZSBqcXVlcnlcbiAgICAgICAgXHRkb20udHJlZS5yZW1vdmUoY2hpbGQpXG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIERlc3Ryb3lWaWRlb1RleHR1cmUodGV4dHVyZSkge1xuICAgIFx0dmFyIHZpZGVvID0gdGV4dHVyZS5iYXNlVGV4dHVyZS5zb3VyY2VcbiAgICAgICAgVXRpbHMuRGVzdHJveVZpZGVvKHZpZGVvKVxuICAgIH1cbiAgICBzdGF0aWMgUmFuZChtaW4sIG1heCwgZGVjaW1hbHMpIHtcbiAgICAgICAgdmFyIHJhbmRvbU51bSA9IE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSArIG1pblxuICAgICAgICBpZihkZWNpbWFscyA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgXHRyZXR1cm4gcmFuZG9tTnVtXG4gICAgICAgIH1lbHNle1xuXHQgICAgICAgIHZhciBkID0gTWF0aC5wb3coMTAsIGRlY2ltYWxzKVxuXHQgICAgICAgIHJldHVybiB+figoZCAqIHJhbmRvbU51bSkgKyAwLjUpIC8gZFxuICAgICAgICB9XG5cdH1cblx0c3RhdGljIEdldEltZ1VybElkKHVybCkge1xuXHRcdHZhciBzcGxpdCA9IHVybC5zcGxpdCgnLycpXG5cdFx0cmV0dXJuIHNwbGl0W3NwbGl0Lmxlbmd0aC0xXS5zcGxpdCgnLicpWzBdXG5cdH1cblx0c3RhdGljIFN0eWxlKGRpdiwgc3R5bGUpIHtcbiAgICBcdGRpdi5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSBzdHlsZVxuXHRcdGRpdi5zdHlsZS5tb3pUcmFuc2Zvcm0gICAgPSBzdHlsZVxuXHRcdGRpdi5zdHlsZS5tc1RyYW5zZm9ybSAgICAgPSBzdHlsZVxuXHRcdGRpdi5zdHlsZS5vVHJhbnNmb3JtICAgICAgPSBzdHlsZVxuXHRcdGRpdi5zdHlsZS50cmFuc2Zvcm0gICAgICAgPSBzdHlsZVxuICAgIH1cbiAgICBzdGF0aWMgVHJhbnNsYXRlKGRpdiwgeCwgeSwgeikge1xuICAgIFx0aWYgKCd3ZWJraXRUcmFuc2Zvcm0nIGluIGRvY3VtZW50LmJvZHkuc3R5bGUgfHwgJ21velRyYW5zZm9ybScgaW4gZG9jdW1lbnQuYm9keS5zdHlsZSB8fCAnb1RyYW5zZm9ybScgaW4gZG9jdW1lbnQuYm9keS5zdHlsZSB8fCAndHJhbnNmb3JtJyBpbiBkb2N1bWVudC5ib2R5LnN0eWxlKSB7XG4gICAgXHRcdFV0aWxzLlN0eWxlKGRpdiwgJ3RyYW5zbGF0ZTNkKCcreCsncHgsJyt5KydweCwnK3orJ3B4KScpXG5cdFx0fWVsc2V7XG5cdFx0XHRkaXYuc3R5bGUudG9wID0geSArICdweCdcblx0XHRcdGRpdi5zdHlsZS5sZWZ0ID0geCArICdweCdcblx0XHR9XG4gICAgfVxuICAgIHN0YXRpYyBTcHJpbmdUbyhpdGVtLCB0b1Bvc2l0aW9uLCBpbmRleCkge1xuICAgIFx0dmFyIGR4ID0gdG9Qb3NpdGlvbi54IC0gaXRlbS5wb3NpdGlvbi54XG4gICAgXHR2YXIgZHkgPSB0b1Bvc2l0aW9uLnkgLSBpdGVtLnBvc2l0aW9uLnlcblx0XHR2YXIgYW5nbGUgPSBNYXRoLmF0YW4yKGR5LCBkeClcblx0XHR2YXIgdGFyZ2V0WCA9IHRvUG9zaXRpb24ueCAtIE1hdGguY29zKGFuZ2xlKSAqIChpdGVtLmNvbmZpZy5sZW5ndGggKiBpbmRleClcblx0XHR2YXIgdGFyZ2V0WSA9IHRvUG9zaXRpb24ueSAtIE1hdGguc2luKGFuZ2xlKSAqIChpdGVtLmNvbmZpZy5sZW5ndGggKiBpbmRleClcblx0XHRpdGVtLnZlbG9jaXR5LnggKz0gKHRhcmdldFggLSBpdGVtLnBvc2l0aW9uLngpICogaXRlbS5jb25maWcuc3ByaW5nXG5cdFx0aXRlbS52ZWxvY2l0eS55ICs9ICh0YXJnZXRZIC0gaXRlbS5wb3NpdGlvbi55KSAqIGl0ZW0uY29uZmlnLnNwcmluZ1xuXHRcdGl0ZW0udmVsb2NpdHkueCAqPSBpdGVtLmNvbmZpZy5mcmljdGlvblxuXHRcdGl0ZW0udmVsb2NpdHkueSAqPSBpdGVtLmNvbmZpZy5mcmljdGlvblxuICAgIH1cbiAgICBzdGF0aWMgU3ByaW5nVG9TY2FsZShpdGVtLCB0b1NjYWxlLCBpbmRleCkge1xuICAgIFx0dmFyIGR4ID0gdG9TY2FsZS54IC0gaXRlbS5zY2FsZS54XG4gICAgXHR2YXIgZHkgPSB0b1NjYWxlLnkgLSBpdGVtLnNjYWxlLnlcblx0XHR2YXIgYW5nbGUgPSBNYXRoLmF0YW4yKGR5LCBkeClcblx0XHR2YXIgdGFyZ2V0WCA9IHRvU2NhbGUueCAtIE1hdGguY29zKGFuZ2xlKSAqIChpdGVtLmNvbmZpZy5sZW5ndGggKiBpbmRleClcblx0XHR2YXIgdGFyZ2V0WSA9IHRvU2NhbGUueSAtIE1hdGguc2luKGFuZ2xlKSAqIChpdGVtLmNvbmZpZy5sZW5ndGggKiBpbmRleClcblx0XHRpdGVtLnZlbG9jaXR5U2NhbGUueCArPSAodGFyZ2V0WCAtIGl0ZW0uc2NhbGUueCkgKiBpdGVtLmNvbmZpZy5zcHJpbmdcblx0XHRpdGVtLnZlbG9jaXR5U2NhbGUueSArPSAodGFyZ2V0WSAtIGl0ZW0uc2NhbGUueSkgKiBpdGVtLmNvbmZpZy5zcHJpbmdcblx0XHRpdGVtLnZlbG9jaXR5U2NhbGUueCAqPSBpdGVtLmNvbmZpZy5mcmljdGlvblxuXHRcdGl0ZW0udmVsb2NpdHlTY2FsZS55ICo9IGl0ZW0uY29uZmlnLmZyaWN0aW9uXG4gICAgfVxuICAgIHN0YXRpYyBMb2FkVGV4dHVyZSh1cmwpIHtcblx0XHR2YXIgdXJpID0gJ2ltYWdlL3RleHR1cmVzLycgKyB1cmxcblx0XHR2YXIgdGV4dHVyZSA9IFRIUkVFLkltYWdlVXRpbHMubG9hZFRleHR1cmUoIHVyaSApO1xuXHRcdHRleHR1cmUud3JhcFMgPSB0ZXh0dXJlLndyYXBUID0gVEhSRUUuUmVwZWF0V3JhcHBpbmc7XG5cdFx0dGV4dHVyZS5hbmlzb3Ryb3B5ID0gMTY7XG5cdFx0cmV0dXJuIHRleHR1cmVcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBVdGlsc1xuIiwiLy8gaHR0cDovL3BhdWxpcmlzaC5jb20vMjAxMS9yZXF1ZXN0YW5pbWF0aW9uZnJhbWUtZm9yLXNtYXJ0LWFuaW1hdGluZy9cbi8vIGh0dHA6Ly9teS5vcGVyYS5jb20vZW1vbGxlci9ibG9nLzIwMTEvMTIvMjAvcmVxdWVzdGFuaW1hdGlvbmZyYW1lLWZvci1zbWFydC1lci1hbmltYXRpbmdcbiBcbi8vIHJlcXVlc3RBbmltYXRpb25GcmFtZSBwb2x5ZmlsbCBieSBFcmlrIE3DtmxsZXIuIGZpeGVzIGZyb20gUGF1bCBJcmlzaCBhbmQgVGlubyBaaWpkZWxcbiBcbi8vIE1JVCBsaWNlbnNlXG4gXG4oZnVuY3Rpb24oKSB7XG4gICAgdmFyIGxhc3RUaW1lID0gMDtcbiAgICB2YXIgdmVuZG9ycyA9IFsnbXMnLCAnbW96JywgJ3dlYmtpdCcsICdvJ107XG4gICAgZm9yKHZhciB4ID0gMDsgeCA8IHZlbmRvcnMubGVuZ3RoICYmICF3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lOyArK3gpIHtcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHdpbmRvd1t2ZW5kb3JzW3hdKydSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnXTtcbiAgICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lID0gd2luZG93W3ZlbmRvcnNbeF0rJ0NhbmNlbEFuaW1hdGlvbkZyYW1lJ10gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8IHdpbmRvd1t2ZW5kb3JzW3hdKydDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnXTtcbiAgICB9XG4gXG4gICAgaWYgKCF3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKVxuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gZnVuY3Rpb24oY2FsbGJhY2ssIGVsZW1lbnQpIHtcbiAgICAgICAgICAgIHZhciBjdXJyVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICAgICAgdmFyIHRpbWVUb0NhbGwgPSBNYXRoLm1heCgwLCAxNiAtIChjdXJyVGltZSAtIGxhc3RUaW1lKSk7XG4gICAgICAgICAgICB2YXIgaWQgPSB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHsgY2FsbGJhY2soY3VyclRpbWUgKyB0aW1lVG9DYWxsKTsgfSwgXG4gICAgICAgICAgICAgIHRpbWVUb0NhbGwpO1xuICAgICAgICAgICAgbGFzdFRpbWUgPSBjdXJyVGltZSArIHRpbWVUb0NhbGw7XG4gICAgICAgICAgICByZXR1cm4gaWQ7XG4gICAgICAgIH07XG4gXG4gICAgaWYgKCF3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUpXG4gICAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSA9IGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoaWQpO1xuICAgICAgICB9O1xufSgpKTsiLCJpbXBvcnQgc2x1ZyBmcm9tICd0by1zbHVnLWNhc2UnXG5pbXBvcnQgZG9tIGZyb20gJ2RvbS1oYW5kJ1xuXG5jbGFzcyBCYXNlQ29tcG9uZW50IHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy5kb21Jc1JlYWR5ID0gZmFsc2Vcblx0XHR0aGlzLmNvbXBvbmVudERpZE1vdW50ID0gdGhpcy5jb21wb25lbnREaWRNb3VudC5iaW5kKHRoaXMpXG5cdH1cblx0Y29tcG9uZW50V2lsbE1vdW50KCkge1xuXHR9XG5cdGNvbXBvbmVudERpZE1vdW50KCkge1xuXHRcdHRoaXMuZG9tSXNSZWFkeSA9IHRydWVcblx0XHR0aGlzLnJlc2l6ZSgpXG5cdH1cblx0cmVuZGVyKGNoaWxkSWQsIHBhcmVudElkLCB0ZW1wbGF0ZSwgb2JqZWN0KSB7XG5cdFx0dGhpcy5jb21wb25lbnRXaWxsTW91bnQoKVxuXHRcdHRoaXMuY2hpbGRJZCA9IGNoaWxkSWRcblx0XHR0aGlzLnBhcmVudElkID0gcGFyZW50SWRcblx0XHRcblx0XHRpZihkb20uaXNEb20ocGFyZW50SWQpKSB7XG5cdFx0XHR0aGlzLnBhcmVudCA9IHBhcmVudElkXG5cdFx0fWVsc2V7XG5cdFx0XHR2YXIgaWQgPSB0aGlzLnBhcmVudElkLmluZGV4T2YoJyMnKSA+IC0xID8gdGhpcy5wYXJlbnRJZC5zcGxpdCgnIycpWzFdIDogdGhpcy5wYXJlbnRJZFxuXHRcdFx0dGhpcy5wYXJlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZClcblx0XHR9XG5cblx0XHRpZih0ZW1wbGF0ZSA9PSB1bmRlZmluZWQpIHtcblx0XHRcdHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cdFx0fWVsc2Uge1xuXHRcdFx0dGhpcy5lbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jylcblx0XHRcdHZhciB0ID0gdGVtcGxhdGUob2JqZWN0KVxuXHRcdFx0dGhpcy5lbGVtZW50LmlubmVySFRNTCA9IHRcblx0XHR9XG5cdFx0aWYodGhpcy5lbGVtZW50LmdldEF0dHJpYnV0ZSgnaWQnKSA9PSB1bmRlZmluZWQpIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2lkJywgc2x1ZyhjaGlsZElkKSlcblx0XHRkb20udHJlZS5hZGQodGhpcy5wYXJlbnQsIHRoaXMuZWxlbWVudClcblxuXHRcdHNldFRpbWVvdXQodGhpcy5jb21wb25lbnREaWRNb3VudCwgMClcblx0fVxuXHRyZW1vdmUoKSB7XG5cdFx0dGhpcy5jb21wb25lbnRXaWxsVW5tb3VudCgpXG5cdFx0dGhpcy5lbGVtZW50LnJlbW92ZSgpXG5cdH1cblx0cmVzaXplKCkge1xuXHR9XG5cdGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJhc2VDb21wb25lbnRcblxuIiwibW9kdWxlLmV4cG9ydHM9e1xuXHRcImNvbnRlbnRcIjoge1xuXHRcdFwidHdpdHRlcl91cmxcIjogXCJodHRwczovL3R3aXR0ZXIuY29tL2NhbXBlclwiLFxuXHRcdFwiZmFjZWJvb2tfdXJsXCI6IFwiaHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL0NhbXBlclwiLFxuXHRcdFwiaW5zdGFncmFtX3VybFwiOiBcImh0dHBzOi8vaW5zdGFncmFtLmNvbS9jYW1wZXIvXCIsXG5cdFx0XCJsYWJfdXJsXCI6IFwiaHR0cDovL3d3dy5jYW1wZXIuY29tL2xhYlwiLFxuXHRcdFwibWVuX3Nob3BfdXJsXCI6IFwiaHR0cDovL3d3dy5jYW1wZXIuY29tL2ludC9tZW4vc2hvZXMvc3MxNl9pbnNwaXJhdGlvblwiLFxuXHRcdFwid29tZW5fc2hvcF91cmxcIjogXCJodHRwOi8vd3d3LmNhbXBlci5jb20vaW50L3dvbWVuL3Nob2VzL3NzMTZfaW5zcGlyYXRpb25cIixcblx0XHRcImxhbmdcIjoge1xuXHRcdFx0XCJlblwiOiB7XG5cdFx0XHRcdFwiaG9tZVwiOiBcIk1BUFwiLFxuXHRcdFx0XHRcImdyaWRcIjogXCJJTkRFWFwiLFxuXHRcdFx0XHRcImxhYlwiOiBcIkxBQlwiLFxuXHRcdFx0XHRcImNhbXBlcl9sYWJcIjogXCJDYW1wZXIgTGFiXCIsXG5cdFx0XHRcdFwic2hvcF90aXRsZVwiOiBcIlNob3BcIixcblx0XHRcdFx0XCJzaG9wX21lblwiOiBcIk1lblwiLFxuXHRcdFx0XHRcInNob3Bfd29tZW5cIjogXCJXb21lblwiLFxuXHRcdFx0XHRcIm1hcF90eHRcIjogXCJNQVBcIlxuXHRcdFx0fSxcblx0XHRcdFwiZnJcIjoge1xuXHRcdFx0XHRcImhvbWVcIjogXCJNQVBcIixcblx0XHRcdFx0XCJncmlkXCI6IFwiSU5ERVhcIixcblx0XHRcdFx0XCJsYWJcIjogXCJMQUJcIixcblx0XHRcdFx0XCJjYW1wZXJfbGFiXCI6IFwiQ2FtcGVyIExhYlwiLFxuXHRcdFx0XHRcInNob3BfdGl0bGVcIjogXCJBY2hldGVyXCIsXG5cdFx0XHRcdFwic2hvcF9tZW5cIjogXCJob21tZVwiLFxuXHRcdFx0XHRcInNob3Bfd29tZW5cIjogXCJmZW1tZVwiLFxuXHRcdFx0XHRcIm1hcF90eHRcIjogXCJNQVBcIlxuXHRcdFx0fSxcblx0XHRcdFwiZXNcIjoge1xuXHRcdFx0XHRcImhvbWVcIjogXCJNQVBcIixcblx0XHRcdFx0XCJncmlkXCI6IFwiSU5ERVhcIixcblx0XHRcdFx0XCJsYWJcIjogXCJMQUJcIixcblx0XHRcdFx0XCJjYW1wZXJfbGFiXCI6IFwiQ2FtcGVyIExhYlwiLFxuXHRcdFx0XHRcInNob3BfdGl0bGVcIjogXCJDb21wcmFyXCIsXG5cdFx0XHRcdFwic2hvcF9tZW5cIjogXCJob21icmVcIixcblx0XHRcdFx0XCJzaG9wX3dvbWVuXCI6IFwibXVqZXJcIixcblx0XHRcdFx0XCJtYXBfdHh0XCI6IFwiTUFQXCJcblx0XHRcdH0sXG5cdFx0XHRcIml0XCI6IHtcblx0XHRcdFx0XCJob21lXCI6IFwiTUFQXCIsXG5cdFx0XHRcdFwiZ3JpZFwiOiBcIklOREVYXCIsXG5cdFx0XHRcdFwibGFiXCI6IFwiTEFCXCIsXG5cdFx0XHRcdFwiY2FtcGVyX2xhYlwiOiBcIkNhbXBlciBMYWJcIixcblx0XHRcdFx0XCJzaG9wX3RpdGxlXCI6IFwiQWNxdWlzaXRpXCIsXG5cdFx0XHRcdFwic2hvcF9tZW5cIjogXCJ1b21vXCIsXG5cdFx0XHRcdFwic2hvcF93b21lblwiOiBcImRvbm5hXCIsXG5cdFx0XHRcdFwibWFwX3R4dFwiOiBcIk1BUFwiXG5cdFx0XHR9LFxuXHRcdFx0XCJkZVwiOiB7XG5cdFx0XHRcdFwiaG9tZVwiOiBcIk1BUFwiLFxuXHRcdFx0XHRcImdyaWRcIjogXCJJTkRFWFwiLFxuXHRcdFx0XHRcImxhYlwiOiBcIkxBQlwiLFxuXHRcdFx0XHRcImNhbXBlcl9sYWJcIjogXCJDYW1wZXIgTGFiXCIsXG5cdFx0XHRcdFwic2hvcF90aXRsZVwiOiBcIlNob3BcIixcblx0XHRcdFx0XCJzaG9wX21lblwiOiBcIkhlcnJlblwiLFxuXHRcdFx0XHRcInNob3Bfd29tZW5cIjogXCJEYW1lblwiLFxuXHRcdFx0XHRcIm1hcF90eHRcIjogXCJNQVBcIlxuXHRcdFx0fSxcblx0XHRcdFwicHRcIjoge1xuXHRcdFx0XHRcImhvbWVcIjogXCJNQVBcIixcblx0XHRcdFx0XCJncmlkXCI6IFwiSU5ERVhcIixcblx0XHRcdFx0XCJsYWJcIjogXCJMQUJcIixcblx0XHRcdFx0XCJjYW1wZXJfbGFiXCI6IFwiQ2FtcGVyIExhYlwiLFxuXHRcdFx0XHRcInNob3BfdGl0bGVcIjogXCJDb21wcmVcIixcblx0XHRcdFx0XCJzaG9wX21lblwiOiBcIkhvbWVuXCIsXG5cdFx0XHRcdFwic2hvcF93b21lblwiOiBcIk11bGhlclwiLFxuXHRcdFx0XHRcIm1hcF90eHRcIjogXCJNQVBcIlxuXHRcdFx0fVxuXHRcdH1cblx0fSxcblxuXHRcImxhbmdzXCI6IFtcImVuXCIsIFwiZnJcIiwgXCJlc1wiLCBcIml0XCIsIFwiZGVcIiwgXCJwdFwiXSxcblxuXHRcImhvbWUtdmlkZW9zXCI6IFtcblx0XHRcImRlaWEtZHViLm1wNFwiLFxuXHRcdFwiZGVpYS1tYXRlby5tcDRcIixcblx0XHRcImRlaWEtbWFydGEubXA0XCIsXG5cdFx0XCJlcy10cmVuYy1pc2FtdS5tcDRcIixcblx0XHRcImVzLXRyZW5jLWJlbHVnYS5tcDRcIixcblx0XHRcImFyZWxsdWYtY2FwYXMubXA0XCIsXG5cdFx0XCJhcmVsbHVmLXBlbG90YXMubXA0XCIsXG5cdFx0XCJhcmVsbHVmLW1hcnRhLm1wNFwiLFxuXHRcdFwiYXJlbGx1Zi1rb2JhcmFoLm1wNFwiLFxuXHRcdFwiYXJlbGx1Zi1kdWIubXA0XCIsXG5cdFx0XCJhcmVsbHVmLXBhcmFkaXNlLm1wNFwiXG5cdF0sXG5cblx0XCJmZWVkXCI6IFtcblx0XHR7XG5cdFx0XHRcImlkXCI6IFwiZGVpYVwiLFxuXHRcdFx0XCJwZXJzb25cIjogXCJtYXRlb1wiLFxuXHRcdFx0XCJ0aW1lXCI6IFwiMiBtaW4gYWdvXCIsXG5cdFx0XHRcIm1lZGlhXCI6IHtcblx0XHRcdFx0XCJ0eXBlXCI6IFwiaW1hZ2VcIixcblx0XHRcdFx0XCJpZFwiOiBcInNob2VcIlxuXHRcdFx0fSxcblx0XHRcdFwiY29tbWVudHNcIjogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0XCJwZXJzb24tbmFtZVwiOiBcIm1hdGVvXCIsXG5cdFx0XHRcdFx0XCJwZXJzb24tdGV4dFwiOiBcIkVzdHJlbm8gQ2FtcGVycyBwYXJhIG51ZXN0cm8gd2Vla2VuZCBlbiBEZWlhIEBNYXJ0YVwiXG5cdFx0XHRcdH1cblx0XHRcdF1cblx0XHR9LHtcblx0XHRcdFwiaWRcIjogXCJkZWlhXCIsXG5cdFx0XHRcInBlcnNvblwiOiBcIm1hdGVvXCIsXG5cdFx0XHRcInRpbWVcIjogXCIyIG1pbiBhZ29cIixcblx0XHRcdFwibWVkaWFcIjoge1xuXHRcdFx0XHRcInR5cGVcIjogXCJpbWFnZVwiLFxuXHRcdFx0XHRcImlkXCI6IFwiY2hhcmFjdGVyXCJcblx0XHRcdH0sXG5cdFx0XHRcImNvbW1lbnRzXCI6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdFwicGVyc29uLW5hbWVcIjogXCJtYXRlb1wiLFxuXHRcdFx0XHRcdFwicGVyc29uLXRleHRcIjogXCJQcm9maWxlIHBpYz8gbWF5YmU/IG1heWJlIGJhYnk/XCJcblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdH0se1xuXHRcdFx0XCJpZFwiOiBcImRlaWFcIixcblx0XHRcdFwicGVyc29uXCI6IFwibWF0ZW9cIixcblx0XHRcdFwidGltZVwiOiBcIjIgbWluIGFnb1wiLFxuXHRcdFx0XCJtZWRpYVwiOiB7XG5cdFx0XHRcdFwidHlwZVwiOiBcInZpZGVvXCIsXG5cdFx0XHRcdFwiaWRcIjogXCJmdW4tZmFjdFwiXG5cdFx0XHR9LFxuXHRcdFx0XCJjb21tZW50c1wiOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRcInBlcnNvbi1uYW1lXCI6IFwibWF0ZW9cIixcblx0XHRcdFx0XHRcInBlcnNvbi10ZXh0XCI6IFwiTWUgYmVpbmcgbWXigKYgSGVoZSA6KSA8c3Bhbj4jY2FtcGVyPC9zcGFuPlwiXG5cdFx0XHRcdH1cblx0XHRcdF1cblx0XHR9LHtcblx0XHRcdFwiaWRcIjogXCJkZWlhXCIsXG5cdFx0XHRcInBlcnNvblwiOiBcIm1hdGVvXCIsXG5cdFx0XHRcInRpbWVcIjogXCIyIG1pbiBhZ29cIixcblx0XHRcdFwibWVkaWFcIjoge1xuXHRcdFx0XHRcInR5cGVcIjogXCJ2aWRlb1wiLFxuXHRcdFx0XHRcImlkXCI6IFwiY2hhcmFjdGVyXCJcblx0XHRcdH0sXG5cdFx0XHRcImNvbW1lbnRzXCI6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdFwicGVyc29uLW5hbWVcIjogXCJtYXJ0YVwiLFxuXHRcdFx0XHRcdFwicGVyc29uLXRleHRcIjogXCJQb3JxdWUgZXNhIGNhcmEgZGUgZW1vPz8gQE1hdGVvIGxvbCEhICNTZWxmaWVWaWRlbyAjTWFsbG9yY2FCeUNhbXBlclwiXG5cdFx0XHRcdH1cblx0XHRcdF1cblx0XHR9LHtcblx0XHRcdFwiaWRcIjogXCJkZWlhXCIsXG5cdFx0XHRcInBlcnNvblwiOiBcImR1YlwiLFxuXHRcdFx0XCJ0aW1lXCI6IFwiMiBtaW4gYWdvXCIsXG5cdFx0XHRcIm1lZGlhXCI6IHtcblx0XHRcdFx0XCJ0eXBlXCI6IFwiaW1hZ2VcIixcblx0XHRcdFx0XCJpZFwiOiBcInNob2VcIlxuXHRcdFx0fSxcblx0XHRcdFwiY29tbWVudHNcIjogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0XCJwZXJzb24tbmFtZVwiOiBcImR1YlwiLFxuXHRcdFx0XHRcdFwicGVyc29uLXRleHRcIjogXCJUaGVzZSBzaG9lcyBhcmUgdGhlIHNob2VzIE1pcmtvIHdvdWxkIHdlYXIgaWYgaGUgd2FzIHN0aWxsIGFsaXZlIGFuZCBraWNraW4nXCJcblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdH0se1xuXHRcdFx0XCJpZFwiOiBcImRlaWFcIixcblx0XHRcdFwicGVyc29uXCI6IFwiZHViXCIsXG5cdFx0XHRcInRpbWVcIjogXCIyIG1pbiBhZ29cIixcblx0XHRcdFwibWVkaWFcIjoge1xuXHRcdFx0XHRcInR5cGVcIjogXCJpbWFnZVwiLFxuXHRcdFx0XHRcImlkXCI6IFwiY2hhcmFjdGVyXCJcblx0XHRcdH0sXG5cdFx0XHRcImNvbW1lbnRzXCI6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdFwicGVyc29uLW5hbWVcIjogXCJtYXRlb1wiLFxuXHRcdFx0XHRcdFwicGVyc29uLXRleHRcIjogXCJQb3JxdWUgbm8gdmllbmVzIGEgRGVpYSBjb24gQE1hcnRhIHkgY29ubWlnbyBlbCBwcm94aW1vIHdlZWtlbmQ/P1wiXG5cdFx0XHRcdH0se1xuXHRcdFx0XHRcdFwicGVyc29uLW5hbWVcIjogXCJkdWJcIixcblx0XHRcdFx0XHRcInBlcnNvbi10ZXh0XCI6IFwiTm8gcHVlZG9vb29v4oCmIHRlbmdvIGNsYXNlcyBkZSBwaW50dXJhIHkgbWkgbWFkcmUgdmllbmUgYSB2aXNpdGFyICNoZWF2eW1ldGFsXCJcblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdH0se1xuXHRcdFx0XCJpZFwiOiBcImRlaWFcIixcblx0XHRcdFwicGVyc29uXCI6IFwiZHViXCIsXG5cdFx0XHRcInRpbWVcIjogXCIyIG1pbiBhZ29cIixcblx0XHRcdFwibWVkaWFcIjoge1xuXHRcdFx0XHRcInR5cGVcIjogXCJ2aWRlb1wiLFxuXHRcdFx0XHRcImlkXCI6IFwiZnVuLWZhY3RcIlxuXHRcdFx0fSxcblx0XHRcdFwiY29tbWVudHNcIjogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0XCJwZXJzb24tbmFtZVwiOiBcIm1hdGVvXCIsXG5cdFx0XHRcdFx0XCJwZXJzb24tdGV4dFwiOiBcIk1lIGJlaW5nIG1l4oCmIEhlaGUgOikgPHNwYW4+I2NhbXBlcjwvc3Bhbj5cIlxuXHRcdFx0XHR9XG5cdFx0XHRdXG5cdFx0fSx7XG5cdFx0XHRcImlkXCI6IFwiZGVpYVwiLFxuXHRcdFx0XCJwZXJzb25cIjogXCJkdWJcIixcblx0XHRcdFwidGltZVwiOiBcIjIgbWluIGFnb1wiLFxuXHRcdFx0XCJtZWRpYVwiOiB7XG5cdFx0XHRcdFwidHlwZVwiOiBcInZpZGVvXCIsXG5cdFx0XHRcdFwiaWRcIjogXCJjaGFyYWN0ZXJcIlxuXHRcdFx0fSxcblx0XHRcdFwiY29tbWVudHNcIjogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0XCJwZXJzb24tbmFtZVwiOiBcImR1YlwiLFxuXHRcdFx0XHRcdFwicGVyc29uLXRleHRcIjogXCIjYXJ0c2VsZmllXCJcblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdH0se1xuXHRcdFx0XCJpZFwiOiBcImRlaWFcIixcblx0XHRcdFwicGVyc29uXCI6IFwibWFydGFcIixcblx0XHRcdFwidGltZVwiOiBcIjIgbWluIGFnb1wiLFxuXHRcdFx0XCJtZWRpYVwiOiB7XG5cdFx0XHRcdFwidHlwZVwiOiBcImltYWdlXCIsXG5cdFx0XHRcdFwiaWRcIjogXCJzaG9lXCJcblx0XHRcdH0sXG5cdFx0XHRcImNvbW1lbnRzXCI6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdFwicGVyc29uLW5hbWVcIjogXCJtYXJ0YVwiLFxuXHRcdFx0XHRcdFwicGVyc29uLXRleHRcIjogXCJEZWVwIGJsdWUgI2NhbXBlcnNob2VzXCJcblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdH0se1xuXHRcdFx0XCJpZFwiOiBcImRlaWFcIixcblx0XHRcdFwicGVyc29uXCI6IFwibWFydGFcIixcblx0XHRcdFwidGltZVwiOiBcIjIgbWluIGFnb1wiLFxuXHRcdFx0XCJtZWRpYVwiOiB7XG5cdFx0XHRcdFwidHlwZVwiOiBcImltYWdlXCIsXG5cdFx0XHRcdFwiaWRcIjogXCJjaGFyYWN0ZXJcIlxuXHRcdFx0fSxcblx0XHRcdFwiY29tbWVudHNcIjogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0XCJwZXJzb24tbmFtZVwiOiBcIm1hcnRhXCIsXG5cdFx0XHRcdFx0XCJwZXJzb24tdGV4dFwiOiBcIlRoYW5rcyBmb3IgdGhlIGZsb3dlcnMgQE1hdGVvIHNvb28gY3V1dXRlLlwiXG5cdFx0XHRcdH1cblx0XHRcdF1cblx0XHR9LHtcblx0XHRcdFwiaWRcIjogXCJkZWlhXCIsXG5cdFx0XHRcInBlcnNvblwiOiBcIm1hcnRhXCIsXG5cdFx0XHRcInRpbWVcIjogXCIyIG1pbiBhZ29cIixcblx0XHRcdFwibWVkaWFcIjoge1xuXHRcdFx0XHRcInR5cGVcIjogXCJ2aWRlb1wiLFxuXHRcdFx0XHRcImlkXCI6IFwiZnVuLWZhY3RcIlxuXHRcdFx0fSxcblx0XHRcdFwiY29tbWVudHNcIjogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0XCJwZXJzb24tbmFtZVwiOiBcIm1hcnRhXCIsXG5cdFx0XHRcdFx0XCJwZXJzb24tdGV4dFwiOiBcIk1lIGJlaW5nIG1l4oCmIEhlaGUgOikgPHNwYW4+I2NhbXBlcjwvc3Bhbj5cIlxuXHRcdFx0XHR9XG5cdFx0XHRdXG5cdFx0fSx7XG5cdFx0XHRcImlkXCI6IFwiZGVpYVwiLFxuXHRcdFx0XCJwZXJzb25cIjogXCJtYXJ0YVwiLFxuXHRcdFx0XCJ0aW1lXCI6IFwiMiBtaW4gYWdvXCIsXG5cdFx0XHRcIm1lZGlhXCI6IHtcblx0XHRcdFx0XCJ0eXBlXCI6IFwidmlkZW9cIixcblx0XHRcdFx0XCJpZFwiOiBcImNoYXJhY3RlclwiXG5cdFx0XHR9LFxuXHRcdFx0XCJjb21tZW50c1wiOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRcInBlcnNvbi1uYW1lXCI6IFwibWFydGFcIixcblx0XHRcdFx0XHRcInBlcnNvbi10ZXh0XCI6IFwiTGFzIGZsb3JlcyBxdWUgQG1hdGVvIG1lIHJlZ2Fsby4gI01hbGxvcmNhQnlDYW1wZXJcIlxuXHRcdFx0XHR9XG5cdFx0XHRdXG5cdFx0fSx7XG5cdFx0XHRcImlkXCI6IFwiZXMtdHJlbmNcIixcblx0XHRcdFwicGVyc29uXCI6IFwiYmVsdWdhXCIsXG5cdFx0XHRcInRpbWVcIjogXCIyIG1pbiBhZ29cIixcblx0XHRcdFwibWVkaWFcIjoge1xuXHRcdFx0XHRcInR5cGVcIjogXCJpbWFnZVwiLFxuXHRcdFx0XHRcImlkXCI6IFwic2hvZVwiXG5cdFx0XHR9LFxuXHRcdFx0XCJjb21tZW50c1wiOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRcInBlcnNvbi1uYW1lXCI6IFwiYmVsdWdhXCIsXG5cdFx0XHRcdFx0XCJwZXJzb24tdGV4dFwiOiBcIk1lIGJlaW5nIG1lLi4uIEhlaGUgOikgI2NhbXBlcnNob2VzICNCZWx1Z2FcIlxuXHRcdFx0XHR9XG5cdFx0XHRdXG5cdFx0fSx7XG5cdFx0XHRcImlkXCI6IFwiZXMtdHJlbmNcIixcblx0XHRcdFwicGVyc29uXCI6IFwiYmVsdWdhXCIsXG5cdFx0XHRcInRpbWVcIjogXCIyIG1pbiBhZ29cIixcblx0XHRcdFwibWVkaWFcIjoge1xuXHRcdFx0XHRcInR5cGVcIjogXCJpbWFnZVwiLFxuXHRcdFx0XHRcImlkXCI6IFwiY2hhcmFjdGVyXCJcblx0XHRcdH0sXG5cdFx0XHRcImNvbW1lbnRzXCI6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdFwicGVyc29uLW5hbWVcIjogXCJiZWx1Z2FcIixcblx0XHRcdFx0XHRcInBlcnNvbi10ZXh0XCI6IFwiRXMgVHJlbmMgaXMgdGhlIHBsYWNlIHRvIGJlLiBcIlxuXHRcdFx0XHR9XG5cdFx0XHRdXG5cdFx0fSx7XG5cdFx0XHRcImlkXCI6IFwiZXMtdHJlbmNcIixcblx0XHRcdFwicGVyc29uXCI6IFwiYmVsdWdhXCIsXG5cdFx0XHRcInRpbWVcIjogXCIyIG1pbiBhZ29cIixcblx0XHRcdFwibWVkaWFcIjoge1xuXHRcdFx0XHRcInR5cGVcIjogXCJ2aWRlb1wiLFxuXHRcdFx0XHRcImlkXCI6IFwiZnVuLWZhY3RcIlxuXHRcdFx0fSxcblx0XHRcdFwiY29tbWVudHNcIjogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0XCJwZXJzb24tbmFtZVwiOiBcImJlbHVnYVwiLFxuXHRcdFx0XHRcdFwicGVyc29uLXRleHRcIjogXCJNZSBiZWluZyBtZeKApiBIZWhlIDopIDxzcGFuPiNjYW1wZXI8L3NwYW4+XCJcblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdH0se1xuXHRcdFx0XCJpZFwiOiBcImVzLXRyZW5jXCIsXG5cdFx0XHRcInBlcnNvblwiOiBcImJlbHVnYVwiLFxuXHRcdFx0XCJ0aW1lXCI6IFwiMiBtaW4gYWdvXCIsXG5cdFx0XHRcIm1lZGlhXCI6IHtcblx0XHRcdFx0XCJ0eXBlXCI6IFwidmlkZW9cIixcblx0XHRcdFx0XCJpZFwiOiBcImNoYXJhY3RlclwiXG5cdFx0XHR9LFxuXHRcdFx0XCJjb21tZW50c1wiOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRcInBlcnNvbi1uYW1lXCI6IFwiYmVsdWdhXCIsXG5cdFx0XHRcdFx0XCJwZXJzb24tdGV4dFwiOiBcIkFsbCB0aGlzIHNtb2tlIGlzIG5vdCB3aGF0IHlvdSB0aGluayBpdCBpcyAjSGlnaG9uTGlmZVwiXG5cdFx0XHRcdH1cblx0XHRcdF1cblx0XHR9LHtcblx0XHRcdFwiaWRcIjogXCJlcy10cmVuY1wiLFxuXHRcdFx0XCJwZXJzb25cIjogXCJpc2FtdVwiLFxuXHRcdFx0XCJ0aW1lXCI6IFwiMiBtaW4gYWdvXCIsXG5cdFx0XHRcIm1lZGlhXCI6IHtcblx0XHRcdFx0XCJ0eXBlXCI6IFwiaW1hZ2VcIixcblx0XHRcdFx0XCJpZFwiOiBcInNob2VcIlxuXHRcdFx0fSxcblx0XHRcdFwiY29tbWVudHNcIjogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0XCJwZXJzb24tbmFtZVwiOiBcImlzYW11XCIsXG5cdFx0XHRcdFx0XCJwZXJzb24tdGV4dFwiOiBcIlN1cGVybmF0dXJhbCBiZWF1dHkuIEkgbG92ZSB0aGUgbmV3ICNtZVwiXG5cdFx0XHRcdH1cblx0XHRcdF1cblx0XHR9LHtcblx0XHRcdFwiaWRcIjogXCJlcy10cmVuY1wiLFxuXHRcdFx0XCJwZXJzb25cIjogXCJpc2FtdVwiLFxuXHRcdFx0XCJ0aW1lXCI6IFwiMiBtaW4gYWdvXCIsXG5cdFx0XHRcIm1lZGlhXCI6IHtcblx0XHRcdFx0XCJ0eXBlXCI6IFwiaW1hZ2VcIixcblx0XHRcdFx0XCJpZFwiOiBcImNoYXJhY3RlclwiXG5cdFx0XHR9LFxuXHRcdFx0XCJjb21tZW50c1wiOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRcInBlcnNvbi1uYW1lXCI6IFwiaXNhbXVcIixcblx0XHRcdFx0XHRcInBlcnNvbi10ZXh0XCI6IFwiU28gY2FsbSBhdCBFcyBUcmVuYy5cIlxuXHRcdFx0XHR9XG5cdFx0XHRdXG5cdFx0fSx7XG5cdFx0XHRcImlkXCI6IFwiZXMtdHJlbmNcIixcblx0XHRcdFwicGVyc29uXCI6IFwiaXNhbXVcIixcblx0XHRcdFwidGltZVwiOiBcIjIgbWluIGFnb1wiLFxuXHRcdFx0XCJtZWRpYVwiOiB7XG5cdFx0XHRcdFwidHlwZVwiOiBcInZpZGVvXCIsXG5cdFx0XHRcdFwiaWRcIjogXCJmdW4tZmFjdFwiXG5cdFx0XHR9LFxuXHRcdFx0XCJjb21tZW50c1wiOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRcInBlcnNvbi1uYW1lXCI6IFwiaXNhbXVcIixcblx0XHRcdFx0XHRcInBlcnNvbi10ZXh0XCI6IFwiTWUgYmVpbmcgbWXigKYgSGVoZSA6KSA8c3Bhbj4jY2FtcGVyPC9zcGFuPlwiXG5cdFx0XHRcdH1cblx0XHRcdF1cblx0XHR9LHtcblx0XHRcdFwiaWRcIjogXCJlcy10cmVuY1wiLFxuXHRcdFx0XCJwZXJzb25cIjogXCJpc2FtdVwiLFxuXHRcdFx0XCJ0aW1lXCI6IFwiMiBtaW4gYWdvXCIsXG5cdFx0XHRcIm1lZGlhXCI6IHtcblx0XHRcdFx0XCJ0eXBlXCI6IFwidmlkZW9cIixcblx0XHRcdFx0XCJpZFwiOiBcImNoYXJhY3RlclwiXG5cdFx0XHR9LFxuXHRcdFx0XCJjb21tZW50c1wiOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRcInBlcnNvbi1uYW1lXCI6IFwiaXNhbXVcIixcblx0XHRcdFx0XHRcInBlcnNvbi10ZXh0XCI6IFwiSGlpaWkhISEgOikgI01hbGxvcmNhQnlDYW1wZXJcIlxuXHRcdFx0XHR9XG5cdFx0XHRdXG5cdFx0fSxcblxuXHRcdHtcblx0XHRcdFwiaWRcIjogXCJhcmVsbHVmXCIsXG5cdFx0XHRcInBlcnNvblwiOiBcImNhcGFzXCIsXG5cdFx0XHRcInRpbWVcIjogXCIyIG1pbiBhZ29cIixcblx0XHRcdFwibWVkaWFcIjoge1xuXHRcdFx0XHRcInR5cGVcIjogXCJpbWFnZVwiLFxuXHRcdFx0XHRcImlkXCI6IFwic2hvZVwiXG5cdFx0XHR9LFxuXHRcdFx0XCJjb21tZW50c1wiOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRcInBlcnNvbi1uYW1lXCI6IFwiY2FwYXNcIixcblx0XHRcdFx0XHRcInBlcnNvbi10ZXh0XCI6IFwiTmV3IGNvbG9ycy4gU2FtZSBlbmVyZ3lcIlxuXHRcdFx0XHR9XG5cdFx0XHRdXG5cdFx0fSx7XG5cdFx0XHRcImlkXCI6IFwiYXJlbGx1ZlwiLFxuXHRcdFx0XCJwZXJzb25cIjogXCJjYXBhc1wiLFxuXHRcdFx0XCJ0aW1lXCI6IFwiMiBtaW4gYWdvXCIsXG5cdFx0XHRcIm1lZGlhXCI6IHtcblx0XHRcdFx0XCJ0eXBlXCI6IFwiaW1hZ2VcIixcblx0XHRcdFx0XCJpZFwiOiBcImNoYXJhY3RlclwiXG5cdFx0XHR9LFxuXHRcdFx0XCJjb21tZW50c1wiOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRcInBlcnNvbi1uYW1lXCI6IFwiY2FwYXNcIixcblx0XHRcdFx0XHRcInBlcnNvbi10ZXh0XCI6IFwiTGFzdCBuaWdodCB3YXMgaW4tc2FuZS5cIlxuXHRcdFx0XHR9XG5cdFx0XHRdXG5cdFx0fSx7XG5cdFx0XHRcImlkXCI6IFwiYXJlbGx1ZlwiLFxuXHRcdFx0XCJwZXJzb25cIjogXCJjYXBhc1wiLFxuXHRcdFx0XCJ0aW1lXCI6IFwiMiBtaW4gYWdvXCIsXG5cdFx0XHRcIm1lZGlhXCI6IHtcblx0XHRcdFx0XCJ0eXBlXCI6IFwidmlkZW9cIixcblx0XHRcdFx0XCJpZFwiOiBcImZ1bi1mYWN0XCJcblx0XHRcdH0sXG5cdFx0XHRcImNvbW1lbnRzXCI6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdFwicGVyc29uLW5hbWVcIjogXCJjYXBhc1wiLFxuXHRcdFx0XHRcdFwicGVyc29uLXRleHRcIjogXCJNZSBiZWluZyBtZeKApiBIZWhlIDopIDxzcGFuPiNjYW1wZXI8L3NwYW4+XCJcblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdH0se1xuXHRcdFx0XCJpZFwiOiBcImFyZWxsdWZcIixcblx0XHRcdFwicGVyc29uXCI6IFwiY2FwYXNcIixcblx0XHRcdFwidGltZVwiOiBcIjIgbWluIGFnb1wiLFxuXHRcdFx0XCJtZWRpYVwiOiB7XG5cdFx0XHRcdFwidHlwZVwiOiBcInZpZGVvXCIsXG5cdFx0XHRcdFwiaWRcIjogXCJjaGFyYWN0ZXJcIlxuXHRcdFx0fSxcblx0XHRcdFwiY29tbWVudHNcIjogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0XCJwZXJzb24tbmFtZVwiOiBcImNhcGFzXCIsXG5cdFx0XHRcdFx0XCJwZXJzb24tdGV4dFwiOiBcIlNvIG11Y2ggZnVuIE1hbGxvcmNhICNNYWxsb3JjYUJ5Q2FtcGVyXCJcblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdH0sXG5cblx0XHR7XG5cdFx0XHRcImlkXCI6IFwiYXJlbGx1ZlwiLFxuXHRcdFx0XCJwZXJzb25cIjogXCJwZWxvdGFzXCIsXG5cdFx0XHRcInRpbWVcIjogXCIyIG1pbiBhZ29cIixcblx0XHRcdFwibWVkaWFcIjoge1xuXHRcdFx0XHRcInR5cGVcIjogXCJpbWFnZVwiLFxuXHRcdFx0XHRcImlkXCI6IFwic2hvZVwiXG5cdFx0XHR9LFxuXHRcdFx0XCJjb21tZW50c1wiOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRcInBlcnNvbi1uYW1lXCI6IFwicGVsb3Rhc1wiLFxuXHRcdFx0XHRcdFwicGVyc29uLXRleHRcIjogXCJDaGVjayBvdXQgbXkgbW9sZGVkIFBlbG90YXNcIlxuXHRcdFx0XHR9XG5cdFx0XHRdXG5cdFx0fSx7XG5cdFx0XHRcImlkXCI6IFwiYXJlbGx1ZlwiLFxuXHRcdFx0XCJwZXJzb25cIjogXCJwZWxvdGFzXCIsXG5cdFx0XHRcInRpbWVcIjogXCIyIG1pbiBhZ29cIixcblx0XHRcdFwibWVkaWFcIjoge1xuXHRcdFx0XHRcInR5cGVcIjogXCJpbWFnZVwiLFxuXHRcdFx0XHRcImlkXCI6IFwiY2hhcmFjdGVyXCJcblx0XHRcdH0sXG5cdFx0XHRcImNvbW1lbnRzXCI6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdFwicGVyc29uLW5hbWVcIjogXCJwZWxvdGFzXCIsXG5cdFx0XHRcdFx0XCJwZXJzb24tdGV4dFwiOiBcIlJpZGVycyBvZiBNYWxsb3JkYSAjY2FtcGVyc2hvZXNcIlxuXHRcdFx0XHR9XG5cdFx0XHRdXG5cdFx0fSx7XG5cdFx0XHRcImlkXCI6IFwiYXJlbGx1ZlwiLFxuXHRcdFx0XCJwZXJzb25cIjogXCJwZWxvdGFzXCIsXG5cdFx0XHRcInRpbWVcIjogXCIyIG1pbiBhZ29cIixcblx0XHRcdFwibWVkaWFcIjoge1xuXHRcdFx0XHRcInR5cGVcIjogXCJ2aWRlb1wiLFxuXHRcdFx0XHRcImlkXCI6IFwiZnVuLWZhY3RcIlxuXHRcdFx0fSxcblx0XHRcdFwiY29tbWVudHNcIjogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0XCJwZXJzb24tbmFtZVwiOiBcInBlbG90YXNcIixcblx0XHRcdFx0XHRcInBlcnNvbi10ZXh0XCI6IFwiV2hhdCBoYXBwZW5zIGluIEFyZWxsdWYgc3RheXMgaW4gI0FyZWxsdWZcIlxuXHRcdFx0XHR9XG5cdFx0XHRdXG5cdFx0fSx7XG5cdFx0XHRcImlkXCI6IFwiYXJlbGx1ZlwiLFxuXHRcdFx0XCJwZXJzb25cIjogXCJwZWxvdGFzXCIsXG5cdFx0XHRcInRpbWVcIjogXCIyIG1pbiBhZ29cIixcblx0XHRcdFwibWVkaWFcIjoge1xuXHRcdFx0XHRcInR5cGVcIjogXCJ2aWRlb1wiLFxuXHRcdFx0XHRcImlkXCI6IFwiY2hhcmFjdGVyXCJcblx0XHRcdH0sXG5cdFx0XHRcImNvbW1lbnRzXCI6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdFwicGVyc29uLW5hbWVcIjogXCJwZWxvdGFzXCIsXG5cdFx0XHRcdFx0XCJwZXJzb24tdGV4dFwiOiBcIk5vIG5vbnNlbnNlICNzZWxmaWUgI01hbGxvcmNhQnlDYW1wZXJcIlxuXHRcdFx0XHR9XG5cdFx0XHRdXG5cdFx0fSxcblxuXHRcdHtcblx0XHRcdFwiaWRcIjogXCJhcmVsbHVmXCIsXG5cdFx0XHRcInBlcnNvblwiOiBcIm1hcnRhXCIsXG5cdFx0XHRcInRpbWVcIjogXCIyIG1pbiBhZ29cIixcblx0XHRcdFwibWVkaWFcIjoge1xuXHRcdFx0XHRcInR5cGVcIjogXCJpbWFnZVwiLFxuXHRcdFx0XHRcImlkXCI6IFwic2hvZVwiXG5cdFx0XHR9LFxuXHRcdFx0XCJjb21tZW50c1wiOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRcInBlcnNvbi1uYW1lXCI6IFwibWFydGFcIixcblx0XHRcdFx0XHRcInBlcnNvbi10ZXh0XCI6IFwiVGhlc2UgbmV3IENhbXBlcnMgYXJlIERhIGJvbWJcIlxuXHRcdFx0XHR9XG5cdFx0XHRdXG5cdFx0fSx7XG5cdFx0XHRcImlkXCI6IFwiYXJlbGx1ZlwiLFxuXHRcdFx0XCJwZXJzb25cIjogXCJtYXJ0YVwiLFxuXHRcdFx0XCJ0aW1lXCI6IFwiMiBtaW4gYWdvXCIsXG5cdFx0XHRcIm1lZGlhXCI6IHtcblx0XHRcdFx0XCJ0eXBlXCI6IFwiaW1hZ2VcIixcblx0XHRcdFx0XCJpZFwiOiBcImNoYXJhY3RlclwiXG5cdFx0XHR9LFxuXHRcdFx0XCJjb21tZW50c1wiOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRcInBlcnNvbi1uYW1lXCI6IFwibWFydGFcIixcblx0XHRcdFx0XHRcInBlcnNvbi10ZXh0XCI6IFwiSSdtIG5vdCBnb2luZyBpbiB0aGUgcG9vbCBsaWtlIHRoaXMuXCJcblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdH0se1xuXHRcdFx0XCJpZFwiOiBcImFyZWxsdWZcIixcblx0XHRcdFwicGVyc29uXCI6IFwibWFydGFcIixcblx0XHRcdFwidGltZVwiOiBcIjIgbWluIGFnb1wiLFxuXHRcdFx0XCJtZWRpYVwiOiB7XG5cdFx0XHRcdFwidHlwZVwiOiBcInZpZGVvXCIsXG5cdFx0XHRcdFwiaWRcIjogXCJmdW4tZmFjdFwiXG5cdFx0XHR9LFxuXHRcdFx0XCJjb21tZW50c1wiOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRcInBlcnNvbi1uYW1lXCI6IFwibWFydGFcIixcblx0XHRcdFx0XHRcInBlcnNvbi10ZXh0XCI6IFwiTWUgYmVpbmcgbWXigKYgSGVoZSA6KSA8c3Bhbj4jY2FtcGVyPC9zcGFuPlwiXG5cdFx0XHRcdH1cblx0XHRcdF1cblx0XHR9LHtcblx0XHRcdFwiaWRcIjogXCJhcmVsbHVmXCIsXG5cdFx0XHRcInBlcnNvblwiOiBcIm1hcnRhXCIsXG5cdFx0XHRcInRpbWVcIjogXCIyIG1pbiBhZ29cIixcblx0XHRcdFwibWVkaWFcIjoge1xuXHRcdFx0XHRcInR5cGVcIjogXCJ2aWRlb1wiLFxuXHRcdFx0XHRcImlkXCI6IFwiY2hhcmFjdGVyXCJcblx0XHRcdH0sXG5cdFx0XHRcImNvbW1lbnRzXCI6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdFwicGVyc29uLW5hbWVcIjogXCJtYXJ0YVwiLFxuXHRcdFx0XHRcdFwicGVyc29uLXRleHRcIjogXCJBZnRlciBwYXJ0eS4gQWZ0ZXIgbGlmZSAjU2VsZmllTGlmZSAjTWFsbG9yY2FCeUNhbXBlclwiXG5cdFx0XHRcdH1cblx0XHRcdF1cblx0XHR9LFxuXG5cdFx0e1xuXHRcdFx0XCJpZFwiOiBcImFyZWxsdWZcIixcblx0XHRcdFwicGVyc29uXCI6IFwia29iYXJhaFwiLFxuXHRcdFx0XCJ0aW1lXCI6IFwiMiBtaW4gYWdvXCIsXG5cdFx0XHRcIm1lZGlhXCI6IHtcblx0XHRcdFx0XCJ0eXBlXCI6IFwiaW1hZ2VcIixcblx0XHRcdFx0XCJpZFwiOiBcInNob2VcIlxuXHRcdFx0fSxcblx0XHRcdFwiY29tbWVudHNcIjogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0XCJwZXJzb24tbmFtZVwiOiBcImtvYmFyYWhcIixcblx0XHRcdFx0XHRcInBlcnNvbi10ZXh0XCI6IFwiSSBkYXJlIHlvdVwiXG5cdFx0XHRcdH1cblx0XHRcdF1cblx0XHR9LHtcblx0XHRcdFwiaWRcIjogXCJhcmVsbHVmXCIsXG5cdFx0XHRcInBlcnNvblwiOiBcImtvYmFyYWhcIixcblx0XHRcdFwidGltZVwiOiBcIjIgbWluIGFnb1wiLFxuXHRcdFx0XCJtZWRpYVwiOiB7XG5cdFx0XHRcdFwidHlwZVwiOiBcImltYWdlXCIsXG5cdFx0XHRcdFwiaWRcIjogXCJjaGFyYWN0ZXJcIlxuXHRcdFx0fSxcblx0XHRcdFwiY29tbWVudHNcIjogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0XCJwZXJzb24tbmFtZVwiOiBcImtvYmFyYWhcIixcblx0XHRcdFx0XHRcInBlcnNvbi10ZXh0XCI6IFwiV2lzaCB5b3Ugd2VyZSBoZXJlICNhcmVsbHVmXCJcblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdH0se1xuXHRcdFx0XCJpZFwiOiBcImFyZWxsdWZcIixcblx0XHRcdFwicGVyc29uXCI6IFwia29iYXJhaFwiLFxuXHRcdFx0XCJ0aW1lXCI6IFwiMiBtaW4gYWdvXCIsXG5cdFx0XHRcIm1lZGlhXCI6IHtcblx0XHRcdFx0XCJ0eXBlXCI6IFwidmlkZW9cIixcblx0XHRcdFx0XCJpZFwiOiBcImZ1bi1mYWN0XCJcblx0XHRcdH0sXG5cdFx0XHRcImNvbW1lbnRzXCI6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdFwicGVyc29uLW5hbWVcIjogXCJrb2JhcmFoXCIsXG5cdFx0XHRcdFx0XCJwZXJzb24tdGV4dFwiOiBcIkhhdGVycyB3aWxsIHNheSBpdCdzIFBob3Rvc2hvcFwiXG5cdFx0XHRcdH1cblx0XHRcdF1cblx0XHR9LHtcblx0XHRcdFwiaWRcIjogXCJhcmVsbHVmXCIsXG5cdFx0XHRcInBlcnNvblwiOiBcImtvYmFyYWhcIixcblx0XHRcdFwidGltZVwiOiBcIjIgbWluIGFnb1wiLFxuXHRcdFx0XCJtZWRpYVwiOiB7XG5cdFx0XHRcdFwidHlwZVwiOiBcInZpZGVvXCIsXG5cdFx0XHRcdFwiaWRcIjogXCJjaGFyYWN0ZXJcIlxuXHRcdFx0fSxcblx0XHRcdFwiY29tbWVudHNcIjogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0XCJwZXJzb24tbmFtZVwiOiBcImtvYmFyYWhcIixcblx0XHRcdFx0XHRcInBlcnNvbi10ZXh0XCI6IFwiQ2FsbCBtZSBQYW5kZW1vbmlhICNNYWxsb3JjYUJ5Q2FtcGVyXCJcblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdH0sXG5cblx0XHR7XG5cdFx0XHRcImlkXCI6IFwiYXJlbGx1ZlwiLFxuXHRcdFx0XCJwZXJzb25cIjogXCJkdWJcIixcblx0XHRcdFwidGltZVwiOiBcIjIgbWluIGFnb1wiLFxuXHRcdFx0XCJtZWRpYVwiOiB7XG5cdFx0XHRcdFwidHlwZVwiOiBcImltYWdlXCIsXG5cdFx0XHRcdFwiaWRcIjogXCJzaG9lXCJcblx0XHRcdH0sXG5cdFx0XHRcImNvbW1lbnRzXCI6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdFwicGVyc29uLW5hbWVcIjogXCJkdWJcIixcblx0XHRcdFx0XHRcInBlcnNvbi10ZXh0XCI6IFwiTXkgbmV3IENhbXBlcnMgYXJlIHRoZSBTVVYgb2Ygc2hvZXNcIlxuXHRcdFx0XHR9XG5cdFx0XHRdXG5cdFx0fSx7XG5cdFx0XHRcImlkXCI6IFwiYXJlbGx1ZlwiLFxuXHRcdFx0XCJwZXJzb25cIjogXCJkdWJcIixcblx0XHRcdFwidGltZVwiOiBcIjIgbWluIGFnb1wiLFxuXHRcdFx0XCJtZWRpYVwiOiB7XG5cdFx0XHRcdFwidHlwZVwiOiBcImltYWdlXCIsXG5cdFx0XHRcdFwiaWRcIjogXCJjaGFyYWN0ZXJcIlxuXHRcdFx0fSxcblx0XHRcdFwiY29tbWVudHNcIjogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0XCJwZXJzb24tbmFtZVwiOiBcImR1YlwiLFxuXHRcdFx0XHRcdFwicGVyc29uLXRleHRcIjogXCJGcmVlIGRpdmluZyBleGN1cnNpb25zIHRoaXMgYWZ0ZXJub29uIGF0ICNhcmVsbHVmLiBQTSBtZSBpZiBpbnRlcmVzdGVkXCJcblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdH0se1xuXHRcdFx0XCJpZFwiOiBcImFyZWxsdWZcIixcblx0XHRcdFwicGVyc29uXCI6IFwiZHViXCIsXG5cdFx0XHRcInRpbWVcIjogXCIyIG1pbiBhZ29cIixcblx0XHRcdFwibWVkaWFcIjoge1xuXHRcdFx0XHRcInR5cGVcIjogXCJ2aWRlb1wiLFxuXHRcdFx0XHRcImlkXCI6IFwiZnVuLWZhY3RcIlxuXHRcdFx0fSxcblx0XHRcdFwiY29tbWVudHNcIjogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0XCJwZXJzb24tbmFtZVwiOiBcImR1YlwiLFxuXHRcdFx0XHRcdFwicGVyc29uLXRleHRcIjogXCJNZSBiZWluZyBtZeKApiBIZWhlIDopIDxzcGFuPiNjYW1wZXI8L3NwYW4+XCJcblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdH0se1xuXHRcdFx0XCJpZFwiOiBcImFyZWxsdWZcIixcblx0XHRcdFwicGVyc29uXCI6IFwiZHViXCIsXG5cdFx0XHRcInRpbWVcIjogXCIyIG1pbiBhZ29cIixcblx0XHRcdFwibWVkaWFcIjoge1xuXHRcdFx0XHRcInR5cGVcIjogXCJ2aWRlb1wiLFxuXHRcdFx0XHRcImlkXCI6IFwiY2hhcmFjdGVyXCJcblx0XHRcdH0sXG5cdFx0XHRcImNvbW1lbnRzXCI6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdFwicGVyc29uLW5hbWVcIjogXCJkdWJcIixcblx0XHRcdFx0XHRcInBlcnNvbi10ZXh0XCI6IFwiUGVhY2UgWeKAmWFsbCAjTWFsbG9yY2FCeUNhbXBlclwiXG5cdFx0XHRcdH1cblx0XHRcdF1cblx0XHR9LFxuXG5cdFx0e1xuXHRcdFx0XCJpZFwiOiBcImFyZWxsdWZcIixcblx0XHRcdFwicGVyc29uXCI6IFwicGFyYWRpc2VcIixcblx0XHRcdFwidGltZVwiOiBcIjIgbWluIGFnb1wiLFxuXHRcdFx0XCJtZWRpYVwiOiB7XG5cdFx0XHRcdFwidHlwZVwiOiBcImltYWdlXCIsXG5cdFx0XHRcdFwiaWRcIjogXCJzaG9lXCJcblx0XHRcdH0sXG5cdFx0XHRcImNvbW1lbnRzXCI6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdFwicGVyc29uLW5hbWVcIjogXCJwYXJhZGlzZVwiLFxuXHRcdFx0XHRcdFwicGVyc29uLXRleHRcIjogXCJCb2xkIGFuZCBCZWF1dGlmdWxcIlxuXHRcdFx0XHR9XG5cdFx0XHRdXG5cdFx0fSx7XG5cdFx0XHRcImlkXCI6IFwiYXJlbGx1ZlwiLFxuXHRcdFx0XCJwZXJzb25cIjogXCJwYXJhZGlzZVwiLFxuXHRcdFx0XCJ0aW1lXCI6IFwiMiBtaW4gYWdvXCIsXG5cdFx0XHRcIm1lZGlhXCI6IHtcblx0XHRcdFx0XCJ0eXBlXCI6IFwiaW1hZ2VcIixcblx0XHRcdFx0XCJpZFwiOiBcImNoYXJhY3RlclwiXG5cdFx0XHR9LFxuXHRcdFx0XCJjb21tZW50c1wiOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRcInBlcnNvbi1uYW1lXCI6IFwicGFyYWRpc2VcIixcblx0XHRcdFx0XHRcInBlcnNvbi10ZXh0XCI6IFwiRGV0b3ggYnkgdGhlIHBvb2wuIE11Y2ggbmVlZGVkLlwiXG5cdFx0XHRcdH1cblx0XHRcdF1cblx0XHR9LHtcblx0XHRcdFwiaWRcIjogXCJhcmVsbHVmXCIsXG5cdFx0XHRcInBlcnNvblwiOiBcInBhcmFkaXNlXCIsXG5cdFx0XHRcInRpbWVcIjogXCIyIG1pbiBhZ29cIixcblx0XHRcdFwibWVkaWFcIjoge1xuXHRcdFx0XHRcInR5cGVcIjogXCJ2aWRlb1wiLFxuXHRcdFx0XHRcImlkXCI6IFwiZnVuLWZhY3RcIlxuXHRcdFx0fSxcblx0XHRcdFwiY29tbWVudHNcIjogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0XCJwZXJzb24tbmFtZVwiOiBcInBhcmFkaXNlXCIsXG5cdFx0XHRcdFx0XCJwZXJzb24tdGV4dFwiOiBcIlNlbGZpZSBvbiB3YXRlcnNsaWRlIGxpa2UgYSBib3NzICNTZWxmaWVSaWRlXCJcblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdH0se1xuXHRcdFx0XCJpZFwiOiBcImFyZWxsdWZcIixcblx0XHRcdFwicGVyc29uXCI6IFwicGFyYWRpc2VcIixcblx0XHRcdFwidGltZVwiOiBcIjIgbWluIGFnb1wiLFxuXHRcdFx0XCJtZWRpYVwiOiB7XG5cdFx0XHRcdFwidHlwZVwiOiBcInZpZGVvXCIsXG5cdFx0XHRcdFwiaWRcIjogXCJjaGFyYWN0ZXJcIlxuXHRcdFx0fSxcblx0XHRcdFwiY29tbWVudHNcIjogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0XCJwZXJzb24tbmFtZVwiOiBcInBhcmFkaXNlXCIsXG5cdFx0XHRcdFx0XCJwZXJzb24tdGV4dFwiOiBcIkkgYW0gbm90IGEgYmltYm8uXCJcblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdH1cblx0XSxcblxuXHRcImRlZmF1bHQtcm91dGVcIjogXCJcIixcblxuXHRcInJvdXRpbmdcIjoge1xuXHRcdFwiL1wiOiB7XG5cdFx0XHRcInRleHRzXCI6IHtcblx0XHRcdFx0XCJlblwiOiB7XG5cdFx0XHRcdFx0XCJnZW5lcmljXCI6IFwiVGhlIFNwcmluZy9TdW1tZXIgMjAxNiBjb2xsZWN0aW9uIGlzIGluc3BpcmVkIGJ5IE1hbGxvcmNhLCB0aGUgTWVkaXRlcnJhbmVhbiBpc2xhbmQgdGhhdCBDYW1wZXIgY2FsbHMgaG9tZS4gT3VyIHZpc2lvbiBvZiB0aGlzIHN1bm55IHBhcmFkaXNlIGhpZ2hsaWdodHMgdGhyZWUgaG90IHNwb3RzOiBEZWlhLCBFcyBUcmVuYywgYW5kIEFyZWxsdWYuIEZvciB1cywgTWFsbG9yY2EgaXNu4oCZdCBqdXN0IGEgZGVzdGluYXRpb24sIGl04oCZcyBhIHN0YXRlIG9mIG1pbmQuICNNYWxsb3JjYUJ5Q2FtcGVyXCIsXG5cdFx0XHRcdFx0XCJkZWlhXCI6IFwiVGhlIHZpbGxhZ2Ugb2YgRGVpYSBoYXMgbG9uZyBhdHRyYWN0ZWQgYm90aCByZXRpcmVlcyBhbmQgcm9jayBzdGFycyB3aXRoIGl0cyBwaWN0dXJlc3F1ZSBzY2VuZXJ5IGFuZCBjaGlsbCB2aWJlLiBUaGUgc2VlbWluZ2x5IHNsZWVweSBjb3VudHJ5c2lkZSBoYXMgYSBib2hlbWlhbiBzcGlyaXQgdW5pcXVlIHRvIHRoaXMgbW91bnRhaW4gZW5jbGF2ZS4gI0RlaWFCeUNhbXBlclwiLFxuXHRcdFx0XHRcdFwiYXJlbGx1ZlwiOiBcIlRoZSBmaXN0LXB1bXBpbmcgcmFnZXJzIG9mIEFyZW5hbCBhbmQgdW5icmlkbGVkIGRlYmF1Y2hlcnkgb2YgTWFnYWx1ZiBtZWV0IGluIEFyZWxsdWYsIGFuIGltYWdpbmVkIGJ1dCBlcGljIHBhcnQgb2Ygb3VyIHZpc2lvbiBvZiB0aGlzIGJlbG92ZWQgaXNsYW5kLiBJdOKAmXMgYWxsIG5lb24gYW5kIG5vbi1zdG9wIHBhcnR5aW5nIGluIHRoZSBzdW1tZXIgc3VuIOKAkyBxdWl0ZSBsaXRlcmFsbHkgYSBob3QgbWVzcy4gI0FyZWxsdWZCeUNhbXBlclwiLFxuXHRcdFx0XHRcdFwiZXMtdHJlbmNcIjogXCJUaGlzIGNvYXN0YWwgd2lsZGVybmVzcyBib2FzdHMgYnJlYXRodGFraW5nIGJlYWNoZXMgYW5kIGEgc2VyZW5lIGF0bW9zcGhlcmUuIFRoZSBzZWFzaWRlIGhhcyBhbiB1bnRhbWVkIHlldCBwZWFjZWZ1bCBmZWVsaW5nIHRoYXQgaXMgYm90aCBpbnNwaXJpbmcgYW5kIHNvb3RoaW5nLiAjRXNUcmVuY0J5Q2FtcGVyXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0XCJmclwiOiB7XG5cdFx0XHRcdFx0XCJnZW5lcmljXCI6IFwiTGEgY29sbGVjdGlvbiBQcmludGVtcHMvw4l0w6kgMjAxNiBz4oCZaW5zcGlyZSBkZSBNYWpvcnF1ZSwgbOKAmcOubGUgbcOpZGl0ZXJyYW7DqWVubmUgZCdvw7kgQ2FtcGVyIGVzdCBvcmlnaW5haXJlLiBOb3RyZSB2aXNpb24gZGUgY2UgcGFyYWRpcyBlbnNvbGVpbGzDqSBzZSByZWZsw6h0ZSBkYW5zIHRyb2lzIGxpZXV4IGluY29udG91cm5hYmxlcyA6IERlaWEsIEVzIFRyZW5jIGV0IEFyZWxsdWYuIFBvdXIgbm91cywgTWFqb3JxdWUgZXN0IHBsdXMgcXXigJl1bmUgc2ltcGxlIGRlc3RpbmF0aW9uIDogY+KAmWVzdCB1biDDqXRhdCBk4oCZZXNwcml0LiAjTWFsbG9yY2FCeUNhbXBlclwiLFxuXHRcdFx0XHRcdFwiZGVpYVwiOiBcIkxlIHZpbGxhZ2UgZGUgRGVpYSBhdHRpcmUgZGVwdWlzIGxvbmd0ZW1wcyBsZXMgcmV0cmFpdMOpcyBjb21tZSBsZXMgcm9jayBzdGFycyBncsOiY2Ugw6Agc2VzIHBheXNhZ2VzIHBpdHRvcmVzcXVlcyBldCBzb24gYW1iaWFuY2UgZMOpY29udHJhY3TDqWUuIFNhIGNhbXBhZ25lIGTigJlhcHBhcmVuY2UgdHJhbnF1aWxsZSBhZmZpY2hlIHVuIGVzcHJpdCBib2jDqG1lIGNhcmFjdMOpcmlzdGlxdWUgZGUgY2V0dGUgZW5jbGF2ZSBtb250YWduZXVzZS4gI0RlaWFCeUNhbXBlclwiLFxuXHRcdFx0XHRcdFwiYXJlbGx1ZlwiOiBcIkzigJlleGFsdGF0aW9uIGTigJlBcmVuYWwgZXQgbGVzIHNvaXLDqWVzIGTDqWJyaWTDqWVzIGRlIE1hZ2FsdWYgc2UgcmVqb2lnbmVudCDDoCBBcmVsbHVmLCB1biBsaWV1IGltYWdpbmFpcmUgbWFpcyBjZW50cmFsIGRhbnMgbm90cmUgdmlzaW9uIGRlIGNldHRlIMOubGUgYWRvcsOpZS4gVG91dCB5IGVzdCBxdWVzdGlvbiBkZSBmbHVvIGV0IGRlIGbDqnRlcyBzYW5zIGZpbiBhdSBzb2xlaWwgZGUgbOKAmcOpdMOpIDogdW4gam95ZXV4IGJhemFyLCBlbiBzb21tZS4gI0FyZWxsdWZCeUNhbXBlclwiLFxuXHRcdFx0XHRcdFwiZXMtdHJlbmNcIjogXCJDZXR0ZSBuYXR1cmUgc2F1dmFnZSBjw7R0acOocmUgam91aXQgZOKAmXVuZSBzdXBlcmJlIHBsYWdlIGV0IGTigJl1bmUgYXRtb3NwaMOocmUgY2FsbWUuIExlIGJvcmQgZGUgbWVyIGEgdW4gY8O0dMOpIMOgIGxhIGZvaXMgdHJhbnF1aWxsZSBldCBpbmRvbXB0w6kgcXVpIGluc3BpcmUgYXV0YW50IHF14oCZaWwgYXBhaXNlLiAjRXNUcmVuY0J5Q2FtcGVyXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0XCJlc1wiOiB7XG5cdFx0XHRcdFx0XCJnZW5lcmljXCI6IFwiTGEgY29sZWNjacOzbiBwcmltYXZlcmEvdmVyYW5vIDIwMTYgZXN0w6EgaW5zcGlyYWRhIGVuIE1hbGxvcmNhLCBsYSBpc2xhIG1lZGl0ZXJyw6FuZWEgcXVlIENhbXBlciBjb25zaWRlcmEgc3UgaG9nYXIuIE51ZXN0cmEgdmlzacOzbiBkZSBlc3RlIHBhcmHDrXNvIHNvbGVhZG8gZGVzdGFjYSB0cmVzIGx1Z2FyZXMgaW1wb3J0YW50ZXM6IERlaWEsIEVzIFRyZW5jIHkgQXJlbGx1Zi4gUGFyYSBub3NvdHJvcywgTWFsbG9yY2Egbm8gZXMgdGFuIHNvbG8gdW4gZGVzdGlubywgZXMgdW4gZXN0YWRvIGRlIMOhbmltby4gI01hbGxvcmNhQnlDYW1wZXJcIixcblx0XHRcdFx0XHRcImRlaWFcIjogXCJMb3MgaG9yaXpvbnRlcyBwaW50b3Jlc2NvcyB5IGxhIHRyYW5xdWlsaWRhZCBkZWwgcHVlYmxvIGRlIERlaWEgbGxldmFuIG11Y2hvIHRpZW1wbyBjYXV0aXZhbmRvIHRhbnRvIGEgYXJ0aXN0YXMgcmV0aXJhZG9zIGNvbW8gYSBlc3RyZWxsYXMgZGVsIHJvY2suIEVsIHBhaXNhamUgcnVyYWwgZGUgYXBhcmVudGUgY2FsbWEgcG9zZWUgdW4gZXNww61yaXR1IGJvaGVtaW8gcHJvcGlvIGRlIGVzdGUgZW5jbGF2ZSBtb250YcOxb3NvLiAjRGVpYUJ5Q2FtcGVyXCIsXG5cdFx0XHRcdFx0XCJhcmVsbHVmXCI6IFwiTGEgbG9jdXJhIGZpZXN0ZXJhIGRlIFPigJlBcmVuYWwgeSBlbCBkZXNlbmZyZW5vIGRlIE1hZ2FsdWYgc2UgcmXDum5lbiBlbiBBcmVsbHVmLCB1bmEgY3JlYWNpw7NuIGRlbnRybyBkZSBudWVzdHJhIHZpc2nDs24gZGUgZXN0YSBxdWVyaWRhIGlzbGEuIFRvZG8gZ2lyYSBlbiB0b3JubyBhbCBuZcOzbiB5IGxhIGZpZXN0YSBzaW4gZmluIGJham8gZWwgc29sLiBFbiBkZWZpbml0aXZhLCB1bmEgY29tYmluYWNpw7NuIGV4cGxvc2l2YS4gI0FyZWxsdWZCeUNhbXBlclwiLFxuXHRcdFx0XHRcdFwiZXMtdHJlbmNcIjogXCJFc3RlIGVzcGFjaW8gbmF0dXJhbCB2aXJnZW4gY3VlbnRhIGNvbiB1bmEgcGxheWEgaW1wcmVzaW9uYW50ZSB5IHVuIGFtYmllbnRlIHNlcmVuby4gTGEgY29zdGEsIHNhbHZhamUgeSBwYWPDrWZpY2EgYWwgbWlzbW8gdGllbXBvLCB0cmFuc21pdGUgdW5hIHNlbnNhY2nDs24gZXZvY2Fkb3JhIHkgcmVsYWphbnRlLiAjRXNUcmVuY0J5Q2FtcGVyXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0XCJpdFwiOiB7XG5cdFx0XHRcdFx0XCJnZW5lcmljXCI6IFwiTGEgY29sbGV6aW9uZSBQcmltYXZlcmEvRXN0YXRlIDIwMTYgw6ggaXNwaXJhdGEgYSBNYWlvcmNhLCBs4oCZaXNvbGEgZGVsIE1lZGl0ZXJyYW5lbyBjaGUgaGEgZGF0byBpIG5hdGFsaSBhIENhbXBlci4gTGEgbm9zdHJhIHZpc2lvbmUgZGkgcXVlc3RvIHBhcmFkaXNvIGFzc29sYXRvIHNpIHNvZmZlcm1hIHN1IHRyZSBsdW9naGkgc2ltYm9sbzogRGVpYSwgRXMgVHJlbmMgZSBBcmVsbHVmLiBQZXIgbm9pLCBNYWlvcmNhIG5vbiDDqCB1bmEgc2VtcGxpY2UgbWV0YSwgw6ggdW5vIHN0YXRvIGQnYW5pbW8uICNNYWxsb3JjYUJ5Q2FtcGVyXCIsXG5cdFx0XHRcdFx0XCJkZWlhXCI6IFwiRGEgdGVtcG8sIGlsIHZpbGxhZ2dpbyBkaSBEZWlhIGF0dGlyYSBwZW5zaW9uYXRpIGUgcm9jayBzdGFyIGNvbiBpbCBzdW8gcGFlc2FnZ2lvIHBpdHRvcmVzY28gZSBsJ2F0bW9zZmVyYSByaWxhc3NhdGEuIExhIGNhbXBhZ25hIGFwcGFyZW50ZW1lbnRlIHNvbm5vbGVudGEgaGEgdW5vIHNwaXJpdG8gYm9ow6ltaWVuIHRpcGljbyBkaSBxdWVzdG8gcGFlc2lubyBkaSBtb250YWduYS4gI0RlaWFCeUNhbXBlclwiLFxuXHRcdFx0XHRcdFwiYXJlbGx1ZlwiOiBcIkdsaSBzY2F0ZW5hdGkgZmVzdGFpb2xpIGRpIEFyZW5hbCBlIGxhIHNmcmVuYXRhIGRpc3NvbHV0ZXp6YSBkaSBNYWdhbHVmIHNpIGZvbmRvbm8gaW4gQXJlbGx1ZiwgdW5hIHBhcnRlIGltbWFnaW5hcmlhIG1hIGVwaWNhIGRlbGxhIG5vc3RyYSB2aXNpb25lIGRpIHF1ZXN0YSBhZG9yYXRhIGlzb2xhLiDDiCB1biB0dXJiaW5pbyBkaSBsdWNpIGFsIG5lb24gZSBmZXN0ZSBpbmludGVycm90dGUgc290dG8gaWwgc29sZSBlc3Rpdm8sIHVuIGNhb3MgcGF6emVzY28uICNBcmVsbHVmQnlDYW1wZXJcIixcblx0XHRcdFx0XHRcImVzLXRyZW5jXCI6IFwiUXVlc3QnYXJlYSBwcm90ZXR0YSB2YW50YSB1bmEgc3BpYWdnaWEgbW96emFmaWF0byBlIHVuJ2F0bW9zZmVyYSBzZXJlbmEuIElsIGxpdG9yYWxlIGhhIHVuIGNoZSBkaSBzZWx2YWdnaW8sIG1hIHBhY2lmaWNvLCBjaGUgw6ggc3VnZ2VzdGl2byBlIHJpbGFzc2FudGUgYWwgdGVtcG8gc3Rlc3NvLiAjRXNUcmVuY0J5Q2FtcGVyXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0XCJkZVwiOiB7XG5cdFx0XHRcdFx0XCJnZW5lcmljXCI6IFwiRGllIEtvbGxla3Rpb24gRnLDvGhqYWhyL1NvbW1lciAyMDE2IGhhdCBzaWNoIHZvbiBNYWxsb3JjYSBpbnNwaXJpZXJlbiBsYXNzZW4sIGRlciBNaXR0ZWxtZWVyaW5zZWwsIGF1ZiBkZXIgQ2FtcGVyIHp1IEhhdXNlIGlzdC4gVW5zZXJlIFZpc2lvbiBkZXMgU29ubmVucGFyYWRpZXNlcyBiZWZhc3N0IHNpY2ggbWl0IGRyZWkgSG90c3BvdHM6IERlaWEsIEVzIFRyZW5jIHVuZCBBcmVsbHVmLiBGw7xyIHVucyBpc3QgTWFsbG9yY2EgbWVociBhbHMgbnVyIGVpbiBSZWlzZXppZWwsIGVzIGlzdCBlaW5lIExlYmVuc2VpbnN0ZWxsdW5nLiAjTWFsbG9yY2FCeUNhbXBlclwiLFxuXHRcdFx0XHRcdFwiZGVpYVwiOiBcIkRlciBPcnQgRGVpYSBtaXQgc2VpbmVyIG1hbGVyaXNjaGVuIExhbmRzY2hhZnQgdW5kIEzDpHNzaWdrZWl0IHppZWh0IHNlaXQgdmllbGVuIEphaHJlbiBuaWNodCBudXIgUGVuc2lvbsOkcmUsIHNvbmRlcm4gYXVjaCBSb2Nrc3RhcnMgYW4uIERpZSB2ZXJzY2hsYWZlbiBhbm11dGVuZGUgR2VnZW5kIHZlcnNwcsO8aHQgZWluZW4gZ2FueiBiZXNvbmRlcmVuIEJvaGVtaWFuLUNoYXJtZSwgZGVyIGVpbnppZ2FydGlnIGlzdCBmw7xyIGRpZXNlIEdlYmlyZ3NlbmtsYXZlLiAjRGVpYUJ5Q2FtcGVyXCIsXG5cdFx0XHRcdFx0XCJhcmVsbHVmXCI6IFwiRGllIGdlc3TDpGhsdGVuIEvDtnJwZXIgdm9uIEFyZW5hbCB1bmQgZGllIHVuZ2V6w7xnZWx0ZSBPZmZlbmhlaXQgdm9uIE1hZ2FsdWYgdHJlZmZlbiBpbiBBcmVsbHVmIGF1ZmVpbmFuZGVyIOKAkyBlaW4gZmFudGFzaWV2b2xsZXMgdW5kIGRvY2ggdW1mYXNzZW5kZXMgRWxlbWVudCB1bnNlcmVyIFZpc2lvbiBkZXIgYmVsaWVidGVuIEluc2VsLiBFaW4gU29tbWVyIGF1cyBlbmRsb3NlbiBQYXJ0eXMgaW4gTmVvbmZhcmJlbiDigJMgZWluIGVjaHQgaGVpw59lciBPcnQuICNBcmVsbHVmQnlDYW1wZXJcIixcblx0XHRcdFx0XHRcImVzLXRyZW5jXCI6IFwiRGllc2VyIHVuYmVyw7xocnRlIEvDvHN0ZW5zdHJlaWZlbiB2ZXJmw7xndCDDvGJlciBlaW5lbiBhdGVtYmVyYXViZW5kZW4gU3RyYW5kIHVuZCBlaW5lIGJlcnVoaWdlbmRlIEF0bW9zcGjDpHJlLiBEYXMgTWVlciBpc3QgdW5nZXrDpGhtdCB1bmQgZnJpZWR2b2xsIHp1Z2xlaWNoIHVuZCBkaWVudCBhbHMgUXVlbGxlIGRlciBJbnNwaXJhdGlvbiBlYmVuc28gd2llIGFscyBSdWhlcG9sLiAjRXNUcmVuY0J5Q2FtcGVyXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0XCJwdFwiOiB7XG5cdFx0XHRcdFx0XCJnZW5lcmljXCI6IFwiQSBjb2xlw6fDo28gcHJpbWF2ZXJhL3ZlcsOjbyAyMDE2IHRlbSBNYWlvcmNhIGNvbW8gaW5zcGlyYcOnw6NvLCBhIGlsaGEgbWVkaXRlcnLDom5lYSBxdWUgYSBDYW1wZXIgY2hhbWEgZGUgY2FzYS4gQSBub3NzYSB2aXPDo28gZGVzdGUgcGFyYcOtc28gc29sYXJlbmdvIHJlYWzDp2EgdHLDqnMgbG9jYWlzIGltcG9ydGFudGVzOiBEZWlhLCBFcyBUcmVuYyBlIEFyZWxsdWYuIFBhcmEgbsOzcywgTWFpb3JjYSBuw6NvIMOpIHPDsyB1bSBkZXN0aW5vIGRlIGbDqXJpYXMsIG1hcyB0YW1iw6ltIHVtIGVzdGFkbyBkZSBlc3DDrXJpdG8uICNNYWxsb3JjYUJ5Q2FtcGVyXCIsXG5cdFx0XHRcdFx0XCJkZWlhXCI6IFwiQSBhbGRlaWEgZGUgRGVpYSBzZW1wcmUgYXRyYWl1IHJlZm9ybWFkb3MgZSBlc3RyZWxhcyBkZSByb2NrIGRldmlkbyDDoCBzdWEgcGFpc2FnZW0gcGl0b3Jlc2NhIGUgYW1iaWVudGUgZGVzY29udHJhw61kby4gRXN0YSBhbGRlaWEgY2FtcGVzdHJlIGFwYXJlbnRlbWVudGUgcGFjYXRhIHRlbSB1bSBlc3DDrXJpdG8gYm/DqW1pbywgZXhjbHVzaXZvIGRlc3RlIGVuY2xhdmUgbW9udGFuaG9zby4gI0RlaWFCeUNhbXBlclwiLFxuXHRcdFx0XHRcdFwiYXJlbGx1ZlwiOiBcIkFzIGdyYW5kZXMgZmVzdGFzIGRlIEFyZW5hbCBlIGEgZGl2ZXJzw6NvIHNlbSBsaW1pdGVzIGRlIE1hZ2FsdWYgcmXDum5lbS1zZSBlbSBBcmVsbHVmLCB1bWEgcGFydGUgaW1hZ2luYWRhIG1hcyDDqXBpY2EgZGEgbm9zc2Egdmlzw6NvIGRlc3RhIGlsaGEgdMOjbyBhbWFkYSBwb3IgbsOzcy4gQSBjb21iaW5hw6fDo28gcGVyZmVpdGEgZW50cmUgdG9ucyBuw6lvbiBlIGZlc3RhcyBpbXBhcsOhdmVpcyBzb2IgbyBzb2wgZGUgdmVyw6NvICh1bWEgbWlzdHVyYSBiZW0gcXVlbnRlLCBuYSByZWFsaWRhZGUpLiAjQXJlbGx1ZkJ5Q2FtcGVyXCIsXG5cdFx0XHRcdFx0XCJlcy10cmVuY1wiOiBcIkVzdGEgdmFzdGEgcmVnacOjbyBjb3N0ZWlyYSBwb3NzdWkgcHJhaWFzIGltcHJlc3Npb25hbnRlcyBlIHVtIGFtYmllbnRlIHNlcmVuby4gTyBsaXRvcmFsIHRlbSB1bWEgYXRtb3NmZXJhIHNlbHZhZ2VtIGUgdHJhbnF1aWxhIGFvIG1lc21vIHRlbXBvLCBxdWUgw6kgdGFudG8gaW5zcGlyYWRvcmEgY29tbyByZWxheGFudGUuICNFc1RyZW5jQnlDYW1wZXJcIlxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0XCJhc3NldHNcIjogW1xuXHRcdFx0XHRcImJhY2tncm91bmQuanBnXCIsXG5cdFx0XHRcdFwiZGlzcGxhY2VtZW50LmpwZ1wiLFxuXHRcdFx0XHRcInZpZGVvLXNob3RzL2FyZWxsdWYtY2FwYXMuanBnXCIsXG5cdFx0XHRcdFwidmlkZW8tc2hvdHMvYXJlbGx1Zi1kdWIuanBnXCIsXG5cdFx0XHRcdFwidmlkZW8tc2hvdHMvYXJlbGx1Zi1rb2JhcmFoLmpwZ1wiLFxuXHRcdFx0XHRcInZpZGVvLXNob3RzL2FyZWxsdWYtcGFyYWRpc2UuanBnXCIsXG5cdFx0XHRcdFwidmlkZW8tc2hvdHMvYXJlbGx1Zi1wZWxvdGFzLmpwZ1wiLFxuXHRcdFx0XHRcInZpZGVvLXNob3RzL2FyZWxsdWYtbWFydGEuanBnXCIsXG5cdFx0XHRcdFwidmlkZW8tc2hvdHMvZGVpYS1kdWIuanBnXCIsXG5cdFx0XHRcdFwidmlkZW8tc2hvdHMvZGVpYS1tYXJ0YS5qcGdcIixcblx0XHRcdFx0XCJ2aWRlby1zaG90cy9kZWlhLW1hdGVvLmpwZ1wiLFxuXHRcdFx0XHRcInZpZGVvLXNob3RzL2VzLXRyZW5jLWJlbHVnYS5qcGdcIixcblx0XHRcdFx0XCJ2aWRlby1zaG90cy9lcy10cmVuYy1pc2FtdS5qcGdcIlxuXHRcdFx0XVxuXHRcdH0sXG5cbiAgICAgICAgXCJkZWlhL2R1YlwiOiB7XG4gICAgICAgIFx0XCJzZWxmaWUtc3RpY2stdmlkZW8tdXJsXCI6IFwiaHR0cDovL2VtYmVkLndpc3RpYS5jb20vZGVsaXZlcmllcy8xM2JiYjYxMTk1MTY0ODczZDgyM2EzYjkxYTJjODJhY2NlZmIzZWRkL2RlaWEtZHViLm1wNFwiLFxuICAgICAgICBcdFwiYW1iaWVudC1jb2xvclwiOiB7XG4gICAgICAgIFx0XHRcImZyb21cIjogeyBcImhcIjogMTg4LCBcInNcIjogODUsIFwidlwiOiA2MSB9LFxuICAgICAgICBcdFx0XCJ0b1wiOiB7IFwiaFwiOiAzNTcsIFwic1wiOiA5NywgXCJ2XCI6IDI2IH0sXG4gICAgICAgIFx0XHRcInNlbGZpZS1zdGlja1wiOiB7IFwiaFwiOiAzNTksIFwic1wiOiA5MywgXCJ2XCI6IDUxIH1cbiAgICAgICAgXHR9LFxuICAgICAgICBcdFwiZnVuLWZhY3QtdmlkZW8tdXJsXCI6IFwiaHR0cDovL2VtYmVkLndpc3RpYS5jb20vZGVsaXZlcmllcy9iNzQxZWViMTczN2E2ODJmNTY0NmNiYTE3ZTA0MDYzMGExZGQwMThhL2RlaWEtZHViLm1wNFwiLFxuICAgICAgICBcdFwiZmFjdFwiOiB7XG4gICAgICAgIFx0XHRcImVuXCI6IFwiQnJlYWtpbmcgdXAgdmlhIHRleHQgbWVzc2FnZS4gbm90IGEgdmVyeSBkZWlhIHRoaW5nIHRvIGRvXCJcbiAgICAgICAgXHR9LFxuICAgICAgICBcdFwic2hvcC11cmxcIjogXCJodHRwOi8vd3d3LmNhbXBlci5jb20vaW50L21lbi9zaG9lcy9kdWJfZGVpYV9zczIwMTZcIixcbiAgICAgICAgXHRcIndpc3RpYS1jaGFyYWN0ZXItaWRcIjogXCJhempjMmpoNjJqXCIsXG4gICAgICAgIFx0XCJ3aXN0aWEtZnVuLWlkXCI6IFwibG5mdmMzYWc1MFwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiZGVpYS9tYXRlb1wiOiB7XG4gICAgICAgIFx0XCJzZWxmaWUtc3RpY2stdmlkZW8tdXJsXCI6IFwiaHR0cDovL2VtYmVkLndpc3RpYS5jb20vZGVsaXZlcmllcy9lNDI0ODg5YWMwMjZmNzBlNTQ0YWYwMzAzNWU3MTg3ZjM0OTQxNzA1L2RlaWEtbWF0ZW8ubXA0XCIsXG4gICAgICAgIFx0XCJhbWJpZW50LWNvbG9yXCI6IHtcbiAgICAgICAgXHRcdFwiZnJvbVwiOiB7IFwiaFwiOiAzNywgXCJzXCI6IDg5LCBcInZcIjogODMgfSxcbiAgICAgICAgXHRcdFwidG9cIjogeyBcImhcIjogOCwgXCJzXCI6IDg2LCBcInZcIjogNTcgfSxcbiAgICAgICAgXHRcdFwic2VsZmllLXN0aWNrXCI6IHsgXCJoXCI6IDgsIFwic1wiOiA4NiwgXCJ2XCI6IDU3IH1cbiAgICAgICAgXHR9LFxuICAgICAgICBcdFwiZnVuLWZhY3QtdmlkZW8tdXJsXCI6IFwiaHR0cDovL2VtYmVkLndpc3RpYS5jb20vZGVsaXZlcmllcy8zNDRjNzExMjM4OTc3NDkwYzA3MzA1MDllNzNiYTExN2Y5NDY0MzM4L2RlaWEtbWF0ZW8ubXA0XCIsXG4gICAgICAgIFx0XCJmYWN0XCI6IHtcbiAgICAgICAgXHRcdFwiZW5cIjogXCJidXlzIGFuIGF0ZWxpZXIgYXQgZGVpYS4gc3RhcnRzIGNhcmVlciBhcyBhbiBhcnRpc3RcIlxuICAgICAgICBcdH0sXG4gICAgICAgIFx0XCJzaG9wLXVybFwiOiBcImh0dHA6Ly93d3cuY2FtcGVyLmNvbS9pbnQvbWVuL3Nob2VzL21hdGVvX2RlaWFfc3MyMDE2XCIsXG4gICAgICAgIFx0XCJ3aXN0aWEtY2hhcmFjdGVyLWlkXCI6IFwiNmhldDFrbmlrM1wiLFxuICAgICAgICBcdFwid2lzdGlhLWZ1bi1pZFwiOiBcIjZwMzJseXZkcW9cIlxuICAgICAgICB9LFxuXG4gICAgICAgIFwiZGVpYS9tYXJ0YVwiOiB7XG4gICAgICAgIFx0XCJzZWxmaWUtc3RpY2stdmlkZW8tdXJsXCI6IFwiaHR0cDovL2VtYmVkLndpc3RpYS5jb20vZGVsaXZlcmllcy80YmI2ZTQ4NWI3MTdiZjdkYmRkNWM5NDFmYWZhMmIxODg0ZTkwODM4L2RlaWEtbWFydGEubXA0XCIsXG4gICAgICAgIFx0XCJhbWJpZW50LWNvbG9yXCI6IHtcbiAgICAgICAgXHRcdFwiZnJvbVwiOiB7IFwiaFwiOiAzNDYsIFwic1wiOiA3MCwgXCJ2XCI6IDU1IH0sXG4gICAgICAgIFx0XHRcInRvXCI6IHsgXCJoXCI6IDI0NCwgXCJzXCI6IDI5LCBcInZcIjogNzMgfSxcbiAgICAgICAgXHRcdFwic2VsZmllLXN0aWNrXCI6IHsgXCJoXCI6IDI0NCwgXCJzXCI6IDI5LCBcInZcIjogNzMgfVxuICAgICAgICBcdH0sXG4gICAgICAgIFx0XCJmdW4tZmFjdC12aWRlby11cmxcIjogXCJodHRwOi8vZW1iZWQud2lzdGlhLmNvbS9kZWxpdmVyaWVzL2QxNTliNTVmZjhjZWNjOWNiZDhjMGMxMmVlMjc4MWUyZWRhMjNlOTMvZGVpYS1tYXJ0YS5tcDRcIixcbiAgICAgICAgXHRcImZhY3RcIjoge1xuICAgICAgICBcdFx0XCJlblwiOiBcIkZPTU8gb2Ygbm90IGJlaW5nIGF0IGRlaWFcIlxuICAgICAgICBcdH0sXG4gICAgICAgIFx0XCJzaG9wLXVybFwiOiBcImh0dHA6Ly93d3cuY2FtcGVyLmNvbS9pbnQvd29tZW4vc2hvZXMvbWFydGFfZGVpYV9zczIwMTZcIixcbiAgICAgICAgXHRcIndpc3RpYS1jaGFyYWN0ZXItaWRcIjogXCJ0b3JvMnBlNDY5XCIsXG4gICAgICAgIFx0XCJ3aXN0aWEtZnVuLWlkXCI6IFwiYmdreDdnbWsxM1wiXG4gICAgICAgIH0sXG5cbiAgICAgICAgXCJlcy10cmVuYy9iZWx1Z2FcIjoge1xuICAgICAgICBcdFwic2VsZmllLXN0aWNrLXZpZGVvLXVybFwiOiBcImh0dHA6Ly9lbWJlZC53aXN0aWEuY29tL2RlbGl2ZXJpZXMvMjM0NDRkM2M4NjkzZTU5ZjgwNzlmODI3ZGQxODJjNWUzMzQxMzg3Ny9lcy10cmVuYy1iZWx1Z2EubXA0XCIsXG4gICAgICAgIFx0XCJhbWJpZW50LWNvbG9yXCI6IHtcbiAgICAgICAgXHRcdFwiZnJvbVwiOiB7IFwiaFwiOiAyMTIsIFwic1wiOiAxMCwgXCJ2XCI6IDY5IH0sXG4gICAgICAgIFx0XHRcInRvXCI6IHsgXCJoXCI6IDE5MywgXCJzXCI6IDEyLCBcInZcIjogNDUgfSxcbiAgICAgICAgXHRcdFwic2VsZmllLXN0aWNrXCI6IHsgXCJoXCI6IDE5MywgXCJzXCI6IDAsIFwidlwiOiA0NSB9XG4gICAgICAgIFx0fSxcbiAgICAgICAgXHRcImZ1bi1mYWN0LXZpZGVvLXVybFwiOiBcImh0dHA6Ly9lbWJlZC53aXN0aWEuY29tL2RlbGl2ZXJpZXMvNzA0NTVhZDczYWY3YjdlMzVlOWU2NzQxMDk5MjljM2I3MDI5NDA2NC9lcy10cmVuYy1iZWx1Z2EubXA0XCIsXG4gICAgICAgIFx0XCJmYWN0XCI6IHtcbiAgICAgICAgXHRcdFwiZW5cIjogXCJFcyBUcmVuYyBudWRpc3QgUEFSVFkgQk9ZXCJcbiAgICAgICAgXHR9LFxuICAgICAgICBcdFwic2hvcC11cmxcIjogXCJodHRwOi8vd3d3LmNhbXBlci5jb20vaW50L21lbi9zaG9lcy9iZWx1Z2FfZXNfdHJlbmNfc3MyMDE2XCIsXG4gICAgICAgIFx0XCJ3aXN0aWEtY2hhcmFjdGVyLWlkXCI6IFwiZm8xMTJ6aDdwdlwiLFxuICAgICAgICBcdFwid2lzdGlhLWZ1bi1pZFwiOiBcIjk3YnZwemh0bmJcIlxuICAgICAgICB9LFxuICAgICAgICBcImVzLXRyZW5jL2lzYW11XCI6IHtcbiAgICAgICAgXHRcInNlbGZpZS1zdGljay12aWRlby11cmxcIjogXCJodHRwOi8vZW1iZWQud2lzdGlhLmNvbS9kZWxpdmVyaWVzLzZlYWZhZTdmMWIzYmM0MWQ4NTY5NzM1NTdhMmY1MTU5OGM4MjQxYTYvZXMtdHJlbmMtaXNhbXUubXA0XCIsXG4gICAgICAgIFx0XCJhbWJpZW50LWNvbG9yXCI6IHtcbiAgICAgICAgXHRcdFwiZnJvbVwiOiB7IFwiaFwiOiAyMTAsIFwic1wiOiAxLCBcInZcIjogNzQgfSxcbiAgICAgICAgXHRcdFwidG9cIjogeyBcImhcIjogMjEsIFwic1wiOiAzNSwgXCJ2XCI6IDcyIH0sXG4gICAgICAgIFx0XHRcInNlbGZpZS1zdGlja1wiOiB7IFwiaFwiOiAyMCwgXCJzXCI6IDQ1LCBcInZcIjogMzAgfVxuICAgICAgICBcdH0sXG4gICAgICAgIFx0XCJmdW4tZmFjdC12aWRlby11cmxcIjogXCJodHRwOi8vZW1iZWQud2lzdGlhLmNvbS9kZWxpdmVyaWVzLzA2Njc5ZjNlYmQ2OTZlOWM0MmZkMTNjZjlkYmRhZWZmZTliMWY4NzMvZXMtdHJlbmMtaXNhbXUubXA0XCIsXG4gICAgICAgIFx0XCJmYWN0XCI6IHtcbiAgICAgICAgXHRcdFwiZW5cIjogXCJVRk8gc2lnaHRpbmcgYXQgZXMgdHJlbmNcIlxuICAgICAgICBcdH0sXG4gICAgICAgIFx0XCJzaG9wLXVybFwiOiBcImh0dHA6Ly93d3cuY2FtcGVyLmNvbS9pbnQvd29tZW4vc2hvZXMvaXNhbXVfZXNfdHJlbmNfc3MyMDE2XCIsXG4gICAgICAgIFx0XCJ3aXN0aWEtY2hhcmFjdGVyLWlkXCI6IFwiMXhzYWJxN3lleVwiLFxuICAgICAgICBcdFwid2lzdGlhLWZ1bi1pZFwiOiBcInhubG55ZWU4M29cIlxuICAgICAgICB9LFxuXG5cdFx0XCJhcmVsbHVmL2NhcGFzXCI6IHtcblx0XHRcdFwic2VsZmllLXN0aWNrLXZpZGVvLXVybFwiOiBcImh0dHA6Ly9lbWJlZC53aXN0aWEuY29tL2RlbGl2ZXJpZXMvODQwYTNmNjcyOWIxZjUyZjQ0NmFhZTZkYWVjOTM5YTNlY2E0YzBjMS9hcmVsbHVmLWNhcGFzLm1wNFwiLFxuICAgICAgICBcdFwiYW1iaWVudC1jb2xvclwiOiB7XG4gICAgICAgIFx0XHRcImZyb21cIjogeyBcImhcIjogMCwgXCJzXCI6IDAsIFwidlwiOiAwIH0sXG4gICAgICAgIFx0XHRcInRvXCI6IHsgXCJoXCI6IDgsIFwic1wiOiA3NiwgXCJ2XCI6IDkxIH0sXG4gICAgICAgIFx0XHRcInNlbGZpZS1zdGlja1wiOiB7IFwiaFwiOiA4LCBcInNcIjogNzYsIFwidlwiOiA5MSB9XG4gICAgICAgIFx0fSxcbiAgICAgICAgXHRcImZ1bi1mYWN0LXZpZGVvLXVybFwiOiBcImh0dHA6Ly9lbWJlZC53aXN0aWEuY29tL2RlbGl2ZXJpZXMvNDhmZjFjNThiODZiMDg5MTI2ODFiNGZkZjNiNzU0N2M3NTc3NjZkNy9hcmVsbHVmLWNhcGFzLm1wNFwiLFxuICAgICAgICBcdFwiZmFjdFwiOiB7XG4gICAgICAgIFx0XHRcImVuXCI6IFwiTUVBTldISUxFIElOIEFSRUxMVUZcIlxuICAgICAgICBcdH0sXG4gICAgICAgIFx0XCJzaG9wLXVybFwiOiBcImh0dHA6Ly93d3cuY2FtcGVyLmNvbS9pbnQvbWVuL3Nob2VzL2NhcGFzX2FyZWxsdWZfc3MyMDE2XCIsXG4gICAgICAgIFx0XCJ3aXN0aWEtY2hhcmFjdGVyLWlkXCI6IFwiejdvcjY4ZGExdlwiLFxuICAgICAgICBcdFwid2lzdGlhLWZ1bi1pZFwiOiBcImtmYzB1MXZ2aHBcIlxuXHRcdH0sXG4gICAgICAgIFwiYXJlbGx1Zi9wZWxvdGFzXCI6IHtcbiAgICAgICAgXHRcInNlbGZpZS1zdGljay12aWRlby11cmxcIjogXCJodHRwOi8vZW1iZWQud2lzdGlhLmNvbS9kZWxpdmVyaWVzLzNkY2ZkNzBjNzA3MjY5MmVhM2E3MzlhZWY1Mzc2YjAyNmIwNGI2NzUvYXJlbGx1Zi1wZWxvdGFzLm1wNFwiLFxuICAgICAgICBcdFwiYW1iaWVudC1jb2xvclwiOiB7XG4gICAgICAgIFx0XHRcImZyb21cIjogeyBcImhcIjogMjExLCBcInNcIjogOTUsIFwidlwiOiAyOSB9LFxuICAgICAgICBcdFx0XCJ0b1wiOiB7IFwiaFwiOiAyMiwgXCJzXCI6IDM1LCBcInZcIjogNzkgfSxcbiAgICAgICAgXHRcdFwic2VsZmllLXN0aWNrXCI6IHsgXCJoXCI6IDIzMywgXCJzXCI6IDM1LCBcInZcIjogMTAgfVxuICAgICAgICBcdH0sXG4gICAgICAgIFx0XCJmdW4tZmFjdC12aWRlby11cmxcIjogXCJodHRwOi8vZW1iZWQud2lzdGlhLmNvbS9kZWxpdmVyaWVzL2FjMTZkNTNjNGY5ZThmZDY5MzA3NzllMjM3ODU0Njg3ZGNmMjQxZTgvYXJlbGx1Zi1wZWxvdGFzLm1wNFwiLFxuICAgICAgICBcdFwiZmFjdFwiOiB7XG4gICAgICAgIFx0XHRcImVuXCI6IFwiV0hBVCBIQVBQRU5TIElOIEFSRUxMVUYgU1RBWVMgSU4gQVJFTExVRlwiXG4gICAgICAgIFx0fSxcbiAgICAgICAgXHRcInNob3AtdXJsXCI6IFwiaHR0cDovL3d3dy5jYW1wZXIuY29tL2ludC9tZW4vc2hvZXMvcGVsb3Rhc19hcmVsbHVmX3NzMjAxNlwiLFxuICAgICAgICBcdFwid2lzdGlhLWNoYXJhY3Rlci1pZFwiOiBcImY5ZG8ycWx3bmpcIixcbiAgICAgICAgXHRcIndpc3RpYS1mdW4taWRcIjogXCJreWprYndjbjZ2XCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJhcmVsbHVmL21hcnRhXCI6IHtcbiAgICAgICAgXHRcInNlbGZpZS1zdGljay12aWRlby11cmxcIjogXCJodHRwOi8vZW1iZWQud2lzdGlhLmNvbS9kZWxpdmVyaWVzLzliOTQ3MWRjYmUxZjk0ZmY3YjM1MDg4NDFmNjhmZjE1YmUxOTJlZTQvYXJlbGx1Zi1tYXJ0YS5tcDRcIixcbiAgICAgICAgXHRcImFtYmllbnQtY29sb3JcIjoge1xuICAgICAgICBcdFx0XCJmcm9tXCI6IHsgXCJoXCI6IDIwMCwgXCJzXCI6IDU3LCBcInZcIjogODEgfSxcbiAgICAgICAgXHRcdFwidG9cIjogeyBcImhcIjogMjAxLCBcInNcIjogMTAwLCBcInZcIjogNjkgfSxcbiAgICAgICAgXHRcdFwic2VsZmllLXN0aWNrXCI6IHsgXCJoXCI6IDIwMSwgXCJzXCI6IDEwMCwgXCJ2XCI6IDY5IH1cbiAgICAgICAgXHR9LFxuICAgICAgICBcdFwiZnVuLWZhY3QtdmlkZW8tdXJsXCI6IFwiaHR0cDovL2VtYmVkLndpc3RpYS5jb20vZGVsaXZlcmllcy81YjlkMjcwNjEwMGU1ZWEwZDMxNzE0M2UyMzc0ZDZiZDZjOTYwN2IxL2FyZWxsdWYtbWFydGEubXA0XCIsXG4gICAgICAgIFx0XCJmYWN0XCI6IHtcbiAgICAgICAgXHRcdFwiZW5cIjogXCJCQUQgVFJJUCBBVCBUSEUgSE9URUwgUE9PTFwiXG4gICAgICAgIFx0fSxcbiAgICAgICAgXHRcInNob3AtdXJsXCI6IFwiaHR0cDovL3d3dy5jYW1wZXIuY29tL2ludC93b21lbi9zaG9lcy9tYXJ0YV9hcmVsbHVmX3NzMjAxNlwiLFxuICAgICAgICBcdFwid2lzdGlhLWNoYXJhY3Rlci1pZFwiOiBcInBwa21mZGw1anFcIixcbiAgICAgICAgXHRcIndpc3RpYS1mdW4taWRcIjogXCJyNjRpajJvamgzXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJhcmVsbHVmL2tvYmFyYWhcIjoge1xuICAgICAgICBcdFwic2VsZmllLXN0aWNrLXZpZGVvLXVybFwiOiBcImh0dHA6Ly9lbWJlZC53aXN0aWEuY29tL2RlbGl2ZXJpZXMvMjk4MGYxNGNjOGJkOTkxMmIxNGRjYTQ2YTRjZDRhODVmYTA0Nzc0Yy9hcmVsbHVmLWtvYmFyYWgubXA0XCIsXG4gICAgICAgIFx0XCJhbWJpZW50LWNvbG9yXCI6IHtcbiAgICAgICAgXHRcdFwiZnJvbVwiOiB7IFwiaFwiOiAyNjQsIFwic1wiOiA2OSwgXCJ2XCI6IDQxIH0sXG4gICAgICAgIFx0XHRcInRvXCI6IHsgXCJoXCI6IDM0NCwgXCJzXCI6IDU2LCBcInZcIjogMTAwIH0sXG4gICAgICAgIFx0XHRcInNlbGZpZS1zdGlja1wiOiB7IFwiaFwiOiAzNDQsIFwic1wiOiA0MSwgXCJ2XCI6IDEwMCB9XG4gICAgICAgIFx0fSxcbiAgICAgICAgXHRcImZ1bi1mYWN0LXZpZGVvLXVybFwiOiBcImh0dHA6Ly9lbWJlZC53aXN0aWEuY29tL2RlbGl2ZXJpZXMvNjJlNTRlYWMxZDg5ODlhYjlkZTIzOGZhM2Y3YzZkOGRiNGQ5ZGU4ZC9hcmVsbHVmLWtvYmFyYWgubXA0XCIsXG4gICAgICAgIFx0XCJmYWN0XCI6IHtcbiAgICAgICAgXHRcdFwiZW5cIjogXCJIYXRlcnMgd2lsbCBzYXkgaXQncyBQaG90b3Nob3BcIlxuICAgICAgICBcdH0sXG4gICAgICAgIFx0XCJzaG9wLXVybFwiOiBcImh0dHA6Ly93d3cuY2FtcGVyLmNvbS9pbnQvd29tZW4vc2hvZXMva29iYXJhaF9hcmVsbHVmX3NzMjAxNlwiLFxuICAgICAgICBcdFwid2lzdGlhLWNoYXJhY3Rlci1pZFwiOiBcIjl4ZTV2anp5Ym9cIixcbiAgICAgICAgXHRcIndpc3RpYS1mdW4taWRcIjogXCJvNzlkcXBocHNsXCJcbiAgICAgICAgfSxcblx0XHRcImFyZWxsdWYvZHViXCI6IHtcblx0XHRcdFwic2VsZmllLXN0aWNrLXZpZGVvLXVybFwiOiBcImh0dHA6Ly9lbWJlZC53aXN0aWEuY29tL2RlbGl2ZXJpZXMvMjJiMzYwYzhjYTM5OTY5Njk4NTMxM2RkZTk5YmE4M2Q0ZWM5NzJiNy9hcmVsbHVmLWR1Yi5tcDRcIixcbiAgICAgICAgXHRcImFtYmllbnQtY29sb3JcIjoge1xuICAgICAgICBcdFx0XCJmcm9tXCI6IHsgXCJoXCI6IDE5NiwgXCJzXCI6IDUyLCBcInZcIjogMzMgfSxcbiAgICAgICAgXHRcdFwidG9cIjogeyBcImhcIjogMTUsIFwic1wiOiA4NCwgXCJ2XCI6IDEwMCB9LFxuICAgICAgICBcdFx0XCJzZWxmaWUtc3RpY2tcIjogeyBcImhcIjogMTUsIFwic1wiOiA4NCwgXCJ2XCI6IDEwMCB9XG4gICAgICAgIFx0fSxcbiAgICAgICAgXHRcImZ1bi1mYWN0LXZpZGVvLXVybFwiOiBcImh0dHA6Ly9lbWJlZC53aXN0aWEuY29tL2RlbGl2ZXJpZXMvOTg3YmRhYjAxMjk3OTgyMmI4MTg2Mzc4MzdjYzI4ODQxNGNlZjhmMy9hcmVsbHVmLWR1Yi5tcDRcIixcbiAgICAgICAgXHRcImZhY3RcIjoge1xuICAgICAgICBcdFx0XCJlblwiOiBcIldIRU4gWU9VIENBTidUIEtFRVAgVEhFIEFSUk9XIE9OIFRIRSBDRU5URVIgTElORVwiXG4gICAgICAgIFx0fSxcbiAgICAgICAgXHRcInNob3AtdXJsXCI6IFwiaHR0cDovL3d3dy5jYW1wZXIuY29tL2ludC9tZW4vc2hvZXMvZHViX2FyZWxsdWZfc3MyMDE2XCIsXG4gICAgICAgIFx0XCJ3aXN0aWEtY2hhcmFjdGVyLWlkXCI6IFwiZGxnNWF6eTVhclwiLFxuICAgICAgICBcdFwid2lzdGlhLWZ1bi1pZFwiOiBcInFwaGo5cDN0NWhcIlxuICAgICAgICB9LFxuICAgICAgICBcImFyZWxsdWYvcGFyYWRpc2VcIjoge1xuICAgICAgICBcdFwic2VsZmllLXN0aWNrLXZpZGVvLXVybFwiOiBcImh0dHA6Ly9lbWJlZC53aXN0aWEuY29tL2RlbGl2ZXJpZXMvYTgxOWMzNzNmOTc3Nzg1MmYzOTY3Y2UwMjNiY2ZiMGQ5MTE1Mzg2Zi9hcmVsbHVmLXBhcmFkaXNlLm1wNFwiLFxuICAgICAgICBcdFwiYW1iaWVudC1jb2xvclwiOiB7XG4gICAgICAgIFx0XHRcImZyb21cIjogeyBcImhcIjogNTksIFwic1wiOiAxOSwgXCJ2XCI6IDk5IH0sXG4gICAgICAgIFx0XHRcInRvXCI6IHsgXCJoXCI6IDIwNywgXCJzXCI6IDMxLCBcInZcIjogMTAwIH0sXG4gICAgICAgIFx0XHRcInNlbGZpZS1zdGlja1wiOiB7IFwiaFwiOiAxODMsIFwic1wiOiA3MSwgXCJ2XCI6IDY0IH1cbiAgICAgICAgXHR9LFxuICAgICAgICBcdFwiZnVuLWZhY3QtdmlkZW8tdXJsXCI6IFwiaHR0cDovL2VtYmVkLndpc3RpYS5jb20vZGVsaXZlcmllcy81ZGMxOTcyNmVmYTdiMmU3NTZjODA1MzRkNDNmYTYwMGNjNjFmMTc4L2FyZWxsdWYtcGFyYWRpc2UubXA0XCIsXG4gICAgICAgIFx0XCJmYWN0XCI6IHtcbiAgICAgICAgXHRcdFwiZW5cIjogXCJTRUxGSUUgT04gV0FURVJTTElERSBMSUtFIEEgQk9TU1wiXG4gICAgICAgIFx0fSxcbiAgICAgICAgXHRcInNob3AtdXJsXCI6IFwiaHR0cDovL3d3dy5jYW1wZXIuY29tL2ludC93b21lbi9zaG9lcy9wYXJhZGlzZV9hcmVsbHVmX3NzMjAxNlwiLFxuICAgICAgICBcdFwid2lzdGlhLWNoYXJhY3Rlci1pZFwiOiBcImg4OXkwa3V3eTJcIixcbiAgICAgICAgXHRcIndpc3RpYS1mdW4taWRcIjogXCIzNDN0MXNuMm5wXCJcbiAgICAgICAgfVxuXG5cdH1cbn0iXX0=
