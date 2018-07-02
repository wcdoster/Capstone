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
                        <audio id="mediaPlayer" onEnded={this.props.mediaEnd} controls>
                            <source src={this.props.mediaUrl} type={this.props.mediaType} />
                        </audio>
                        <h4 onClick={this.props.mediaPlayerButton}>
                            <Glyphicon glyph={this.props.buttonText} />
                        </h4>
                    </div>

                </div>
                <div id="queue--div" className={this.props.queueHidden}>
                    <Collapse id="queue--list--container" in={this.props.queueOpen}>
                        <QueueList removeFromQueue={this.props.removeFromQueue} moveUp={this.props.moveUp} moveDown={this.props.moveDown} uniqueKey={this.props.uniqueKey} clickQueueEpisode={this.props.clickQueueEpisode} queueHidden={this.props.queueHidden} queue={this.props.queue} />
                    </Collapse>
                </div>
                <Button onClick={this.props.queueOpenClick} id="queue--button">
                    <Glyphicon glyph="align-justify" />
                </Button>
                <h4 onClick={this.props.closeClick} id="close--button"><Glyphicon glyph="remove" /></h4>
            </div>
        )
    }
}

export default MediaPlayer