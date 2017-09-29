import thunk from 'redux-thunk'
import { RestAdapter } from '@libs/adapters/RestAdapter'

export const POSTS = {
	FETCH:   "POSTS_FETCH",
	REQUEST: "POSTS_REQUEST",
	FAILURE: "POSTS_FAILURE",
	SUCCESS: "POSTS_SUCCESS",
	
	RETRIEVED:	 "POSTS_RETRIEVED"
}

const DEFAULT = {
	PAGE: 1,
	PAGE_SIZE: 10
}

export const PostsActions = {
	fetch: (store, page = DEFAULT.PAGE, pageSize = DEFAULT.PAGE_SIZE) => (dispatch) => {
		const shouldFetch = (state) => {
			const posts = state.posts.items
			return typeof posts != 'undefined' && posts.length <= 0
		}
		
		const handleFetch = async (dispatch, page, pageSize) => {
			dispatch(PostsActions.request(page, pageSize))
			try {
				let response = await RestAdapter.getPosts(page, pageSize)
				dispatch(PostsActions.success(response))
			} catch (error){
				dispatch(PostsActions.failure(error))
			}
		}
		
		const handleCache = (state) => {
			console.info('INFO: No posts needed to be fetched')
			dispatch(PostsActions.retrieved(state.posts.items))
		}
		
		let state = store.getState()
		shouldFetch(state) ? handleFetch(dispatch, page, pageSize) : handleCache(state)
	},
	request: (...args) => ({
		type: POSTS.REQUEST
	}),
	failure: (error) => ({
		type: POSTS.FAILURE,
		payload: { error }
	}),
	success: (json) => ({
		type: POSTS.SUCCESS,
		payload: {
			posts: json.data,
			receivedAt: Date.now()
		}
		
	}),
	retrieved: (items) => ({
		type: POSTS.RETRIEVED,
		payload: {
			posts: items
		}
		
	})
}