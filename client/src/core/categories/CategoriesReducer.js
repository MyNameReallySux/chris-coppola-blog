import { CATEGORIES } from './CategoriesActions'

import { updateObject, updateArray, createReducer } from '@libs/utils'

export const INITIAL_STATE = {
	_manifest: {
		byId: [],
		bySlug: []
	},
	loading: false,
	items: [],
	error: null
}

export const CategoriesReducer = createReducer(INITIAL_STATE, {
	[CATEGORIES.REQUEST]: (state, action) => {
		return updateObject(state, {
			loading: true,
			items: []
		})
	},
	[CATEGORIES.FAILURE]: (state, action) => {
		return updateObject(state, {
			loading: false,
			error: action.payload.error
		})
	},
	[CATEGORIES.SUCCESS]: (state, action) => {
		let items = action.payload.categories
		
		let listById = []
		let listBySlug = []
		
		items.map((category, i) => {
			listById.push(category.id)
			listBySlug.push(category.slug)
		})
		
		let _manifest = {
			byId: listById,
			bySlug: listBySlug
		}
		
		return updateObject(state, {
			_manifest: updateObject(state._manifest, _manifest),
			loading: false,
			error: null,
			items: updateArray(state.items, items),
			lastUpdated: action.payload.receivedAt
		})
	},
	[CATEGORIES.RETRIEVED]: (state, action) => {
		return updateObject(state, {
			loading: false,
			error: null,
			items: updateArray(state.items, action.payload.categories)
		})
	}
})
