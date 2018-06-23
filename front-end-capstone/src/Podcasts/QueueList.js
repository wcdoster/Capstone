import React, { Component } from 'react'
import QueueItem from './QueueItem'

class QueueList extends Component {
    render() {
        return (
            <div id='queue--list'>
                {this.props.queue.map(episode => (
                    <QueueItem queueHidden={this.props.queueHidden} image={episode.imageUrl} name={episode.collectionName} episodeName={episode.episodeName} />
                ))}

            </div>
        )
    }
}

export default QueueList
