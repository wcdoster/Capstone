import React, { Component } from 'react'
import { Button } from 'react-bootstrap'

class Episode extends Component {

    queueButton = function() {
        const inQueue = this.props.queue.find(episode => {
            return episode.episodeName === this.props.episodeName && episode.collectionName === this.props.collectionName
        })
        if(!inQueue){
            return (<Button onClick={this.props.queueClick}>Add to Queue</Button>)
        } else {
            return(<Button onClick={this.props.removeFromQueue}>Remove From Queue</Button>)
        }
    }.bind(this)

    render() {
        return(
            <div id={this.props.episodeName}>
                <h4>{this.props.episodeName}</h4>
                
                {/* <h5>{this.props.length}</h5> */}
                <p>{this.props.description}</p>
                <Button hidden={this.props.hidden} onClick={this.props.click}>Play Episode</Button>
                {/* <Button hidden={this.props.queueHidden} onClick={this.props.queueClick}>Add to Queue</Button> */}
                {this.queueButton()}
            </div>
        )
    }
}

export default Episode