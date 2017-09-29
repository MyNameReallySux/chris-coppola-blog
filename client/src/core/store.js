import { createStore } from 'redux'
import { call, put, take, takeEvery, takeLatest } from 'redux-saga/effects'

import { LocalStorageManager as LS } from '@libs/cache/localStorage'

import { CATEGORIES } 	from '@core/categories/CategoriesActions'
import { CATEGORY } 	from '@core/category/CategoryActions'
import { POSTS } 		from '@core/posts/PostsActions'
import { POST } 		from '@core/post/PostActions'
 
export function initializeStore(rootReducer, persistedState, enhancer){
	return createStore(rootReducer, persistedState, enhancer)
}

export function getPersistedState(states){
	return LS.loadStates([
		'categories',
		'category',
		'posts',
		'post'
	])
}

let subscribeTimeout
export function initializeCache(store){
    store.subscribe(() => {
        clearTimeout(subscribeTimeout)
        subscribeTimeout = setTimeout(() => {
            let state = store.getState()
            let { categories, category, post, posts } = state
    
            let statesToSave = {}
    
            if(state.lastAction.type != CATEGORIES.FAILURE) statesToSave['categories'] = categories
            if(state.lastAction.type != CATEGORY.FAILURE) statesToSave['category'] = category
            if(state.lastAction.type != POSTS.FAILURE) statesToSave['posts'] = posts
            if(state.lastAction.type != POST.FAILURE) statesToSave['post'] = post
    
            LS.saveStates(statesToSave)
        }, 1000) 
    })
}

export function initializeSagas(store, middleware, reactions){	
	function loopThrough(container){
		for(let key of Object.keys(container)){
			let reaction = container[key]
			if(typeof reaction == 'object'){
				if(reaction.hasOwnProperty('type')){
					reaction = onAction(store, reaction.type, reaction.callback)
					middleware.run(reaction)
				} else {
					loopThrough(reaction)
				}
			} else if(typeof reaction == 'function'){
				middleware.run(reaction)
			}
		}
	}
	
	loopThrough(reactions)
}

export function onAction(store, type, callback){
	return function* onActionSaga(){
		yield takeEvery(type, () => {
			let state = store.getState()
			let dispatch = store.dispatch
			let reload = store.getState
			callback(state, dispatch, reload)
		})
	}
}