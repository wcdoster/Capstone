import React, { Component } from 'react'
import { Collapse, Button, Glyphicon } from 'react-bootstrap'
import './podcastPlayer.css'
import QueueList from './QueueList'

class MediaPlayer extends Component {

    componentDidMount() {
        const media = document.getElementById("mediaPlayer")
        media.pause()
        media.load()
        media.oncanplaythrough = media.play()
    }

    // leavingPage = function () {
    //     const media = document.getElementById("mediaPlayer")
    //     const newSave = {
    //         "userId": this.props.currentUser,
    //         "title": this.props.episodeName,
    //         "collectionId": this.props.collectionId,
    //         "timeStop": media.currentTime
    //     }

    //     fetch("http://localhost:8088/inProgressPodcasts", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(newSave)
    //     })
    // }.bind(this)

    render() {
        return (

            <div>
                {/* {this.props.mediaCheck()} */}
                <div className="mediaPlayer--div">
                    <Collapse in={this.props.open}>
                        <div className="episode--information">
                            <img src={this.props.imageUrl} width="100px" alt={this.props.name} />
                            <h4>{this.props.name}</h4>
                            <h5>{this.props.episodeName}</h5>
                        </div>
                    </Collapse>
                    <div className="mediaBar">
                        <audio id="mediaPlayer" onEnded={this.props.mediaEnd} controls>
                            <source src={this.props.mediaUrl} type={this.props.mediaType} />
                        </audio>
                        <h4 onClick={this.props.mediaPlayerButton}>
                            {this.props.buttonText}
                        </h4>
                    </div>

                </div>
                <div id="queue--div">
                    <Collapse id="queue--list--container" in={this.props.queueOpen}>
                        <QueueList moveUp={this.props.moveUp} moveDown={this.props.moveDown} uniqueKey={this.props.uniqueKey} clickQueueEpisode={this.props.clickQueueEpisode} queueHidden={this.props.queueHidden} queue={this.props.queue} />
                    </Collapse>
                </div>
                {/* <h4 onClick={this.props.queueOpenClick} id="queue--button">Q</h4> */}
                <Button onClick={this.props.queueOpenClick} id="queue--button">
                    <Glyphicon glyph="align-justify" />
                </Button>
                <h4 onClick={this.props.closeClick} id="close--button">x</h4>
            </div>
        )
    }
}

export default MediaPlayer