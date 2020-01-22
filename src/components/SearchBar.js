import React from 'react'
import { Input } from 'semantic-ui-react'

class BandSearchBar extends React.Component {
    
    render() {
        return (
            <React.Fragment>
                <Input
                    id='search-form'
                    icon="search"
                    placeholder="Search..."
                    onChange={ this.props.onChange }
                    searchTerm={this.props.searchTerm}
                />
            </React.Fragment>
        )
    }
}

export default BandSearchBar