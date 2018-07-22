import React, { Component } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap'
import './login.css'

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
                    localStorage.setItem("userId", user.id)
                }
                this.props.setActiveUser(user)
                this.props.setView("userPage")
                this.props.setButtonClass("")
            })
    }.bind(this)

    handleFormFieldChange = function (evt) {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }.bind(this)

    render () {
        return (
            <Form>

                <FormControl type="text"
                id="username"
                value={this.state.username}
                onChange={this.handleFormFieldChange}
                placeholder="username" />

                <FormControl type="password"
                id="password"
                value={this.state.password}
                onChange={this.handleFormFieldChange}
                placeholder="password" />

                <Button onClick={this.handleSubmit} id="button--login">Submit</Button>

            </Form>
        )
    }
}

export default Login