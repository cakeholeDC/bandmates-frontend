import React from 'react'
import { Header, Image, Modal, Form, Card } from 'semantic-ui-react'
import musicQuotes from './music-quotes.js'
import { Redirect } from 'react-router-dom'


const BANDS_URL = 'http://localhost:3000/bands'
const currentYear = (new Date().getFullYear())

class BandForm extends React.Component {
	state={
		modal: false,
		modal_quote: musicQuotes[0],
		form_name: '',
	    form_region: '',
	    form_bio: '',
	    form_established: `${currentYear}`,
	    form_genre: '',
	    form_logo: null,
	    form_musician_id: `${Math.floor(Math.random() * 14)}`,
	    form_valid: false
	}

	// depreciated to separate functions to prevent endless toggling on click
	toggleModal = () => {
		// console.log('toggling')
		this.setState({
			modal: !this.state.modal
		})
	}

	componentDidMount() {
		const randomQuote = this.getMusicQuote()
		this.setState({
			modal_quote: randomQuote
		})
	}


	enableModal = () => {
		// console.log('enabling')
		this.setState({
			modal: true,
		})
	}

	disableModal = () => {
		// console.log('disabling')
		this.setState({
			modal: false
		})
	}

	handleBandFormChanges = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	bandFormSubmit = () => {
		console.log("submitting form")

		const bandConfig = {
			method: "POST",
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

		fetch(BANDS_URL, bandConfig)
			.then(response => {
				if (response.ok) {
					return response.json()
				}
			})
			.then(band => {
				console.log(band)
				this.disableModal()
				this.props.pushBand(band)
				return <Redirect to={`/bands/${band.id}`} />
			})
			.catch(error => console.log(error.message))

	}

	getMusicQuote = () => {
		return musicQuotes[Math.floor(Math.random() * musicQuotes.length)]
	}

	render(){
		return(
			<Card onClick={() => this.enableModal()}>
				<Image src='https://snworksceo.imgix.net/dpn-34s/83398a6b-f1b7-4b51-8ee0-b42d16f28a10.sized-1000x1000.jpg?w=1000' alt="start-a-band" wrapped ui={false} />
			    <Card.Content>
			      <Card.Header>Start a Band</Card.Header>
			      <Card.Meta>Est. { currentYear }</Card.Meta>
			      <Card.Description>
			      	<p>Smalltown, USA</p>
					<Modal 
						open={this.state.modal}
						closeOnEscape={true}
			            closeOnDimmerClick={true}
			            onClose={ () => this.disableModal() }
					 >
					    <Modal.Header>"{ this.state.modal_quote.quote }"
					    	<p><em><small>-{ this.state.modal_quote.author }</small></em></p>
					    </Modal.Header>
					    <Modal.Content image>
					      <Image wrapped size='medium' src={this.state.logo ? this.state.logo : 'https://picsum.photos/500'} />
					      <Modal.Description style={{width: "100%"}}>
					        <Header>How about some details?</Header>
					      	<Form 
					      		onChange={(event) => this.handleBandFormChanges(event) }
					      		onSubmit={ this.bandFormSubmit }
				      		>
						        <Form.Group widths='equal'>
						          <Form.Input fluid name="form_name" label='Band Name' placeholder='Delorean Ipsum'  value={ this.state.form_name }/>
						          <Form.Input fluid name="form_region" label='Region' placeholder='Scranton, PA'  value={ this.state.form_region }/>
						          <Form.Input fluid name="form_genre" label='Genre' placeholder='Goth Folk Metal' value={ this.state.form_genre }/>
						        </Form.Group>
						        <Form.Input fluid name="form_logo" label='Profile Photo' placeholder='www.sweetprofilepics.com/yourband.jpg'  value={ this.state.form_logo }/>
				                <Form.TextArea name="form_bio" label='Bio' placeholder='Whats your story? Who are your influences? Make it interesting, potential members will see it!'  value={ this.state.form_bio }/>
					        <Form.Checkbox name="form_checkbox" label="Check boxes are fancy, don't you agree?"  />
					        <Form.Button primary><span role="img" aria-label="rock-and-roll-horns">🤘🏼</span>Let's Rock!<span role="img" aria-label="rock-and-roll-horns">🤘🏼</span></Form.Button>
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