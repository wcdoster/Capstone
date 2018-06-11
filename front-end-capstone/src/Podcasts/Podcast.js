import React, { Component } from 'react'

class Podcast extends Component {
    render() {
        return(
            <div>
                <img src={this.props.image} alt={this.props.name} />
                <a id="podcast--list--name">{this.props.name}</a>
            </div>
        )
    }
}

export default Podcast