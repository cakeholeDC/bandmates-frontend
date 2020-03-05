import React from 'react'
import { Grid, Segment, Image, Header, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import PageNotFound from './PageNotFound'
import { withRouter } from 'react-router-dom'



const currentYear = (new Date().getFullYear())

let BASE_URL = 'https://bandmates-app-api.herokuapp.com'
// FOR DEVELOPMENT
BASE_URL = 'http://localhost:3000'
const MUSICIANS_URL = `${BASE_URL}/musicians`

class MusicianShow extends React.Component {
    state={
        currentMusician: null,
        loading: true
    }

    componentDidMount() {
        const musicianID = this.props.match.params.id
        fetch(`${MUSICIANS_URL}/${musicianID}`)
            .then(res => res.json())
            .then(musician => {
                this.setState({
                    currentMusician: musician,
                    loading: !this.state.loading
                })
            })
    }

    render() {
        return (
            <React.Fragment>
            { this.state.currentMusician ?
                <Grid columns={2} divided>
                    <Grid.Row stretched>
                        <Grid.Column>
                            <Segment>
                                <Image src={this.state.currentMusician.img} alt={this.state.currentMusician.name} />
                                <Header as='h1'>Stage Name: {this.state.currentMusician.username}</Header>
                            { this.props.currentUser && this.props.currentUser.id === this.state.currentMusician.id 
                                ? <React.Fragment>
                                    <Button id="edit-profile-btn" positive>Edit Profile</Button>
                                    <Button 
                                        negative
                                        onClick={ () => this.props.deleteMusician(this.props.currentUser.id)}    
                                        >Delete Profile
                                    </Button>
                                    </React.Fragment>
                                : null
                            }
                            </Segment>
                            <Segment>
                                <p>Age: {currentYear - (new Date(this.state.currentMusician.birthdate).getFullYear() ) }</p>
                                <p>Playing Since: {this.state.currentMusician.playing_since}</p>
                                <p>Region: {this.state.currentMusician.region}</p>
                          
                            </Segment>
                            
                        </Grid.Column>

                        <Grid.Column>
                            <Segment>
                                <Header as='h1'>{this.state.currentMusician.name}</Header>
                                
                                <ul className="unstyled-list"><h3>Instruments</h3>
                                    {this.state.currentMusician.instruments_played.map( instrument => <li key={Math.floor(Math.random() * 100000)}> {instrument.name} </li>)}
                                </ul>
                                <ul className="unstyled-list"><h3>Associated Bands</h3>
                                    {this.state.currentMusician.associated_bands.map( band => <li key={Math.floor(Math.random() * 100000)}><Link to={`/bands/${band.id}`}>{band.name}</Link></li> )}
                                </ul>
                                <ul className="unstyled-list"><h3>Managed Bands</h3>
                                    {this.state.currentMusician.managed.map( band => <li key={Math.floor(Math.random() * 100000)}><Link to={`/bands/${band.id}`}>{band.name}</Link></li>)}
                                </ul>
                                <hr/>
                                <Header as="h4">About {this.state.currentMusician.name}:</Header>
                                <p>{this.state.currentMusician.bio}</p>
                            </Segment>
                            <Segment>
                                <p>Demos:</p>
                                <iframe 
                                    title="artist-demos"
                                    width="100%" 
                                    height="300" 
                                    scrolling="no" 
                                    frameBorder="no" 
                                    allow="autoplay" 
                                    src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/942118192&color=%232165a6&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row> 
                </Grid> 
                : null }
            </React.Fragment>
        )
    }
}

export default withRouter(MusicianShow)


