import React from 'react'
import MUSIC_QUOTES from './music-quotes.js'
import { Modal, Image, Header, Form, Button } from 'semantic-ui-react'
// import { Redirect } from 'react-router-dom'


const BANDS_URL = 'http://localhost:3000/bands'
const currentYear = (new Date().getFullYear())

class BandModal extends React.Component {
	state={
		modal_quote: MUSIC_QUOTES[Math.floor(Math.random() * MUSIC_QUOTES.length)],
		form_name: '',
    	form_region: '',
    	form_bio: '',
    	form_established: `${currentYear}`,
    	form_genre: '',
    	form_logo: null,
    	form_musician_id: `${Math.floor(Math.random() * 14)}`,
    	form_valid: false
	}
	
	componentDidMount() {
		// needs props of 
		// visible: boolean
		// disableModal: callback
		// formData: {[BAND]object} // is current band for controlledForm
		if (this.props.formData) {
			console.log("formData", this.props.formData)
			this.setState({
				form_name: this.props.formData.name,
		    	form_region: this.props.formData.region,
		    	form_bio: this.props.formData.bio,
		    	form_established: this.props.formData.established,
		    	form_genre: this.props.formData.genre,
		    	form_logo: this.props.formData.logo,
		    	form_musician_id: this.props.formData.musician_id,
		    	form_valid: false
			})
		}
	}

	handleBandFormChanges = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	bandFormSubmit = (method="GET") => {
		console.log("submitting form", method, this.props.formData)
		let band_id = method === "PATCH" ? this.props.formData.id : null

		const bandConfig = {
			method: `${method}`,
			headers: {
				'Content-Type': 'application/json',
				'Accepts': 'application/json'
			},
			body: JSON.stringify({
				name: this.state.form_name,
			    bio: this.state.form_bio,
			    established: this.state.form_established,
			    region: this.state.form_region,
			    genre: this.state.form_genre,
			    logo: this.state.form_logo,
			    musician_id: this.state.form_musician_id
			})
		}

		const suffix = band_id ? `/${band_id}` : ''

		fetch(`${BANDS_URL}${suffix}`, bandConfig)
			.then(response => {
				if (response.ok) {
					return response.json()
				}
			})
			.then(band => {
				console.log(band)
				this.props.afterFormSubmit(band)
				this.props.disableModal()
				// return <Redirect to={`/bands/${band.id}`} />
			})
			.catch(error => console.log(error.message))

	}

	render(){
		return(
			<Modal 
				open={ this.props.visible }
				closeOnEscape={true}
	            closeOnDimmerClick={true}
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
			      		onChange={(event) => this.handleBandFormChanges(event) }
			      		onSubmit={ () => this.bandFormSubmit(this.props.formMethod) }
		      		>
				        <Form.Group widths='equal'>
				          <Form.Input fluid name="form_name" label='Band Name' placeholder='Delorean Ipsum'  value={ this.state.form_name }/>
				          <Form.Input fluid name="form_region" label='Region' placeholder='Scranton, PA'  value={ this.state.form_region }/>
				          <Form.Input fluid name="form_genre" label='Genre' placeholder='Goth Folk Metal' value={ this.state.form_genre }/>
				        </Form.Group>
				        <Form.Input fluid name="form_logo" label='Profile Photo' placeholder='www.sweetprofilepics.com/yourband.jpg'  value={ this.state.form_logo }/>
		                <Form.TextArea name="form_bio" label='Bio' placeholder='Whats your story? Who are your influences? Make it interesting, potential members will see it!'  value={ this.state.form_bio }/>
			        <Form.Checkbox name="form_checkbox" label="Check boxes are fancy, don't you agree?"  />
			        <Form.Button floated="left" primary><span role="img" aria-label="rock-and-roll-horns">🤘🏼</span>{ this.props.formData ? "Submit Changes" : "Let's Rock!" }<span role="img" aria-label="rock-and-roll-horns"> 🤘🏼</span></Form.Button>
			        {
			        	this.props.formData 
			        		? <Button 
			        			negative
			        			floated="right"
			        			onClick={() => alert("you can't do that yet... sorry 🤷‍♂️")}>
			        		  Break Up Band
			        		</Button>
			        		: null
		        	}
			        </Form>
			      </Modal.Description>
			    </Modal.Content>
	    	</Modal>
		)
	}
}

export default BandModal