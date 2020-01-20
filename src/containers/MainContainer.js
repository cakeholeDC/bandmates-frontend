import React from 'react'
import BandContainer from './BandContainer'
import MusicianContainer from './MusicianContainer'
import { Divider, Container } from 'semantic-ui-react'
import { Route } from 'react-router-dom'
import BandShow from '../components/BandShow'
import MusicianShow from '../components/MusicianShow'
// import PageNotFound from '../components/PageNotFound'



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
			.then(musicians  => this.setState({ musicians }))
	}

	pushBand = (newBand) => {
		this.setState({
			bands: [...this.state.bands, newBand]
		})
	}

	render(){
		return(
			<Container>
				<Route path='/' exact render={ (routerProps) => 
				<React.Fragment>
					<BandContainer  
						{...routerProps} bands={this.state.bands}
					/>
					<Divider />
					<MusicianContainer 
						{...routerProps} musicians={this.state.musicians}
					/>
				</React.Fragment>
				}/>
				
				
				<Route path='/bands' exact render={ (routerProps) => 
					<BandContainer 
						{...routerProps} bands={this.state.bands} pushBand={this.pushBand} 
					/>
				} />
				
				<Route path='/bands/:id' exact render={ (routerProps) =>
					<BandShow 
						{...routerProps} allBands={this.state.bands} 
					/> 
				} />


				<Route path='/musicians' exact render={ (routerProps) => 
					<MusicianContainer 
						{...routerProps} musicians={this.state.musicians} 
					/>
				} />
				
				<Route path='/musicians/:id' exact render={ (routerProps) =>
					<MusicianShow 	
						{...routerProps} allMusicians={this.state.musicians} 
					/>
				} />
				{/*<Route path="/:any" component={PageNotFound} /> */}

			</Container>

		)
	}
}

export default MainContainer