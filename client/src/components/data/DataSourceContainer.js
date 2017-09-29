import { connect } from 'react-redux'
import { ensureIdleState } from 'redux-promises';

import DataSource from './DataSource'

const mapStateToProps = (state, props) => {
	return { data: state[props.source], hasFetched: true }
}

const mapDispatchToProps = (dispatch) => {
	return {
		dispatch: (action) => {
			dispatch(action)
		}

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DataSource)