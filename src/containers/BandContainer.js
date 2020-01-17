import React from 'react'
import { Card, Header, Button } from 'semantic-ui-react'
import BandCard from '../components/BandCard'
import { Link } from 'react-router-dom'

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
			
				<Card.Group itemsPerRow={4} className="bandScroll">
					{ this.props.bands.map(band => <Link to={`/bands/${band.id}`}> <BandCard {...band} key={band.id}/> </Link>) }
				</Card.Group>
			</React.Fragment>
		)
	}
}

export default BandContainer