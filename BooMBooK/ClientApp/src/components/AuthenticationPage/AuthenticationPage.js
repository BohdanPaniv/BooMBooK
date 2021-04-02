import React from "react";
import "./AuthenticationPage.css"
import axios from "axios";

const useFormField = (initialValue) => {
    const [value, setValue] = React.useState(initialValue);

    const onChange = React.useCallback((e) => setValue(e.target.value), []);

    return{
        bind: {
            value,
            onChange
        },
        set: (line) => setValue(line),
        get: () => value
    };
};

export function AuthenticationPage(){

    const [isSignUp,SetIsSignUp] = React.useState(false);
    const [errorList, setErrorList] = React.useState({});

    let firstNameField = useFormField("");
    let lastNameField = useFormField("");
    let eMailField = useFormField("");
    let loginField = useFormField("");
    let passwordField = useFormField("");

    function showForm (line){
        setErrorList({});

        firstNameField.set("");
        lastNameField.set("");
        eMailField.set("");
        loginField.set("");
        passwordField.set("");

        switch (line){
            case "signIn": {
                if (isSignUp){
                    SetIsSignUp(false);
                }
                break;
            }
            case "signUp": {
                if (!isSignUp)
                {
                    SetIsSignUp(true);
                }
                break;
            }
            default:{
                break;
            }
        }
    }

    function errorsValidator(line){
        let errors = {};

        // console.log(Boolean(!loginField.get().trim()));
        if (!loginField.get().trim()) errors["Login"] = true;
        if (!passwordField.get().trim()) errors["Password"] = true;

        if (line === "new"){
            if (!firstNameField.get().trim()) errors["FirstName"] = true;
            if (!lastNameField.get().trim()) errors["LastName"] = true;
            if (!eMailField.get().trim()) errors["Email"] = true;
        }
        // console.log("errors");
        // console.log(errors);
        return errors;
    }

    function saveUserToLocal(xhr,user){
        console.log(xhr);
        //
        // console.log(Boolean(xhr.responseText));
        let isTrue = xhr.responseText === "true";
        console.log(isTrue);
        if (isTrue){
            localStorage.setItem("User", user);
            window.location.reload();
        }
    }

    function handleSubmit (event, line){
        let xhr = new XMLHttpRequest();

        let err = errorsValidator(line);

        setErrorList(err);

        //console.log(errorList);

        if (Object.keys(err).length === 0){

            let user = JSON.stringify({
                UserId:"",
                FirstName: firstNameField.get(),
                LastName: lastNameField.get(),
                Email: eMailField.get(),
                Login: loginField.get(),
                Password: passwordField.get()});

            //console.log(user);

            switch (line){
                case "new": {

                    xhr.open("post","api/users", true);
                    xhr.setRequestHeader("Content-Type", "application/json");

                    xhr.onload = function () {
                        if (xhr.status === 200) {
                            saveUserToLocal(xhr,user);
                        }
                    };

                    xhr.send(user);

                    break;
                }
                case "old": {

                    console.log(user);
                    console.log(user["Login"]);
                    xhr.open("get","api/users/"+loginField.get()+","+passwordField.get(), true);
                    xhr.setRequestHeader("Content-Type", "application/json");

                    xhr.onload = function () {
                        if (xhr.status === 200) {
                            saveUserToLocal(xhr,user);
                        }
                    };

                    xhr.send();

                    break;
                }
                default:{
                    break;
                }
            }
        }
        //console.log(Boolean(xhr.responseText));

        event.preventDefault();
    }

    let formPickerMenu = (
        <div className="formPicker">
                <button onClick={ () => showForm("signIn") }
                        className={isSignUp ? "nonActive" : " active" }>
                    SignIn
                </button>
                <button onClick={ () => showForm("signUp") }
                        className={ isSignUp ? " active" : "nonActive" }>
                    SignUp
                </button>
        </div>
    );

    if (!isSignUp){
        return (
            <div className="AuthenticationForm">
                {formPickerMenu}
                <div>
                    <form onSubmit={event => handleSubmit(event,"old")}>
                        <p>Login</p>
                        <p>
                            <input className={ errorList["Login"] ? "notSetValue" : ""}
                                   name="Login"
                                   type="text" {...loginField.bind}/>
                        </p>
                        <p>Password</p>
                        <p>
                            <input className={ errorList["Password"] ? "notSetValue" : ""}
                                   name="Password"
                                   type="password" {...passwordField.bind}/>
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
                {formPickerMenu}
                <div>
                    <form onSubmit={event => handleSubmit(event,"new")}>
                        <p>First Name</p>
                        <p>
                            <input className={ errorList["FirstName"] ? "notSetValue" : ""}
                                   name="FirstName"
                                   type="text" {...firstNameField.bind}/>
                        </p>
                        <p>Last Name</p>
                        <p>
                            <input className={ errorList["LastName"] ? "notSetValue" : ""}
                                   name="LastName"
                                   type="text" {...lastNameField.bind}/>
                        </p>
                        <p>Mail</p>
                        <p>
                            <input className={ errorList["Email"] ? "notSetValue" : ""}
                                   name= "Email"
                                   type="email" {...eMailField.bind}/>
                        </p>
                        <p>Login</p>
                        <p>
                            <input className={ errorList["Login"] ? "notSetValue" : ""}
                                   name= "Login"
                                   type="text" {...loginField.bind}/>
                        </p>
                        <p>Password</p>
                        <p>
                            <input className={ errorList["Password"] ? "notSetValue" : ""}
                                   name="Password"
                                   type="password" {...passwordField.bind}/>
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

// export class AuthenticationPage extends Component {
//     static displayName = AuthenticationPage.name;
//
//     errorList = {}
//
//     constructor (props) {
//         super(props);
//         //console.log(props);
//
//         this.state = {
//             FirstName: "",
//             LastName:"",
//             Email:"",
//             Login:"",
//             Password:"",
//             isSignUp: false
//         };
//
//     }
//
//     firstNameChanged = (event) => {
//         this.setState({FirstName: event.target.value});
//     }
//
//     lastNameChanged = (event) => {
//         this.setState({LastName: event.target.value});
//     }
//
//     emailNameChanged = (event) => {
//         this.setState({Email: event.target.value});
//     }
//
//     loginNameChanged = (event) => {
//         this.setState({Login: event.target.value});
//     }
//
//     passwordNameChanged = (event) => {
//         this.setState({Password: event.target.value});
//     }
//
//     showForm = (line) =>{
//         //console.log(line);
//         switch (line){
//             case "signIn": {
//                 if (this.state.isSignUp !== false){
//                     this.setState({
//                         FirstName: "",
//                         LastName:"",
//                         Email:"",
//                         Login:"",
//                         Password:"",
//                         isSignUp: false
//                     });
//                 }
//                 break;
//             }
//             case "signUp": {
//                 if (this.state.isSignUp !== true)
//                     this.setState({
//                         FirstName: "",
//                         LastName:"",
//                         Email:"",
//                         Login:"",
//                         Password:"",
//                         isSignUp: true
//                     });
//                 break;
//             }
//             default:{
//                 break;
//             }
//         }
//     };
//
//     errorsValidator(line){
//         let  errorList = {};
//
//         if (this.state.Login === "") errorList["Login"] = "You don`t set your Login";
//         if (this.state.Password === "") errorList["Password"] = "You don`t set your Password";
//
//         if (line === "new"){
//             if (this.state.FirstName === "") errorList["FirstName"] = "You don`t set your First Name";
//             if (this.state.LastName === "") errorList["LastName"] = "You don`t set your Last Name";
//             if (this.state.Email === "") errorList["Email"] = "You don`t set your Email";
//         }
//
//         return errorList;
//     }
//
//     handleSubmit = (event, line) =>{
//         let xhr = new XMLHttpRequest();
//
//         this.errorList = this.errorsValidator(line);
//
//         if (Object.keys(this.errorList).length === 0){
//             switch (line){
//                 case "new": {
//
//                     xhr.open("post","api/users", true);
//                     xhr.setRequestHeader("Content-Type", "application/json");
//
//                     xhr.onload = function () {
//                         if (xhr.status === 200) {
//                             console.log(xhr.responseText);
//                         }
//                     };
//
//                     xhr.send(JSON.stringify({
//                         FirstName: this.state.Login,
//                         LastName: this.state.Login,
//                         Email: this.state.Email,
//                         Login: this.state.Login,
//                         Password: this.state.Password
//                     }));
//
//                     console.log(xhr);
//                     break;
//                 }
//                 case "old": {
//                     xhr.open("post","api/users", true);
//                     xhr.setRequestHeader("Content-Type", "application/json");
//
//                     xhr.send(JSON.stringify({
//                         Login: this.state.Login,
//                         Password: this.state.Password
//                     }));
//
//                     console.log(xhr);
//                     break;
//                 }
//                 default:{
//                     break;
//                 }
//             }
//         }
//         event.preventDefault();
//     }
//
//     // loadData() {
//     //     var xhr = new XMLHttpRequest();
//     //     xhr.open("get", "api/users", true);
//     //     xhr.onload = function () {
//     //         var data = JSON.parse(xhr.responseText);
//     //         // this.setState({ phones: data });
//     //     }
//     //     xhr.send();
//     // }
//
//
//     render () {
//         //console.log("rendering...")
//         let formPickerMenu = (
//             <div>
//                 <div>
//
//                 </div>
//                 <p>
//                     <button onClick={ () => this.showForm("signIn")}
//                             className={this.state.isSignUp ? null : "activeButton" }>
//                         SignIn
//                     </button>
//                     <button onClick={ () => this.showForm("signUp")}
//                             className={ this.state.isSignUp ? "activeButton" : null }>
//                         SignUp
//                     </button>
//                 </p>
//             </div>
//         );
//
//         if (!this.state.isSignUp){
//             return (
//                 <div className="AuthenticationForm">
//                     {formPickerMenu}
//                     <div>
//                         <form onSubmit={event => this.handleSubmit(event,"old")}>
//                             <p>
//                                 Login
//                             </p>
//                             <p>
//                                 <input type="text"
//                                        value={this.state.Login}
//                                        onChange={this.loginNameChanged}/>
//                             </p>
//                             <p>
//                                 Password
//                             </p>
//                             <p>
//                                 <input type="password"
//                                        value={this.state.Password}
//                                        onChange={this.passwordNameChanged}/>
//                             </p>
//                             <p>
//                                 <input type="submit"
//                                        value="SignIn" />
//                             </p>
//                         </form>
//                     </div>
//                 </div>
//             );
//         }
//         else {
//             return(
//                 <div className="AuthenticationForm">
//                     {formPickerMenu}
//                     <div>
//                         <form onSubmit={event => this.handleSubmit(event,"new")}>
//                             <p>First Name</p>
//                             <p>
//                                 <input name="FirsName" type="text"
//                                        value={this.state.FirstName}
//                                        onChange={this.firstNameChanged} />
//                             </p>
//                             <p>
//                                 Last Name
//                             </p>
//                             <p>
//                                 <input type="LastName"
//                                        value={this.state.LastName}
//                                        onChange={this.lastNameChanged}/>
//                             </p>
//                             <p>
//                                 Mail
//                             </p>
//                             <p>
//                                 <input type="email"
//                                        value={this.state.Email}
//                                        onChange={this.emailNameChanged}/>
//                             </p>
//                             <p>Login</p>
//                             <p>
//                                 <input type="text"
//                                        value={this.state.Login}
//                                        onChange={this.loginNameChanged}/>
//                             </p>
//                             <p>
//                                 Password
//                             </p>
//                             <p>
//                                 <input type="password"
//                                        value={this.state.Password}
//                                        onChange={this.passwordNameChanged}/>
//                             </p>
//                             <p>
//                                 <input type="submit"
//                                        value="SignUp" />
//                             </p>
//                         </form>
//                     </div>
//                 </div>
//             );
//         }
//     }
// }

