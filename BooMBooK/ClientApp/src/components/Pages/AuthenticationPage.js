import React, { Component } from "react";
import "./CSS/AuthenticationPage.css"

export class AuthenticationPage extends Component {
    static displayName = AuthenticationPage.name;

    constructor (props) {
        super(props);
        this.loadData();
        console.log(props);
        this.state = {
            FirstName: "",
            LastName:"",
            Email:"",
            Login:"",
            Password:"",
            isSignUp: false
        };

    }

    firstNameChanged = (event) => {
        this.setState({FirstName: event.target.value});
    }

    lastNameChanged = (event) => {
        this.setState({LastName: event.target.value});
    }

    emailNameChanged = (event) => {
        this.setState({Email: event.target.value});
    }

    loginNameChanged = (event) => {
        this.setState({Login: event.target.value});
    }

    passwordNameChanged = (event) => {
        this.setState({Password: event.target.value});
    }

    showSignIn = () =>{
        this.setState({
                isSignUp: false
            }
        );
    };

    showSignUp = () =>{
        this.setState({
                isSignUp: true
            }
        );
    };

    showForm = (line) =>{
        //console.log(line);
        switch (line){
            case "signIn": {
                if (this.state.isSignUp !== false){
                    this.setState({
                        FirstName: "",
                        LastName:"",
                        Email:"",
                        Login:"",
                        Password:"",
                        isSignUp: false
                    });
                }
                break;
            }
            case "signUp": {
                if (this.state.isSignUp !== true)
                this.setState({
                    FirstName: "",
                    LastName:"",
                    Email:"",
                    Login:"",
                    Password:"",
                    isSignUp: true
                });
                break;
            }
            default:{
                break;
            }
        }
    };

    handleSubmit = (event, line) =>{

        let xhr = new XMLHttpRequest();

        let user = new FormData();

        switch (line){
            case "new": {

                user.append("FirstName", this.state.FirstName);
                user.append("LastName", this.state.LastName);
                user.append("Email", this.state.Email);
                user.append("Login", this.state.Login);
                user.append("Password", this.state.Password);

                console.log(this.props.match.url);
                xhr.open("post","api/users/1", true);
                xhr.onload = function () {
                    if (xhr.status === 200) {
                        console.log(xhr.responseText);
                    }
                };
                xhr.send(user);

                console.log(xhr);
                break;
            }
            case "old": {
                // user = {
                //     "Login": this.state.Login,
                //     "Password": this.state.Password
                // }
                break;
            }
            default:{
                break;
            }
        }

        console.log(user);
        event.preventDefault();
    }

    loadData() {
        var xhr = new XMLHttpRequest();
        xhr.open("get", "api/users", true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            console.log(data);
           // this.setState({ phones: data });
        }
        xhr.send();
    }


    render () {
        //console.log("rendering...")
        let standart = (
            <div>
                <p>
                    <button onClick={e => this.showForm("signIn")}
                            className={this.state.isSignUp ? null : "activeButton" }>
                        SignIn
                    </button>
                    <button onClick={e => this.showForm("signUp")}
                            className={ this.state.isSignUp ? "activeButton" : null }>
                        SignUp
                    </button>
                </p>
            </div>
        );

        if (!this.state.isSignUp){
            return (
                <div className="AuthenticationForm">
                    {standart}
                    <div>
                        <form onSubmit={event => this.handleSubmit(event,"old")}>
                            <p>
                                Login
                            </p>
                            <p>
                                <input type="text"
                                       value={this.state.Login}
                                       onChange={this.loginNameChanged}/>
                            </p>
                            <p>
                                Password
                            </p>
                            <p>
                                <input type="password"
                                       value={this.state.Password}
                                       onChange={this.passwordNameChanged}/>
                            </p>
                            <p>
                                <input type="submit"
                                       value="SignIn" />
                            </p>
                        </form>
                    </div>
                </div>
            );
        }
        else {
            return(
                <div className="AuthenticationForm">
                    {standart}
                    <div>
                        <form onSubmit={event => this.handleSubmit(event,"new")}>
                            <p>First Name</p>
                            <p>
                                <input name="FirsName" type="text"
                                       value={this.state.FirstName}
                                       onChange={this.firstNameChanged} />
                            </p>
                            <p>
                                Last Name
                            </p>
                            <p>
                                <input type="LastName"
                                       value={this.state.LastName}
                                       onChange={this.lastNameChanged}/>
                            </p>
                            <p>
                                Mail
                            </p>
                            <p>
                                <input type="email"
                                       value={this.state.Email}
                                       onChange={this.emailNameChanged}/>
                            </p>
                            <p>Login</p>
                            <p>
                                <input type="text"
                                value={this.state.Login}
                                onChange={this.loginNameChanged}/>
                            </p>
                            <p>
                                Password
                            </p>
                            <p>
                                <input type="password"
                                value={this.state.Password}
                                onChange={this.passwordNameChanged}/>
                            </p>
                            <p>
                                <input type="submit"
                                       value="SignUp" />
                            </p>
                        </form>
                    </div>
                </div>
            );
        }
    }

}

