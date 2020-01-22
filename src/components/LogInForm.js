import React from 'react'
import { Modal, Image, Header, Form, Button } from 'semantic-ui-react'
import MUSIC_QUOTES from './music-quotes.js'

class LogInForm extends React.Component {
	state={
		modal_quote: MUSIC_QUOTES[Math.floor(Math.random() * MUSIC_QUOTES.length)],
		newAccount: false,
		username: '',
		password: '',
		name: '',
		region: '',
		playing_since: '',
		birthdate: '',
		img: '',
		bio: ''
	}

	testFuncton = (event) => {
		console.log("click")
	}

	handleFormChanges = (event) => {
		console.log("form changed")
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	processUserForm = (event) => {
		event.preventDefault()
		console.log('LoginForm.js => processUserForm(event)', "event=>", event)

		let userFormData
		if (this.state.newAccount){
			//process new user
			 userFormData = {
				username: this.state.username,
				password: this.state.password,
				name: this.state.name,
				region: this.state.region,
				playing_since: this.state.playing_since,
				birthdate: this.state.birthdate,
				img: this.state.img,
				bio: this.state.bio
			}
			this.props.processNewUserForm(userFormData)
		} else {
			 userFormData = {
				username: this.state.username,
				password: this.state.password
			}
			this.props.processLoginForm(userFormData)
		}
		this.props.disableLogInForm()
	}

	render(){
		return(
			<Modal 
				open={ this.props.logInModal }
				closeOnEscape={true}
	            closeOnDimmerClick={true}
	            onClose={ () => this.props.disableModal() }
			 >
			    <Modal.Header>"{ this.state.modal_quote.quote }"
			    	<p><em><small>-{ this.state.modal_quote.author }</small></em></p>
			    </Modal.Header>
			    <Modal.Content image>
			      <Image wrapped size='medium' src={'https://picsum.photos/500'} />
			      <Modal.Description style={{width: "100%"}}>
			        <Header>Profile Details</Header>
					<Form
						onChange={ (event) => this.handleFormChanges(event) }
					>
						<Form.Group widths='equal'>
							<Form.Input 
								fluid 
								name="username" 
								label="Username"
								placeholder="Notorious BIG"
							/>
							<Form.Input 
								fluid 
								type="password"
								name="password" 
								label="Password"
								placeholder="password 123"
							/>
						</Form.Group>
						{ this.state.newAccount 
							? <React.Fragment>
								<Form.Group widths='equal'>
									<Form.Input 
										fluid 
										name="name" 
										label="Full Name"
										placeholder="Christopher Wallace"
									/>
									<Form.Input 
										fluid 
										name="region" 
										label="region"
										placeholder="Washington, DC"
									/>
								</Form.Group>
								<Form.Group widths='equal'>
									<Form.Input 
										fluid 
										name="birthdate" 
										label="Birthdate"
										placeholder="Jan 20, 1999"
									/>
									<Form.Input 
										fluid 
										name="playing_since" 
										label="Playing Since"
										placeholder="1999"
									/>
								</Form.Group>
								<Form.Input 
									fluid 
									name="img" 
									label="Profile Image"
									placeholder="www.sweetpics.com/yourimage.jpg"
								/>
								<Form.TextArea
									name="bio"
									label='Bio'
									placeholder='Whats your story? Who are your influences? Make it interesting, potential members will see it!'
								/>
							</React.Fragment>
							: null
						}
						{
							this.state.newAccount
							? <React.Fragment> 
								<Button type="submit" floated="right" onClick={ this.processUserForm } primary >Sign Up</Button>
								<Button type="submit" floated="left" onClick={ () => this.setState({ newAccount: !this.state.newAccount }) } negative >Cancel</Button>
							</React.Fragment>
							: <Button.Group floated="right">
							    <Button type="submit" onClick={ this.processUserForm } primary >
							    	<span role="img" aria-label="rock-and-roll-horns">🤘🏼</span>
							    		Let's Rock!
						    		<span role="img" aria-label="rock-and-roll-horns"> 🤘🏼</span>
							    </Button>
							    <Button.Or />
							    <Button onClick={() => this.setState({ newAccount: !this.state.newAccount }) }>Sign up</Button>
						    </Button.Group>
						}
						
					</Form>
			</Modal.Description>
			    </Modal.Content>
	    	</Modal>
		)
	}
}

						// <input type="submit" className="ui button primary floated right" >Log In</input>
export default LogInForm
			// <div>or</div>
			// 