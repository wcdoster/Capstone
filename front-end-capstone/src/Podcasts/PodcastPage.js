import React, { Component } from 'react'
import { Button, Image, Pager, Glyphicon } from 'react-bootstrap'
import EpisodeModal from './EpisodeModal'
import EpisodeList from './EpisodeList'

import './podcastPage.css'

class PodcastPage extends Component {

    state = {
        subscribed: "",
        show: false,
        pages: [],
        thisPage: [],
        pageNumber: 0
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
        let newPages = this.state.pages
        let episodes = this.props.episodes.slice(0)
        const paginations = episodes.length / 10
        for (let i = 0; i < paginations; i++) {
            const theseEpisodes = episodes.splice(0, 10)
            newPages.push(theseEpisodes)
            this.setState({
                pages: newPages,
                thisPage: newPages[0]
            })
        }
    }

    moveForwardButton = function () {
        if (this.state.pageNumber !== (this.state.pages.length - 1)) {
            return <Pager.Item onClick={this.moveForward}>Next</Pager.Item>
        }
    }.bind(this)

    moveBackButton = function () {
        if (this.state.pageNumber !== 0) {
            return <Pager.Item onClick={this.moveBack} >Previous</Pager.Item>
        }
    }.bind(this)

    moveForward = function () {
        const modal = document.getElementById("episode--modal")
        const newPageNumber = this.state.pageNumber + 1
        console.log(this.state.pages[newPageNumber])
        this.setState({
            thisPage: this.state.pages[newPageNumber],
            pageNumber: newPageNumber
        })
        window.scrollTo(0, 0)
    }.bind(this)

    moveBack = function () {
        const modal = document.getElementById("episode--modal")
        const newPageNumber = this.state.pageNumber - 1
        this.setState({
            thisPage: this.state.pages[newPageNumber],
            pageNumber: newPageNumber
        })
        window.scrollTo(0, 0)
    }.bind(this)

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

            {/* <Glyphicon className="back--arrow" onClick={this.props.setView("search")} glyph="arrow-left" /> */}
                {/* <Button onClick={this.props.setView("searchResults")} id="page--back--button">Back</Button> */}
                <div className="podcastPage--info">
                    <Image src={this.props.image} />
                    <h2>{this.props.name}</h2>
                    <h5>{this.props.check(this.props.description)}</h5>
                    <Button className={this.props.class} onClick={this.clickFunction} >{this.state.subscribed}</Button>
                </div>
                <EpisodeList savedEpisodes={this.props.savedEpisodes}
                    thisPage={this.state.thisPage}
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
                <Pager>
                    {this.moveBackButton()}{' '}
                    {this.moveForwardButton()}
                </Pager>
            </div >
        )
    }
}

export default PodcastPage