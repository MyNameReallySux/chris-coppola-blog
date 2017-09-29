import { TypeUtils } from '@beautiful-code/type-utils'

const ms = 1,
	  sec = ms * 1000,
	  min = sec * 60,
	  hour = min * 60,
	  day = hour * 24

const Styles = {
	label: 'font-weight: bold;',
	subLabel: 'font-weight: bold;, color: #888888;',
	text: 'font-style: italic; color: #888888;',
	info: 'font-style: italic; color: #008be2;',
	valid: 'font-weight: bold; font-style: italic; color: #00b72a;',
	invalid: 'font-weight: bold; font-style: italic; color: #f20000;'
}

export const LocalStorageManager = {
	cacheTimeout: null,
	previousVersions: {},
	loadStates: (names) => {
		if(!TypeUtils.isArray(names)) 
			throw Error(`loadStates' first parameter must be an array.`)
		
		let state = {}
		for(let name of names){
			if(!TypeUtils.isString(name))
				continue
			
			state[name] = LocalStorageManager.loadState(name)
		}
		return state
	},
	loadState: (name) => {
		console.log(`%cCACHE: %cloading %c${name} %cstate`, Styles.label, Styles.text, Styles.info, Styles.text)
		try {
			const serializedState = localStorage.getItem(`${name}_state`)
			if(serializedState === null || serializedState === undefined){
				return undefined
			}
			const state = JSON.parse(serializedState)
			
			let lastCached = localStorage.getItem(`${name}_state_last_cached`)
			
			if(lastCached !== undefined && lastCached !== null){
				let lastCachedTime = new Date(lastCached)
				let currTime = Date.now()
				let timeElapsed = currTime - lastCachedTime
								
				if(timeElapsed > 15 * min){
					console.log(`%cCACHE: %c${name} cache must be %cinvalidated %c(${Math.floor(timeElapsed / sec)} secs elapsed)`, Styles.label, Styles.text, Styles.invalid, Styles.text)
					localStorage.clear(`${name}_state`)
				} else {
					console.log(`%cCACHE: %c${name} cache is %cvalid %c(${Math.floor(timeElapsed / sec)} secs elapsed)`, Styles.label, Styles.text, Styles.valid, Styles.text)
					console.log(`\t%cloaded state %o`, Styles.subLabel, state)
				}
			}
			return state
		} catch (error){
			console.error(error)
				return undefined
		}
	},
	saveStates: (object) => {
		if(!TypeUtils.isObject(object))
			throw Error(`saveStates' first parameter must be an object.`)
			
		try {
			clearTimeout(LocalStorageManager.cacheTimeout)
			LocalStorageManager.cacheTimeout = setTimeout(() => {
				for(let [name, state] of Object.entries(object)){
					if(!TypeUtils.isString(name) || !TypeUtils.isObject(state))
						console.error('Error: could not persist state. Passed in values must follow type <string|object>')
					else
						LocalStorageManager.saveState(name, state)
				}
			}, 1000)
		} catch (error){
			console.log(error)
		}
	},
	saveState: (name, state) => {
		try {
			let cacheState = Object.assign({}, state)
						
			const serializedState = JSON.stringify(cacheState)
			const lastSerializedState = LocalStorageManager.previousVersions[name]
			
			if(serializedState != lastSerializedState){
				console.log(`%cCACHE: %c${name} state has been updated`, Styles.label, Styles.text)
				localStorage.setItem(`${name}_state`, serializedState)
				localStorage.setItem(`${name}_state_last_cached`, new Date())
				LocalStorageManager.previousVersions[name] = serializedState
			}
		} catch (error){
			console.log(error)
		}
	}
}