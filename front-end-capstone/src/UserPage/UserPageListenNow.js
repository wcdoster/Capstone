import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import UserPageEpisode from './UserPageEpisode'
import './UserPageListenNow.css'

const $ = require('jquery')

class UserPageListenNow extends Component {

    state = {
        listenNowEpisodes: []
    }

    uniqueKey = 1

    componentDidMount() {
        const user = localStorage.getItem("userId")
        fetch(`http://localhost:8088/subscribedPodcasts?userId=${user}`)
            .then(r => r.json())
            .then(results => {
                // debugger
                const episodes = []
                results.forEach(result => {
                    fetch(`https://itunes.apple.com/lookup?id=${result.collectionId}`)
                        .then(r => r.json())
                        .then(p => {

                            let thisFeedUrl = p.results[0].feedUrl
                            if (thisFeedUrl.indexOf('?format=xml') === -1) {
                                thisFeedUrl += '?format=xml'
                            }
                            $.get(thisFeedUrl, r => {
                                const current = this.props.xmlToJson(r)
                                const currentEpisode = current.rss.channel.item[0]

                                const object = {
                                    title: currentEpisode.title["#text"],
                                    currentEpisode: currentEpisode.enclosure["@attributes"].url,
                                    mediaUrl: currentEpisode.enclosure["@attributes"].url,
                                    mediaType: currentEpisode.enclosure["@attributes"].type,
                                    imageUrl: p.results[0].artworkUrl600,
                                    episodeName: currentEpisode.title["#text"],
                                    collectionName: current.rss.channel.title["#text"],
                                    condition: result.collectionId
                                }
                                episodes.push(object)
                                this.setState({
                                    listenNowEpisodes: episodes
                                })
                            })
                        })
                })
            })
    }

    playEpisode = function (e) {
        const episodeIndex = e.target.parentNode.id
        const object = this.state.listenNowEpisodes[episodeIndex]
        this.props.listenNowPlay(object)
    }.bind(this)

    queueButton = function (thisEpisode, thisPodcast) {
        // debugger
        const inQueue = this.props.queue.find(episode => {
            return episode.episodeName === thisEpisode && episode.collectionName === thisPodcast
        })
        if (thisEpisode !== this.props.currentlyPlayingPodcast) {
            if (!inQueue) {
                return (<Button onClick={this.queueEpisode}>Add to Queue</Button>)
            } else {
                return (<Button id={thisEpisode} onClick={this.props.removeFromQueue}>Remove From Queue</Button>)
            }
        }
    }.bind(this)

    queueEpisode = function (e) {
        const episodeIndex = e.target.parentNode.id
        const object = this.state.listenNowEpisodes[episodeIndex]
        this.props.setQueue(object)
    }.bind(this)

    returnPlayButton = function (episodeName) {
        const currentPodcast = this.props.currentlyPlayingPodcast
        // debugger
        if (episodeName === currentPodcast) {
            return <Button disabled>Currently Playing</Button>
        } else {
            return <Button hidden={this.props.hidden} onClick={this.playEpisode}>Play Episode</Button>
        }
    }.bind(this)

    viewPage = function (e) {
        const episodeIndex = e.target.parentNode.id
        const episodeObject = this.state.listenNowEpisodes[episodeIndex]
        const targetCondition = episodeObject.condition
        this.props.fetchRss(targetCondition)
    }.bind(this)

    render() {
        return (
            <div id="listen--now" >
                {
                    this.state.listenNowEpisodes.map(episode => {
                        return <UserPageEpisode episodeId={this.state.listenNowEpisodes.indexOf(episode)}
                            image={episode.imageUrl}
                            name={episode.collectionName}
                            viewThisPodcast={this.viewPage}
                            click={this.props.click} key={this.uniqueKey++}
                            queueButton={this.queueButton}
                            removeSave={this.props.removeSave}
                            title={episode.title}
                            playButton={this.returnPlayButton} />
                    })
                }
            </div>
        )
    }
}

export default UserPageListenNow