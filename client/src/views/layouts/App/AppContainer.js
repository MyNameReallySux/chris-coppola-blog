import { connect } from 'react-redux'

import { AppActions } from '@core/app/AppActions'
import App from './App'

const mapStateToProps = (state, props) => {
	return {}
}

const mapDispatchToProps = (dispatch) => {
	return {
		initApp: async () => {
			dispatch(AppActions.init())
		}

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)