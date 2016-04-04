import AppStore from 'AppStore'
import AppActions from 'AppActions'
import AppTemplate from 'AppTemplate'
import Router from 'Router'
import GEvents from 'GlobalEvents'
import Preloader from 'Preloader'
import AppConstants from 'AppConstants'
import dom from 'dom-hand'

class App {
	constructor() {
		this.onAppReady = this.onAppReady.bind(this)
		this.loadMainAssets = this.loadMainAssets.bind(this)
	}
	init() {

		Math.radians = function(degrees) {
			return degrees * Math.PI / 180;
		};
		 
		// Converts from radians to degrees.
		Math.degrees = function(radians) {
			return radians * 180 / Math.PI;
		};

		// Init router
		this.router = new Router()
		this.router.init()

		AppStore.Preloader = new Preloader()

		// Init global events
		window.GlobalEvents = new GEvents()
		GlobalEvents.init()

		var appTemplate = new AppTemplate()
		appTemplate.isReady = this.loadMainAssets
		appTemplate.render('#app-container')

		// Start routing
		this.router.beginRouting()
	}
	loadMainAssets() {
		this.onAppReady()
	}
	onAppReady() {
		AppActions.appStart()
		AppActions.pageHasherChanged()
	}
}

export default App
    	
