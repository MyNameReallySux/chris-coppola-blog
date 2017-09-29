import React from 'react';
import { Route, Link } from 'react-router-dom'
import Placeholder from '@components/navigation/Placeholder.jsx'

import { Routes } from '@core/routes'

export default class Main extends React.Component {
	render(){
		return (
			<main role='main'>
				<Placeholder routes={Routes}></Placeholder>
			</main>
		)
	}
}