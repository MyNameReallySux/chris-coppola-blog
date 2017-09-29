import React from 'react';
import { Link } from 'react-router-dom'

import { INITIAL_STATE as POST_STATE } from '@core/post/PostReducer' 

import PostDetail from '@core/post/components/PostDetail'
import PostDataSource from '@core/post/components/PostDataSource'

export default class Blog extends React.Component {
	static defaultProps = {
		title: 'Blog Page',
		subTitle: '',
		post: POST_STATE
	}
	
	state = {
		title: this.props.title,
		subTitle: this.props.post.activePost.title,
		slug: this.props.match.params.slug,
		post: this.props.post,
	}
	
	constructor(props){
		super(props)
	}

	onPostData = (post) => {
		this.setState({ ...this.state, post })
	}
	
	static PostDetail = (props) => {
		let { activePost:post, loading, error } = props.post
		if(post.id == null){
			return (
				<div id='PostDetail'>
					No Posts Found!
				</div>
			)
		} else {
			let date = new Date(post.date)
			let displayDate = `${date.toLocaleDateString()}`
			return (
				<div id='PostDetail'
					 className='post-detail'
					 key={`post-detail-${post.id}`}>
					<h3 className='post-title'>{post.title.rendered}</h3>
					<div className='post-date'>{displayDate}</div>
					<div className='post-content' dangerouslySetInnerHTML={{__html: post.content.rendered}}></div>
				</div>
			)
		}
	}
	
	render(){
		return (
			<div className='container'>
				<div id='BlogPage' className='page'>
					<h2>{this.state.title}</h2>

					<PostDataSource 
						postSlug={this.state.slug}
						extractData={(_, post) => this.onPostData(post) } />
					
					<Blog.PostDetail post={this.state.post}></Blog.PostDetail>
					
				</div>
			</div>
		)
	}
}