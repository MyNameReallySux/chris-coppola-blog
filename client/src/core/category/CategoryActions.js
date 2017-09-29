import thunk from 'redux-thunk'
import { RestAdapter } from '@libs/adapters/RestAdapter'

export const CATEGORY = {
	FETCH:   "CATEGORY_FETCH",
	REQUEST: "CATEGORY_REQUEST",
	FAILURE: "CATEGORY_FAILURE",
	SUCCESS: "CATEGORY_SUCCESS",
	
	RETRIEVED:	 "CATEGORY_RETRIEVED",
	RESET_ACTIVE:	 "CATEGORY_RESET_ACTIVE"
}

let DEFAULTS = {
	FETCH: {
		options: {
			selectBy: 'id'
		}
	}
}

export const CategoryActions = {
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
			
			let isLoaded = state.categories._manifest[label].find((item) => {
				return item == id
			})
			return isLoaded || true
		}
		
		const handleFetch = async (dispatch, id) => {
			dispatch(CategoryActions.request(id))
			try {
				let response
				if(selectBy == 'slug'){
					response = await RestAdapter.getCategoryBySlug(id)
					response.data = response.data[0]
				} else {
					response = await RestAdapter.getCategoryById(id)
				}
				dispatch(CategoryActions.success(response))
			} catch (error){
				dispatch(CategoryActions.failure(error))
			}
		}
		
		const handleCache = (state) => {
			console.info(`INFO: Category ${id} didn't need to be fetched`)
			let category = state.categories.items.find((item) => {
				return item[selectBy] == id
			})
			
			dispatch(CategoryActions.retrieved(category))
		}
		
		let state = store.getState()
		shouldFetch(state) ? handleFetch(dispatch, id) : handleCache(state)
	},
	request: (id) => ({
		type: CATEGORY.REQUEST,
		payload: { id }
	}),
	failure: (error) => ({
		type: CATEGORY.FAILURE,
		payload: { error }
	}),
	success: (json) => ({
		type: CATEGORY.SUCCESS,
		payload: {
			activeCategory: json.data,
			receivedAt: Date.now()
		}
	}),
	retrieved: (activeCategory) => ({
		type: CATEGORY.RETRIEVED,
		payload: { activeCategory }
		
	}),
	resetActive: () => ({
		type: CATEGORY.RESET_ACTIVE
	})
}
