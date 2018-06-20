import React, { Component } from 'react'
import TopList from './TopList'

import './homePage.css'

class HomePage extends Component {
    render() {
        return(
            <div id="homepage--div">
                <h2>Top Podcasts</h2>
                <TopList podcastClick={this.props.podcastClick}/>
            </div>
        )
    }
}

export default HomePage