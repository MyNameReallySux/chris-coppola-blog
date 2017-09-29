import { connect } from 'react-redux'
import { ensureIdleState } from 'redux-promises';

import { PostActions } from '@core/post/PostActions'
import { Store } from '@core'
import PostDetail from './PostDetail'

const mapStateToProps = (state, props) => {
	return { post: state.post }
}

const mapDispatchToProps = (dispatch) => {
	return {
		getPostById: (id) => {
			dispatch(PostActions.fetch(Store, id))
		},
		getPostBySlug: (slug) => {
			dispatch(PostActions.fetch(Store, slug, {
				selectBy: 'slug'
			}))
		},
		reset: () => {
			dispatch(PostActions.resetActive())
		}

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)