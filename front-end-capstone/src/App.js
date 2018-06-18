import React, { Component } from 'react';
import './App.css';
import NavBar from './NavBar/NavBar'
import PodcastList from './Podcasts/PodcastList'
import PodcastPage from './Podcasts/PodcastPage'
import MediaPlayer from './Podcasts/PodcastPlayer'
import HomePage from './HomePage/HomePage'
import UserPage from './UserPage/UserPage'

const $ = require('jquery')

class App extends Component {
  state = {
    currentUser: "",
    podcastId: "",
    view: "",
    searchValue: "",
    userName: "",
    searchResults: [],
    currentPodcast: {},
    currentItunesInformation: {},
    mediaUrl: "",
    mediaType: "",
    imageUrl: "",
    timestamp: Date.now(),
    class: "hidden"
  }

  componentDidMount() {
    this.initialView()
    const userId = localStorage.getItem("userId")
    if (userId) {
      fetch(`http://localhost:8088/users?id=${userId}`)
        .then(r => r.json())
        .then(result => {
          const thisUser = result[0]
          this.setState({
            currentUser: thisUser.id,
            userName: thisUser.username,
            timestamp: Date.now(),
            class: ""
          })
          // this.setView("home")
        })
    }
  }

  initialView = function () {
    const userId = localStorage.getItem("userId")
    if (userId) {
      this.setView("userPage")
    } else {
      this.setView("home")
    }
  }.bind(this)

  xmlToJson = function (xml) {
    // Create the return object
    var obj = {};
    if (xml.nodeType === 1) { // element
      // do attributes
      if (xml.attributes.length > 0) {
        obj["@attributes"] = {};
        for (var j = 0; j < xml.attributes.length; j++) {
          var attribute = xml.attributes.item(j);
          obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
        }
      }
    } else if (xml.nodeType === 3 || xml.nodeType === 4) { // text
      obj = xml.nodeValue;
    }

    // do children
    if (xml.hasChildNodes()) {
      for (var i = 0; i < xml.childNodes.length; i++) {
        var item = xml.childNodes.item(i);
        var nodeName = item.nodeName;
        if (typeof (obj[nodeName]) === "undefined") {
          obj[nodeName] = this.xmlToJson(item);
        } else {
          if (typeof (obj[nodeName].push) === "undefined") {
            var old = obj[nodeName];
            obj[nodeName] = [];
            obj[nodeName].push(old);
          }
          obj[nodeName].push(this.xmlToJson(item));
        }
      }
    }
    return obj;
  }.bind(this)

  setActiveUser = function (user) {
    this.setState({
      currentUser: user.id,
      userName: user.username
    })
  }.bind(this)

  logout = function () {
    this.setState({
      currentUser: "",
      userName: ""
    })
    localStorage.clear()
    this.setView("home")
    this.setButtonClass("hidden")
  }.bind(this)


  handleFormFieldChange = function (evt) {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }.bind(this)


  setView = function (newView) {
    this.setState({
      view: newView
    })
  }.bind(this)

  onClickNav = function (e) {
    this.setView(e.target.id)
  }.bind(this)

  searchSubmit = function (e) {
    e.preventDefault()
    this.getSearchResults()
      .then(() => {
        this.setView("searchResults")
        this.setState({
          searchValue: ""
        })
      })
  }.bind(this)

  getSearchResults = function () {
    const terms = this.state.searchValue.split(" ")
    const newTerms = terms.join('+')
    return (fetch(`https://itunes.apple.com/search?media=podcast&term=${newTerms}`)
      .then(r => r.json())
      .then(results => {
        this.setState({
          searchResults: results.results
        })
      }))
  }.bind(this)

  setButtonClass = function(newClass) {
    this.setState({
      class: newClass
    })
  }.bind(this)


  podcastClick = function (e) {
    e.preventDefault()
    const targetCondition = e.target.parentNode.id || e.target.id
    if (targetCondition) {
      this.setState({
        podcastId: +targetCondition
      })
    }
    fetch(`https://itunes.apple.com/lookup?id=${targetCondition}`)
      .then(r => r.json())
      .then(result => {
        $.get(`${result.results[0].feedUrl}?format=xml`, r => {

          this.setState({
            currentPodcast: this.xmlToJson(r),
            currentItunesInformation: result
          })
        }).then(() => this.setView("podcastPage"))
      })
  }.bind(this)

  // userPagePlayClick = function(e) {
  //   e.preventDefault
  //   const currentEpisode = 
  // }


  playButtonClick = function (e) {
    
    const currentEpisode = this.state.currentPodcast.rss.channel.item.find(episode => {
      return episode.title["#text"] === e.target.parentNode.id.toString()
    })
    this.setState({
      mediaUrl: currentEpisode.enclosure["@attributes"].url,
      mediaType: currentEpisode.enclosure["@attributes"].type,
      imageUrl: currentEpisode["itunes:image"]["@attributes"].href
    })
    this.setView("mediaPlayer")
  }.bind(this)

  showView = function () {

    switch (this.state.view) {
      case "mediaPlayer":
        return <MediaPlayer setView={this.setView} imageUrl={this.state.imageUrl} mediaUrl={this.state.mediaUrl} mediaType={this.state.mediaType} name={this.state.collectionName} />
      case "podcastPage":
        return <PodcastPage class={this.state.class} image={this.state.currentItunesInformation.results[0].artworkUrl600} episodes={this.state.currentPodcast.rss.channel.item} click={this.playButtonClick} name={this.state.currentItunesInformation.results[0].collectionName} currentUser={this.state.currentUser} collectionId={this.state.currentItunesInformation.results[0].collectionId} />
      case "searchResults":
        return <PodcastList searchResults={this.state.searchResults} setView={this.setView} podcastClick={this.podcastClick} />
      case "userPage":
        return <UserPage key={this.state.timestamp} currentUser={this.state.currentUser} podcastClick={this.podcastClick} xmlToJson={this.xmlToJson} />
      case "home":
        return <HomePage podcastClick={this.podcastClick} />
    }
  }.bind(this)




  render() {
    return (
      <div>
        <NavBar currentUser={this.state.currentUser}
          userName={this.state.userName}
          searchValue={this.state.searchValue}
          handleFormFieldChange={this.handleFormFieldChange}
          onClickNav={this.onClickNav}
          searchSubmit={this.searchSubmit}
          setSearchTerms={this.setSearchTerms}
          getSearchResults={this.getSearchResults}
          setView={this.setView}
          logout={this.logout}
          setActiveUser={this.setActiveUser}
          setButtonClass={this.setButtonClass}
        />

        <div id="content">
          {this.showView()}
        </div>
      </div >
    )
  }
}

export default App