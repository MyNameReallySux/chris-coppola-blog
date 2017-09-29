import { POSTS } from './PostsActions'

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

export const PostsReducer = createReducer(INITIAL_STATE, {
	[POSTS.REQUEST]: (state, action) => {
		return updateObject(state, {
			loading: true,
			items: []
		})
	},
	[POSTS.FAILURE]: (state, action) => {
		return updateObject(state, {
			loading: false,
			error: action.payload.error
		})
	},
	[POSTS.SUCCESS]: (state, action) => {
		let items = action.payload.posts
				
		let listById = []
		let listBySlug = []
		
		items.map((post, i) => {
			listById.push(post.id)
			listBySlug.push(post.slug)
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
	[POSTS.RETRIEVED]: (state, action) => {
		return updateObject(state, {
			loading: false,
			items: updateArray(state.items, action.payload.posts),
			error: null,
		})
	}
})
