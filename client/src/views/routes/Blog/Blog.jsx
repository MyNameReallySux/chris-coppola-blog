import React from 'react';
import { Link } from 'react-router-dom'

import { INITIAL_STATE as CATEGORIES_STATE } from '@core/categories/CategoriesReducer' 
import { INITIAL_STATE as POSTS_STATE } from '@core/posts/PostsReducer' 

import CategoriesDataSource from '@core/categories/components/CategoriesDataSource'
import PostsDataSource from '@core/posts/components/PostsDataSource'

import CategoriesList from '@core/categories/components/CategoriesList'
import PostsList from '@core/posts/components/PostsList'

export default class Blog extends React.Component {
	state = {
		posts: {
			...POSTS_STATE,
			filtered: []
		},
		categories: {
			...CATEGORIES_STATE
		}
	}

	onCategoriesData = (categories) => {
		this.setState({ ...this.state, categories })
	}

	onPostsData = (posts) => {
		this.setState({ ...this.state, posts })
	}

	render(){
		return (
			<div className='container'>
				<CategoriesDataSource extractData={(_, data) => this.onCategoriesData(data) }>
					<PostsDataSource extractData={(_, data) => this.onPostsData(data) } />
				</CategoriesDataSource>
			
				<div id='BlogPage' className='page'>
					<h2>Blog Page</h2>
					<CategoriesList categories={this.state.categories} />
					<PostsList posts={this.state.posts}  />
				</div>
			</div>
		)
	}
}