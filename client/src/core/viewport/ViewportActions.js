export const VIEWPORT = {
	LOAD: 'VIEWPORT_LOAD',
	RESIZE: 'VIEWPORT_RESIZE',
	SCROLL: 'VIEWPORT_SCROLL',
	
	CALC_VIEWPORT: 'VIEWPORT_CALC_VIEWPORT',
	SET_VIEWPORT: 'VIEWPORT_SET_VIEWPORT'
}

export const ViewportActions = {
	load: (...args) => ({
		type: VIEWPORT.LOAD
	}),
	resize: (...args) => ({
		type: VIEWPORT.RESIZE
	}),
	scroll: (...args) => ({
		type: VIEWPORT.SCROLL
	}),
	
	calcViewport: (...args) => ({
		type: VIEWPORT.CALC_VIEWPORT
	}),
	setViewport: (current, previous, delta, lastUpdate) =>  ({
		type: VIEWPORT.SET_VIEWPORT,
		payload: { current, previous, delta, lastUpdate }
	})
	
}