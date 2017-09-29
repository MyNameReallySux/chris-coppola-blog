import React from 'react'
import ReactDOM from 'react-dom'
import App from '@views/layouts/App'

import { Provider } from 'react-redux'

import { Store } from '@core'

console.log(`
//========================
// 	APP START
// ========================
`)

const render = (Component, element) => {
	ReactDOM.render(
		<Provider store={Store}>
			<Component />
		</Provider>,
		document.getElementById('Root')
	)
}

render(App)