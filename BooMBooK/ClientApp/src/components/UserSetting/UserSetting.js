import React, {useEffect, useState} from "react";
import "./UserSetting.css"

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


export function UserSetting() {
    const [errorList, setErrorList] = React.useState({});
    const [user,setUser] = useState();

    
    useEffect(()=>{
        if (!user) setUser(JSON.parse(JSON.parse(localStorage.getItem('User'))));
    },[user])

    let EmailField = useFormField("");
    let PasswordOldField = useFormField("");
    let PasswordNewField = useFormField("");
    let PasswordRField = useFormField("");
    let FirstNameField = useFormField("");
    let SecondNameField = useFormField("");

    function saveUserToLocal(xhr,user){
        console.log("Saving to local storage");
        console.log(xhr);
        let temp = JSON.parse(JSON.parse(user));

        console.log(temp.userId);
        //
        // console.log(Boolean(xhr.responseText));
        // let isTrue = xhr.responseText === "true";
        // console.log(isTrue);
        if (temp.userId !== null){
            localStorage.setItem("User", user);
            window.location.reload();
        }
        console.log(temp);
    }



    function errorsValidator(line){
        let errors = {};

        if (!EmailField.get().trim()) errors["Email"] = true;
        if (!PasswordOldField.get().trim()) errors["PassOld"] = true;
        if (!PasswordNewField.get().trim()) errors["PassNew"] = true;
        if (!PasswordRField.get().trim()) errors["PassR"] = true;
        if (!FirstNameField.get().trim()) errors["FirstName"] = true;
        if (!SecondNameField.get().trim()) errors["SecondName"] = true;
        // console.log("errors");
        // console.log(errors);
        return errors;
    }

    function OldPassCheck (oldpass)
    {
        let xhr = new XMLHttpRequest();
        let check;
        xhr.open("get","api/users/"+user.Login+","+PasswordOldField.get(), true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onload = function () {
            if (xhr.status === 200) {
                check = true;
            }else
            {
                check = false;
            }
        };
        xhr.send();
        return check;
    }

    
    function Change(user, field, value)
    {
        
        let xhr = new XMLHttpRequest();
        //xhr.open("get","api/users/ChangeUserData/asd/ads/asd/das/asd", true);
        xhr.open("get","api/users/ChangeUserData/"+ field + "/" + user.userId + ", " + value, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function () {
            if (xhr.status === 200) {
                let responsedUser = JSON.stringify(xhr.responseText);
                saveUserToLocal(xhr,responsedUser);
                console.log("Succsesful");
            }
        };
        console.log(xhr);
        xhr.send();
    }

    function handleSubmit (line){

        let err = errorsValidator(line);
        setErrorList(err);


            switch (line){
                case "Email": {
                    Change(user,"Email", EmailField.get());
                    break;
                }
                case "Names": {
/*
                    xhr.open("get","api/users/"+ user.userId + "/" + FirstNameField.get() + "/" + SecondNameField.get(), true);
                    xhr.setRequestHeader("Content-Type", "application/json");

                    xhr.onload = function () {
                        if (xhr.status === 200) {
                            let responsedUser = JSON.stringify(xhr.responseText);
                            saveUserToLocal(xhr,responsedUser);
                        }
                    };

                    xhr.send();
*/
                    break;
                }
                case "Password": {
/*
                    if (OldPassCheck)
                    {
                        xhr.open("get","api/users/"+PasswordNewField.get(), true);
                        xhr.setRequestHeader("Content-Type", "application/json");
                                                    xhr.onload = function () {
                            if (xhr.status === 200) {
                                let responsedUser = JSON.stringify(xhr.responseText);
                                saveUserToLocal(xhr,responsedUser);
                            }
                        };
                                                
                        xhr.send();
*/
                    }
                    break;
                
                default:{
                    break;
                }
            }
    }


    return(
        <div className="SettingsForm">
            <div className="heading">Settings</div>
            <div className="EmailSet">
                Email
                <br/>
                    <input className={ errorList["Email"] ? "notSetValue" : ""}
                           name="Email"
                           type="text" {...EmailField.bind}/>
                <br/>
                <p/>
                <p>
                    <button onClick={()=>{handleSubmit("Email")}}>
                        Change Email
                    </button>
                </p>
            </div>
            <br/>
            <div className="PasswordSet">
                <form onSubmit={event => handleSubmit("Password")}>
                Old Password
                <br/>
                    <input className={ errorList["PasswordOld"] ? "notSetValue" : ""}
                           name="PasswordOld"
                           type="text" {...PasswordOldField.bind}/>
                           <br/>
                New Password
                <br/>
                    <input className={ errorList["PasswordNew"] ? "notSetValue" : ""}
                           name="PasswordNew"
                           type="text" {...PasswordNewField.bind}/>
                <br/>
                Repeat Password
                <br/>
                    <input className={ errorList["PasswordR"] ? "notSetValue" : ""}
                           name="PasswordR"
                           type="text" {...PasswordRField.bind}/>
                <br/>
                <p/>
                <p>
                    <input type="submit"
                           value="Change Password" />
                </p>
                    </form>
            </div>
            <div className="NamesSet">
                <form onSubmit={event => handleSubmit("Names")}>
                FirstName
                <br/>
                    <input className={ errorList["FirstName"] ? "notSetValue" : ""}
                           name="FirstName"
                           type="text" {...FirstNameField.bind}/>
                <br/>
                SecondName
                <br/>
                    <input className={ errorList["SecondName"] ? "notSetValue" : ""}
                           name="SecondName"
                           type="text" {...SecondNameField.bind}/>
                <br/>

                <p/>
                <p>
                    <input type="submit"
                           value="Change names" />
                </p>
                    </form>
            </div>


        </div>
    );
}