import React, { Component } from 'react'
import TopList from './TopList'

class HomePage extends Component {
    render() {
        return(
            <div>
                <h2>Top Podcasts</h2>
                <TopList podcastClick={this.props.podcastClick}/>
            </div>
        )
    }
}

export default HomePage