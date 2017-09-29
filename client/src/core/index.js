import { applyMiddleware, combineReducers } from 'redux'
import { StringUtils } 		from '@beautiful-code/string-utils'
import { TypeUtils } 		from '@beautiful-code/type-utils'

import { createLogger } 	from 'redux-logger'
import { createMiddleware } from 'redux-promises'
import createSagaMiddleware from 'redux-saga'

import * as App 			from '@core/app'
import * as Categories 		from '@core/categories'
import * as Category 		from '@core/category'
import * as LastAction 		from '@core/lastAction'
import * as Media 			from '@core/media'
import * as Post 			from '@core/post'
import * as Posts 			from '@core/posts'
import * as Viewport 		from '@core/viewport'

import { getPersistedState, initializeStore, initializeCache, initializeSagas } from '@core/store'

/*********************************************
 * This is where you configure Smart Modules. Each module from '@core' can export any of the following, and it will automatically be picked up by the app.
 *
 * Make sure to export all of your modules from '@core'. (See '/webpack.config.js' to see what directory '@core' resolves to.)
 * // in modules 'index.js' file
 * 		import * as Module from '@core/module'
 * 		export { ... , Module }
 *
 * // in @core's 'index.js file
 *		export { ..., ModuleReducer as Reducer }
 *
 * Then you can import all your Modules by importing ...
 * // top of this file
 * 		import * as Mods from '@core'
 * 
 * To add a new Smart Module, just add it to this list. Then make sure your module export something of the same name
 * // in this file
 *		let smartModules = [ ..., 'Module']
 *
 * 		...
 * 
 * 		export { ..., Module}
 *
 * Then you can access the modules by exporting...
 * // in any file
 * 		import { Module } from '@root'
 *********************************************/
let smartModules = ['Actions', 'Reactions', 'Reducer']
let Mods = { App, Categories, Category, LastAction, Media, Post, Posts, Viewport }

let ComputedModules = {
	generate: (name, scope, item) => {
		let isPlural = name.charAt(name.length - 1) == 's'
		let propName = isPlural ? name : `${name}s`
		
		scope = StringUtils.toCamelCase(scope)
		
		// console.log(scope, name)
		
		if(item.hasOwnProperty(name)){
			ComputedModules['modules'][propName] = ComputedModules['modules'][propName] || {}
			let tempItem = item[name]
			let tempMod = {}

			let type = TypeUtils.getType(tempItem)
			switch(type){
				case 'object': {
					for(let key of Object.keys(tempItem)){
						// console.log(` - ${key}`)
						tempMod[key] = tempItem[key]
					}
				} break
				case 'function': {
					// console.log(` - ${name}`)
					tempMod = tempItem
				}
			}
			
			ComputedModules['modules'][propName][scope] = tempMod
		}
	},
		
	modules: {}
}

for(let key of Object.keys(Mods)){
	if(Mods.hasOwnProperty(key)){
		let mod = Mods[key]
		
		for(let smartModName of Object.values(smartModules)){
			ComputedModules.generate(smartModName, key, mod)
		}
	}
}

/*********************************************
 * SmartModules are created
 * - Use this space to extract, create and modify modules
 ********************************************/
let { Actions, Reducers, Reactions } = ComputedModules.modules
// let { App, Categories, Category, LastAction, Media, Post, Posts, Viewport } = Mods

const logger = createLogger(),
	  promise = createMiddleware(),
	  saga = createSagaMiddleware()

let RootReducer = combineReducers(Reducers)
let persistedState = getPersistedState()
let enhancer = applyMiddleware(promise, logger, saga)
let Store = initializeStore(RootReducer, persistedState, enhancer)
initializeCache(Store)

initializeSagas(Store, saga, Reactions)

/*********************************************
 * Export modules
 ********************************************/

export {
	App, Categories, Category, LastAction, Post, Posts, Viewport,
	
	Actions, Reactions, Reducers, RootReducer, Store
}