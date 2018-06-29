import React, { Component } from 'react'
import { Button, Image } from 'react-bootstrap'
import EpisodeModal from './EpisodeModal'
import EpisodeList from './EpisodeList'

import './podcastPage.css'

class PodcastPage extends Component {

    state = {
        subscribed: "",
        show: false
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

    modalShow = function () {
        this.setState({
            show: true
        })
    }.bind(this)

    handleClose = function () {
        this.setState({
            show: false
        })
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
                    <Button onClick={this.modalShow} >View All Episodes</Button>
                    {/* <EpisodeModal
                        handleClose={this.handleClose}
                        show={this.state.show}
                        saveEpisode={this.props.saveEpisode}
                        removeFromQueue={this.props.removeFromQueue}
                        queue={this.props.queue}
                        collectionName={this.props.name}
                        queueHidden={this.props.queueHidden}
                        queueClick={this.props.queueClick}
                        check={this.props.check}
                        hidden={this.state.hidden}
                        episodes={this.props.episodes}
                        click={this.props.click}
                        collectionId={this.props.collectionId}
                        rssFeed={this.props.rssFeed}
                        image={this.props.image}
                        mediaUrl={this.props.mediaUrl}
                        mediaType={this.props.mediaType}
                        currentUser={this.props.currentUser}
                        savedEpisodes={this.props.savedEpisodes}
                    /> */}
                </div>
                <EpisodeList savedEpisodes={this.props.savedEpisodes}
                    removeFromQueue={this.props.removeFromQueue}
                    queue={this.props.queue}
                    collectionName={this.props.name}
                    queueHidden={this.props.queueHidden}
                    queueClick={this.props.queueClick}
                    check={this.props.check}
                    hidden={this.state.hidden}
                    episodes={this.props.episodes}
                    click={this.props.click}
                    collectionId={this.props.collectionId}
                    renderSave={this.props.renderSave}
                    rssFeed={this.props.rssFeed}
                    image={this.props.image}
                    mediaUrl={this.props.mediaUrl}
                    mediaType={this.props.mediaType}
                    currentUser={this.props.currentUser}
                    currentEpisode={this.props.currentEpisode}
                    currentlyPlayingPodcast={this.props.currentlyPlayingPodcast}
                />
            </div >
        )
    }
}

export default PodcastPage