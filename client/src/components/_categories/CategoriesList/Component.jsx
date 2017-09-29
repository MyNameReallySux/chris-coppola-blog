import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { updateArray, updateObject } from '@libs/utils'

class CategoriesList extends React.Component {
	constructor(props){
		super(props)
		
		this.state = {
			categories: {
				loading: false,
				items: []
			}
		}
	}

	componentWillMount(){
		this.props.getCategories()
	}
	
	componentWillReceiveProps(nextProps) {
		let newCategories = nextProps.categories.items
		let oldCategories = this.state.categories.items || []
		
		let items = updateArray(oldCategories, newCategories)

		this.setState({ categories: { ...this.state.categories, items }})
	}
	
	render(){
		let { className, id } = this.props
		let { categories } = this.state
						
		let categoriesList = categories.items.map((category, i) => {
			return (
				<li className='category' key= {`category-${category.id}`}>
					<Link to={`/blog/category/${category.slug}`}>{category.name} ({category.count})</Link>
				</li>
			)
		})
				
		return (
			<ul id={id} className={className}>
				{ categoriesList || "No Categories"}
			</ul>
		)
	}
}

CategoriesList.defaultTypes = {
	className: PropTypes.func.isRequired
}

CategoriesList.propTypes = {
	id: PropTypes.string,
	className: PropTypes.string,
	getCategories: PropTypes.func.isRequired,
	categories: PropTypes.shape({
		loading: PropTypes.bool.isRequired,
		items: PropTypes.array
	})
}

export default CategoriesList
