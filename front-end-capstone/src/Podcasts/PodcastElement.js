import React, { Component } from 'react'

class Podcast extends Component {
    render() {
        return(
            <div id={this.props.collectionId} onClick={this.props.podcastClick}>
                <img src={this.props.image} alt={this.props.name} />
                <a>{this.props.name}</a>
            </div>
        )
    }
}

export default Podcast