import React from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem } from 'reactstrap';
import {Link, NavLink} from 'react-router-dom';
import UserIcon from "./Images/user.png"
import './NavMenu.css';
import {ModalWindow} from "./ModalWindow/ModalWindow";
import {AuthenticationPage} from "./AuthenticationPage/AuthenticationPage";
import {Button, Menu, MenuItem} from "@material-ui/core";
import {MainPopUpMenu} from "./MainPopUpMenu/MainPopUpMenu";

export function NavMenu() {

  const [isLoggedIn,setIsLoggedIn] = React.useState(
      Boolean(localStorage.getItem("User"))
  );

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const [isPressed,setIsPressed] = React.useState(false);

  // const [isCollapsed,setIsCollapsed] = React.useState(true);
  //
  // const [visibility,setVisibility] = React.useState(false);

  const [isActive, setIsActive] = React.useState(false);

  // function toggleNavbar () {
  //   setIsCollapsed(!isCollapsed);
  //   setVisibility(!visibility);
  // }

  //localStorage.removeItem("User");

  return (
      <header>
        <Navbar className="ng-white border-bottom box-shadow mb-3" light>
        {/*<Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>*/}
          <Container>
            <NavbarBrand tag={Link} to="/">BooMBooK</NavbarBrand>
            {/*<NavbarToggler onClick={toggleNavbar} className="mr-2"/>*/}
            {/*<Collapse className="d-sm-inline-flex flex-sm-row-reverse"*/}
            {/*          isOpen={!isCollapsed} navbar>*/}
              <ul className="navbar-nav flex-grow">
                {
                  !isLoggedIn &&
                  (
                      <NavItem onClick={ ()=> setIsActive(true) }>
                          <img src={UserIcon}
                               className="menuItemIcon center"
                               alt="UserIcon"/>
                        <ModalWindow active = {isActive}
                                     setActive={setIsActive}>
                          <AuthenticationPage/>
                        </ModalWindow>
                      </NavItem>
                  )
                }
                {
                  isLoggedIn &&
                  (
                      <NavItem>
                        <div>
                          <img aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}
                               src={UserIcon}
                               className="menuItemIcon center"
                               alt="UserIcon"/>
                               <MainPopUpMenu anchorEl={anchorEl}
                                              handleClose={handleClose}/>
                          {/*<Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>*/}
                          {/*  Open Menu*/}
                          {/*</Button>*/}
                          {/*<Menu id="simple-menu"*/}
                          {/*    anchorEl={anchorEl}*/}
                          {/*    keepMounted*/}
                          {/*    open={Boolean(anchorEl)}*/}
                          {/*    onClose={handleClose} >*/}
                          {/*  <MenuItem onClick={handleClose}>Profile</MenuItem>*/}
                          {/*  <MenuItem onClick={handleClose}>My account</MenuItem>*/}
                          {/*  <MenuItem onClick={handleClose}>Logout</MenuItem>*/}
                          {/*</Menu>*/}
                        </div>
                      </NavItem>
                  )
                }
              </ul>
            {/*</Collapse>*/}
          </Container>
        </Navbar>
      </header>
  );

}
// export class NavMenu extends Component {
//   static displayName = NavMenu.name;
//
//   constructor (props) {
//     super(props);
//
//     this.toggleNavbar = this.toggleNavbar.bind(this);
//
//     this.state = {
//       isLoggedIn: Boolean(localStorage.getItem("User")),
//       isPressed:false,
//       collapsed: true,
//       visibility: false,
//       active:false
//     };
//
//     console.log(Boolean(localStorage.getItem("User")));
//
//     // if (localStorage.getItem("User"))
//     //   this.setState({
//     //   isLoggedIn: true
//     // });
//
//   }
//
//   toggleNavbar () {
//     this.setState({
//       collapsed: !this.state.collapsed,
//       visibility: !this.state.visibility
//     });
//   }
//
//   setActive(value){
//
//     this.setState({
//       active:value
//     });
//
//   }
//
//   render () {
//     return (
//         <header>
//           <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
//             <Container>
//               <NavbarBrand tag={Link} to="/">BooMBooK</NavbarBrand>
//               <NavbarToggler onClick={this.toggleNavbar} className="mr-2"/>
//               <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
//                 <ul className="navbar-nav flex-grow">
//                   {
//                     !this.state.isLoggedIn &&
//                     (
//                         <NavItem onClick={()=>this.setActive(true)}>
//                           <div>
//                             <img src={UserIcon}
//                                  className="menuItemIcon center"
//                                  alt="UserIcon"/>
//                             <label className="menuItemTitle center">
//                               Profile
//                             </label>
//                           </div>
//                           <ModalWindow active = {this.state.active}
//                                        setActive={()=> this.setActive()}>
//                             <AuthenticationPage/>
//                           </ModalWindow>
//                         </NavItem>
//                     )
//                   }
//                   {
//                     this.state.isLoggedIn &&
//                     (
//                         <NavItem>
//                           <div>
//                             <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
//                               Open Menu
//                             </Button>
//                             <Menu
//                                 id="simple-menu"
//                                 anchorEl={anchorEl}
//                                 keepMounted
//                                 open={Boolean(anchorEl)}
//                                 onClose={handleClose} >
//                               <MenuItem onClick={handleClose}>Profile</MenuItem>
//                               <MenuItem onClick={handleClose}>My account</MenuItem>
//                               <MenuItem onClick={handleClose}>Logout</MenuItem>
//                             </Menu>
//                           </div>
//                         </NavItem>
//                     )
//                   }
//                 </ul>
//               </Collapse>
//             </Container>
//           </Navbar>
//         </header>
//     );
//   }
// }