import React from 'react'
import PropTypes from 'prop-types'
import { Route, Link, Switch } from 'react-router-dom'
import { StringUtils } from '@beautiful-code/string-utils'

import { Routes } from '@core/routes'
import RouteAware from '@components/navigation/RouteAware'

class NavMenu extends RouteAware {
	constructor(props){
		super(props)
		
		this.state = {
			items: [],
			active: props.active,
			activeClass: props.activeClass
		}
		
	}
	
	componentWillMount(){
		this.initMenu(this.props.routes)
	}
	
	initMenu(routes){
		for(let route of Object.keys(routes)){
			this.state.items.push(this.convertToLink(route, routes[route], undefined))
		}
	}
	
	convertToLink(key, route, parent = ''){
		route = this.setRouteDefaults(key, route)

		let path = parent + route.path

		let hasChildren = route.hasOwnProperty('children') 
			&& Object.keys(route.children).length > 0

		let childLinks = []
		if(hasChildren){
			for(let child of Object.keys(route.children)){
				childLinks.push(this.convertToLink(child, route.children[child], route.path))
			}
		}

		let link

		if(hasChildren){
			link = (
				<li key={route.id}>
					<Link to={path}>+{ route.label }</Link>
					<ul>
						{ childLinks }
					</ul>
				</li>
			)
		} else {
			link = (
				<li key={route.id}>
					<Link to={path}>{ route.label }</Link>
				</li>
			)
		}
		return link
	}
	
	render(){
		let classes = this.props.className.split(' ')
		this.state.active && classes.push(this.props.activeClass)
		
		return(
			<div id={this.props.id}
				 className={classes.join(' ')}>
				<ul>
					{this.state.items}
				</ul>
			</div>
		)
	}
}

NavMenu.propTypes = {
	id: PropTypes.string.isRequired,
	className: PropTypes.string,
	activeClass: PropTypes.string
}

NavMenu.defaultProps = {
	id: 'NavMenu',
	className: 'nav-menu',
	activeClass: 'open'
}

export default NavMenu