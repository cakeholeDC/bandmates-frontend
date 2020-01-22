import React from 'react'
import { Card } from 'semantic-ui-react'
import { withRouter } from 'react-router'

class BandCard extends React.Component {

	getBandOpenings = () => {
		const openings = this.props.band_memberships.filter(lineup => !lineup.musician).length
		if (openings > 0) {
			return `${openings} current opening${openings > 1 ? "s" : ''}!`
		} else {
			return ""
		}
	}

	render(){
		let { logo, name, established, region } = this.props
		
		return(
		  <Card
			onClick={()=> this.props.history.push(`/bands/${this.props.id}`)}
		    image={ logo }
		    header={ name }
		    meta={`Est. ${ established }`}
		    description={ region }
		    extra={ this.getBandOpenings() }
		  />
		)
	}
}

export default withRouter(BandCard)