import React from 'react'
import { Button } from 'semantic-ui-react'

class ProfileActions extends React.Component {
	render(){
		return(
			<Button>{this.props.currentUser ? "View Profile" : "Log In"}</Button>
		)
	}
}

export default ProfileActions