import React, { Component } from 'react'
import QueueItem from './QueueItem'

class QueueList extends Component {

    uniqueKey = 0

    render() {
        return (
            <div id='queue--list'>
                {this.props.queue.map(episode => (
                    <QueueItem moveUp={this.props.moveUp} moveDown={this.props.moveDown} uniqueKey={this.props.uniqueKey} key={this.uniqueKey++}  clickQueueEpisode={this.props.clickQueueEpisode} queueHidden={this.props.queueHidden} image={episode.imageUrl} name={episode.collectionName} episodeName={episode.episodeName} />
                ))}

            </div>
        )
    }
}

export default QueueList
