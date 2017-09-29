import Axios from 'axios'
import URLEncoder from 'querystring'

export const RestAdapter = {
	API_ROOT: 'http://api.chris-coppola.com/wp-json/wp/v2/',
	get: function(endpoint, params = {}){
		params = RestAdapter.convertParams(params, WordpressSchema.posts)
		let url = `${RestAdapter.API_ROOT}${endpoint}`
		if(Object.keys(params).length > 0){
			url += `?${URLEncoder.stringify(params)}`
		}
		return Axios.get(url)
	},
	getPosts: function(params = {}){
		return RestAdapter.get('posts', params)
	},
	getPostByID: function(id, params = {}){
		if(typeof id == undefined || typeof id == null) 
			throw Error(`Empty ID passed into 'getPostByID`)
		if(typeof id != 'number') 
			throw Error(`Non-Numerical ID passed into 'getPostByID`)
		
		let result = RestAdapter.get(`posts/${id}`, params)
		return result
	},
	getPostBySlug: function(slug, params = {}){
		if(typeof slug == undefined || typeof slug == null) 
			throw Error(`Empty Slug passed into 'getPostBySlug`)
		if(typeof slug != 'string') 
			throw Error(`Non-String Slug passed into 'getPostBySlug`)
			
		params['slug'] = slug
		params['pageSize'] = 1
		
		let result = RestAdapter.get(`posts`, params)
		return result
	},
	getCategories: function(params = {}){
		return RestAdapter.get('categories', params)
	},
	getCategoryByID: function(id, params = {}){
		if(typeof id == undefined || typeof id == null) 
			throw Error(`Empty ID passed into 'getCategoryByID`)
		if(typeof id != 'number') 
			throw Error(`Non-Numerical ID passed into 'getCategoryByID`)
		
		let result = RestAdapter.get(`categories/${id}`, params)
		return result
	},
	getCategoryBySlug: function(slug, params = {}){
		if(typeof slug == undefined || typeof slug == null) 
			throw Error(`Empty Slug passed into 'getPostBySlug`)
		if(typeof slug != 'string') 
			throw Error(`Non-String Slug passed into 'getPostBySlug`)
			
		params['slug'] = slug
		params['pageSize'] = 1
		
		let result = RestAdapter.get(`categories`, params)
		return result
	},
	convertParams: function(params = {}, schema){
		let converted = {}
		for(let param of Object.keys(params)){
			if(!schema.hasOwnProperty(param)){
				console.log(`API query parameter '${param}' was invalid.`)
			} else {
				converted[schema[param]] = params[param]
			}
		}
		
		return converted
	}
}

export const WordpressSchema = {
	posts: {
		date: 		'date',
		id: 		'id',
		slug:		'slug',
		status: 	'status',
		page: 		'page',
		pageSize: 	'per_page',
		order: 		'order'
	}
}