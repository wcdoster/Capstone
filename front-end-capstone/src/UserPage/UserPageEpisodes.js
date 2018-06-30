import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import UserPageEpisode from './UserPageEpisode'

class UserPageEpisodes extends Component {

    uniqueKey = 1

    state = {
        savedEpisodes: []
    }

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

    queueButton = function (thisEpisode, thisPodcast) {
        // debugger
        const inQueue = this.props.queue.find(episode => {
            return episode.episodeName === thisEpisode && episode.collectionName === thisPodcast
        })
        if (thisEpisode !== this.props.currentlyPlayingPodcast) {
            if (!inQueue) {
                return (<Button onClick={this.props.queueClick}>Add to Queue</Button>)
            } else {
                return (<Button id={thisEpisode} onClick={this.props.removeFromQueue}>Remove From Queue</Button>)
            }
        }
    }.bind(this)

    returnPlayButton = function (episodeName) {
        const currentPodcast = this.props.currentlyPlayingPodcast
        // debugger
        if (episodeName === currentPodcast) {
            return <Button disabled>Currently Playing</Button>
        } else {
            return <Button hidden={this.props.hidden} onClick={this.props.click}>Play Episode</Button>
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
                        queueButton={this.queueButton}
                        removeSave={this.props.removeSave}
                        title={episode.title}
                        playButton={this.returnPlayButton} />
                })}
            </div>
        )
    }
}

export default UserPageEpisodes