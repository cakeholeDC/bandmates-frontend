import React, { Component } from 'react'
import ProfileActions from './ProfileActions'
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

class NavBar extends Component {
	render(){
		return (
			<React.Fragment>
		    	<Menu>
			        <NavLink to='/' exact>
						<Menu.Item name='logo'>App Logo</Menu.Item>
					</NavLink>

					<NavLink to='/bands' exact>
			        	<Menu.Item name='bands'>Browse Bands</Menu.Item>
					</NavLink>

					<NavLink to='/musicians' exact>
						<Menu.Item name='musicians'>Browse Musicians</Menu.Item>
					</NavLink>

					<Menu.Menu position="right" >
						<NavLink to='/profile' exact>
							<Menu.Item> <ProfileActions /> </Menu.Item>
						</NavLink>
					</Menu.Menu>
		      	</Menu>
			</React.Fragment>

		)
	}
}

export default NavBar


