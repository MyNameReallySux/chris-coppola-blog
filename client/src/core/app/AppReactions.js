import { AppActions, APP } from '@core/app/AppActions'
import { ViewportActions, Viewport } from '@core/viewport/ViewportActions'

// export const onInit = onAction(APP.INIT, (state, dispatch) => {	
// 	let resized = false
// 	window.addEventListener('resize', () => {
// 		clearTimeout(resized)
// 		resized = setTimeout(() => {
// 			dispatch(ViewportActions.resize())
// 		}, 100)
// 	})
	
// 	let scrolled = false
// 	window.addEventListener('scroll', () => {
// 		clearTimeout(scrolled)
// 		scrolled = setTimeout(() => {
// 			dispatch(ViewportActions.scroll())
// 		}, 100)
// 	})

// 	window.addEventListener('load', () => {
// 		dispatch(ViewportActions.load())
// 	})
// })

export const AppReactions = {
	onInit: {
		type: APP.INIT,
		callback: async (store, state, dispatch) => {
			let resized = false
			window.addEventListener('resize', () => {
				clearTimeout(resized)
				resized = setTimeout(() => {
					dispatch(ViewportActions.resize())
				}, 100)
			})
			
			let scrolled = false
			window.addEventListener('scroll', () => {
				clearTimeout(scrolled)
				scrolled = setTimeout(() => {
					dispatch(ViewportActions.scroll())
				}, 100)
			})
		
			window.addEventListener('load', () => {
				dispatch(ViewportActions.load())
			})
		}
	}
}