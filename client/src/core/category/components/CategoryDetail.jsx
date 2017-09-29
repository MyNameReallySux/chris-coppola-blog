import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { updateArray, updateObject } from '@libs/utils'

class CategoryDetail extends React.Component {
	static defaultProps = {
		className: 'category-detail',
		category: {
			activeCategory: {
				id: null
			},
			loading: true,
			error: null
		}
	}
	
	static propTypes = {
		id: PropTypes.string,
		className: PropTypes.string,
		categoryId: PropTypes.number,
		categorySlug: PropTypes.string
	}

	state = {
		category: this.props.category
	}
	
	constructor(props){
		super(props)
	}
	
	componentWillReceiveProps = (nextProps) => {
		let category = nextProps.category
		let oldCategory = this.state.category
				
		if(category.activeCategory.id != oldCategory.activeCategory.id){
			this.setState({
				category: {
					...category, loading: false
				}
			})
		}
	}
	
	render = () => {
		let { className, id } = this.props
		let { activeCategory, loading } = this.state.category
						
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

export default CategoryDetail
