import React, { Component } from 'react'
// import ProfileActions from './ProfileActions'
import { Menu, Button } from 'semantic-ui-react'
import { NavLink, Link } from 'react-router-dom'
import LogInForm from '../components/LogInForm'



class NavBar extends Component {
	state={
		logInModal: false,
	}

	disableLogInForm = () => {
		this.setState({ logInModal: false})
	}

	enableLogInForm = () => {
		this.setState({ logInModal: true})
	}

	render(){
		return (
			<React.Fragment>
		    	<Menu>
			        <NavLink to='/' exact>
						<Menu.Item name='logo'>BandMates</Menu.Item>
					</NavLink>

					<NavLink to='/bands' exact>
			        	<Menu.Item name='bands'>Browse Bands</Menu.Item>
					</NavLink>

					<NavLink to='/musicians' exact>
						<Menu.Item name='musicians'>Browse Musicians</Menu.Item>
					</NavLink>

					<Menu.Menu position="right" >
							<Menu.Item>
								<LogInForm 
									logInModal={ this.state.logInModal } 
									disableLogInForm={ this.disableLogInForm }
									processLoginForm={ this.props.processLoginForm }
							      	processNewUserForm={ this.props.processNewUserForm }
								/>
								{
									!this.props.currentUser 
										? <Button positive onClick={ this.enableLogInForm }>Log In</Button>
										: <React.Fragment>
											<Link to={`/musicians/${this.props.currentUser.id}`}><Button primary>View Profile</Button></Link>
											<Button negative onClick={ this.props.logOutUser }>Log Out</Button>
										</React.Fragment>
								}
							</Menu.Item>
					</Menu.Menu>
		      	</Menu>
			</React.Fragment>

		)
	}
}

export default (NavBar)


