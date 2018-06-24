import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import UserPageEpisode from './UserPageEpisode'

class UserPageEpisodes extends Component {

    state = {
        savedEpisodes: []
    }

    componentDidMount() {
        const user = localStorage.getItem("userId")
        fetch(`http://localhost:8088/savedEpisodes?userId=${user}`)
        .then(r => r.json())
        .then(results => {
          this.setState({
            savedEpisodes: results
          })
        })
    }

    queueButton = function () {
        const inQueue = this.props.queue.find(episode => {
            return episode.episodeName === this.props.episodeName && episode.collectionName === this.props.collectionName
        })
        if (!inQueue) {
            return (<Button onClick={this.props.queueClick}>Add to Queue</Button>)
        } else {
            return (<Button onClick={this.props.removeFromQueue}>Remove From Queue</Button>)
        }
    }.bind(this)

    render() {
        return (
            <div>
                {this.state.savedEpisodes.map(episode => {
                    <UserPageEpisode click={this.props.click} queueButton={this.queueButton()} title={episode.title} />
                })}
            </div>
        )
    }
}

export default UserPageEpisodes