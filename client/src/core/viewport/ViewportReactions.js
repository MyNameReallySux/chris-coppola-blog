import { onAction } from '@libs/utils'
import { MEDIA, MediaActions } from '@core/media/MediaActions'
import { VIEWPORT, ViewportActions } from '@core/viewport/ViewportActions'

// export const onResize = onAction(VIEWPORT.RESIZE, async (state, dispatch) => {
// 	await dispatch(MediaActions.setDevice())
// })

// export const onScroll = onAction(VIEWPORT.SCROLL, async (state, dispatch) => {
// 	console.log('saga scroll')
// })

// export const onLoad = onAction(VIEWPORT.LOAD, async (state, dispatch) => {
// 	return dispatch(MediaActions.setDevice())
// })

export const ViewportReactions = {
	onResize: {
		type: VIEWPORT.RESIZE,
		callback: async (store, state, dispatch) => {
			await dispatch(MediaActions.setDevice())
		}
	},
	onScroll: {
		type: VIEWPORT.SCROLL,
		callback: (store, state, dispatch) => {
			console.log('saga scroll')
		}
	},
	onLoad: {
		type: VIEWPORT.LOAD,
		callback: (store, state, dispatch) => {
			return dispatch(MediaActions.setDevice())
		}
	},
	onCalcViewport: {
		type: VIEWPORT.CALC_VIEWPORT,
		callback: async (store, state, dispatch) => {
			let initial = state.viewport.current
			
			let { current, previous } = DeviceManager.getTemporalDimensions(initial),
				delta = DeviceManager.getDelta(current, previous),
				date = new Date(),
		
				lastUpdate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
		
			dispatch(ViewportActions.setViewport(current, previous, delta, lastUpdate))
		}
	}
}