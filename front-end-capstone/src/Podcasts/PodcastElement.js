import React, { Component } from 'react'
import { Image } from 'react-bootstrap'
import './podcastElement.css'

class Podcast extends Component {
    render() {
        return(
            <div id={this.props.collectionId} onClick={this.props.podcastClick} className="podcast--div truncate">
                <Image src={this.props.image} alt={this.props.name} />
                <a>{this.props.name}</a>
            </div>
        )
    }
}

export default Podcast