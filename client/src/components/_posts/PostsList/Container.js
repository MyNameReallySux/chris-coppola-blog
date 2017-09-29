import { connect } from 'react-redux'
import { ensureIdleState } from 'redux-promises';

import { PostsActions } from '@core/posts/PostsActions'
import { Store } from '@core'
import PostsList from './Component'

const mapStateToProps = (state, props) => {
	return { posts: state.posts }
}

const mapDispatchToProps = (dispatch) => {
	return {
		getPosts: () => {
			dispatch(PostsActions.fetch(Store))
		}

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsList)