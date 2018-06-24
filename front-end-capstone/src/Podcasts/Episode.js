import React, { Component } from 'react'
import { Button } from 'react-bootstrap'

class Episode extends Component {


    returnPlayButton = function () {
        const currentEpisode = this.props.currentEpisode
        const currentPodcast = this.props.currentlyPlayingPodcast
        if(this.props.episodeName === this.props.currentEpisode && this.props.currentlyPlayingPodcast === this.props.collectionName) {
            return <Button disabled>Currently Playing</Button>
        } else {
            return <Button hidden={this.props.hidden} onClick={this.props.click}>Play Episode</Button>
        }
    }.bind(this)

    saveEpisodeClick = function (e) {
        const episodeName = e.target.parentNode.id

        const episodeList = this.props.episodeList
        const targetEpisode = episodeList.find(episode=>{
            return episode.title["#text"] === episodeName
        })


        const newSave = {
            "userId": this.props.currentUser,
            "title": episodeName,
            "collectionId": this.props.collectionId,
            "rssFeed": this.props.rssFeed,
            "imageUrl": targetEpisode["itunes:image"]["@attributes"].href,
            "mediaUrl": targetEpisode.enclosure["@attributes"].url,
            "mediaType": targetEpisode.enclosure["@attributes"].type,
            "collectionName": this.props.collectionName
        }

        console.log(newSave)
        fetch("http://localhost:8088/savedEpisodes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newSave)
        })
    }.bind(this)

    saveEpisode = function () {
        const currentUser = localStorage.getItem("userId")
        const savedEpisodes = this.props.savedEpisodes
        const thisEpisode = savedEpisodes.find(episode =>{
            return episode.title === this.props.episodeName && episode.collectionName === this.props.collectionName
        })
        console.log(thisEpisode)
        if (currentUser && thisEpisode === undefined) {
            return <Button onClick={this.saveEpisodeClick}>Save Episode</Button>
        }
    }.bind(this)

    queueButton = function () {
        const currentEpisode = this.props.currentEpisode
        const currentPodcast = this.props.currentlyPlayingPodcast
        const inQueue = this.props.queue.find(episode => {
            return episode.episodeName === this.props.episodeName && episode.collectionName === this.props.collectionName
        })
        if (!inQueue && this.props.episodeName !== this.props.currentEpisode) {
            return (<Button onClick={this.props.queueClick}>Add to Queue</Button>)
        } else if(this.props.episodeName !== this.props.currentEpisode && this.props.currentlyPlayingPodcast !== this.props.collectionName){
            return (<Button onClick={this.props.removeFromQueue}>Remove From Queue</Button>)
        }
    }.bind(this)

    render() {
        return (
            <div id={this.props.episodeName} >
                <h4>{this.props.episodeName}</h4>

                {/* <h5>{this.props.length}</h5> */}
                <p> {this.props.description}</p >
                {/* <Button hidden={this.props.hidden} onClick={this.props.click}>Play Episode</Button> */}
                {this.returnPlayButton()}
                {/* <Button hidden={this.props.queueHidden} onClick={this.props.queueClick}>Add to Queue</Button> */}
                {this.queueButton()}
                {this.saveEpisode()}
            </div >
        )
    }
}

export default Episode