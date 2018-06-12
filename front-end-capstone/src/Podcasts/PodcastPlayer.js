import React, { Component } from 'react'

class MediaPlayer extends Component{
    render() {
        return(
            <div>
                <img src={this.props.imageUrl} width="100px"/>
                <audio controls>
                    <source src={this.props.mediaUrl} type={this.props.mediaType} />
                </audio>
            </div>
        )
    }
}

export default MediaPlayer