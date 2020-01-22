import React from 'react'
import { Card, Header, Button } from 'semantic-ui-react'
import MusicianCard from '../components/MusicianCard'

class MusicianContainer extends React.Component {
	state = {
			scrollStart: 0,
		}

	orderedMusicians = () => {
		return this.props.musicians.sort((a, b) => (a.username > b.username) ? 1 : -1)
	}

	slicedMusicians = () => {
		return [...this.orderedMusicians().slice(this.state.scrollStart, this.state.scrollStart + 4)]
	}

	scrollMusicians = (event) => {
		console.log(event.target.name)

		const adjust = event.target.name === "next" ? 4 : -4
		console.log("adjust", adjust)

		const scrollStart = this.state.scrollStart + adjust < this.props.musicians.length  && this.state.scrollStart + adjust > 0 ? (this.state.scrollStart + adjust) : 0
		console.log(scrollStart)

		this.setState({
			scrollStart: scrollStart,
		})
	}
	
	render(){
		return (
			<React.Fragment>
				<Header as='h1'>{this.props.match.url === '/' ? "Available Musicians" : "Musicians"}</Header>
				{this.props.match.url === '/' ?
				<React.Fragment>
					<Button 
						secondary
						circular
						floated="left" 
						name="previous" 
						onClick={ this.scrollMusicians }
						><i className="arrow left icon"></i>
					</Button>
					<Button 
						secondary
						circular
						floated="right" 
						name="next" 
						onClick={ this.scrollMusicians }
						><i className="arrow right icon"></i>
					</Button> 	
				</React.Fragment>
				: null }
				<Card.Group itemsPerRow={4}>
					{ this.props.match.url === '/' 
						? this.slicedMusicians().map(musician => <MusicianCard {...musician} key={musician.id} />)
						: this.orderedMusicians().map(musician => <MusicianCard {...musician} key={musician.id} />) 
					}
				</Card.Group>
			</React.Fragment>

		)
	}
}

export default MusicianContainer