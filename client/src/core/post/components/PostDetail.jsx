import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { updateArray, updateObject } from '@libs/utils'

class PostDetail extends React.Component {
	static defaultProps = {
		className: 'post-detail',
		post: {
			activePost: {
				id: null
			},
			loading: true,
			error: null
		}
	}
	
	static propTypes = {
		id: PropTypes.string,
		className: PropTypes.string,
		
		post: PropTypes.shape({
			activePost: PropTypes.shape({
				id: PropTypes.number
			})
		})
	}
	
	constructor(props){
		super(props)
		
		this.state = {
			post: this.props.post
		}
	}

	componentWillReceiveProps = (nextProps) => {
		let post = nextProps.post
		let oldPost = this.state.post
		
		if(post.activePost.id != oldPost.activePost.id){
			this.setState({
				post: {
					...post, loading: false
				}
			})
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
