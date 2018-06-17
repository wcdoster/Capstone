import React, { Component } from 'react'

class Episode extends Component {

    render() {
        return(
            <div id={this.props.episodeName}>
                <button hidden={this.props.hidden} onClick={this.props.click}>Play Episode</button>
                <h4>{this.props.episodeName}</h4>
                {/* <h5>{this.props.length}</h5> */}
                <h5>{this.props.description}</h5>
            </div>
        )
    }
}

export default Episode