import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

export default class Footer extends React.Component {
	render(){
		return (
			<footer role='footer'>
				<div className='container'>
					<div className='row'>
						<div className='col xs12 m4'>
							<h5>Footer 1</h5>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas atque excepturi minima quae nulla, tempora laudantium quia ab saepe quasi.</p>
						</div>
						<div className='col xs12 m4'>
							<h5>Footer 2</h5>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt quod iste maiores! Amet, dolor, neque. Laborum rerum inventore, excepturi illum!</p>
						</div>
						<div className='col xs12 m4'>
							<h5>Footer 3</h5>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati provident necessitatibus expedita minus non doloremque, dolorem molestiae aliquam amet iste.</p>
						</div>
					</div>
				</div>
			</footer>
		)
	}
}