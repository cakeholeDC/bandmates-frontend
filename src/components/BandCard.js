import React from 'react'
import { Card, Icon } from 'semantic-ui-react'
import { withRouter } from 'react-router'

class BandCard extends React.Component {

	render(){
		let { logo, name, bio, established, region, genre } = this.props
		
		return(
		  <Card
			onClick={()=> this.props.history.push(`/bands/${this.props.id}`)}
		    image={ logo }
		    header={ name }
		    meta={`Established: ${ established }`}
		    description={ region }
		  />
		)
	}
}

export default withRouter(BandCard)