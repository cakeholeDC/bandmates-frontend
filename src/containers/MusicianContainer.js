import React from 'react'
import { Card, Header } from 'semantic-ui-react'
import MusicianCard from '../components/MusicianCard'
import { Link } from 'react-router-dom'

class MusicianContainer extends React.Component {
	render(){
		return (
			<React.Fragment>
				<Header as='h1'>{this.props.match.url === '/' ? "Available Musicians" : "Musicians"}</Header>
				<Card.Group itemsPerRow={4}>
					{this.props.musicians.slice(0,4).map(musician => <Link to={`/musicians/${musician.id}`}> <MusicianCard {...musician} key={musician.id} /> </Link>)}
				</Card.Group>
			</React.Fragment>

		)
	}
}

export default MusicianContainer