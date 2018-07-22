import React, { Component } from 'react'
import Episode from './Episode'
import './episodeList.css'

class EpisodeList extends Component {

    uniqueKey = 1

    // regexCheck = function(string) {
    //     let p = string.replace(/<[^>]*>/gi, '');
    //     return p
    // }.bind(this)

    descriptionType = function (description) {
        let thisDescription = ""

        if (description["#cdata-section"]) {
            thisDescription = description["#cdata-section"]
        } else if (description["#text"]) {
            thisDescription = description["#text"]
        } else {
            thisDescription = description
        }

        return thisDescription
    }.bind(this)

    render() {
        return (
            <div className="episodeList--div">
                <h3>Most Recent Episodes</h3>
                {this.props.thisPage.map(p => (
                    <Episode savedEpisodes={this.props.savedEpisodes}
                        renderSave={this.props.renderSave}
                        removeFromQueue={this.props.removeFromQueue}
                        queue={this.props.queue}
                        collectionName={this.props.collectionName}
                        queueHidden={this.props.queueHidden}
                        queueClick={this.props.queueClick}
                        hidden={this.props.hidden}
                        description={this.props.check(this.descriptionType(p.description))}
                        click={this.props.click}
                        episodeName={p.title["#text"]}
                        key={this.uniqueKey++}
                        collectionId={this.props.collectionId}
                        rssFeed={this.props.rssFeed}
                        image={this.props.image}
                        mediaUrl={this.props.mediaUrl}
                        mediaType={this.props.mediaType}
                        currentUser={this.props.currentUser}
                        episodeList={this.props.episodes}
                        currentEpisode={this.props.currentEpisode}
                        currentlyPlayingPodcast={this.props.currentlyPlayingPodcast}
                    />
                ))}
            </div>
        )
    }
}

export default EpisodeList


// description={this.check(p["description"]["#cdata-section"])}