import React from 'react'
import MUSIC_QUOTES from './music-quotes.js'
import { Modal, Image, Header, Form, Button } from 'semantic-ui-react'
// import { Redirect } from 'react-router-dom'


// const BANDS_URL = 'http://localhost:3000/bands'
const currentYear = (new Date().getFullYear())

class BandModal extends React.Component {
	state={
		modal_quote: MUSIC_QUOTES[Math.floor(Math.random() * MUSIC_QUOTES.length)],
		form_id: null,
		form_name: '',
    	form_region: '',
    	form_bio: '',
    	form_established: `${currentYear}`,
    	form_genre: '',
    	form_logo: '',
    	form_musician_id: null,
    	form_valid: false
	}
	
	componentDidMount() {
		// HANDLES musician_id FOR BOTH CREATE AND EDIT ACTIONS
		if (this.props.formData) {
			// console.log("formData", this.props.formData)
			this.setState({
				form_id: this.props.formData.id,
				form_name: this.props.formData.name,
		    	form_region: this.props.formData.region,
		    	form_bio: this.props.formData.bio,
		    	form_established: this.props.formData.established,
		    	form_genre: this.props.formData.genre,
		    	form_logo: this.props.formData.logo,
		    	form_musician_id: this.props.formData.musician_id,
		    	form_valid: false,
			})
		} else {
			if (this.props.currentUser) {
				this.setState({ form_musician_id: this.props.currentUser.id})
			}
		}
	}

	handleBandFormChanges = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleNewBandFormSubmit = () => {

		const fallbackLogo = 'https://www.alltop.com/viral/wp-content/uploads/2013/10/Fotolia_40337302_Subscription_XXL-500x353.jpg'

		const newBandFormData = {
			name: this.state.form_name,
		    bio: this.state.form_bio,
		    established: this.state.form_established,
		    region: this.state.form_region,
		    genre: this.state.form_genre,
		    logo: this.state.form_logo !== '' ? this.state.form_logo : fallbackLogo,
		    musician_id: this.state.form_musician_id
		}
		this.props.processNewBandForm(newBandFormData)
		console.log(newBandFormData)
		this.props.disableModal()
	}

	handleEditBandFormSubmit = () => {
		const fallbackLogo = 'https://www.alltop.com/viral/wp-content/uploads/2013/10/Fotolia_40337302_Subscription_XXL-500x353.jpg'

		const editBandFormData = {
			id: this.state.form_id,
			name: this.state.form_name,
		    bio: this.state.form_bio,
		    established: this.state.form_established,
		    region: this.state.form_region,
		    genre: this.state.form_genre,
		    logo: this.state.form_logo !== '' ? this.state.form_logo : fallbackLogo,
		    musician_id: this.state.form_musician_id
		}
		this.props.processEditBandForm(editBandFormData)
		console.log(editBandFormData)
		this.props.disableModal()
	}

	handleDeleteBand = () => {
		console.log(this.props.currentBand)
		this.props.processDeleteBand(this.props.currentBand)
		this.props.disableModal()
	}


	render(){
		return(
			<Modal 
				open={ this.props.showBandFormModal }
				closeOnEscape={ true }
	            closeOnDimmerClick={ true }
	            onClose={ () => this.props.disableModal() }
			 >
			    <Modal.Header>"{ this.state.modal_quote.quote }"
			    	<p><em><small>-{ this.state.modal_quote.author }</small></em></p>
			    </Modal.Header>
			    <Modal.Content image>
			      <Image wrapped size='medium' src={this.state.form_logo ? this.state.form_logo : 'https://picsum.photos/500'} />
			      <Modal.Description style={{width: "100%"}}>
			        <Header>Band Details</Header>
			      	<Form 
			      		onChange={ (event) => this.handleBandFormChanges(event) }
			      		onSubmit={ this.props.isNewBand ? this.handleNewBandFormSubmit : this.handleEditBandFormSubmit }
		      		>
				        <Form.Group widths='equal'>
				          <Form.Input fluid name="form_name" label='Band Name' placeholder='Delorean Ipsum'  value={ this.state.form_name }/>
				          <Form.Input fluid name="form_region" label='Region' placeholder='Scranton, PA'  value={ this.state.form_region }/>
				          <Form.Input fluid name="form_genre" label='Genre' placeholder='Goth Folk Metal' value={ this.state.form_genre }/>
				        </Form.Group>
				        { this.props.formData 
				        	? <Form.Input fluid name="form_established" label="Year Established" placeholder="1999" value={ this.state.form_established }/>
				        	: null
				        }
				        <Form.Input fluid name="form_logo" label='Profile Photo' placeholder='www.sweetprofilepics.com/yourband.jpg'  value={ this.state.form_logo }/>
		                <Form.TextArea name="form_bio" label='Bio' placeholder='Whats your story? Who are your influences? Make it interesting, potential members will see it!'  value={ this.state.form_bio }/>
			        <Form.Checkbox name="form_checkbox" label="Check boxes are fancy, don't you agree?" checked={false} />
			        <Form.Button floated="left" primary><span role="img" aria-label="rock-and-roll-horns">🤘🏼</span>{ this.props.formData ? "Submit Changes" : "Let's Rock!" }<span role="img" aria-label="rock-and-roll-horns"> 🤘🏼</span></Form.Button>
			        </Form>
			        {
			        	this.props.formData 
			        		? <Button 
			        			negative
			        			floated="right"
			        			onClick={ this.handleDeleteBand }>
			        		  Break Up Band
			        		</Button>
			        		: null
		        	}
			      </Modal.Description>
			    </Modal.Content>
	    	</Modal>
		)
	}
}

export default BandModal