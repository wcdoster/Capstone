import React, { Component } from 'react';
import './App.css';
import Login from './LoginAndRegistration/login'
import NavBar from './NavBar/NavBar'
import PodcastList from './Podcasts/PodacastList'


class App extends Component {
  state = {
    currentUser: "1",
    podcastApp: "",
    view: "",
    searchValue: "",
    userName: "wcdoster",
    searchResults: []
  }

  setActiveUser = function (user) {
    this.setState({
      currentUser: user
    })
  }.bind(this)

  // setView = function(view) {

  // }

  handleFormFieldChange = function (evt) {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }.bind(this)

  setView = function (newView) {
    this.setState({
      view: newView
    })
    // console.log(this.state.view)
  }.bind(this)

  onClickNav = function (e) {
    this.setView(e.target.id)
    console.log(e.target.id)
  }.bind(this)
  
  getSearchResults = function () {
    const terms = this.state.searchValue.split(" ")
    const newTerms = terms.join('+')
    return (fetch(`https://itunes.apple.com/search?media=podcast&term=${newTerms}`)
      .then(r => r.json())
      .then(results => {
        this.setState({
          searchResults: results
        })
      }))
  }.bind(this)

  showView = function(){
    switch (this.state.view) {
      case "searchResults":
      return <PodcastList searchResults={this.state.searchResults} name={this.state.collectionName} image={this.state.artworkUrl30} />
      case "login":
      default:
          return <Login setActiveUser={this.state.setActiveUser} />
    }
  }.bind(this)


  render() {
    return (
      <div>
        <NavBar curentUser={this.state.currentUser}
          userName={this.state.userName}
          searchValue={this.state.searchValue}
          handleFormFieldChange={this.handleFormFieldChange}
          onClickNav={this.onClickNav}
          setSearchTerms={this.setSearchTerms}
          getSearchResults={this.getSearchResults}
          setView={this.setView}
        />

        {this.showView()}
      </div>
    )
  }
}

export default App