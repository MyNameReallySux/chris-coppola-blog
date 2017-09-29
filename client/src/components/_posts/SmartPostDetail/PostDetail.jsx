import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { updateArray, updateObject } from '@libs/utils'

class PostDetail extends React.Component {
	static defaultProps = {
		className: 'post-detail',
		post: {
			activePost: null,
			loading: true,
			error: null
		}
	}

	static propTypes = {
		id: PropTypes.string,
		className: PropTypes.string,
		postId: PropTypes.number,
		postSlug: PropTypes.string,
		
		getPostById: PropTypes.func.isRequired,
		getPostBySlug: PropTypes.func.isRequired,
		reset: PropTypes.func.isRequired,
	}

	constructor(props){
		super(props)
		
		this.state = {
			post: this.props.post
		}
	}
	
	componentWillUnmount = (...args) => {
		this.props.reset()
	}

	componentWillMount(){
		if(this.props.postId){
			this.props.getPostById(this.props.postId)
		} else if(this.props.postSlug){
			this.props.getPostBySlug(this.props.postSlug)
		}
	}
	
	componentWillReceiveProps = async (nextProps) => {
		let post = nextProps.post.activePost
		let state = this.state.post.activePost
		
		this.setState({ post: { ...this.state.post, loading: true }})
		
		let stateHasPost = state !== undefined && state !== null && state.hasOwnProperty('id')
		let propsHasPost = post !== undefined && post !== null && post.hasOwnProperty('id')
				
		let activePost = post
		
		if(propsHasPost){
			if(!stateHasPost || post.id != state.id){
				await this.setState({ post: { ...this.state.post, activePost }})
			}
			this.setState({ post: { ...this.state.post, loading: false }})
		}
	}
	
	render(){
		let { className, id } = this.props
		let { activePost, loading } = this.state.post
				
		if(loading){
			return (
				<div id={id}>
					Loading...
				</div>
			)
		} else if(activePost && activePost.content){
			let post = activePost
			
			let date = new Date(post.date)
			let displayDate = `${date.toLocaleDateString()}`

			return (
				<div id={id}
					 className={className}
					 key={`post-detail-${post.id}`}>
					<h3 className='post-title'>{post.title.rendered}</h3>
					<div className='post-date'>{displayDate}</div>
					<div className='post-content' dangerouslySetInnerHTML={{__html: post.content.rendered}}></div>
				</div>
			)
		} else {
			return (
				<div className={className}>
					<p>No post was found.</p>
				</div>
			)
		}
		
	}
}

export default PostDetail
