import React from 'react'
import { Grid, Segment, Image, Header, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const currentYear = (new Date().getFullYear())
const MUSICIANS_URL = 'http://localhost:3000/musicians'




class MusicianShow extends React.Component {
    state={
        currentMusician: null
    }

    componentDidMount(){

        fetch(`${MUSICIANS_URL}/${this.props.match.params.id}`)
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
            })
            .then(musician => {
                this.setState({
                    currentMusician: musician
                });
            })
    }
    
    render() {

        // let currentMusician
        // if (this.props.allMusicians.length >  0) {
        //     currentMusician = this.props.allMusicians.find( musician => musician.id === parseInt(this.props.match.params.id, 10))
        // } else { 
        //     currentMusician = null
        // }
        return (
            <React.Fragment>
            { this.state.currentMusician ?
                <Grid columns={2} divided>
                    <Grid.Row stretched>
                        <Grid.Column>
                            <Segment>
                                <Image src={this.state.currentMusician.img} alt={this.state.currentMusician.name} />
                            </Segment>

                            <Segment>
                                <p>Age: {currentYear - (new Date(this.state.currentMusician.birthdate).getFullYear() ) }</p>
                                <p>Playing Since: {this.state.currentMusician.playing_since}</p>
                                <p>Region: {this.state.currentMusician.region}</p>
                                { this.props.currentUser && this.props.currentUser.id === this.state.currentMusician.id 
                                    ? <Button negative>Delete Profile</Button>
                                    : null}
                            </Segment>
                            <Segment>
                                <p>Demos:</p>
                                <iframe 
                                    title="artist-demos"
                                    width="100%" 
                                    height="300" 
                                    scrolling="no" 
                                    frameborder="no" 
                                    allow="autoplay" 
                                    src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/942118192&color=%232165a6&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
                            </Segment>
                        </Grid.Column>

                        <Grid.Column>
                            <Segment>
                                <Header as='h1'>{this.state.currentMusician.username}</Header>
                                <p>{this.state.currentMusician.name}</p>
                                
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
                        </Grid.Column>
                    </Grid.Row> 
                </Grid> 
                : null }
            </React.Fragment>
        )
    }
}

export default MusicianShow


