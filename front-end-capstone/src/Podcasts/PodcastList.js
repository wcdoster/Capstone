import React, { Component } from 'react'
import Podcast from './PodcastElement'

class PodcastList extends Component {

    uniqueKey = 1

    render(){
        return(
            <div>
                {this.props.searchResults.map(p => (
                    <Podcast collectionId={p.collectionId} name={p.collectionName}
                    image={p.artworkUrl30} podcastClick={this.props.podcastClick} key={this.uniqueKey++} />
                ))}
            </div>
        )
    }
}

export default PodcastList