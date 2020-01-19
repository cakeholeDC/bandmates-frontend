import React from 'react'
import { Button, Header, Image, Modal, Form, Select, Input, Card } from 'semantic-ui-react'

const currentYear = (new Date().getFullYear())

class BandForm extends React.Component {
	state={
		modal: false,
		bandForm: {
			name: '',
		    region: '',
		    bio: '',
		    established: "currentYear",
		    genre: '',
		    logo: null,
		    musician_id: 1
		}
	}

	toggleModal = () => {
		this.setState({
			modal: !this.state.modal
		})
	}

	render(){
		console.log(currentYear)
		return(
			<Card onClick={() => this.toggleModal()}>
				<Image src='https://picsum.photos/500' wrapped ui={false} />
			    <Card.Content>
			      <Card.Header>Start a Band!</Card.Header>
			      <Card.Meta>Established Today</Card.Meta>
			      <Card.Description>Smalltown, USA
					<Modal open={this.state.modal} >
					    <Modal.Header>Let's Jam!</Modal.Header>
					    <Modal.Content image>
					      <Image wrapped size='medium' src={this.state.logo ? this.state.logo : 'https://picsum.photos/500'} />
					      <Modal.Description>
					        <Header>First Fill this out:</Header>
					      	<Form>
						        <Form.Group widths='equal'>
						          <Form.Input fluid label='Band Name' placeholder='Delorean Ipsum' />
						          <Form.Input fluid label='Region' placeholder='Scranton, PA' />
						          <Form.Select
						            fluid
						            label='Genre'
						            options={"option1", "option2"}
						            placeholder='Goth Folk Metal'
						          />
						        </Form.Group>
						        <Form.Input fluid label='Logo' placeholder='www.sicklogos.com/yourband.jpg' />
				                <Form.TextArea label='Bio' placeholder='Whats your story? Who are your influences? Make it interesting, potential members will see it!' />
					        <p>
					          We've found the following gravatar image associated with your e-mail
					          address.
					        </p>
					        <p>
				                <Form.Checkbox label='I agree to the Terms and Conditions' />
			                </p>
						        <Form.Button>Submit</Form.Button>
					        </Form>
					      </Modal.Description>
					    </Modal.Content>
			    	</Modal>
			    </Card.Description>
			    </Card.Content>
			</Card>
			
		)
	}
}

export default BandForm