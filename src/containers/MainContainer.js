import React from 'react'
import BandContainer from './BandContainer'
import MusicianContainer from './MusicianContainer'
import { Divider, Container } from 'semantic-ui-react'
import { Route, Switch } from 'react-router-dom'
import BandShow from '../components/BandShow'
import MusicianShow from '../components/MusicianShow'
import PageNotFound from '../components/PageNotFound'


class MainContainer extends React.Component {

	// refactor
	pushBand = (newBand) => {
		this.setState({
			bands: [...this.props.bands, newBand]
		})
	}

	render(){
		return(
			<Container>
				<React.Fragment>
					{ !this.props.isLoading ? 
						<Switch>
							
							<Route path='/bands/:id' exact render={ (routerProps) =>
								<BandShow 
									{...routerProps} 
									allBands={this.props.bands} 
									currentUser={this.props.currentUser}
								/> 
							} />
							
							<Route path='/bands' exact render={ (routerProps) => 
								<BandContainer 
									{...routerProps}
									bands={this.props.bands}
									pushBand={this.pushBand} 
									currentUser={this.props.currentUser}
								/>
							} />
							
							<Route path='/musicians/:id' exact render={ (routerProps) =>
								<MusicianShow 	
									{...routerProps}
									allMusicians={this.props.musicians} 
									currentUser={this.props.currentUser}
								/>
							} />
							
							<Route path='/musicians' exact render={ (routerProps) => 
								<MusicianContainer 
									{...routerProps}
									musicians={this.props.musicians} 
									currentUser={this.props.currentUser}
								/>
							} />
					    	
					    	<Route path='/' exact render={ (routerProps) => 
								<React.Fragment>
									<BandContainer  
										{...routerProps}
										bands={this.props.bands}
										currentUser={this.props.currentUser}
									/>
									<Divider />
									<MusicianContainer 
										{...routerProps}
										musicians={this.props.musicians}
										currentUser={this.props.currentUser}
									/>
								</React.Fragment>
							}/>
							
							<Route component={PageNotFound} />
						</Switch>
						: null
					}
				</React.Fragment>
			
			</Container>

		)
	}
}

export default MainContainer