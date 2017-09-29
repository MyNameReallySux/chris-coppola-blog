import React from 'react'
import { StringUtils } from '@beautiful-code/string-utils'

export default class RouteAware extends React.Component {
	constructor(props){
		super(props)
	}
	
	setAllRouteDefaults(routes){
		for(let key of Object.keys(routes)){
			let route = routes[key]
			route = this.setRouteDefaults(key, route)
			
			let hasChildren = route.hasOwnProperty('children')
				&& Object.keys(route.children).length > 0
			
			if(hasChildren){
				this.setAllRouteDefaults(route.children)
			}
		}
		return routes
	}
	
	setRouteDefaults(key, route){
		key = key.toLowerCase()

		route.path = 	route.path  || `/${key}`
		route.label = 	route.label || `${StringUtils.toCamelCase(key, true)}`
		route.id = 		route.id 	|| `${StringUtils.toCamelCase(route.label, true)}Page`
		route.exact =	route.exact || false

		return route
	}
}
