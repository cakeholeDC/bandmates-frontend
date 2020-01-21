import React from 'react'
import { Header, Image, Modal, Form, Card } from 'semantic-ui-react'
import musicQuotes from './music-quotes.js'
import { Redirect } from 'react-router-dom'

class MemberForm extends React.Component {
	render(){
		return(
			<Modal 
				open={this.props.modal}
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
		)
	}

export default MemberForm