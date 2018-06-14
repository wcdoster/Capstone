import React, { Component } from 'react'

import EpisodeList from './EpisodeList'

class PodcastPage extends Component {

    state = {
        subscribed: ""
    }

    componentDidMount() {
        fetch(`http://localhost:8088/subscribedPodcasts?collectionId=${this.props.collectionId}&userId=${this.props.currentUser}`)
            .then(r => r.json())
            .then(result => {
                if (result.length !== 0) {
                    this.setState({
                        subscribed: "unsubscribe"
                    })
                } else {
                    this.setState({
                        subscribed: "subscribe"
                    })
                }
            })
    }

    subscribeClick = function () {
        const newSubscription = {
            userId: this.props.currentUser,
            collectionId: this.props.collectionId
        }

        fetch("http://localhost:8088/subscribedPodcasts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newSubscription)
        })
            .then(() => {
                this.setState({
                    subscribed: "unsubscribed"
                })
            })
    }.bind(this)

    unsubscribeClick = function () {
        console.log(this.props.collectionId)
        fetch(`http://localhost:8088/subscribedPodcasts?collectionId=${this.props.collectionId}`)
            .then(r => r.json())
            .then(result => {
                fetch(`http://localhost:8088/subscribedPodcasts/${result[0].id}`, {
                    method: "DELETE"
                })
                    .then(() => {
                        this.setState({
                            subscribed: "subscribe"
                        })
                    })
            })
    }


    clickFunction = function () {
        if (this.state.subscribed === "subscribe") {
            this.subscribeClick()
        } else if (this.state.subscribed === "unsubscribe") {
            this.unsubscribeClick()
        }
    }.bind(this)

    render() {
        return (
            <div>
                <h2>{this.props.name}</h2>
                <button onClick={this.clickFunction} >{this.state.subscribed}</button>
                <EpisodeList episodes={this.props.episodes} click={this.props.click} />
            </div >
        )
    }
}

export default PodcastPage