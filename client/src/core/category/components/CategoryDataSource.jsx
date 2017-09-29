import React from 'react'
import PropTypes from 'prop-types'

import { Store } from '@core'
import { CategoryActions } from '@core/category/CategoryActions'
import { INITIAL_STATE } from '@core/category/CategoryReducer'
import DataSource from '@components/data/DataSourceContainer'

import CustomProps from '@libs/customProps'

export default class CategoryDataSource extends React.Component {
	static defaultProps = {
		source: 'category',
		initialData: INITIAL_STATE,
		fetch: (props, state) => {
			if(props.categoryId != undefined) {
				return CategoryActions.fetch(Store, props.categoryId)
			} else if(props.categorySlug != undefined) {
				return CategoryActions.fetch(Store, props.categorySlug, {
					selectBy: 'slug'
				})
			}
			
		},
		shouldFetch: (props, state) => {
			return state.data.activeCategory.id != props.categoryId 
				|| state.data.activeCategory.slug != props.categorySlug
		},
		reset: (props, state) => CategoryActions.resetActive(),
		didDataChange: (prevData, nextData) =>  prevData.activeCategory.id != nextData.activeCategory.id,
		hasValidData: (data) => typeof data.activeCategory.id == 'number'
	}
	
	static propTypes = {
		categoryId: CustomProps.oneOfRequiredSet(['categoryId', 'categorySlug']),
		categorySlug: CustomProps.oneOfRequiredSet(['categoryId', 'categorySlug']),
		
		source: PropTypes.oneOf(['category']),
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