import React from 'react'
import { Card, Image } from 'semantic-ui-react'
import BandModal from './BandModal'

const currentYear = (new Date().getFullYear())

class NewBandCard extends React.Component {
	state={
		modal: false,
	}

	// depreciated in favor of separate functions to prevent endless toggling on click
	// toggleModal = () => {
	// 	this.setState({
	// 		modal: !this.state.modal
	// 	})
	// }

	enableModal = () => {
		this.setState({
			modal: true,
		})
	}

	disableModal = () => {
		this.setState({
			modal: false
		})
	}

	render(){
		return(
			<Card color="green" onClick={() => this.enableModal() }>
				<Image src='https://snworksceo.imgix.net/dpn-34s/83398a6b-f1b7-4b51-8ee0-b42d16f28a10.sized-1000x1000.jpg?w=1000' alt="start-a-band" wrapped ui={false} />
			    <Card.Content>
			      <Card.Header>Start a Band</Card.Header>
			      <Card.Meta>Est. { currentYear }</Card.Meta>
			      <Card.Description>
			      	<p>Smalltown, USA</p>
					<BandModal
						visible={ this.state.modal }
						disableModal={ this.disableModal }
						formMethod="POST"
						afterFormSubmit={ (band) => this.props.pushBand(band) }/>
				  </Card.Description>
			    </Card.Content>
			</Card>
			
		)
	}
}

export default NewBandCard