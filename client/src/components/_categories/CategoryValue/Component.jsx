import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { StringUtils } from '@beautiful-code/string-utils'
import { updateArray, updateObject } from '@libs/utils'

class CategoryValue extends React.Component {
	constructor(props){
		super(props)
		
		this.state = {
			field: this.props.field,
			category: this.props.category
		}
		
		if(props.className == CategoryValue.defaultProps.className){
			this.state.className = `category-${StringUtils.toKebabCase(props.field)}`
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
			let value = category[this.state.value]
			
			return (
				<div id={id}
					 className={className}
					 key={`category-label-${category.id}`}>
					{category.name}
				</div>
			)
		} else {
			return (
				<div className={className}>
					<p>No active category was found.</p>
				</div>
			)
		}
		
	}
}

CategoryValue.defaultProps = {
	className: 'category-label',
	category: {
		activeCategory: null,
		loading: true,
		error: null
	},
	field: 'name'
}

CategoryValue.propTypes = {
	id: PropTypes.string,
	className: PropTypes.string,
	getCategoryById: PropTypes.func.isRequired,
	getCategoryBySlug: PropTypes.func.isRequired,
	categoryId: PropTypes.number,
	categorySlug: PropTypes.string,
	field: PropTypes.string
}

export default CategoryDetail
