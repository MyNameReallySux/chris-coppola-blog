import React from 'react';
import PropTypes from 'prop-types'

import { Routes }		from '@core/routes'
import { Store } 		from '@core'
import { VIEWPORT }		from '@core/viewport/ViewportActions'

import NavigationMenu 	from '@components/navigation/NavMenu'
import ToggleButton 	from '@components/ui/ToggleButton'

class Header extends React.Component {
	static contextTypes = {
		app: PropTypes.object
	}

	static childContextTypes = {
		header: PropTypes.object
	}

	static propTypes = {
		app: PropTypes.object
	}

	constructor(props){
		super(props)
		
		this.toggleNavMenu = this.toggleNavMenu.bind(this)
		
		this.state = {
			active: false,
			lastResize: 0,
			unsubscribe: undefined
		}
	}
	getChildContext = () => {
		return {
			header: this
		}
	}
	closeNavMenu(e){
		let set = [this, this.navMenu, this.menuButton].map((component) => {
			component.setState({ active: false })
		})
	}
	toggleNavMenu(e){
		let active = !this.state.active
		let set = [this, this.navMenu, this.menuButton].map((component) => {
			component.setState({ active })
		})
	}

	componentDidMount = () => {
		let unsubscribe = Store.subscribe(() => {
			let state = Store.getState()
			switch(state.lastAction.type){
				case VIEWPORT.RESIZE: {
					this.closeNavMenu()
				} break
			}
		})
	}
	
	componentWillUnMount = () => {
		this.state.unsubscribe()
	}
	
	render(){
		return (
			<header role='banner'>
				<div className='top-bar'>
					<div className='container'>
						<div className='logo'>Chris Coppola</div>
					</div>
				</div>
				<ToggleButton id="MenuButton"
							  onClick={this.toggleNavMenu}
							  className='menu-button'
							  activeClass='open'
							  ref={(menuButton) => {this.menuButton = menuButton}}>
							<div>
								<span></span>
								<span></span>
								<span></span>
							</div>
				</ToggleButton>
				<NavigationMenu id="NavMenu" 
								routes={Routes} 
								ref={(navMenu) => {this.navMenu = navMenu}}>
				</NavigationMenu>
				
			</header>
		)
	}
}

export default Header