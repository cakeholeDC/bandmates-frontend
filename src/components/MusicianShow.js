import React from 'react'
import { Grid, Segment, Image, Header } from 'semantic-ui-react'


class MusicianShow extends React.Component {
    
    render() {

        let currentMusician
        if (this.props.allMusicians.length >  0) {
            currentMusician = this.props.allMusicians.find( musician => musician.id === parseInt(this.props.match.params.id, 10))
        } else { 
            currentMusician = null
        }

        return (
            <React.Fragment>
            { currentMusician ?
                <Grid columns={2} divided>
                    <Grid.Row stretched>
                        <Grid.Column>
                            <Segment>
                                <Image src={currentMusician.img} alt={currentMusician.name} />
                            </Segment>

                            <Segment>
                                <p>{currentMusician.birthdate}</p>
                                <p>{currentMusician.playing_since}</p>
                                <p>{currentMusician.region}</p>
                                <ul>
                                    {currentMusician.bands.map( band => <li key={Math.floor(Math.random() * 100000)}>{band.name}</li> )}
                                </ul>
                                <ul>
                                    {currentMusician.managed.map( band => <li key={Math.floor(Math.random() * 100000)}> {band.name}</li>)}
                                </ul>
                            </Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment>
                                <Header as='h1'>{currentMusician.name}</Header>
                            </Segment>

                            <Segment>
                                <ul>
                                    {currentMusician.instruments_played.map( instrument => <li key={Math.floor(Math.random() * 100000)}> {instrument.name} </li>)}
                                </ul>
                            </Segment>

                            <Segment>
                                <p>{currentMusician.bio}</p>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row> 
                </Grid> 
                : <React.Fragment></React.Fragment> }
            </React.Fragment>
        )
    }
}

export default MusicianShow