import thunk from 'redux-thunk'
import { RestAdapter } from '@libs/adapters/RestAdapter'

export const CATEGORIES = {
	FETCH:   "CATEGORIES_FETCH",
	REQUEST: "CATEGORIES_REQUEST",
	FAILURE: "CATEGORIES_FAILURE",
	SUCCESS: "CATEGORIES_SUCCESS",
	
	RETRIEVED:	 "CATEGORIES_RETRIEVED"
}

const DEFAULT = {
	PAGE: 1,
	PAGE_SIZE: 10
}

export const CategoriesActions = {
	fetch: (store) => (dispatch) => {
		const shouldFetch = (state) => {
			const categories = state.categories.items
			return categories && categories.length == 0
		}
		
		const handleFetch = async (dispatch) => {
			dispatch(CategoriesActions.request())
			try {
				let response = await RestAdapter.getCategories()
				dispatch(CategoriesActions.success(response))
			} catch (error){
				dispatch(CategoriesActions.failure(error))
			}
		}
		
		const handleCache = (state) => {
			console.info('INFO: No categories needed to be fetched')
			dispatch(CategoriesActions.retrieved(state.categories.items))
		}
		
		let state = store.getState()
		shouldFetch(state) ? handleFetch(dispatch) : handleCache(state)
	},
	request: (...args) => ({
		type: CATEGORIES.REQUEST
	}),
	failure: (error) => ({
		type: CATEGORIES.FAILURE,
		payload: { error }
	}),
	success: (json) => ({
		type: CATEGORIES.SUCCESS,
		payload: {
			categories: json.data,
			receivedAt: Date.now()
		}
		
	}),
	retrieved: (items) => ({
		type: CATEGORIES.RETRIEVED,
		payload: {
			categories: items
		}
		
	})
}