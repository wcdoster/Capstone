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
    podcastImage: "",
    mediaUrl: "",
    mediaType: "",
    imageUrl: "",
    episodeName: "",
    collectionName: "",
    timestamp: Date.now(),
    class: "hidden",
    open: false,
    buttonText: "v",
    description: "",
    queue: [],
    queueHidden: "queue--hidden",
    queueOpen: false,
    savedEpisodes: []
  }

  componentDidMount() {
    this.initialView()
    const userId = JSON.parse(localStorage.getItem("userId"))
    const currentQueue = JSON.parse(localStorage.getItem("queue"))
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
      fetch(`http://localhost:8088/savedEpisodes?userId=${userId}`)
        .then(r => r.json())
        .then(results => {
          this.setState({
            savedEpisodes: results
          })
        })
    }
    if (currentQueue) {
      this.setState({
        queue: currentQueue
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

  regexCheck = function (string) {
    let p = string.replace(/<[^>]*>/gi, '');
    return p
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

  setButtonClass = function (newClass) {
    this.setState({
      class: newClass
    })
  }.bind(this)

  fetchRss = function (targetCondition) {
    fetch(`https://itunes.apple.com/lookup?id=${targetCondition}`)
      .then(r => r.json())
      .then(result => {
        let thisFeedUrl = result.results[0].feedUrl
        if (thisFeedUrl.indexOf('?format=xml') === -1) {
          thisFeedUrl += '?format=xml'
        }
        $.get(thisFeedUrl, r => {
          const current = this.xmlToJson(r)
          const desc = current.rss.channel.description

          let thisDescription = ""

          if (desc["#cdata-section"]) {
            thisDescription = desc["#cdata-section"]
          } else if (desc["#text"]) {
            thisDescription = desc["#text"]
          } else {
            thisDescription = desc
          }

          this.setState({
            currentPodcast: current,
            currentItunesInformation: result,
            description: thisDescription
          })
        }).then(() => {
          this.setView("podcastPage")
          window.scrollTo(0, 0)
        })
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
    this.fetchRss(targetCondition)
  }.bind(this)

  viewThisPodcast = function (e) {
    const objectId = e.target.parentNode.id
    console.log(objectId)
    fetch(`http://localhost:8088/savedEpisodes?id=${objectId}`)
      .then(r => r.json())
      .then(p => {
        console.log(p)
        const result = p[0]
        this.setState({
          podcastId: result.collectionId
        })
        this.fetchRss(result.collectionId)
      }
      )
  }.bind(this)

  playButtonClick = function (e) {
    const currentEpisode = this.state.currentPodcast.rss.channel.item.find(episode => {
      return episode.title["#text"] === e.target.parentNode.id.toString()
    })
    this.setState({
      mediaUrl: currentEpisode.enclosure["@attributes"].url,
      mediaType: currentEpisode.enclosure["@attributes"].type,
      imageUrl: this.state.currentItunesInformation.results[0].artworkUrl600,
      episodeName: currentEpisode.title["#text"],
      collectionName: this.state.currentItunesInformation.results[0].collectionName,
      open: true,
      isPlaying: false
    })
    const media = document.getElementById("mediaPlayer")
    if (media !== null) {
      media.pause()
      media.load()
      media.oncanplaythrough = media.play()
    }
  }.bind(this)

  userPagePlayButtonClick = function (e) {
    const objectId = e.target.parentNode.id
    console.log(objectId)
    fetch(`http://localhost:8088/savedEpisodes?id=${objectId}`)
      .then(r => r.json())
      .then(p => {
        const result = p[0]
        this.setState({
          mediaUrl: result.mediaUrl,
          mediaType: result.mediaType,
          imageUrl: result.imageUrl,
          episodeName: result.title,
          collectionName: result.collectionName,
          open: true,
          isPlaying: false
        })
      })
    const media = document.getElementById("mediaPlayer")
    if (media !== null) {
      media.pause()
      media.load()
      media.oncanplaythrough = media.play()
    }
  }.bind(this)

  closeClick = function () {
    this.setState({
      mediaUrl: ""
    })
  }.bind(this)

  clickQueueEpisode = function (e) {
    const media = document.getElementById("mediaPlayer")
    const nextEpisodeName = e.target.id
    const nextEpisodeIndex = this.state.queue.indexOf(this.state.queue.find(episode => {
      return episode.episodeName === nextEpisodeName
    }))
    const nextEpisode = this.state.queue[nextEpisodeIndex]
    console.log(nextEpisode)
    this.setState({
      mediaUrl: nextEpisode.mediaUrl,
      mediaType: nextEpisode.mediaType,
      imageUrl: nextEpisode.imageUrl,
      episodeName: nextEpisode.episodeName,
      collectionName: nextEpisode.collectionName,
      open: true,
      isPlaying: false
    })
    let array = this.state.queue
    array.splice(nextEpisodeIndex, 1)
    this.setState({
      queue: array
    })
    localStorage.setItem("queue", JSON.stringify(array))
    media.pause()
    media.load()
    media.oncanplaythrough = media.play()
  }.bind(this)

  moveUp = function (e) {
    let thisArray = this.state.queue
    const episode = e.target.parentNode.previousSibling.id
    const episodeIndex = this.state.queue.indexOf(this.state.queue.find(thisepisode => {
      return thisepisode.episodeName === episode
    }))
    const newIndex = episodeIndex - 1
    if (episodeIndex === 1) {
      const beginning = thisArray.splice(1, 1)
      const newArray = beginning.concat(thisArray)
      this.setState({
        queue: newArray
      })
      localStorage.setItem("queue", JSON.stringify(newArray))
    } else if (episodeIndex > 0) {
      const beginning = thisArray.splice(0, newIndex)
      const middle = thisArray.splice(1, 1)
      const newArray = beginning.concat(middle, thisArray)
      this.setState({
        queue: newArray
      })
      localStorage.setItem("queue", JSON.stringify(newArray))
    }
  }.bind(this)

  moveDown = function (e) {
    let thisArray = this.state.queue
    const episode = e.target.parentNode.previousSibling.id
    const episodeIndex = this.state.queue.indexOf(this.state.queue.find(thisepisode => {
      return thisepisode.episodeName === episode
    }))
    if (episodeIndex === thisArray.length - 2) {
      const end = thisArray.splice(episodeIndex, 1)
      const newArray = thisArray.concat(end)
      this.setState({
        queue: newArray
      })
      localStorage.setItem("queue", JSON.stringify(newArray))
    }
    if (episodeIndex !== thisArray.length - 1) {
      const item = thisArray.splice(episodeIndex, 1)
      const beginning = thisArray.splice(0, episodeIndex + 1)
      const newArray = beginning.concat(item, thisArray)
      this.setState({
        queue: newArray
      })
      localStorage.setItem("queue", JSON.stringify(newArray))
    }
  }.bind(this)

  removeFromQueue = function (e) {
    const check1 = e.target.parentNode.firstChild.id
    const check2 = e.target.parentNode.id
    const episodeIndex = this.state.queue.indexOf(this.state.queue.find(thisepisode => {
      return thisepisode.episodeName === (check1 || check2)
    }))
    let array = this.state.queue
    array.splice(episodeIndex, 1)
    this.setState({
      queue: array
    })
    localStorage.setItem("queue", JSON.stringify(array))
  }.bind(this)

  showMediaPlayer = function () {
    if (this.state.mediaUrl !== "") {
      return <MediaPlayer removeFromQueue={this.removeFromQueue}
        moveUp={this.moveUp}
        moveDown={this.moveDown}
        clickQueueEpisode={this.clickQueueEpisode}
        queueHidden={this.state.queueHidden}
        queueOpen={this.state.queueOpen}
        queueOpenClick={this.queueOpenClick}
        queue={this.state.queue}
        mediaEnd={this.mediaEndCheck}
        closeClick={this.closeClick}
        currentUser={this.state.currentUser}
        episodeName={this.state.episodeName}
        collectionId={this.state.collectionId}
        setView={this.setView}
        imageUrl={this.state.imageUrl}
        mediaUrl={this.state.mediaUrl}
        mediaType={this.state.mediaType}
        name={this.state.collectionName}
        buttonText={this.state.buttonText}
        mediaPlayerButton={this.mediaPlayerButton}
        open={this.state.open} />
    }
  }.bind(this)

  mediaPlayerButton = function () {
    this.setState({
      open: !this.state.open,
    })
    if (this.state.open === true) {
      this.setState({
        buttonText: "^",
      })
    } else {
      this.setState({
        buttonText: "v",
      })
    }
  }.bind(this)

  queueOpenClick = function () {
    if (this.state.queueOpen) {
      this.setState({
        queueOpen: !this.state.queueOpen,
        queueHidden: "queue--hidden"
      })
    } else {
      this.setState({
        queueOpen: !this.state.queueOpen,
        queueHidden: ""
      })
    }
  }.bind(this)

  queueClick = function (e) {
    const queueEpisode = this.state.currentPodcast.rss.channel.item.find(episode => {
      return episode.title["#text"] === e.target.parentNode.id.toString()
    })
    const nextEpisode = {
      mediaUrl: queueEpisode.enclosure["@attributes"].url,
      mediaType: queueEpisode.enclosure["@attributes"].type,
      imageUrl: this.state.currentItunesInformation.results[0].artworkUrl600,
      episodeName: queueEpisode.title["#text"],
      collectionName: this.state.currentItunesInformation.results[0].collectionName
    }
    let newQueueArray = this.state.queue
    newQueueArray.push(nextEpisode)
    this.setState({
      queue: newQueueArray
    })
    localStorage.setItem("queue", JSON.stringify(newQueueArray))
  }.bind(this)

  queueClickUserPage = function (e) {
    const objectId = e.target.parentNode.id
    console.log(objectId)
    fetch(`http://localhost:8088/savedEpisodes?id=${objectId}`)
      .then(r => r.json())
      .then(p => {
        const result = p[0]
        const nextEpisode = {
          mediaUrl: result.mediaUrl,
          mediaType: result.mediaType,
          imageUrl: result.imageUrl,
          episodeName: result.title,
          collectionName: result.collectionName
        }
        let newQueueArray = this.state.queue
        newQueueArray.push(nextEpisode)
        this.setState({
          queue: newQueueArray
        })
        localStorage.setItem("queue", JSON.stringify(newQueueArray))
      })
  }.bind(this)

  mediaEndCheck = function () {
    const media = document.getElementById("mediaPlayer")
    if (media) {
      if (media.ended && this.state.queue.length > 0) {
        this.setState({
          mediaUrl: this.state.queue[0].mediaUrl,
          mediaType: this.state.queue[0].mediaType,
          imageUrl: this.state.queue[0].imageUrl,
          episodeName: this.state.queue[0].episodeName,
          collectionName: this.state.queue[0].collectionName,
          open: true,
          isPlaying: false
        })
        let newQueue = this.state.queue
        newQueue.shift()
        this.setState({
          queue: newQueue
        })
        localStorage.setItem("queue", JSON.stringify(newQueue))
        media.pause()
        media.load()
        media.oncanplaythrough = media.play()
      }
    }
  }.bind(this)

  renderSave = function () {
    fetch(`http://localhost:8088/savedEpisodes?userid=${this.state.currentUser}`)
      .then(r => r.json())
      .then(results => {
        console.log(results)
        this.setState({
          savedEpisodes: results
        })
      })
  }.bind(this)

  removeSave = function (e) {
    const episodeId = e.target.parentNode.id
    fetch(`http://localhost:8088/savedEpisodes/${episodeId}`, {
      method: 'DELETE'
    })
      .then(() => {
        this.renderSave()
      })
  }.bind(this)

  showView = function () {
    switch (this.state.view) {
      case "podcastPage":
        return <PodcastPage savedEpisodes={this.state.savedEpisodes}
          renderSave={this.renderSave}
          removeFromQueue={this.removeFromQueue}
          queue={this.state.queue}
          queueClick={this.queueClick}
          check={this.regexCheck}
          description={this.state.description}
          setView={this.setView}
          class={this.state.class}
          image={this.state.currentItunesInformation.results[0].artworkUrl600}
          episodes={this.state.currentPodcast.rss.channel.item}
          click={this.playButtonClick}
          name={this.state.currentItunesInformation.results[0].collectionName}
          currentUser={this.state.currentUser}
          collectionId={this.state.currentItunesInformation.results[0].collectionId}
          rssFeed={this.state.currentItunesInformation.results[0].feedUrl}
          mediaUrl={this.state.currentItunesInformation}
          mediaType={this.props.mediaType}
          currentEpisode={this.state.episodeName}
          currentlyPlayingPodcast={this.state.collectionName}
        />
      case "searchResults":
        return <PodcastList searchResults={this.state.searchResults}
          setView={this.setView}
          podcastClick={this.podcastClick} />
      case "userPage":
        return <UserPage savedEpisodes={this.state.savedEpisodes}
          key={this.state.timestamp}
          currentUser={this.state.currentUser}
          podcastClick={this.podcastClick}
          xmlToJson={this.xmlToJson}
          click={this.userPagePlayButtonClick}
          queue={this.state.queue}
          collectionName={this.props.collectionName}
          queueClick={this.queueClickUserPage}
          removeFromQueue={this.removeFromQueue}
          viewThisPodcast={this.viewThisPodcast}
          removeSave={this.removeSave} />
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

        {this.showMediaPlayer()}

      </div >
    )
  }
}

export default App