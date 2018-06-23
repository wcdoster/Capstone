import React, { Component } from 'react'
import './queueList.css'

class QueueItem extends Component {
    render() {
        return (
            <div className={this.props.queueHidden}>
                <div className="queue--item">
                    <img src={this.props.image} />
                    <h6>{this.props.name}: &nbsp;</h6>
                    <p>{this.props.episodeName}</p>
                </div>
            </div>
        )
    }
}

export default QueueItem