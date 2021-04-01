import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import UserIcon from "./Images/user.png"
import './NavMenu.css';
import {ModalWindow} from "./ModalWindow/ModalWindow";
import {AuthenticationPage} from "./AuthenticationPage";




export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);

    this.state = {
      isPressed:false,
      collapsed: true,
      visibility: false,
      active:false
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed,
      visibility: !this.state.visibility
    });
  }

  setActive(value){
    this.setState({
      active:value
    });
  }

  render () {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand tag={Link} to="/">BooMBooK</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2"/>
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                {/*<NavItem>*/}
                {/*  <NavLink tag={Link} className="text-dark"  to="/Authentication">*/}
                {/*    <img className="menuItemIcon center" src= { UserIcon } alt="UserIcon"/>*/}
                {/*    <Label className="menuItemTitle center">Profile</Label>*/}
                {/*  </NavLink>*/}
                {/*</NavItem>*/}
                <NavItem>
                  <div onClick={()=>this.setActive(true)}>
                    <img src={UserIcon}
                         className="menuItemIcon center"
                         alt="UserIcon"/>
                    <label className="menuItemTitle center">
                      Profile
                    </label>
                  </div>
                  <ModalWindow active = {this.state.active}
                      setActive={()=> this.setActive()}>
                    <AuthenticationPage/>
                  </ModalWindow>
                </NavItem>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
