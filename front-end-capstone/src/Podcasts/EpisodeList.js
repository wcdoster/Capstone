import React, { Component } from 'react'
import Episode from './Episode'

class EpisodeList extends Component {
    
    uniqueKey = 1

    // check = function(string) {
    //     let x = new RegExp("/(<[^>]*>)/ig")
    //     let target = string.toString().replace(x,"");
    //     console.log(target)
    // }.bind(this)
    
    render(){
        return(
            <div>
                {this.props.episodes.map(p => (
                    <Episode click={this.props.click} description={p["description"]["#cdata-section"]} episodeName={p.title["#text"]}  key={this.uniqueKey++} />
                ))}
            </div>
        )
    }
}

export default EpisodeList