import React from 'react'
import { Link } from 'react-router-dom'

import { Store } from '@core'

import CategoryDataSource from '@core/category/components/CategoryDataSource'
import CategoriesDataSource from '@core/categories/components/CategoriesDataSource'
import PostsDataSource from '@core/posts/components/PostsDataSource'

import CategoriesList from '@core/categories/components/CategoriesList'
import CategoryDetail from '@core/category/components/CategoryDetail'
import PostsList from '@core/posts/components/PostsList'

let i = 0

export default class Category extends React.Component {
	state = {
		title: 'Category',
		slug: this.props.match.params.slug,
		category: {
			loading: true,
			activeCategory: {
				id: null
			},
			error: null
		},
		categories: {
			loading: true,
			items: [],
			error: null
		},
		posts: {
			loading: true,
			items: [],
			error: null
		}
	}
	
	constructor(props){
		super(props)
	}
	
	componentWillReceiveProps = (nextProps) => {
		this.setState({
			slug: nextProps.match.params.slug
		})
	}
	
	onCategoryData = (category) => {
		let name = category.activeCategory.name
		let title = name ? `Category: ${name}` : 'Category'
		
		this.setState({ category, title })
	}
	
	onCategoriesData = (categories) => {
		this.setState({
			categories
		})
	}
	
	onPostsData = (posts) => {
		this.setState({
			posts
		})
	}
	
	render(){
		return (
			<div className='container'>
				<CategoryDataSource
					categorySlug={this.state.slug}
					extractData={(_, category) => this.onCategoryData(category) }
					shouldReset={(props, state) => {
						return state.data.activeCategory.slug != this.props.match.params.slug
					}}/>
				<CategoriesDataSource extractData={(source, categories) => this.onCategoriesData( categories) } />
				<PostsDataSource extractData={(source, posts) => this.onPostsData(posts) } />
				
				<div id='CategoryPage' className='page'>
					<h2>{this.state.title}</h2>
					<CategoriesList categories={this.state.categories} />
					<CategoryDetail category={this.state.category} />
					<PostsList
						posts={this.state.posts}
						categorySlug={this.state.slug} />
					
				</div>
			</div>
		)
	}
}