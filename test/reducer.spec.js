import { expect } from 'chai'

import { createStore, combineReducers, applyMiddleware } from 'redux'

import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import { Posts } from '../client/actions'
import { updateObject } from '../client/libs/utils'

import * as reducers from '../client/reducer'

const reducer = combineReducers({
	posts: reducers.posts
})
let loggerMiddleware = createLogger()

describe('Reducer', () => {
	const INITIAL_STATE = {
		posts: {
			isFetching: false,
			items: [],
			error: null
		}
	}
	
	const mockPosts = [{
		id: 123,
		body: "Hello World!"
	}, {
		id: 399,
		body: "Post #2"
	}, {
		id: 214,
		body: "The Third One"
	}, {
		id: 981,
		body: "This is another post."
	}, {
		id: 145,
		body: "This is the final post."
	}]
	
	it('handles POSTS_REQUEST', function(done){
		let state = INITIAL_STATE
		state.posts = updateObject(state.posts, {})
		
		let action = Posts.request(1, 4)
		state = reducer(state, action)
				
		expect(state.posts.isFetching).equals(true)
		
		state.posts = updateObject(state.posts, {
			isFetching: false,
			items: [mockPosts]
		})
		
		action = Posts.request(1, 4)
		state = reducer(state, action)
		
		expect(state.posts.isFetching).equals(true)
		
		done()
	})
	
	it('handles POSTS_SUCCESS', function(done){
		let state = INITIAL_STATE
		state.posts = updateObject(state.posts, { isFetching: true })
		
		let action = Posts.success({
			data: mockPosts.slice(0, 3)
		})
		state = reducer(state, action)
		
		expect(state.posts.items.length).equals(3)
		expect(state.posts.items[0].id).equals(123)
		expect(state.posts.items[0].body).equals('Hello World!')
		
		state.posts = updateObject(state.posts, { isFetching: false })
		
		action = Posts.success({
			data: mockPosts.slice(3, 5)
		})
		state = reducer(state, action)
		
		expect(state.posts.items.length).equals(5)
		expect(state.posts.items[4].id).equals(981)
		expect(state.posts.items[4].body).equals('This is another post.')
		done()
	})
})

describe('Reducer w/ Store', () => {
	let store
	beforeEach(function(){
		store = createStore(reducer, applyMiddleware(
			thunkMiddleware
		))
	})
	
	it('handles POSTS_FETCH', async function(){
		let result = await store.dispatch(Posts.fetch({
			pageSize: 1,
			page: 1,
			order: 'asc'
		}))
		let posts = store.getState().posts.items
		
		for(let post of posts){
			console.log(`POST {`)
			console.log(`  id: ${post.id}`)
			console.log(`  title: ${post.title.rendered}`)
			console.log(`  body: ${post.content.rendered}`)
			console.log(`}`)
		}
	})
})