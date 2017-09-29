import axios from 'axios'

export const MEDIA = {
	FETCH_REQUEST: 'MEDIA_FETCH_REQUEST',
	FETCH_SUCCESS: 'MEDIA_FETCH_SUCCESS',
	FETCH_FAILURE: 'MEDIA_FETCH_FAILURE',
	
	INIT_DEVICE: 'MEDIA_INIT_DEVICE',
	SET_DEVICE: 'MEDIA_SET_DEVICE',
	SET_DEVICE_TYPE: 'MEDIA_SET_DEVICE_TYPE',
	SET_DEVICE_QUERY: 'MEDIA_SET_DEVICE_QUERY',
}

export const MediaActions = {
	fetch: (store, url) => async (dispatch) => {
		let state = store.getState()
		let query = state.media.query

		if(!query){
			dispatch({ type: MEDIA.FETCH_REQUEST })

			try {
				let result = await axios.get(url)
				dispatch(MediaActions.fetchSuccess(result))
			} catch (error){
				url = `${document.location}${url}`
				if(error == 'Error: Request failed with status code 404') 
					error = `Error: Request '${url}' failed with status code 404.`

				dispatch(MediaActions.fetchFailure(error))
			}
		}
	},
	fetchSuccess: (result) => ({
		type: MEDIA.FETCH_SUCCESS,
		payload: { result }
	}),
	fetchFailure: (error) => ({
		type: MEDIA.FETCH_FAILURE,
		payload: { error }
	}),
	setDevice: (...args) => ({
		type: MEDIA.SET_DEVICE
	}),
	setDeviceQuery: (width, queries) => ({
		type: MEDIA.SET_DEVICE_QUERY,
		payload: { width, queries }
	}),
	setDeviceType: (type, isMobile) => ({
		type: MEDIA.SET_DEVICE_TYPE,
		payload: { type, isMobile }
	})
	
}