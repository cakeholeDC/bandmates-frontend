import React from 'react'
import { Search, Input } from 'semantic-ui-react'

class BandSearchBar extends React.Component {
    
    render() {
        return (
            <React.Fragment>
                <Input
                    id='search-form'
                    icon="search"
                    placeholder="Search..."
                    onChange={ this.props.onChange }
                    bandSearchTerm={this.props.bandSearchTerm}
                />
            </React.Fragment>
        )
    }
}

export default BandSearchBar