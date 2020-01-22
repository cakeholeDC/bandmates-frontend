import React from 'react'
import BandContainer from './BandContainer'
import MusicianContainer from './MusicianContainer'
import { Divider, Container } from 'semantic-ui-react'
import { Route, Switch } from 'react-router-dom'
import BandShow from '../components/BandShow'
import MusicianShow from '../components/MusicianShow'
import PageNotFound from '../components/PageNotFound'


class MainContainer extends React.Component {

	render(){
		return(
			<Container>
				<React.Fragment>
					{ !this.props.isLoading ? 
						<Switch>
							
							<Route path='/bands/:id' exact render={ (routerProps) =>
								<BandShow 
									{...routerProps}
									processEditBandForm={ this.props.processEditBandForm } 
									processDeleteBand={ this.props.processDeleteBand }
									allBands={this.props.bands} 
									currentUser={this.props.currentUser}
									currentBand={this.props.currentBand}
									setCurrentBand={ this.props.setCurrentBand }
									processNewMemberForm={ this.props.processNewMemberForm }
									processNewBandForm={ this.props.processNewBandForm }
									//not using yet.....
								/> 
							} />
							
							<Route path='/bands' exact render={ (routerProps) => 
								<BandContainer 
									{...routerProps}
									bands={this.props.bands}
									processNewBandForm={ this.props.processNewBandForm }
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
										processNewBandForm={ this.props.processNewBandForm }
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