import React, { Component } from 'react';

class Registration extends Component {

    state = {
        email: "",
        username: "",
        password: "",
        errorMessage: "You must complete every field"
    }

    handleFormFieldChange = function (evt) {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }.bind(this)

    handleSubmit = function (evt) {
        evt.preventDefault()

        const newUser = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
        }


        fetch("http://localhost:8088/users")
            .then(r => r.json())
            .then(users => {

                let emailUniqueCheck = true
                let usernameUniqueCheck = true

                users.forEach(user => {
                    if (user.username === newUser.username) {
                        usernameUniqueCheck = false
                    }
                    if (user.email === newUser.email) {
                        emailUniqueCheck = false
                    }
                })

                if (
                    this.state.email === "" ||
                    this.state.username === "" ||
                    this.state.password === ""
                ) {
                    alert(this.state.errorMessage)
                } else if (!emailUniqueCheck) {
                    emailUniqueCheck = true
                    alert("Email is already registered")
                } else if (!usernameUniqueCheck) {
                    usernameUniqueCheck = true
                    alert("Username exists")
                } else {

                    fetch("http://localhost:8088/users", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(newUser)
                    })
                        .then(r => r.json())
                        .then(user => {
                            const userSet = JSON.stringify(user.id)
                            sessionStorage.setItem("userId", userSet)
                            localStorage.clear()

                            this.props.setActiveUser(user)
                            this.props.setView("userPage")
                        })
                }
            })
    }.bind(this)

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <input type="text"
                id="username"
                value={this.state.username}
                onChange={this.handleFormFieldChange}
                placeholder="username"/>


                <input type="text"
                id="email"
                value={this.state.email}
                onChange={this.handleFormFieldChange}
                placeholder="email"/>

                <input type="text"
                id="password"
                value={this.state.password}
                onChange={this.handleFormFieldChange}
                placeholder="password"/>

                <button id="registration--button">Submit</button>

            </form>
        )
    }
}

export default Registration