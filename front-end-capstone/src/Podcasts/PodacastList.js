import React, { Component } from 'react'
import Podcast from './Podcast'

class PodcastList extends Component {
    render(){
        return(
            <div>
                {this.props.searchResults.map(p => (
                    <Podcast name={p.collectionName}
                    image={p.artworkUrl30} />
                ))}
            </div>
        )
    }
}

export default PodcastList