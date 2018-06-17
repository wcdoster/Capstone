import React, { Component } from 'react'

class MediaPlayer extends Component{

    returnButton = function() {
        this.props.setView("podcastPage")
    }.bind(this)

    render() {
        return(
            <div>
                <button onClick={this.returnButton}>Return</button>
                <img src={this.props.imageUrl} width="100px"/>
                <audio controls>
                    <source src={this.props.mediaUrl} type={this.props.mediaType} />
                </audio>
            </div>
        )
    }
}

export default MediaPlayer