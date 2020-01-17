import React from 'react'

class BandShow extends React.Component {
  
    render() {
        let { logo, name, bio, established, region, genre } = this.props
        console.log(this.props)
        return (
        <p>band show</p>
        )
    }
}

export default BandShow