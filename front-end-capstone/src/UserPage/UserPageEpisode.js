import React, { Component } from 'react'
import { Button } from 'react-bootstrap'

class UserPageEpisode extends Component {
    render() {
        return (
            <div id={this.props.episodeId} >
                <div id="picture--title">
                    <img src={this.props.image} />
                    <h4>{this.props.name}</h4>
                </div>
                <h4>{this.props.title}</h4>
                {/* <h5>{this.props.length}</h5> */}
                {/* <Button onClick={this.props.click}>Play Episode</Button> */}
                {this.props.playButton(this.props.title)}
                {/* <Button hidden={this.props.queueHidden} onClick={this.props.queueClick}>Add to Queue</Button> */}
                {this.props.queueButton(this.props.title, this.props.name)}
                <Button onClick={this.props.viewThisPodcast}>View Podcast</Button>
                <Button onClick={this.props.removeSave}>Remove</Button>
            </div>
        )
    }
}

export default UserPageEpisode