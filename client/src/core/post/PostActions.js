import thunk from 'redux-thunk'
import { RestAdapter } from '@libs/adapters/RestAdapter'

export const POST = {
	FETCH:   "POST_FETCH",
	REQUEST: "POST_REQUEST",
	FAILURE: "POST_FAILURE",
	SUCCESS: "POST_SUCCESS",
	
	RETRIEVED:		"POST_RETRIEVED",
	RESET_ACTIVE:	"POST_RESET_ACTIVE",
}

let DEFAULTS = {
	FETCH: {
		options: {
			selectBy: 'id'
		}
	}
	
}

export const PostActions = {
	fetch: (store, id, options = DEFAULTS.FETCH.options) => (dispatch) => {
		let { selectBy } = options
		
		const shouldFetch = (state) => {
			let label
			switch(selectBy){
				case 'slug': {
					label = 'bySlug'
				} break
				default: {
					label = 'byId'
				}
			}
			
			let isLoaded = state.posts._manifest[label].includes(id)
						
			return !isLoaded
		}
		const handleFetch = async (dispatch, id) => {
			dispatch(PostActions.request(id))
			try {
				let response
				if(selectBy == 'slug'){
					response = await RestAdapter.getPostBySlug(id)
					response.data = response.data[0]
				} else {
					response = await RestAdapter.getPostById(id)
				}
				dispatch(PostActions.success(response))
			} catch (error){
				dispatch(PostActions.failure(error))
			}
		}
		
		const handleCache = (state) => {
			console.info(`INFO: Post ${id} didn't need to be fetched`)
			
			let post = state.posts.items.find((item) => {
				return item[selectBy] == id
			})
			
			
			dispatch(PostActions.retrieved(post))
		}
		
		let state = store.getState()
		shouldFetch(state) ? handleFetch(dispatch, id) : handleCache(state)
	},
	request: (id) => ({
		type: POST.REQUEST,
		payload: { id }
	}),
	failure: (error) => ({
		type: POST.FAILURE,
		payload: { error }
	}),
	success: (json) => ({
		type: POST.SUCCESS,
		payload: {
			activePost: json.data,
			receivedAt: Date.now()
		}
	}),
	retrieved: (activePost) => ({
		type: POST.RETRIEVED,
		payload: { activePost }
		
	}),
	resetActive: () => ({
		type: POST.RESET_ACTIVE
	})
}
