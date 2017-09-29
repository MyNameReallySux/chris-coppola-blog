import yaml from 'js-yaml'

import { updateObject, updateArray, createReducer } from '@libs/utils'
import { MEDIA } from '@core/media/MediaActions'

export const INITIAL_STATE = {
	isMobile: false,
	query: undefined,
	queries: {
		map: {},
		loading: false,
		error: false,
		isLoaded: false,
	},
	type: undefined
}

export const MediaReducer = createReducer(INITIAL_STATE, {
	[MEDIA.FETCH_REQUEST]: (state, action) => {
		let loading = true
		
		return updateObject(state, { queries: {...state.queries, loading}})
	},
	[MEDIA.FETCH_SUCCESS]: (state, action) => {
		let json = yaml.safeLoad(action.payload.result.data),
			map = json.media,
			loading = false,
			isLoaded = true
		
		return updateObject(state, { queries: {...state.queries, loading, isLoaded, map}})
	},
	[MEDIA.FETCH_FAILURE]: (state, action) => {
		let error = action.payload.error,
			loading = false
		
		return updateObject(state, { queries: {...state.queries, loading, error}})
	},
	[MEDIA.INIT_DEVICE]: (state, action) => {
		return state
	},
	[MEDIA.SET_DEVICE_TYPE]: (state, action) => {
		let type = action.payload.type,
			isMobile = action.payload.isMobile
		
		return updateObject(state, { type, isMobile })
	},
	[MEDIA.SET_DEVICE_QUERY]: (state, action) => {
		let queries = action.payload.queries,
			width = action.payload.width
								
		queries.xs.min = 0
		queries.xl.max = 9999
		
		let query = (() => {
			for(let query of Object.keys(queries)){
				let { min, max } = queries[query]
				if(width >= min && width < max){
					return queries[query].name
				}
			}
		})()
		
		return updateObject(state, { query })
	}
})