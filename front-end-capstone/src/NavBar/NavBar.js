import React, { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { FormControl, Button, FormGroup, NavItem } from 'react-bootstrap'
import LoginAndRegistration from '../LoginAndRegistration/LoginAndRegistration'
import './navbar.css'

class NavBar extends Component {

    render() {
        if (this.props.currentUser === "") {
            return (
                <Navbar fluid fixedTop>

                    <Navbar.Header>
                        <Nav>
                            <NavItem id="home" onClick={this.props.onClickNav}>
                                home
                            </NavItem>
                        </Nav>
                    </Navbar.Header>
                    <Navbar.Toggle />
                    <Navbar.Collapse>
                        <Nav>
                            <Navbar.Form>
                                <FormGroup>
                                    <FormControl id="searchValue" type="text" placeholder="search" value={this.props.searchValue} onChange={this.props.handleFormFieldChange} />
                                </FormGroup>{' '}
                                <Button onClick={this.props.searchSubmit} type="submit">Submit</Button>
                            </Navbar.Form>
                        </Nav>
                        <LoginAndRegistration setButtonClass={this.props.setButtonClass} setActiveUser={this.props.setActiveUser} setView={this.props.setView} />
                    </Navbar.Collapse>
                </Navbar>
            )
        } else {
            return (
                <Navbar fluid fixedTop>
                    <Navbar.Header>
                        <Nav>
                            <NavItem id="userPage" onClick={this.props.onClickNav}>
                                {this.props.userName}
                            </NavItem>
                        </Nav>
                    </Navbar.Header>
                    <Navbar.Toggle />
                    <Navbar.Collapse>
                        <Nav>
                            <Navbar.Form>
                                <FormGroup>
                                    <FormControl id="searchValue" type="text" placeholder="search" value={this.props.searchValue} onChange={this.props.handleFormFieldChange} />
                                </FormGroup>{' '}
                                <Button onClick={this.props.searchSubmit} type="submit">Submit</Button>
                            </Navbar.Form>
                        </Nav>
                        <Nav pullRight>
                            <NavItem id="logout" onClick={this.props.logout}>
                                logout
                            </NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            )
        }
    }
}

export default NavBar