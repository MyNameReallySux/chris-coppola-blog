import yaml from 'js-yaml'

import { updateObject, updateArray, createReducer } from '@libs/utils'
import { VIEWPORT, ViewportActions } from '@core/viewport/ViewportActions'

export const INITIAL_STATE = {
	current: {width: 0, height: 0},
	previous: {width: 0, height: 0},
	lastUpdate: undefined,
	delta: {
		description: 'no change',
		width: {
			value: 0,
			description: 'same'
		},
		height: {
			value: 0,
			description: 'same'
		},
		area: {
			value: 0,
			description: 'same'
		}
	}
}

export const ViewportReducer = createReducer(INITIAL_STATE, {
	[VIEWPORT.SET_VIEWPORT]: (state, action) => {
		let viewport = action.payload
		
		return updateObject(state, viewport)
	},
})