import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { updateArray, updateObject } from '@libs/utils'

class CategoryDetail extends React.Component {
	constructor(props){
		super(props)
		
		this.state = {
			category: this.props.category
		}
	}
	
	componentWillUnmount = (...args) => {
		this.props.reset()
	}

	componentWillMount = (...args) => {
		if(this.props.categorySlug){
			this.props.getCategoryBySlug(this.props.categorySlug)
		}
	}
	
	componentWillReceiveProps = async (nextProps) => {
		let category = nextProps.category.activeCategory
		let state = this.state.category.activeCategory
		
		this.setState({ category: { ...this.state.category, loading: true }})
		
		let stateHasCategory = state !== undefined && state !== null && state.hasOwnProperty('id')
		let propsHasCategory = category !== undefined && category !== null && category.hasOwnProperty('id')
				
		let activeCategory = category
		
		if(propsHasCategory){
			if(!stateHasCategory || category.id != state.id){
				await this.setState({ category: { ...this.state.category, activeCategory }})
			}
			this.setState({ category: { ...this.state.category, loading: false }})
		}
	}
	
	render = () => {
		let { className, id } = this.props
		let { loading, activeCategory } = this.state.category
						
		if(loading){
			return (
				<div id={id}>
					Loading...
				</div>
			)
		} else if(activeCategory && activeCategory.name){
			let category = activeCategory
			
			return (
				<div id={id}
					 className={className}
					 key={`category-detail-${category.id}`}>
					<h3 className='category-title'>{category.name}</h3>
					<div className='category-description'>{category.description}</div>
				</div>
			)
		} else {
			return (
				<div className={className}>
					<p>No category was found.</p>
				</div>
			)
		}
		
	}
}

CategoryDetail.defaultProps = {
	className: 'category-detail',
	category: {
		activeCategory: null,
		loading: true,
		error: null
	}
}

CategoryDetail.propTypes = {
	id: PropTypes.string,
	className: PropTypes.string,
	getCategoryById: PropTypes.func.isRequired,
	getCategoryBySlug: PropTypes.func.isRequired,
	categoryId: PropTypes.number,
	categorySlug: PropTypes.string
}

export default CategoryDetail
