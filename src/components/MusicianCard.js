import React from 'react'
import { Card, Icon } from 'semantic-ui-react'
import { withRouter } from 'react-router'


class MusicianCard extends React.Component {
	render(){
		let { name, bio, img, birthdate, region, playing_since, bands, managed, instruments_played, id } = this.props
		return(
		  <Card
		    onClick={()=> this.props.history.push(`/musicians/${id}`)}
		    image={ img }
		    header={ name }
		    meta={ region }
		    description={ instruments_played.map(inst => inst.name).join(', ') }
		    extra={`Playing Since: ${ playing_since }`}
		    style={{ "object-fit": "cover"}}
		  />
		)
	}
}

export default withRouter(MusicianCard)

/*

  <Modal trigger={<Button>Show Modal</Button>} centered={false}>
    <Modal.Header>Select a Photo</Modal.Header>
    <Modal.Content image>
      <Image wrapped size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' />
      <Modal.Description>
        <Header>Default Profile Image</Header>
        <p>
          We've found the following gravatar image associated with your e-mail
          address.
        </p>
        <p>Is it okay to use this photo?</p>
      </Modal.Description>
    </Modal.Content>
  </Modal>

*/