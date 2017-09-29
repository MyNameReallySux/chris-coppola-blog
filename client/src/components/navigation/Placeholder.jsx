import React from 'react'
//import { Route, Switch, Link } from 'react-router-dom'
import RouteAware from '@components/navigation/RouteAware'

import * as R from '@views/routes'


import { Switch, Link, Route, BrowserRouter } from 'react-router-dom'

class Placeholder extends RouteAware {
	constructor(props){
		super(props)
		this.state = {
			routes: []
		}
		this.initRoutesMap(props.routes)
	}
	
	initRoutesMap(routes){
		routes = this.setAllRouteDefaults(routes)
		for(let route of Object.keys(routes)){
			this.convertToRoute(route, routes[route], undefined)
		}
	}
	
	convertToRoute(key, route, parent = ''){
		let path = parent + route.path

		let hasChildren = route.hasOwnProperty('children') && Object.keys(route.children).length > 0

		if(hasChildren){
			for(let child of Object.keys(route.children)){
				this.convertToRoute(child, route.children[child], route.path)
			}
		}
		
		if(route.exact){
			this.state.routes.push(<Route path={path} exact={true} component={route.component} key={route.id}/>)
		} else {
			this.state.routes.push(<Route path={path} exact={false} component={route.component} key={route.id}/>)
		}
	}
	
	render(){
		return(
			<Switch>
				{this.state.routes}
			</Switch>	
		)
	}
}

export default Placeholder