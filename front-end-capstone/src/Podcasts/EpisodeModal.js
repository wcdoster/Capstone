import React, { Component } from 'react'
import { Modal, Pager } from 'react-bootstrap'
import Episode from './Episode'

class EpisodeModal extends Component {

    state = {
        pages: [],
        thisPage: [],
        pageNumber: 0
    }

    uniqueKey = 1

    componentDidMount() {
        let newPages = this.state.pages
        let episodes = this.props.episodes
        const paginations = episodes.length / 10
        for (let i = 0; i < paginations; i++) {
            const theseEpisodes = episodes.splice(0, 10)
            newPages.push(theseEpisodes)
            this.setState({
                pages: newPages,
                thisPage: newPages[0]
            })
        }
    }

    moveForwardButton = function () {
        if (this.state.pageNumber !== this.state.pages.length) {
            return <Pager.Item onClick={this.moveForward}>Next</Pager.Item>
        }
    }.bind(this)

    moveBackButton = function () {
        if (this.state.pageNumber !== 0) {
            return <Pager.Item onClick={this.moveBack} >Previous</Pager.Item>
        }
    }.bind(this)

    moveForward = function () {
        const modal = document.getElementById("episode--modal")
        const newPageNumber = this.state.pageNumber + 1
        console.log(this.state.pages[newPageNumber])
        this.setState({
            thisPage: this.state.pages[newPageNumber],
            pageNumber: newPageNumber
        })
        modal.scrollTo(0, 0)
    }.bind(this)

    moveBack = function () {
        const modal = document.getElementById("episode--modal")
        const newPageNumber = this.state.pageNumber - 1
        this.setState({
            thisPage: this.state.pages[newPageNumber],
            pageNumber: newPageNumber
        })
        modal.scrollTo(0, 0)
    }.bind(this)

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
                        {this.state.thisPage.map(p => (
                            <Episode saveEpisode={this.props.saveEpisode}
                                savedEpisodes={this.props.savedEpisodes}
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
                            />)
                        )}
                        <Pager>
                            {this.moveBackButton()}{' '}
                            {this.moveForwardButton()}
                        </Pager>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default EpisodeModal