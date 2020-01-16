import React from 'react'
import { Card, Header, Button } from 'semantic-ui-react'
import BandCard from '../components/BandCard'

class BandContainer extends React.Component {
	constructor(){
		super()
		this.state = {
			scrollStart: 0,
			currentBands: []
		}
	}

	scrollBands = () => {
		const start = this.state.scrollStart
		const end = this.state.scrollStart + 4
		console.log('scrollBands', start, end)
		console.log(this.props.bands)
		this.setState({
			currentBands: [...this.props.bands.slice(start, end)],
			scrollStart: end
		})
	}

	render(){
		return (
			<React.Fragment>
				<Header as='h1'>Bands Seeking Musicians</Header>
				<Button onClick={ this.scrollBands }>Previous</Button>
				<Card.Group itemsPerRow={4} className="bandScroll">
					{ this.props.bands.map(band => <BandCard {...band}/>) }
				</Card.Group>
				<Button onClick={ this.scrollBands }>Next</Button>
			</React.Fragment>

		)
	}
}

export default BandContainer