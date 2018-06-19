import React, { Component } from 'react'
import { Button, Collapse } from 'react-bootstrap'

class MediaPlayer extends Component{

    state = {
        open: false
      };

    // returnButton = function() {
    //     this.props.setView("podcastPage")
    // }.bind(this)

    render() {
        return(
            <div className="mediaPlayer--div">
                {/* <img src={this.props.imageUrl} width="100px" alt={this.props.name}/>
                <audio controls>
                    <source src={this.props.mediaUrl} type={this.props.mediaType} />
                </audio> */}
        
        
            <Button onClick={() => this.setState({ open: !this.state.open })}>
          click
        </Button>
        <Collapse in={this.state.open}>
          <div>
          <img src={this.props.imageUrl} width="100px" alt={this.props.name}/>
          <audio controls>
                    <source src={this.props.mediaUrl} type={this.props.mediaType} />
                </audio>
          </div>
        </Collapse>
        
        </div>
        )
    }
}

export default MediaPlayer