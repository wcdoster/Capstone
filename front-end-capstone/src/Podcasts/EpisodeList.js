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
                <h3>Episodes</h3>
                {this.props.episodes.slice(0, 10).map(p => (
                    <Episode queueHidden={this.props.queueHidden} queueClick={this.props.queueClick} hidden={this.props.hidden} description={this.props.check(this.descriptionType(p.description))} click={this.props.click} episodeName={p.title["#text"]} key={this.uniqueKey++} />
                ))}
            </div>
        )
    }
}

export default EpisodeList


// description={this.check(p["description"]["#cdata-section"])}