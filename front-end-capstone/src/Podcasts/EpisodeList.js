import React, { Component } from 'react'
import Episode from './Episode'
import './episodeList.css'

class EpisodeList extends Component {
    
    uniqueKey = 1

    check = function(string) {
        let p = string.replace(/<[^>]*>/gi, '');
        return p
    }.bind(this)
    
    render(){
        return(
            <div className="episodeList--div">
                <h3>Episodes</h3>
                {this.props.episodes.slice(0, 10).map(p => (
                    <Episode hidden={this.props.hidden} click={this.props.click} episodeName={p.title["#text"]}  key={this.uniqueKey++} />
                ))}
            </div>
        )
    }
}

export default EpisodeList


// description={this.check(p["description"]["#cdata-section"])}