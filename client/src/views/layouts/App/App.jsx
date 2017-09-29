import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router } from 'react-router-dom'

import Header	from '@views/partials/Header.jsx'
import Main		from '@views/partials/Main.jsx'
import Footer	from '@views/partials/Footer.jsx'

class App extends React.Component {
	static propTypes = {
		initApp: PropTypes.func.isRequired
	}
	
	static childContextTypes = {
		app: PropTypes.object
	}
	
	constructor(props){
		super(props)
	}
	
	componentWillMount(){
		this.props.initApp()
	}

	getChildContext(){
		return {
			app: this
		}
	}

	render(){
		return (
			<Router>
				<div className='application'>
					<Header />
					<Main />
					<Footer />
				</div>
			</Router>
		)
	}
}

export default App
