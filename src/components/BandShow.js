import React from 'react'
import { Grid, Segment, Image, Header, Card, Button, Divider } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import BandModal from './BandModal'
import NewMemberForm from './NewMemberForm'
import PageNotFound from './PageNotFound'


// const currentYear = (new Date().getFullYear())
const MEMBERS_URL = 'http://localhost:3000/band_memberships'
// const BANDS_URL = 'http://localhost:3000/bands'




class BandShow extends React.Component {
	constructor(props){
		super(props)
		console.log(this.props)
		this.state={
			loading: true,
			memberList: [],
			currentBand: this.props.currentBand,
			showBandFormModal: false,
			memberModal: false
		}
	}

	componentDidMount(){
		//set current band by fetching => performs better when sent directly to the band page.
		// const id = this.props.match.params.id

		// fetch(`${BANDS_URL}/${id}`)
		// 	.then(res => {
		// 		if (res.ok) {
		// 			return res.json()
		// 		}
		// 	})
		// 	.then(band => {
		// 		console.log("currentBand", band);				
		// 		console.log("bandLeader", band.band_leader);				
		// 		console.log("members", band.band_memberships);				
		// 		this.setState({
		// 			currentBand: band,
		// 			memberList: band.band_memberships,
		// 			loading: false
		// 		});
		// 		this.props.setCurrentBand(band)
		// 	})
	}


	handleDropMemberClick = (member) => {
		const memberConfig = {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				"Accepts": "application/json"
			},
			body: JSON.stringify({
				musician_id: null
			})
		}
		fetch(`${MEMBERS_URL}/${member.id}`, memberConfig)
			.then(res => {
				if (res.ok) {
					return res.json()
				}
			})
			.then(updatedBand => {
				this.setState({
						currentBand: updatedBand,
						memberList: updatedBand.band_memberships
				})
			})
			.catch(error => console.warn(error.message))
	}

	getBandOpenings = () => {
		const openings = this.props.currentBand.band_memberships.filter(lineup => !lineup.musician).length
		if (openings > 0) {
			return `${openings} current opening${openings > 1 ? "s" : ''}!`
		} else {
			return ""
		}
	}


	sortMembers = () => {
		// sort with empty slots at the end. (musician === undefined) = true when slot is open
		// return this.state.memberList.sort((a,b) => (a.musician !== undefined) < (b.musician !== undefined ) ? 1 : -1 )

		//OR

		// sort by instrument
		return this.props.currentBand.band_memberships.sort((a,b) => (a.instrument.name > b.instrument.name) ? 1 : -1 )
	}

	enableModal = () => {
		this.setState({
			showBandFormModal: true,
		})
	}

	disableModal = () => {
		this.setState({
			showBandFormModal: false
		})
	}

  
    render() {
    	// let { logo, name, established, region, bio, band_leader } = this.props.currentBand
        return (
            <React.Fragment>
            { this.props.currentBand ?
            	<React.Fragment>
		            <Header as="h1">{this.props.currentBand.name}</Header>
		        	<Grid columns={2} divided>
		                <Grid.Row stretched>
		                    <Grid.Column>
		                        <Segment>
		                            <Image  wrapped size='medium' src={this.props.currentBand.logo} alt={this.props.currentBand.name} />
		                        </Segment>
					            { 
					            	this.props.currentUser && this.props.currentBand.band_leader.id === this.props.currentUser.id 
					            		? <Button 
					            			id="edit-band-btn"
					            			negative
					            			onClick={ () => this.enableModal() }
				            			  >
				            				Edit Band
			            				</Button> 
					            		: null
				            	}
				            	{ this.props.currentUser && this.props.currentBand.band_leader.id === this.props.currentUser.id 
					            	? <NewMemberForm 
					            		currentBand={ this.props.currentBand }
					            		processNewMemberForm={ this.props.processNewMemberForm }
					            		/> 
					            	: null
					            }
		                    </Grid.Column>
		                    <Grid.Column>
		                        <Segment textAlign='left'>
		                            <Header as="h3">{this.props.currentBand.name} was founded in {this.props.currentBand.established} in {this.props.currentBand.region} by {<Link to={`/musicians/${this.props.currentBand.band_leader.id}`}>{this.props.currentBand.band_leader.name}</Link>}</Header>
		                            <p>Genre: {this.props.currentBand.genre}</p>
		                            <p>{this.props.currentBand.bio}</p>
		                            <p><strong>{this.getBandOpenings()}</strong></p>
		                            <BandModal 
		                            	processEditBandForm={ this.props.processEditBandForm }
		                            	processNewBandForm={ this.props.processNewBandForm }
		                            	processDeleteBand={ this.props.processDeleteBand }
		                            	currentUser={ this.props.currentUser }
		                            	currentBand={ this.props.currentBand }
		                            	showBandFormModal={ this.state.showBandFormModal }
		                            	disableModal={ this.disableModal }
		                            	isNewBand={ false }
		                            	formData={ this.props.currentBand }

		                            	afterFormSubmit={ (band) => this.setState({ currentBand: (band)}) }/>
		                        </Segment>
		                    </Grid.Column>
		                </Grid.Row>
		            </Grid>
				    <Divider />
		            
		            <Header as="h1">Lineup:</Header>
				    <Divider />
	                <Card.Group itemsPerRow={3} stackable>
	                	{this.sortMembers().map(member => {
	                		return (
	                			<Card key={member.id}>
	                				<Card.Content>
										<Card.Header as='h1'>{member.instrument.name}</Card.Header>
										<Divider />
	                				</Card.Content>
	                				<Image wrapped ui={false} src={member.musician ? member.musician.img : 'http://ahfirstaid.org/wp-content/uploads/2014/07/avatar-placeholder.png' } />
									<Card.Content>
										<Card.Header as='h1'>{ member.musician ? member.musician.username : "This could be YOU!"}</Card.Header>
										<Card.Meta >{ member.musician ? member.musician.region : null }</Card.Meta>
										<Card.Description>
											{ member.musician 
												? <React.Fragment>
													<p>Real Name: {member.musician.name}</p>
													<p>Playing Since: {member.musician.playing_since}</p>
												</React.Fragment>
												: null 
											}
										</Card.Description>
									</Card.Content>
									<Card.Content extra>
										{/* band leader admin actions*/}
										{ this.props.currentUser && this.props.currentBand.band_leader.id === this.props.currentUser.id 

											/* if the slot is filled, and the member is not the band leader
											// add drop musician button */
											? member.musician && member.musician.id !== this.props.currentBand.band_leader.id 
												? <Button 
													negative
													onClick={() => this.handleDropMemberClick(member) }
												>
													Drop {member.musician.username}
												</Button> 
												: null
											: null }

										{/* Join or View actions */}
										{ 
											!member.musician
												? <Button 
													positive 
													onClick={() => this.props.handleOnJoinBand(member)}
													>
													Join Band
												</Button> 
												: <Link to={`/musicians/${member.musician.id}`}><Button primary >View Profile</Button></Link> 
										}
										{
											member.musician 
												? (this.props.currentUser && member.musician.id === this.props.currentUser.id ? <Button negative onClick={ () => this.props.handleLeaveBand(member) }>Leave Band</Button> : null)
												: null
										}
										{/* ATTEMPT AT LEAVE BAND BUTTON FOR CURRENT USER
											member.id === this.props.currentUser.id
												? <Button negative onClick={ () => this.handleDropMemberClick(member) }>Leave Band</Button> 
												: console.log("leaveBand=>",member.musician, this.props.currentUser.id)
										*/}
									</Card.Content>
		                		</Card>
	                		)
	                	})}
	                </Card.Group>
                </React.Fragment>
                : `${ this.state.loading ? `Sorry, we're a little slow processing all of this awesomeness...` : <PageNotFound /> }`
            }
            </React.Fragment>


        )
    }
}

export default BandShow