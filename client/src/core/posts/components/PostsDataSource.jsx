import React from 'react'
import PropTypes from 'prop-types'

import { Store } from '@core'
import { PostsActions } from '@core/posts/PostsActions'
import DataSource from '@components/data/DataSourceContainer'

export default class PostsDataSource extends React.Component {
	static defaultProps = {
		source: 'posts',
		fetch: (props, state) => PostsActions.fetch(Store),
		shouldFetch: (props, state) => {
			let hasFetched = state.hasFetched
			let count = state.data.items.length
			
			return(hasFetched == false && count <= 0)

		},
		didDataChange: (prevData, nextData) => prevData.items.length != nextData.items.length,
		hasValidData: (data) => data.items.length > 0,
	}
	
	static propTypes = {
		source: PropTypes.oneOf(['posts']),
		fetch: PropTypes.func,
		shouldFetch: PropTypes.func,
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