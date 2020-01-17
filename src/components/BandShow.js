import React from 'react'
import { Grid, Segment, Image, Header, Item, Label, Icon, Button } from 'semantic-ui-react'


class BandShow extends React.Component {
  
    render() {

    	let currentBand
        
        if (this.props.allBands.length >  0) {
            currentBand = this.props.allBands.find( band => band.id === parseInt(this.props.match.params.id, 10))
        } else { 
            currentBand = null
        }

        return (
            <React.Fragment>
            { currentBand ?
            	<React.Fragment>
		        	<Grid columns={2} divided>
		                <Grid.Row stretched>
		                    <Grid.Column>
		                        <Segment>
		                            <Image src={currentBand.logo} alt={currentBand.name} />
		                        </Segment>
		                    </Grid.Column>
		                    <Grid.Column>
		                        <Segment>
		                            <p>{currentBand.bio}</p>
		                        </Segment>
		                    </Grid.Column>
		                </Grid.Row> 
		            </Grid> 
	                <Item.Group divided>
	                	{currentBand.band_memberships.map(member => {
	                		console.log(member.musician ? member.musician : "no bio present")
	                		return (
	                			<Item key={member.id}>
	                				<Item.Image src={member.musician ? member.musician.img : null} />
									<Item.Content>
										<Item.Header as='h1'>{member.instrument.name}</Item.Header>
										<Item.Meta >{member.musician ? member.musician.name : "This could be YOU!"}</Item.Meta>
										<Item.Description>{member.musician ? member.musician.bio : null}</Item.Description>
										<Item.Extra>
											{ !member.musician ? <Button size="massive" secondary floated="right">Request to Join</Button> : null }
											{ member.musician ? <Button primary floated="right">View Profile</Button> : null }
										</Item.Extra>
									</Item.Content>
		                		</Item>
	                		)
	                	})}
	                </Item.Group>
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
