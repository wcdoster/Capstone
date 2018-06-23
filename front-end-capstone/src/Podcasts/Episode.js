import React, { Component } from 'react'
import { Button } from 'react-bootstrap'

class Episode extends Component {

    render() {
        return(
            <div id={this.props.episodeName}>
                <h4>{this.props.episodeName}</h4>
                
                {/* <h5>{this.props.length}</h5> */}
                <p>{this.props.description}</p>
                <Button hidden={this.props.hidden} onClick={this.props.click}>Play Episode</Button>
                <Button hidden={this.props.queueHidden} onClick={this.props.queueClick}>Add to Queue</Button>
            </div>
        )
    }
}

export default Episode