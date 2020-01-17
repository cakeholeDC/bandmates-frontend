import React from 'react'
import { Card, Icon } from 'semantic-ui-react'
import { withRouter } from 'react-router'

class BandCard extends React.Component {
	render(){
		console.log(this.props)
		let { logo, name, bio, established, region, genre, id } = this.props
		return(
		  <Card
			onClick={()=> this.props.history.push(`/bands/${id}`)}
		    image={ logo }
		    header={ name }
		    meta={`Established: ${ established }`}
		    description={ bio }
		  />
		)
	}
}

export default withRouter(BandCard)