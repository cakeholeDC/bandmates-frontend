import React from 'react'
import MUSIC_QUOTES from './music-quotes.js'
import { Modal, Image, Header, Form, Button } from 'semantic-ui-react'

class NewMemberForm extends React.Component {
	state={
		modal_quote: MUSIC_QUOTES[Math.floor(Math.random() * MUSIC_QUOTES.length)],
		showModal: false,
		instrument: '',
		band_id: null
	}

	handleMemberFormChanges = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	submitMemberForm = () => {
		const formData = {
			instrument: this.state.instrument,
			band_id: this.props.currentBand.id
		}

		this.props.processNewMemberForm(formData)
		this.setState({ showModal: false })
	}

	render(){
		return(
			<React.Fragment>
				<Button 
	        		size="large" 
	        		floated="right"
	        		onClick={ () => this.setState({ showModal: true}) }
	    		>
	    			Add Slot
				</Button>
				<Modal 
					open={ this.state.showModal }
					closeOnEscape={ true }
		            closeOnDimmerClick={ true }
		            onClose={ () => this.setState({ showModal: false}) }
				 >
				 	<Modal.Header>"{ this.state.modal_quote.quote }"
				    	<p><em><small>-{ this.state.modal_quote.author }</small></em></p>
				    </Modal.Header>
				    <Modal.Content image>
				    	<Image wrapped size='medium' src={this.props.currentBand.logo ? this.props.currentBand.logo : 'https://picsum.photos/500'} />
				    	<Modal.Description style={{width: "100%"}}>
				        <Header>Adding to <em>{this.props.currentBand.name}</em>:</Header>
				        <Form 
				      		onChange={ (event) => this.handleMemberFormChanges(event) }
				      		onSubmit={ this.submitMemberForm }
			      		>
			      			<Form.Input fluid name="instrument" label='Position' placeholder='Electric Triangle'  value={ this.state.instrument }/>
			      			<Form.Checkbox name="form_checkbox" label="I've built this city on Rock & Roll" checked={false} />
					        <Form.Button primary>Add Slot</Form.Button>
				        	
				        </Form>
				        </Modal.Description>
				    </Modal.Content>
				</Modal>
			</React.Fragment>
		)
	}
}

export default NewMemberForm