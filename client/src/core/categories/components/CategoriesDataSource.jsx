import React from 'react'
import PropTypes from 'prop-types'

import { Store } from '@core'
import { CategoriesActions } from '@core/categories/CategoriesActions'
import DataSource from '@components/data/DataSourceContainer'

export default class CategoriesDataSource extends React.Component {
	static defaultProps = {
		source: 'categories',
		fetch: (props, state) => CategoriesActions.fetch(Store),
		shouldFetch: (props, state) => {
			let categories = state.data
			
			let hasItems = categories.items.length > 0,
				isLoading = categories.loading,
				hasError = categories.error != null,
				hasFetched = categories.hasFetched
						
			let shouldFetch = !hasItems
				&& !isLoading
				&& !hasError
				&& !hasFetched
			
			return shouldFetch
		},
		didDataChange: (prevData, nextData) => prevData.items.length != nextData.items.length,
		hasValidData: (data) => data.items.length > 0,
		extractData: (source, data) => false
	}
	
	static propTypes = {
		source: PropTypes.oneOf(['categories']),
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