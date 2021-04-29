import React, {useEffect, useState} from "react";
import "./UserSetting.css"

const useFormField = (initialValue) => {
    const [value, setValue] = React.useState(initialValue);

    const onChange = React.useCallback((e) => setValue(e.target.value), []);

    return {
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
    const [user, setUser] = useState();
    const [logo,setLogo] = useState();

    useEffect(() => {
        if (!user) setUser(JSON.parse(JSON.parse(localStorage.getItem('User'))));
    }, [user])

    let EmailField = useFormField("");
    let PasswordOldField = useFormField("");
    let PasswordNewField = useFormField("");
    let PasswordRField = useFormField("");
    let FirstNameField = useFormField("");
    let LastNameField = useFormField("");

    function saveUserToLocal(xhr, user) {
        let temp = JSON.parse(JSON.parse(user));
        if (temp.userId !== null) {
            localStorage.setItem("User", user);
            // window.location.reload();
        } else {
            let errors = {};
            errors["PassOld"] = true;

            setErrorList(errors);
        }
    }

    function imageSelect(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        // console.log(reader.result);

        reader.onloadend = () => {
            setLogo(reader.result);
        }

        reader.readAsDataURL(file);
    }

    // function errorsValidator(line) {
    //     let errors = {};
    //     if (!EmailField.get().trim()) errors["Email"] = true;
    //     if (!PasswordOldField.get().trim()) errors["PassOld"] = true;
    //     if (!PasswordNewField.get().trim()) errors["PassNew"] = true;
    //     if (!PasswordRField.get().trim()) errors["PassR"] = true;
    //     if (!FirstNameField.get().trim()) errors["FirstName"] = true;
    //     if (!LastNameField.get().trim()) errors["LastName"] = true;
    //     return errors;
    // }

   async function OldPassCheck(oldpass) {
       return new Promise(function (resolve, reject) {
           let xhr = new XMLHttpRequest();
           xhr.open("get", "api/users/" + user.login + "," + PasswordOldField.get(), true);
           xhr.onload = function () {
               if (this.status >= 200 && this.status < 300) {
                   resolve(xhr.response);
               } else {
                   reject({
                       status: this.status,
                       statusText: xhr.statusText
                   });
               }
           };
           xhr.onerror = function () {
               reject({
                   status: this.status,
                   statusText: xhr.statusText
               });
           };
           xhr.send();
       });
        // console.log(check);
    }

    function Change(user, field, value) {

        let xhr = new XMLHttpRequest();
        xhr.open("put", "api/users/ChangeUserData/" + field + "/" + user.userId + ", " + value, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function () {
            if (xhr.status === 200) {
                let responsedUser = JSON.stringify(xhr.responseText);
                saveUserToLocal(xhr, responsedUser);
            }
        };
        xhr.send();
    }

    async function handleSubmit(line) {

        // let err = errorsValidator(line);
        // setErrorList(err);

        switch (line) {
            case "Email": {
                Change(user, "Email", EmailField.get());
                break;
            }
            case "Names": {
                Change(user, "FirstName", FirstNameField.get());
                Change(user, "LastName", LastNameField.get());
                break;
            }
            case "Password": {
                let check = Boolean(JSON.parse(await OldPassCheck()).userId);

                console.log(check);
                if (check && (PasswordNewField.get() === PasswordRField.get())) {
                    Change(user, "Password", PasswordNewField.get());
                    PasswordOldField.set("")
                    PasswordNewField.set("")
                    PasswordRField.set("")
                }
                break;
            }
            default: {
                break;
            }
        }
    }

    console.log("rens")
    return (
        <div className="SettingsForm">
            <div className="heading">Settings</div>
            <div className="avatarSet">
                <img className="user-setting-avatar" src={ logo? logo : user?.image } alt="Logo"/>
                <p/>
                <input className="fileInput"
                       type="file"
                       onChange={event => imageSelect(event)}
                /><br/>
                <p/>
                <p>
                    <button onClick={() => {
                        handleSubmit("Email")
                    }}>
                        Change avatar
                    </button>
                </p>
            </div>
            <div className="EmailSet">
                Email
                <br/>
                {/*className={errorList["Email"] ? "notSetValue" : ""}*/}
                <input name="Email"
                       type="email" {...EmailField.bind}/>
                <br/>
                <p/>
                <p>
                    <button onClick={async () => {
                        await handleSubmit("Email")
                    }}>
                        Change Email
                    </button>
                </p>
            </div>
            <br/>
            <div className="PasswordSet">
                Old Password
                <br/>
                {/*className={errorList["PasswordOld"] ? "notSetValue" : ""}*/}
                <input name="PasswordOld"
                       type="text" {...PasswordOldField.bind}/>
                <br/>
                New Password
                <br/>
                {/*className={errorList["PasswordNew"] ? "notSetValue" : ""}*/}
                <input name="PasswordNew"
                       type="text" {...PasswordNewField.bind}/>
                <br/>
                Repeat Password
                <br/>
                <input name="PasswordR"
                       type="text" {...PasswordRField.bind}/>
                <br/>
                <p/>
                <p>
                    <button onClick={async () => {
                        await handleSubmit("Password")
                    }}>
                        Change Password
                    </button>
                </p>
            </div>
            <div className="NamesSet">
                FirstName
                <br/>
                <input name="FirstName"
                       type="text" {...FirstNameField.bind}/>
                <br/>
                SecondName
                <br/>
                <input name="LastName"
                       type="text" {...LastNameField.bind}/>
                <br/>
                <p/>
                <p>
                    <button onClick={async () => {
                        await handleSubmit("Names")
                    }}>
                        Change Names
                    </button>
                </p>
            </div>


        </div>
    );
}