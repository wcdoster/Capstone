import React, { Component } from 'react'
import Podcast from '../Podcasts/PodcastElement'

class TopList extends Component {

    uniqueKey = 0

    state = {
        podcastList: []
    }

    componentDidMount() {
        fetch('https://rss.itunes.apple.com/api/v1/us/podcasts/top-podcasts/all/25/explicit.json')
            .then(r => r.json())
            .then(x => {
    
                const results = x.feed.results
                this.setState({
                    podcastList: results
                })
            })
    }



    render() {
        return (
            <div className="topList">
                {this.state.podcastList.map(p => (
                    <Podcast collectionId={p.id} name={p.name}
                    image={p.artworkUrl100} podcastClick={this.props.podcastClick} key={this.uniqueKey++} />
                ))}
            </div>
        )
    }
}

export default TopList