import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { Store } from '@core'
import { updateArray, updateObject } from '@libs/utils'

class PostsList extends React.Component {
	constructor(props){
		super(props)
				
		this.state = {
			filters: {
				categories: props.categorySlug
			},
			posts : props.posts
		}
	}

	componentWillMount(){
		this.props.getPosts()
	}
	
	componentWillReceiveProps = async (nextProps) => {
		let newPosts = nextProps.posts.items
		let oldPosts = this.state.posts.items
		
		let state = Store.getState()
		
		let items = updateArray(oldPosts, newPosts)
		
		let categories = state.categories.items
		
		let joined = {}
		Object.values(categories).map((category) => {
			joined[category.slug] = category.id
		})
		
		let filters = this.state.filters
			
		if(nextProps.hasOwnProperty('categorySlug')){
			filters.categories = nextProps.categorySlug
		} else if(!filters.categories){
			delete filters.categories
		}
		
		let filtered = []
		
		if(Object.keys(filters).length > 0){
			for(let [tag, value] of Object.entries(filters)){
				filtered = updateArray(filtered, items.filter((item) => {
					return item[tag].indexOf(joined[value]) > -1
				}))
			}
		} else {
			filtered = false
		}
		

		await this.setState({
			filters,
			posts: {
				...this.state.posts, items, filtered 
			}
		})
	}
	

	render(){
		let { className, id } = this.props
		let { posts } = this.state
		
		let loading = posts.loading
		
		
		if(loading){
			return (
				<div id={id}>
					Loading...
				</div>
			)
		} else {
			let postSet = posts.filtered || posts.items

			let postsList = postSet.map((post, i) => {
				let date = new Date(post.date)
				let displayDate = `${date.toLocaleDateString()}`

				return (
					<li className='post' key= {`post-${post.id}`}>
						<h3 className='post-title'>{post.title.rendered}</h3>
						<div className='post-date'>{displayDate}</div>
						<div className='post-snippet' dangerouslySetInnerHTML={{__html: post.excerpt.rendered}}></div>
						<Link to={`/blog/post/${post.slug}`}>Read More...</Link>
					</li>
				)
			})

			return (
				<ul id={id} className={className}>
					{ postsList || "No Posts"}
				</ul>
			)
		}
		
		
	}
}

PostsList.defaultProps = {
	className: 'posts-list',
	posts: {
		loading: true,
		items: [],
		filtered: [],
		error: null
	}
}

PostsList.propTypes = {
	id: PropTypes.string,
	className: PropTypes.string,
	
	getPosts: PropTypes.func.isRequired
}

export default PostsList
