import React, { Component } from 'react';
import {Collapse, Container, Label, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from 'reactstrap';
import { Link } from 'react-router-dom';
import UserIcon from "./Images/user.png"
import './CSS/NavMenu.css';

// const useStyles =  ({
//   menuItemTitle :{
//     alignItems: "center"
//   },
// });

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    // this.imageResize = this.imageResize.bind(this);

    this.toggleNavbar = this.toggleNavbar.bind(this);

    this.state = {
      collapsed: true,
      visibility: false
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed,
      visibility: !this.state.visibility
    });
  }

  render () {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <Container className="head">
            <NavbarBrand tag={Link} to="/">BooMBooK</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2"/>
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-dark"  to="/Authentication">
                    <img className="menuItemIcon center" src= { UserIcon } alt="UserIcon"/>
                    {/*<img className="menuItemIcon" src= { UserIcon } alt="UserIcon" width={this.state.width}/>*/}
                    <Label className="menuItemTitle center">Profile</Label>
                  </NavLink>
                </NavItem>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
