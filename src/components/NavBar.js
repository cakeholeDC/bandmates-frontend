import React, { Component } from 'react'
import ProfileActions from './ProfileActions'
import { Menu } from 'semantic-ui-react'

class NavBar extends Component {
	render(){
		return (
			<React.Fragment>
		    	<Menu>
			        <Menu.Item
			          name='logo'
			        >
			          App Logo
			        </Menu.Item>

			        <Menu.Item
			          name='bands'
			        >
			          Browse Bands
			        </Menu.Item>

			        <Menu.Item
			          name='musicians'
			        >
			          Browse Musicians
			        </Menu.Item>
			        <Menu.Menu position="right" >
				        <Menu.Item>
							<ProfileActions />
						</Menu.Item>
					</Menu.Menu>
		      	</Menu>
			</React.Fragment>

		)
	}
}

export default NavBar


