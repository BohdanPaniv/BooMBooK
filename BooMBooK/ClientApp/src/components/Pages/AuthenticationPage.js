import React, { Component } from "react";
import "./CSS/AuthenticationPage.css"

export class AuthenticationPage extends Component {
    static displayName = AuthenticationPage.name;

    errorList = {}

    constructor (props) {
        super(props);
        //console.log(props);

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

    errorsValidator(line){
        let  errorList = {};

        if (this.state.Login === "") errorList["Login"] = "You don`t set your Login";
        if (this.state.Password === "") errorList["Password"] = "You don`t set your Password";

        if (line === "new"){
            if (this.state.FirstName === "") errorList["FirstName"] = "You don`t set your First Name";
            if (this.state.LastName === "") errorList["LastName"] = "You don`t set your Last Name";
            if (this.state.Email === "") errorList["Email"] = "You don`t set your Email";
        }

        return errorList;
    }

    handleSubmit = (event, line) =>{
        let xhr = new XMLHttpRequest();

        this.errorList = this.errorsValidator(line);

        if (Object.keys(this.errorList).length === 0){
            switch (line){
                case "new": {

                    xhr.open("post","api/users", true);
                    xhr.setRequestHeader("Content-Type", "application/json");

                    xhr.onload = function () {
                        if (xhr.status === 200) {
                            console.log(xhr.responseText);
                        }
                    };

                    xhr.send(JSON.stringify({
                        FirstName: this.state.Login,
                        LastName: this.state.Login,
                        Email: this.state.Email,
                        Login: this.state.Login,
                        Password: this.state.Password
                    }));

                    console.log(xhr);
                    break;
                }
                case "old": {
                    xhr.open("post","api/users", true);
                    xhr.setRequestHeader("Content-Type", "application/json");

                    xhr.send(JSON.stringify({
                        Login: this.state.Login,
                        Password: this.state.Password
                    }));

                    console.log(xhr);
                    break;
                }
                default:{
                    break;
                }
            }
        }
        event.preventDefault();
    }

    loadData() {
        var xhr = new XMLHttpRequest();
        xhr.open("get", "api/users", true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
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

