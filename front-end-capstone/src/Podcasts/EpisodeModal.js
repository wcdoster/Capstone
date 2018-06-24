import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import Episode from './Episode'

class EpisodeModal extends Component {

    state = {
        
    }

    uniqueKey = 1

    // pagination = function() {
    //     const paginations = this.props.episodes.length/10
    //     for (let i=0; i < 10; i++) {
    //         return(

    //         )
    //     }
    // }

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
            <div id="episode--modal">
                <Modal dialogClassName="episodeModal" show={this.props.show} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.collectionName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.props.episodes.map(p => (
                            <Episode saveEpisode={this.props.saveEpisode}
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
                                imageUrl={this.props.image}
                                mediaUrl={this.props.mediaUrl}
                                mediaType={this.props.mediaType}
                                currentUser={this.props.currentUser}
                                episodeList={this.props.episodes}
                            />
                        ))}
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default EpisodeModal