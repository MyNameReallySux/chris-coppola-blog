import { call, put, take, takeEvery, takeLatest } from 'redux-saga/effects'

import { StringUtils } from '@beautiful-code/string-utils'
import { TypeUtils } from '@beautiful-code/type-utils'

export function updateObject(obj, updated){
	return Object.assign({}, obj, updated)
}

export function updateArrayItem(array, id, callback){
	const updatedItems = array.map(item => {
		if(item.id !== id){
			return item
		}
		
		const updatedItem = callback(item)
		return updatedItem
	})
	return updatedItems
}

export function updateArray(array, updated){
	var temp = {}
		
	array.forEach(function(value){
		temp[value.id] = value
	})
	updated.forEach(function(value){
		temp[value.id] = value
	})
	
	var result = []
	
	for(let property in temp){
		if(temp.hasOwnProperty(property)){
			result.push(temp[property])
		}
	}

	return result
}

export function createReducer(initialState, handlers){
	// console.log(initialState, handlers)
	return function reducer(state = initialState, action){		
		if(typeof action == undefined){
			return null
		} else if(handlers.hasOwnProperty(action.type)){
			return handlers[action.type](state, action)
		} else {
			return state
		}
	}
}

export const DeviceManager = {
	getDeviceType: () => {
		let userAgent = navigator.userAgent.toLowerCase()

		if(/(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(userAgent))
			return 'tablet'
		else if(/(mobi|ipod|phone|blackberry|opera mini|fennec|minimo|symbian|psp|nintendo ds|archos|skyfire|puffin|blazer|bolt|gobrowser|iris|maemo|semc|teashark|uzard)/.test(userAgent))
			return 'phone'
		else
			return 'desktop'
	},
	isDeviceMobile: (device) => device != 'desktop',
	getTemporalDimensions: (previous) => {
		let current = DeviceManager.getDimensions()

		return {
			current, previous
		}
	},
	getDimensions: () => {
		let w = window,
		d = document,
		docElement = d.documentElement,
		body =  d.getElementsByTagName('body')[0],

		width = w.innerWidth || d.clientWidth || body.clientWidth,
		height = w.innerHeight || d.clientHeight|| body.clientHeight,

		area = width * height

		return {
			width, height, area
		}
	},
	getDelta: (current, previous) => {
		let delta = {
			description: 'no change',
			width: current.width - previous.width,
			height: current.height - previous.height,
			area: current.area - previous.area
		}

		let wDesc = 'same',
			hDesc = 'same',
			aDesc = 'same'

		if(delta.width < 0){
			wDesc = 'thinner'
		} else if(delta.width > 0){
			wDesc = 'wider'
		}

		if(delta.height < 0){
			hDesc = 'shorter'
		} else if(delta.height > 0){
			hDesc = 'taller'
		}

		if(delta.area < 0){
			aDesc = 'smaller'
		} else if(delta.area > 0){
			aDesc = 'larger'
		}

		delta.value = previous.area == 0 ? 0 : ((delta.area / previous.area) * 100).toFixed(2)

		delta.description = `${wDesc}, ${hDesc}, ${aDesc}`

		return delta
	}
}