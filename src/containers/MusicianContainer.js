import React from 'react'
import { Card, Header } from 'semantic-ui-react'
import MusicianCard from '../components/MusicianCard'

class MusicianContainer extends React.Component {
	render(){
		return (
			<React.Fragment>
				<Header as='h1'>Available Musicians</Header>
				<Card.Group itemsPerRow={4}>
					{this.props.musicians.slice(0,4).map(musician => <MusicianCard {...musician}/>)}
				</Card.Group>
			</React.Fragment>

		)
	}
}

export default MusicianContainer