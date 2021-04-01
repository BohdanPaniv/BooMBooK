import React from "react";
import "./MainPopUpMenu.css";
import {Link, NavLink} from 'react-router-dom';
import {Menu, MenuItem} from "@material-ui/core";

export function MainPopUpMenu(props){

    function logOutHandler(){
        localStorage.removeItem("User");
        props.handleClose();
        window.location.assign("/");
    }

    return(
        <Menu id="simple-menu"
              anchorEl={props.anchorEl}
              keepMounted
              open={Boolean(props.anchorEl)}
              onClose={props.handleClose} >
            <MenuItem onClick={props.handleClose}>My account</MenuItem>
            <NavLink tag={Link} to="/Settings">
                <div>
                    <MenuItem onClick={props.handleClose}>Settings</MenuItem>
                </div>
            </NavLink>
            <MenuItem onClick={logOutHandler}>Logout</MenuItem>
        </Menu>
    );
}