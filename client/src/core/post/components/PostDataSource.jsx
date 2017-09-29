import React from 'react'
import PropTypes from 'prop-types'

import { Store } from '@core'
import { PostActions } from '@core/post/PostActions'
import { INITIAL_STATE } from '@core/post/PostReducer'
import DataSource from '@components/data/DataSourceContainer'

import CustomProps from '@libs/customProps'

export default class PostDataSource extends React.Component {
	static defaultProps = {
		source: 'post',
		initialData: INITIAL_STATE,
		fetch: (props, state) => {
			if(props.postId != undefined) {
				PostActions.fetch(Store, props.postId)
			} else if(props.postSlug != undefined) {
				return PostActions.fetch(Store, props.postSlug, {
					selectBy: 'slug'
				})
			}
			
		},
		shouldFetch: (props, state) => {
			return state.data.activePost.id != props.postId
				|| state.data.activePost.slug != props.postSlug
		},
		reset: (props, state) => PostActions.resetActive(),
		didDataChange: (prevData, nextData) => prevData.activePost.id != nextData.activePost.id,
		hasValidData: (data) => typeof data.activePost.id == 'number'
	}
	
	static propTypes = {
		postId: CustomProps.oneOfRequiredSet(['postId', 'postSlug']),
		postSlug: CustomProps.oneOfRequiredSet(['postId', 'postSlug']),
		
		source: PropTypes.oneOf(['post']),
		fetch: PropTypes.func,
		shouldFetch: PropTypes.func,
		reset: PropTypes.func,
		shouldReset: PropTypes.func,
		didDataChange: PropTypes.func,
		hasValidData: PropTypes.func,
		extractData: PropTypes.func
	}
	
	constructor(props){
		super(props)
	}
	
	render(){
		let { children, ...otherProps } = this.props
		return (
			<DataSource { ...otherProps }>{children}</DataSource>
		)
	}
}