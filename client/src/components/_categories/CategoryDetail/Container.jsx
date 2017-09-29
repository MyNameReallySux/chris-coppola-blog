import { connect } from 'react-redux'
import { ensureIdleState } from 'redux-promises';

import { CategoryActions } from '@core/category/CategoryActions'
import { Store } from '@core'
import CategoryDetail from './Component'

const mapStateToProps = (state, props) => {
	return { category: state.category }
}

const mapDispatchToProps = (dispatch) => {
	return {
		getCategoryById: (id) => {
			dispatch(CategoryActions.fetch(Store, id))
		},
		getCategoryBySlug: (slug) => {
			dispatch(CategoryActions.fetch(Store, slug, {
				selectBy: 'slug'
			}))
		},
		reset: () => {
			dispatch(CategoryActions.resetActive())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryDetail)