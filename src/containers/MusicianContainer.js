import React from 'react'
import { Card, Header } from 'semantic-ui-react'
import MusicianCard from '../components/MusicianCard'

class MusicianContainer extends React.Component {

	orderedMusicians = () => {
		return this.props.musicians.sort((a, b) => (a.name > b.name) ? 1 : -1)
	}
	render(){
		return (
			<React.Fragment>
				<Header as='h1'>{this.props.match.url === '/' ? "Available Musicians" : "Musicians"}</Header>
				<Card.Group itemsPerRow={4}>
					{this.orderedMusicians().map(musician => <MusicianCard {...musician} key={musician.id} />)}
				</Card.Group>
			</React.Fragment>

		)
	}
}

export default MusicianContainer