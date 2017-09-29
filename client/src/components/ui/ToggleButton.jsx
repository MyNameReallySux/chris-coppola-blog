import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

import { StringUtils } from '@beautiful-code/string-utils'

class ToggleButton extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			active: false,
			activeClass: this.props.activeClass
		}
	}
	
	render(){
		let classes = this.props.className.split(' ')
		this.state.active && classes.push(this.props.activeClass)
		return(
			<a id={this.props.id}
			   className={classes.join(' ')}
			   onClick={this.props.onClick}>
				{this.props.children || "Click Here!" }
			</a>
		)
	}
}

ToggleButton.propTypes = {
	id: PropTypes.string,
	onClick: PropTypes.func,
	className: PropTypes.string,
}

ToggleButton.defaultProps = {
	className: 'toggle-button',
	activeClass: 'active'
}

export default ToggleButton