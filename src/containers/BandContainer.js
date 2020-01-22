import React from 'react'
import { Card, Header, Button } from 'semantic-ui-react'
import BandCard from '../components/BandCard'
import NewBandCard from '../components/NewBandCard'


class BandContainer extends React.Component {
	constructor(){
		super()
		this.state = {
			scrollStart: 0,
			displayedBands: 4,
			currentBands: [],
		}
	}

	scrollBands = (event) => {
		const adjustment = (event.target.name === "next" ? 0 : -8)
		const start = this.state.scrollStart + adjustment
		const end = start + this.state.displayedBands
		console.log('scrollBands', start, end)
		console.log(this.props.bands)
		this.setState({
			currentBands: [...this.orderedBands.slice(start, end)],
			scrollStart: end
		})
	}

	orderedBands = () => {
		return this.props.bands.sort((a,b) => (a.name > b.name) ? 1 : -1)
	}

	render(){

		return (
			<React.Fragment>
				<Header as='h1'>{this.props.match.url === '/' ? "Bands Seeking Musicians" : "Bands"}</Header>
				{this.props.match.url === '/' ?
				<React.Fragment>
					<Button 
						floated="left" 
						name="previous" 
						onClick={ this.scrollBands }
						>Previous
					</Button>
					<Button 
						floated="right" 
						name="next" 
						onClick={ this.scrollBands }
						>Next
					</Button> 	
				</React.Fragment>
				: null }
			
				<Card.Group itemsPerRow={4}>
						{ this.props.match.url === '/bands' ? 
							<NewBandCard 
								pushBand={this.props.pushBand} 
								currentUser={this.props.currentUser}
								processNewBandForm={ this.props.processNewBandForm }
							/> 
						: null }
						{ this.orderedBands().map(band => <BandCard {...band} key={band.id}/>) }
				</Card.Group>
			</React.Fragment>
		)
	}
}

export default BandContainer