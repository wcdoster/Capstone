import React, { Component } from 'react'
import { Collapse } from 'react-bootstrap'
import './podcastPlayer.css'

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
                <div className="mediaPlayer--div">
                    <Collapse in={this.props.open}>
                        <div className="episode--information">
                            <img src={this.props.imageUrl} width="100px" alt={this.props.name} />
                            <h4>{this.props.name}</h4>
                            <h5>{this.props.episodeName}</h5>
                        </div>
                    </Collapse>
                    <div className="mediaBar">
                        <audio id="mediaPlayer" controls>
                            <source src={this.props.mediaUrl} type={this.props.mediaType} />
                        </audio>
                        <h4 onClick={this.props.mediaPlayerButton}>
                            {this.props.buttonText}
                        </h4>
                    </div>

                </div>
                    <h4 onClick={this.props.closeClick} id="close--button">x</h4>
            </div>
        )
    }
}

export default MediaPlayer