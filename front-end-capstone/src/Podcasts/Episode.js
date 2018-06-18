import React, { Component } from 'react'
import { Button } from 'react-bootstrap'

class Episode extends Component {

    render() {
        return(
            <div id={this.props.episodeName}>
                <h4>{this.props.episodeName}</h4>
                {/* <h5>{this.props.length}</h5> */}
                <h5>{this.props.description}</h5>
                <Button hidden={this.props.hidden} onClick={this.props.click}>Play Episode</Button>
            </div>
        )
    }
}

export default Episode