import React from 'react'
import { Grid, Segment, Image, Header, Card, Label, Icon, Button, Divider } from 'semantic-ui-react'
import { Link } from 'react-router-dom'



class BandShow extends React.Component {
  
    render() {

    	let currentBand
        
        if (this.props.allBands.length >  0) {
            currentBand = this.props.allBands.find( band => band.id === parseInt(this.props.match.params.id, 10))
        } else { 
            currentBand = null
        }
        console.log(currentBand)
        return (
            <React.Fragment>
            { currentBand ?
            	<React.Fragment>
		            <Header as="h1">{currentBand.name}</Header>
		        	<Grid columns={2} divided>
		                <Grid.Row stretched>
		                    <Grid.Column>
		                        <Segment>
		                            <Image  wrapped size='medium' src={currentBand.logo} alt={currentBand.name} />
		                        </Segment>
		                    </Grid.Column>
		                    <Grid.Column>
		                        <Segment textAlign='left'>
		                            <Header as="h3">{currentBand.name} was founded in {currentBand.established} in {currentBand.region} by {<Link to={`/musicians/${currentBand.band_leader.id}`}>{currentBand.band_leader.name}</Link>}</Header>
		                            <p>{currentBand.bio}</p>
		                        </Segment>
		                    </Grid.Column>
		                </Grid.Row> 
		            </Grid> 
		            <Header as="h1">Lineup:</Header>
		            <Divider />
	                <Card.Group itemsPerRow={2} stackable>
	                	{currentBand.band_memberships.map(member => {
	                		console.log(member.musician ? member.musician : "no bio present")
	                		return (
	                			<Card key={member.id}>
	                				<Image size="mini" wrapped ui={false} src={member.musician ? member.musician.img : null } >{ member.musician ? null : <Icon name='signup' size='massive' />}</Image>
									<Card.Content>
										<Card.Header as='h1'>{member.instrument.name}</Card.Header>
										<Card.Meta >{member.musician ? member.musician.name : "This could be YOU!"}</Card.Meta>
										<Card.Description>{member.musician ? member.musician.bio : null}</Card.Description>
									</Card.Content>
									<Card.Content extra>
										{ !member.musician ? <Button secondary >Request to Join</Button> : null }
										{ member.musician ? <Link to={`/musicians/${member.musician.id}`}><Button primary >View Profile</Button></Link> : null }
									</Card.Content>
		                		</Card>
	                		)
	                	})}
	                </Card.Group>
                </React.Fragment>
                : null }
            </React.Fragment>


        )
    }
}

export default BandShow


/*

<Item>
	                		<Item.Content>
								<Item.Header as='a'>12 Years a Slave</Item.Header>
									<Item.Meta>
										<span className='cinema'>Union Square 14</span>
									</Item.Meta>
									<Item.Description>CONTENT</Item.Description>
									<Item.Extra>
										<Label>IMAX</Label>
										<Label icon='globe' content='Additional Languages' />
									</Item.Extra>
								</Item.Content>
		                	</Item>
		                	<Item>
		                		<Item.Content>
								<Item.Header as='a'>12 Years a Slave</Item.Header>
									<Item.Meta>
										<span className='cinema'>Union Square 14</span>
									</Item.Meta>
									<Item.Description>CONTENT</Item.Description>
									<Item.Extra>
										<Label>IMAX</Label>
										<Label icon='globe' content='Additional Languages' />
									</Item.Extra>
								</Item.Content>
		                	</Item>
		                	<Item>
		                		<Item.Content>
								<Item.Header as='a'>12 Years a Slave</Item.Header>
									<Item.Meta>
										<span className='cinema'>Union Square 14</span>
									</Item.Meta>
									<Item.Description>CONTENT</Item.Description>
									<Item.Extra>
										<Label>IMAX</Label>
										<Label icon='globe' content='Additional Languages' />
									</Item.Extra>
								</Item.Content>
	                	</Item>

*/
