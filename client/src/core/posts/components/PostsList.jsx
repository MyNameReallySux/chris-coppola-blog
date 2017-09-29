import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { Store } from '@core'
import { updateArray, updateObject } from '@libs/utils'

class PostsList extends React.Component {
	static defaultProps = {
		className: 'posts-list',
		categorySlug: null,
		posts: {
			loading: true,
			items: [],
			filtered: [],
			error: null
		},
		categories: {
			loading: true,
			items: [],
			error: null
		}
	}
	
	static propTypes = {
		id: PropTypes.string,
		className: PropTypes.string,
	}
	
	constructor(props){
		super(props)
						
		this.state = {
			filters: {
				categories: props.categorySlug
			},
			posts: props.posts,
			categories: props.categories
		}
	}
	
	getCategories = () => {
		return this.props.categories.items
	}
	
	getFilters = (categories, categorySlug) => {
		let filters = this.state.filters

		if(categorySlug == undefined || categorySlug == null){
			delete filters.categories
			return filters
		}
		
		filters.categories = categorySlug
		return filters
	}
	
	generateFiltered = (posts, categories, filters) => {
		let filtered = []
		let joined = {}
				
		if(posts !== undefined && posts.length > 0 && categories !== undefined && categories.length > 0){
			Object.values(categories).map((category) => {
				joined[category.slug] = category
			})

			if(Object.keys(filters).length > 0){
				for(let [type, slug] of Object.entries(filters)){
					filtered = updateArray(filtered, posts.filter((item) => {
						return item[type].indexOf(joined[slug].id) > -1
					}))
				}
			} else {
				filtered = false
			}
			return filtered
		}
		return false
	}
	
	handlePosts = (props, state) => {
		let posts = props.posts
		let oldPosts = state.posts

		let items = updateArray(oldPosts.items, posts.items)
		let categories = this.getCategories()
		let filters = this.getFilters(categories, props.categorySlug)
		let filtered = this.generateFiltered(posts, categories, filters)
		
		posts.filtered = { filtered }

		this.setState({
			filters: {
				categories: filters.categories
			},
			categorySlug: this.props.categorySlug,
			posts: {
				...posts, filtered
			},
			categories
		})
	}
	
	componentWillMount = () => {
		this.handlePosts(this.props, this.state)
	}

	componentWillReceiveProps = (nextProps) => {
		this.handlePosts(nextProps, this.state)
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

export default PostsList
