import React from 'react';
import { Link } from 'react-router-dom'

export default class About extends React.Component {
	constructor(props){
		super(props)
	}
	
	render(){
		return (
			<div id='AboutPage' className='page'>
				<div className='container'>
					<h2>About Page</h2>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam error placeat nobis perspiciatis reiciendis optio soluta possimus praesentium minus, harum maxime, cupiditate laudantium earum ipsum repellendus atque ex. Saepe, deleniti.</p>
				</div>
			</div>
		)
	}
}