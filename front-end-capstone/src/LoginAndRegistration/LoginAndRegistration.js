import React, { Component } from 'react'
import Login from './login'
import Registration from './register'
import { Modal, Nav, NavItem } from 'react-bootstrap'
import './loginAndRegistration.css'

class LoginAndRegistration extends Component {

    state = {
        loginShow: false,
        registerShow: false
    }

    handleLoginClose = function () {
        this.setState({ loginShow: false });
    }.bind(this)

    handleLoginShow = function () {
        this.setState({ loginShow: true });
    }.bind(this)

    handleRegisterClose = function () {
        this.setState({ registerShow: false });
    }.bind(this)

    handleRegisterShow = function () {
        this.setState({ registerShow: true });
    }.bind(this)

    render() {
        return (
            <div>
                <Nav pullRight>
                    <NavItem eventKey={1} id="login" onClick={this.handleLoginShow}>
                        login
                    </NavItem>
                    <NavItem eventKey={2} id="register" onClick={this.handleRegisterShow}>
                        register
                    </NavItem>
                </Nav>

                <Modal animation={false} show={this.state.loginShow} onHide={this.handleLoginClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Login setButtonClass={this.props.setButtonClass} setActiveUser={this.props.setActiveUser} setView={this.props.setView} />
                    </Modal.Body>
                </Modal>

                <Modal animation={false} show={this.state.registerShow} onHide={this.handleRegisterClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>register</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Registration setButtonClass={this.props.setButtonClass} setActiveUser={this.props.setActiveUser} setView={this.props.setView} />
                    </Modal.Body>
                </Modal>
            </div >
        )
    }
}

export default LoginAndRegistration