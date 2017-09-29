import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { updateArray, updateObject } from '@libs/utils'

class CategoriesList extends React.Component {
	static defaultProps = {
		className: 'categories-list',
		categories: {
			loading: true,
			items: [],
			error: null
		}
	}
	
	static propTypes = {
		id: PropTypes.string,
		className: PropTypes.string,
		categories: PropTypes.shape({
			loading: PropTypes.bool.isRequired,
			items: PropTypes.array,
			error: PropTypes.object
		})
	}
	constructor(props){
		super(props)
		
		this.state = {
			categories: props.categories
		}
	}

	handleCategories = (nextProps) => {
		let categories = nextProps.categories
		let oldCategories = this.state.categories
		
		this.setState({ categories })
	}
	
	componentWillMount = () => {
		this.handleCategories(this.props, this.state)
	}
	
	componentWillReceiveProps(nextProps) {
		this.handleCategories(nextProps, this.state)
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

export default CategoriesList
