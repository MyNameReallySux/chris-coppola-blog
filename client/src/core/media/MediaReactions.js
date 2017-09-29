import { DeviceManager } from '@libs/utils'
import { MEDIA, MediaActions } from '@core/media/MediaActions'
import { VIEWPORT, ViewportActions } from '@core/viewport/ViewportActions'

// export const onSetDevice = onAction(MEDIA.SET_DEVICE, async (state, dispatch, reload) => {
// 	let handleDeviceViewport = async () => {
// 		return dispatch(ViewportActions.calcViewport())
// 	}
// 	let handleDeviceQuery = async () => {
// 		state = reload()
// 		let mapIsLoaded = state.media.queries.isLoaded

// 		if(!mapIsLoaded){
// 			await dispatch(MediaActions.fetch('/tokens/media.yml'))
// 		}
		
// 		state = reload()
				
// 		mapIsLoaded = state.media.queries.isLoaded

// 		if(mapIsLoaded){
// 			let width = state.viewport.current.width,
// 				queries = state.media.queries.map

// 			return dispatch(MediaActions.setDeviceQuery(width, queries))
// 		} else {
// 			let error = state.media.queries.error
// 			return dispatch(MediaActions.fetchFailure(error))
// 		}
// 	}
	
// 	let handleDeviceType = async () => {
// 		let type = DeviceManager.getDeviceType()
// 		let isMobile = DeviceManager.isDeviceMobile(type)
		
// 		return dispatch(MediaActions.setDeviceType(type, isMobile))
// 	}
// 	await handleDeviceViewport()
// 	await handleDeviceQuery()
// 	return handleDeviceType()
// })

// export const onCalcViewport = onAction(VIEWPORT.CALC_VIEWPORT, (state, dispatch) => {
// 	let initial = state.viewport.current
	
// 	let { current, previous } = DeviceManager.getTemporalDimensions(initial),
// 		delta = DeviceManager.getDelta(current, previous),
// 		date = new Date(),

// 		lastUpdate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`

// 	dispatch(ViewportActions.setViewport(current, previous, delta, lastUpdate))
// })

export const MediaReactions = {
	onSetDevice: {
		type: MEDIA.SET_DEVICE,
		callback: async (store, state, dispatch) => {
			let handleDeviceViewport = async () => {
				return dispatch(ViewportActions.calcViewport())
			}
			let handleDeviceQuery = async () => {
				state = reload()
				let mapIsLoaded = state.media.queries.isLoaded
		
				if(!mapIsLoaded){
					await dispatch(MediaActions.fetch('/tokens/media.yml'))
				}
				
				state = reload()
						
				mapIsLoaded = state.media.queries.isLoaded
		
				if(mapIsLoaded){
					let width = state.viewport.current.width,
						queries = state.media.queries.map
		
					return dispatch(MediaActions.setDeviceQuery(width, queries))
				} else {
					let error = state.media.queries.error
					return dispatch(MediaActions.fetchFailure(error))
				}
			}
			
			let handleDeviceType = async () => {
				let type = DeviceManager.getDeviceType()
				let isMobile = DeviceManager.isDeviceMobile(type)
				
				return dispatch(MediaActions.setDeviceType(type, isMobile))
			}
			await handleDeviceViewport()
			await handleDeviceQuery()
			return handleDeviceType()
		}
	}
}