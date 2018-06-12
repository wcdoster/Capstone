import React, { Component } from 'react';
import './App.css';
import Login from './LoginAndRegistration/login'
import NavBar from './NavBar/NavBar'
import PodcastList from './Podcasts/PodcastList'
import EpisodeList from './Podcasts/EpisodeList'
import MediaPlayer from './Podcasts/PodcastPlayer'
import Registration from './LoginAndRegistration/register';

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
    imageUrl: ""
  }

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


  playButtonClick = function (e) {
    e.preventDefault
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
        return <MediaPlayer imageUrl={this.state.imageUrl} mediaUrl={this.state.mediaUrl} mediaType={this.state.mediaType} />
      case "podcastPage":
        return <EpisodeList episodes={this.state.currentPodcast.rss.channel.item} click={this.playButtonClick} />
      case "searchResults":
        return <PodcastList searchResults={this.state.searchResults} setView={this.setView} podcastClick={this.podcastClick} />
      case "login":
      default:
        return <Login setActiveUser={this.setActiveUser} /> 
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
          setSearchTerms={this.setSearchTerms}
          getSearchResults={this.getSearchResults}
          setView={this.setView}
        />

        {this.showView()}
      </div >
    )
  }
}

export default App