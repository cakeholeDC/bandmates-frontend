import React from 'react'
import { Card, Icon } from 'semantic-ui-react'

class BandCard extends React.Component {
	render(){
		let { logo, name, bio, established, region, genre } = this.props
		return(
		  <Card
		    image={ logo }
		    header={ name }
		    meta={`Established: ${ established }`}
		    description={ bio }
		  />
		)
	}
}

export default BandCard