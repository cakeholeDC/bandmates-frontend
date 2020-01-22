import React from 'react'
import { Card } from 'semantic-ui-react'
import { withRouter } from 'react-router'

class BandCard extends React.Component {

	render(){
		let { logo, name, established, region, band_memberships } = this.props

		// logo = 'https://picsum.photos/700'
		
		return(
		  <Card
			onClick={()=> this.props.history.push(`/bands/${this.props.id}`)}
		    image={ logo }
		    header={ name }
		    meta={`Est. ${ established }`}
		    description={ region }
		    extra={`${band_memberships.filter(lineup => !lineup.musician)} current openings!`}
		  />
		)
	}
}

export default withRouter(BandCard)