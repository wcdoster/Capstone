import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import UserPageEpisode from './UserPageEpisode'

class UserPageEpisodes extends Component {

    state = {
        savedEpisodes: []
    }

    uniqueKey = 1

    componentDidMount() {
        const user = localStorage.getItem("userId")
        fetch(`http://localhost:8088/savedEpisodes?userId=${user}`)
        .then(r => r.json())
        .then(results => {
            // debugger
          this.setState({
            savedEpisodes: results
          }, () => {
              console.log(this.state)
          })
          console.log(results)
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
            <div id="user--page--episodes">
                {this.state.savedEpisodes.map(episode => {
                    return <UserPageEpisode episodeId={episode.id} 
                    image={episode.imageUrl} 
                    name={episode.collectionName} 
                    viewThisPodcast={this.props.viewThisPodcast} 
                    click={this.props.click} key={this.uniqueKey++} 
                    queueButton={this.queueButton()} 
                    removeSave={this.props.removeSave}
                    title={episode.title} />
                })}
            </div>
        )
    }
}

export default UserPageEpisodes