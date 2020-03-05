import React from 'react'
import { Card, Header, Button } from 'semantic-ui-react'
import MusicianCard from '../components/MusicianCard'
import SearchBar from '../components/SearchBar'

class MusicianContainer extends React.Component {
	constructor() {
		super()
		this.state = {
			scrollStart: 0,
			musicianSearchTerm: '',
		}
	}

	filteredMusicians = () => {
		return this.props.musicians.filter( musician => musician.username.toLowerCase().includes(this.state.musicianSearchTerm.toLowerCase()))
	}

	orderedMusicians = () => {
		return this.filteredMusicians().sort((a,b) => (a.name > b.name) ? 1 : -1)
	}

	onChange = ( event ) => {
		this.setState({
			musicianSearchTerm: event.target.value
		})
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
				<Header className="main-header" as='h1'>{this.props.match.url === '/' ? "Available Musicians" : "Musicians"}</Header>
				{this.props.match.url === '/' ?
				<React.Fragment>
					{/*<Button 
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
					</Button> */}	
				</React.Fragment>
				: <SearchBar
					onChange={this.onChange}
				/>  }
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