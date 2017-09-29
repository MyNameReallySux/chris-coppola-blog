import { POST } from './PostActions'

import { updateObject, updateArray, createReducer } from '@libs/utils'

export const INITIAL_STATE = {
	loading: false,
	activePost: {
		id: null
	},
	error: null
}

export const PostReducer = createReducer(INITIAL_STATE, {
	[POST.REQUEST]: (state, action) => {
		return updateObject(state, {
			loading: true
		})
	},
	[POST.FAILURE]: (state, action) => {
		return updateObject(state, {
			loading: false,
			error: action.payload.error
		})
	},
	[POST.SUCCESS]: (state, action) => {
		return updateObject(state, {
			loading: false,
			error: null,
			activePost: action.payload.activePost,
			lastUpdated: action.payload.receivedAt
		})
	},
	[POST.RETRIEVED]: (state, action) => {
		return updateObject(state, {
			loading: false,
			error: null,
			activePost: action.payload.activePost
		})
	},
	[POST.RESET_ACTIVE]: (state, action) => {
		return updateObject(state, INITIAL_STATE)
	}
})
