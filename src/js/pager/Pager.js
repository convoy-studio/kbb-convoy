import Flux from 'flux'
import {EventEmitter2} from 'eventemitter2'
import assign from 'object-assign'

// Actions
var PagerActions = {
    onPageReady: function(hash) {
        PagerDispatcher.handlePagerAction({
        	type: PagerConstants.PAGE_IS_READY,
        	item: hash
        })  
    },
    onTransitionOut: function() {
        PagerDispatcher.handlePagerAction({
            type: PagerConstants.PAGE_TRANSITION_OUT,
            item: undefined
        })  
    },
    onTransitionOutComplete: function() {
    	PagerDispatcher.handlePagerAction({
        	type: PagerConstants.PAGE_TRANSITION_OUT_COMPLETE,
        	item: undefined
        })  
    },
    onTransitionInComplete: function() {
        PagerDispatcher.handlePagerAction({
            type: PagerConstants.PAGE_TRANSITION_IN_COMPLETE,
            item: undefined
        })  
    },
    pageTransitionDidFinish: function() {
        PagerDispatcher.handlePagerAction({
        	type: PagerConstants.PAGE_TRANSITION_DID_FINISH,
        	item: undefined
        })  
    }
}

// Constants
var PagerConstants = {
	PAGE_IS_READY: 'PAGE_IS_READY',
	PAGE_TRANSITION_IN: 'PAGE_TRANSITION_IN',
	PAGE_TRANSITION_OUT: 'PAGE_TRANSITION_OUT',
    PAGE_TRANSITION_OUT_COMPLETE: 'PAGE_TRANSITION_OUT_COMPLETE',
	PAGE_TRANSITION_IN_COMPLETE: 'PAGE_TRANSITION_IN_COMPLETE',
	PAGE_TRANSITION_IN_PROGRESS: 'PAGE_TRANSITION_IN_PROGRESS',
	PAGE_TRANSITION_DID_FINISH: 'PAGE_TRANSITION_DID_FINISH'
}

// Dispatcher
var PagerDispatcher = assign(new Flux.Dispatcher(), {
	handlePagerAction: function(action) {
		this.dispatch(action)
	}
})

// Store
var PagerStore = assign({}, EventEmitter2.prototype, {
    firstPageTransition: true,
    pageTransitionState: undefined, 
    dispatcherIndex: PagerDispatcher.register(function(payload){
        var actionType = payload.type
        var item = payload.item
        switch(actionType) {
            case PagerConstants.PAGE_IS_READY:
            	PagerStore.pageTransitionState = PagerConstants.PAGE_TRANSITION_IN_PROGRESS
            	var type = PagerConstants.PAGE_TRANSITION_IN
            	PagerStore.emit(type)
            	break
            case PagerConstants.PAGE_TRANSITION_OUT_COMPLETE:
                PagerStore.emit(type)
            	break
            case PagerConstants.PAGE_TRANSITION_DID_FINISH:
            	if (PagerStore.firstPageTransition) PagerStore.firstPageTransition = false
                PagerStore.pageTransitionState = PagerConstants.PAGE_TRANSITION_DID_FINISH
                PagerStore.emit(actionType)
                break
            default:
                PagerStore.emit(actionType, item)
                break
        }
        return true
    })
})

export default {
	PagerStore: PagerStore,
	PagerActions: PagerActions,
	PagerConstants: PagerConstants,
	PagerDispatcher: PagerDispatcher
}
