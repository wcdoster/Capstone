import React, { Component } from 'react'

class NavBar extends Component {
    state = {
        userName: this.props.userName
    }

    searchSubmit = function (e) {
        e.preventDefault()
        this.props.getSearchResults()
        .then(this.props.setView("searchResults"))
    }.bind(this)

    render() {
        if(this.props.currentUser === ""){
            return(
                <nav>
                    <a id="home" onClick={this.props.onClickNav}>Home</a>
                    <form onSubmit={this.searchSubmit}>
                        <input id="searchValue" type="text" placeholder="search" value={this.props.searchValue} onChange={this.props.handleFormFieldChange}/>
                        <button type="submit">Submit</button>
                    </form>
                    <a id="login" onClick={this.props.onClickNav}>LogIn</a>
                </nav>
            )
        } else {
            return (
                <nav>
                    <a id="userPage" onClick={this.props.onClickNav}>{this.state.userName}</a>
                    <form onSubmit={this.searchSubmit}>
                        <input id="searchValue" type="text" placeholder="search" value={this.props.searchValue} onChange={this.props.handleFormFieldChange}/>
                        <button type="submit">Submit</button>
                    </form>
                    <a id="logout" onClick={this.props.logout}>LogOut</a>
                </nav>
            )
        }
    }
}

export default NavBar