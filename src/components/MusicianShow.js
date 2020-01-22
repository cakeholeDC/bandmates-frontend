import React from 'react'
import { Grid, Segment, Image, Header, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import PageNotFound from './PageNotFound'


const currentYear = (new Date().getFullYear())

class MusicianShow extends React.Component {
    state={
        currentMusician: null,
        loading: true
    }

    componentDidMount() {
        this.setState({ loading: !this.state.loading})
    }

    render() {
        return (
            <React.Fragment>
            { this.props.currentMusician ?
                <Grid columns={2} divided>
                    <Grid.Row stretched>
                        <Grid.Column>
                            <Segment>
                                <Image src={this.props.currentMusician.img} alt={this.props.currentMusician.name} />
                            </Segment>
                            { this.props.currentUser && this.props.currentUser.id === this.props.currentMusician.id 
                                ? <React.Fragment>
                                    <Button 
                                        negative
                                        onClick={ () => this.props.deleteMusician(this.props.currentUser.id)}    
                                        >Delete Profile
                                    </Button>
                                    <Button positive>Edit Profile</Button>
                                    </React.Fragment>
                                : null
                            }
                            <Segment>
                                <p>Age: {currentYear - (new Date(this.props.currentMusician.birthdate).getFullYear() ) }</p>
                                <p>Playing Since: {this.props.currentMusician.playing_since}</p>
                                <p>Region: {this.props.currentMusician.region}</p>
                          
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

                        <Grid.Column>
                            <Segment>
                                <Header as='h1'>{this.props.currentMusician.username}</Header>
                                <p>{this.props.currentMusician.name}</p>

                                <Header as='h1'>{this.state.currentMusician.name}</Header>

                                
                                <ul className="unstyled-list"><h3>Instruments</h3>
                                    {this.props.currentMusician.instruments_played.map( instrument => <li key={Math.floor(Math.random() * 100000)}> {instrument.name} </li>)}
                                </ul>
                                <ul className="unstyled-list"><h3>Associated Bands</h3>
                                    {this.props.currentMusician.associated_bands.map( band => <li key={Math.floor(Math.random() * 100000)}><Link to={`/bands/${band.id}`}>{band.name}</Link></li> )}
                                </ul>
                                <ul className="unstyled-list"><h3>Managed Bands</h3>
                                    {this.props.currentMusician.managed.map( band => <li key={Math.floor(Math.random() * 100000)}><Link to={`/bands/${band.id}`}>{band.name}</Link></li>)}
                                </ul>
                                <hr/>
                                <Header as="h4">About {this.props.currentMusician.name}:</Header>
                                <p>{this.props.currentMusician.bio}</p>
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
                : <PageNotFound /> }
            </React.Fragment>
        )
    }
}

export default MusicianShow


