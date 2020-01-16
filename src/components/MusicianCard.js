import React from 'react'
import { Card, Icon } from 'semantic-ui-react'

class MusicianCard extends React.Component {
	render(){
		let { name, bio, img, birthdate, region, playing_since, bands, managed, instruments_played  } = this.props
		return(
		  <Card
		    image={ img }
		    header={ name }
		    meta={ instruments_played.map(inst => inst.name).join(', ') }
		    description={ bio }
		    extra={`Playing Since: ${ playing_since }`}
		  />
		)
	}
}

export default MusicianCard