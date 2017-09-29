import { connect } from 'react-redux'
import { ensureIdleState } from 'redux-promises';

import { CategoriesActions } from '@core/categories/CategoriesActions'
import { Store } from '@core'
import CategoriesList from './Component'

const mapStateToProps = (state, props) => {
	return { categories: state.categories }
}

const mapDispatchToProps = (dispatch) => {
	return {
		getCategories: () => {
			dispatch(CategoriesActions.fetch(Store))
		}

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesList)