import React, { Component } from 'react'
import Login from './login'
import Registration from './register'

class LoginAndRegistration extends Component {
    render() {
        return(
            <div>
                <Login setActiveUser={this.props.setActiveUser}/>
                <Registration setActiveUser={this.props.setActiveUser} />
            </div>
        )
    }
}

export default LoginAndRegistration