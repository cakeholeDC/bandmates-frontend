import React from 'react'
import { Card, Header, Button } from 'semantic-ui-react'
import BandCard from '../components/BandCard'
import NewBandCard from '../components/NewBandCard'
import BandSearchBar from '../components/BandSearchBar'

class BandContainer extends React.Component {
	constructor(){
		super()
		this.state = {
			scrollStart: 0,
			currentBands: [],
			bandSearchTerm: '',

		}
	}
	
	orderedBands = () => {
		return this.props.bands.sort((a,b) => (a.name > b.name) ? 1 : -1)
	}

	slicedBands = () => {
		return [...this.orderedBands().slice(this.state.scrollStart, this.state.scrollStart + 4)]
	}


	scrollBands = (event) => {
		console.log(event.target.name)

		const adjust = event.target.name === "next" ? 4 : -4
		console.log("adjust", adjust)

		const scrollStart = this.state.scrollStart + adjust < this.props.bands.length && this.state.scrollStart + adjust > 0 ? (this.state.scrollStart + adjust) : 0
		console.log(scrollStart)

		this.setState({
			scrollStart: scrollStart,
		})
	}

	orderedBands = () => {
		return this.filteredBands().sort((a,b) => (a.name > b.name) ? 1 : -1)
	}


	filteredBands = () => {
		return this.props.bands.filter( band => band.name.toLowerCase().includes(this.state.bandSearchTerm.toLowerCase()))
	}

	onChange = ( event ) => {
		this.setState({
			bandSearchTerm: event.target.value
		})
	}

	render(){
		return (
			<React.Fragment>
				<Header className="main-header" as='h1'>{this.props.match.url === '/' ? "Bands Seeking Musicians" : "Bands"}</Header>
				{this.props.match.url === '/' ?
				<React.Fragment>
				
					<Button 
						secondary
						circular
						floated="left" 
						name="previous" 
						onClick={ this.scrollBands }
						><i className="arrow left icon"></i>
					</Button>
					<Button 
						secondary
						circular
						floated="right" 
						name="next" 
						onClick={ this.scrollBands }
						><i className="arrow right icon"></i>
					</Button> 	
				</React.Fragment>
				: <BandSearchBar
					onChange={this.onChange}
				/> }
			
				<Card.Group itemsPerRow={4}>
						{ this.props.match.url === '/bands' ? 
							<NewBandCard 
								pushBand={this.props.pushBand} 
								currentUser={this.props.currentUser}
								processNewBandForm={ this.props.processNewBandForm }
							/> 
						: null }
						{ this.props.match.url === '/' 
							? this.slicedBands().map(band => <BandCard {...band} key={band.id}/>)
							: this.orderedBands().map(band => <BandCard {...band} key={band.id}/>)
						}
				</Card.Group>
			</React.Fragment>
		)
	}
}

export default BandContainer