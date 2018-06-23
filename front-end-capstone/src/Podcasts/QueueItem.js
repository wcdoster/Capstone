import React, { Component } from 'react'
import './queueList.css'
import { Button, ButtonGroup } from 'react-bootstrap'

class QueueItem extends Component {

    render() {
        return (
            <div id="queue--item">
                <div className="queue--information">
                    <img src={this.props.image} />
                    <h6>{this.props.name}:</h6>
                    <p>{this.props.episodeName}</p>
                </div>
                <div id="queue--episode--buttons">
                    <ButtonGroup>
                        <Button bsSize="xsmall" id={this.props.episodeName} onClick={this.props.clickQueueEpisode}>Play</Button>
                        <ButtonGroup id="move--arrows" vertical>
                            <Button onClick={this.props.moveUp} bsSize="xsmall" id="move--up">^</Button>
                            <Button onClick={this.props.moveDown} bsSize="xsmall" id="move--down">^</Button>
                        </ButtonGroup>
                        <Button onClick={this.props.removeFromQueue} bsSize="xsmall" id="remove--from--queue">x</Button>
                    </ButtonGroup>
                </div>
            </div>
        )
    }
}

export default QueueItem