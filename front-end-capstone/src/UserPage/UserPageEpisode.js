import React, { Component } from 'react'
import { Button } from 'react-bootstrap'

class UserPageEpisode extends Component {
    render() {
        return (
            <div id={this.props.title} >
                <h4>{this.props.title}</h4>
                {/* <h5>{this.props.length}</h5> */}
                <Button onClick={this.props.click}>Play Episode</Button>
                {/* <Button hidden={this.props.queueHidden} onClick={this.props.queueClick}>Add to Queue</Button> */}
                {this.props.queueButton}
                <Button>View Podcast</Button>
            </div>
        )
    }
}

export default UserPageEpisode