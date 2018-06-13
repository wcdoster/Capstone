import React, { Component } from 'react'

import EpisodeList from './EpisodeList'

class PodcastPage extends Component {

    state = {
        subscribed: "",
        disabled: false
    }

    componentDidMount() {
        fetch(`http://localhost:8088/subscribedPodcasts?collectionId=${this.props.collectionId}&userId=${this.props.currentUser}`)
            .then(r => r.json())
            .then(result => {
                console.log(result)
                if (result.length !== 0) {
                    this.setState({
                        subscribed: "subscribed",
                        disabled: true
                    })
                } else {
                    this.setState({
                        subscribed: "subscribe",
                        disabled: false
                    })
                }
            })
    }

    render() {
        return (
            <div>
                <h2>{this.props.name}</h2>
                <button disabled={this.state.disabled}>{this.state.subscribed}</button>
                <EpisodeList episodes={this.props.episodes} click={this.props.click} />
            </div>
        )
    }
}

export default PodcastPage