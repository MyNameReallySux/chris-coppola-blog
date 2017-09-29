import { CATEGORY } from './CategoryActions'

import { updateObject, updateArray, createReducer } from '@libs/utils'

export const INITIAL_STATE = {
	loading: false,
	activeCategory: {
		id: null
	},
	error: null
}

export const CategoryReducer = createReducer(INITIAL_STATE, {
	[CATEGORY.REQUEST]: (state, action) => {
		return updateObject(state, {
			loading: true
		})
	},
	[CATEGORY.FAILURE]: (state, action) => {
		return updateObject(state, {
			loading: false,
			error: action.payload.error
		})
	},
	[CATEGORY.SUCCESS]: (state, action) => {
		return updateObject(state, {
			loading: false,
			error: null,
			activeCategory: action.payload.activeCategory,
			lastUpdated: action.payload.receivedAt
		})
	},
	[CATEGORY.RETRIEVED]: (state, action) => {
		return updateObject(state, {
			loading: false,
			error: null,
			activeCategory: action.payload.activeCategory
		})
	},
	[CATEGORY.RESET_ACTIVE]: (state, action) => {
		return updateObject(state, INITIAL_STATE)
	}
})
