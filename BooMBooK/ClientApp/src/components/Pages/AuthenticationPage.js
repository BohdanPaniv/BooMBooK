import React, { Component } from "react";
import {Button} from "reactstrap";

export class AuthenticationPage extends Component {
    static displayName = AuthenticationPage.name;

    render () {
        return (
            <div>
                <p>Login</p>
                <p><input type="text"/></p>
                <p>Password</p>
                <p><input type="text"/></p>
                <p><Button>Login</Button></p>
                <a href="Authentication">Don`t have account? SignUp now!</a>
            </div>
        );
    }
}