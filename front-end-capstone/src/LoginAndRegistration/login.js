import React, { Component } from 'react';

class Login extends Component {
    state = {
        username: "",
        password: "",
        errorMessage: "Username or Password does not match",
    }

    handleSubmit = function (evt) {
        evt.preventDefault()

        fetch(`http://localhost:8088/users?username=${this.state.username}`)
            .then(r => r.json())

            .then(users => {
                const user = users[0]

                if (user === undefined || user.password !== this.state.password) {
                    alert(this.state.errorMessage)

                } else if (this.state.password === user.password) {
                    const remember = document.getElementById("checkbox")

                    localStorage.setItem("userId", user.id)
                }
                this.props.setActiveUser(user)
                // this.props.setView("home")
            })
    }.bind(this)

    handleFormFieldChange = function (evt) {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }.bind(this)

    render () {
        return (
            <form onSubmit={this.handleSubmit}>

                <input type="text"
                id="username"
                value={this.state.username}
                onChange={this.handleFormFieldChange}
                placeholder="username" />

                <input type="text"
                id="password"
                value={this.state.password}
                onChange={this.handleFormFieldChange}
                placeholder="password" />

                <button id="button--login">Submit</button>

            </form>
        )
    }
}

export default Login