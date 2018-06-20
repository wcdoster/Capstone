import React, { Component } from 'react'
import { Button, Image } from 'react-bootstrap'

import EpisodeList from './EpisodeList'

import './podcastPage.css'

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
                    subscribed: "unsubscribe"
                })
            })
    }.bind(this)

    unsubscribeClick = function () {
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
            <div className="podcastPage--div">
            {/* <Button onClick={this.props.setView("searchResults")} id="page--back--button">Back</Button> */}
                <div className="podcastPage--info">
                    <Image src={this.props.image} />
                    <h2>{this.props.name}</h2>
                    <h5>{this.props.check(this.props.description)}</h5>
                    <Button className={this.props.class} onClick={this.clickFunction} >{this.state.subscribed}</Button>
                </div>
                <EpisodeList check={this.props.check} hidden={this.state.hidden} episodes={this.props.episodes} click={this.props.click} />
            </div >
        )
    }
}

export default PodcastPage