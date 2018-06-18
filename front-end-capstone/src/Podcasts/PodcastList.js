import React, { Component } from 'react'
import Podcast from './PodcastElement'
import './podcastList.css'

class PodcastList extends Component {

    uniqueKey = 1

    render(){
        return(
            <div className="podcastList--div">
                {this.props.searchResults.map(p => (
                    <Podcast collectionId={p.collectionId} name={p.collectionName}
                    image={p.artworkUrl600} podcastClick={this.props.podcastClick} key={this.uniqueKey++} />
                ))}
            </div>
        )
    }
}

export default PodcastList