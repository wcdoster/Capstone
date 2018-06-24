import React, { Component } from 'react'
import PodcastList from '../Podcasts/PodcastList'
// import EpisodeList from '../Podcasts/EpisodeList'
import TopList from '../HomePage/TopList'
import './userPage.css'
import { Tabs, Tab } from 'react-bootstrap'
import UserPageEpisodes from './UserPageEpisodes'
// const $ = require('jquery')

class UserPage extends Component {
    state = {
        subscribedPodcasts: [],
        finishedPodcasts: [],
        inProgressPodcasts: [],
        savedEpisodes: []
    }



    componentDidMount() {
        console.log(this.state.savedEpisodes)
        fetch(`http://localhost:8088/subscribedPodcasts?userId=${this.props.currentUser}`)
            .then(r => r.json())
            .then(results => {
                let podcastList = []
                results.forEach(result => {
                    fetch(`https://itunes.apple.com/lookup?id=${result.collectionId}`)
                        .then(r => r.json())
                        .then(x => {
                            const podcast = x.results[0]
                            podcastList.push(podcast)
                            this.setState({
                                subscribedPodcasts: podcastList,
                                savedEpisodes: this.props.savedEpisodes
                            })
                        })
                })
            })

        // fetch(`http://localhost:8088/finishedPodcasts?userId=${this.props.currentUser}`)
        //     .then(r => r.json())
        //     .then(results => {
        //         const podcastList = []
        //         results.forEach(x => {
        //             $.get(`${x.rssFeed}?format=xml`, p => {
        //                 const eps = this.props.xmlToJson(p)
        //                 const episodes = eps.rss.channel.item
        //                 episodes.forEach(episode => {
        //                     if (episode.title["#text"] === x.title) {
        //                         podcastList.push(episode)
        //                         this.setState({
        //                             finishedPodcasts: podcastList
        //                         })
        //                     }
        //                 })
        //             })

        //         })
        //     })
        // fetch(`http://localhost:8088/inProgressPodcasts?userId=${this.props.currentUser}`)
        //     .then(r => r.json())
        //     .then(results => {
        //         const podcastList = []
        //         results.forEach(x => {
        //             $.get(`${x.rssFeed}?format=xml`, p => {
        //                 const eps = this.props.xmlToJson(p)
        //                 const episodes = eps.rss.channel.item
        //                 episodes.forEach(episode => {
        //                     if (episode.title["#text"] === x.title) {
        //                         podcastList.push(episode)
        //                         this.setState({
        //                             inProgressPodcasts: podcastList
        //                         })
        //                     }
        //                 })
        //             }
        //             )
        //         })
    }

    render() {
        return (
            <div id="userpage--div" >
                <Tabs defaultActiveKey={1} id="tabs">
                    <Tab eventKey={1} title="Your Podcasts">
                        <h2>Your Podcasts</h2>
                        <PodcastList searchResults={this.state.subscribedPodcasts} podcastClick={this.props.podcastClick} />
                        {/* <h2>Most Recent Episodes</h2>
                <EpisodeList hidden={true} click={this.props.click} episodes={this.state.finishedPodcasts} /> */}
                        <h2>Saved Episodes</h2>
                        <UserPageEpisodes  
                        click={this.props.click} 
                        queue={this.props.queue} 
                        collectionName={this.props.collectionName} 
                        queueClick={this.props.queueClick} 
                        removeFromQueue={this.props.removeFromQueue}  />
                    </Tab>
                    <Tab eventKey={2} title="Top Podcasts">
                        <h2>Top Podcasts</h2>
                        <TopList podcastClick={this.props.podcastClick} />
                    </Tab>
                </Tabs>
            </div >
        )
    }
}

export default UserPage