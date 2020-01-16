import React from 'react'
import BandContainer from './BandContainer'
import MusicianContainer from './MusicianContainer'
import { Divider, Container } from 'semantic-ui-react'

const BANDS_URL = 'http://localhost:3000/bands'
const MUSICIANS_URL = 'http://localhost:3000/musicians'

class MainContainer extends React.Component {
	state = {
		bands: [],
		musicians: []
	}

	componentDidMount(){
		fetch(BANDS_URL)
			.then(res => res.json())
			.then(bands => this.setState({ bands }))

		fetch(MUSICIANS_URL)
			.then(res => res.json())
			.then(musicians  => this.setState({ musicians  }))
	}
	render(){
		return(
			<Container>
				<BandContainer bands={this.state.bands}/>
				<Divider />
				<MusicianContainer musicians={this.state.musicians}/>
			</Container>

		)
	}
}

export default MainContainer