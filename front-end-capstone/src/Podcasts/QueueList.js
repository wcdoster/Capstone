import React, { Component } from 'react'
import QueueItem from './QueueItem'

class QueueList extends Component {

    uniqueKey = 0

    render() {
        return (
            <div id='queue--list'>
                <h5>Your Queue</h5>
                {this.props.queue.map(episode => (
                    <QueueItem removeFromQueue={this.props.removeFromQueue} moveUp={this.props.moveUp} moveDown={this.props.moveDown} uniqueKey={this.props.uniqueKey} key={this.uniqueKey++} clickQueueEpisode={this.props.clickQueueEpisode} image={episode.imageUrl} name={episode.collectionName} episodeName={episode.episodeName} />
                ))}

            </div>
        )
    }
}

export default QueueList
