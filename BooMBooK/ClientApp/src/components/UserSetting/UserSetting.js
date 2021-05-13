import React, { useEffect, useState } from "react";
import "./UserSetting.css"
import nophoto from "./DefAvatar.jpg";

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
    const [user, setUser] = useState();
    const [logo, setLogo] = useState();
    const [errorList, setErrorList] = React.useState({});

    const EmailField = useFormField("");
    const PasswordOldField = useFormField("");
    const PasswordNewField = useFormField("");
    const PasswordRField = useFormField("");
    const FirstNameField = useFormField("");
    const LastNameField = useFormField("");

    useEffect(() => {
        if (!user) {
            let myUser = JSON.parse(JSON.parse(localStorage.getItem('User')));
            EmailField.set(myUser.email);
            FirstNameField.set(myUser.firstName);
            LastNameField.set(myUser.lastName);
            setUser(myUser);
        };
    }, [user])



    function saveUserToLocal(xhr, user) {
        let temp = JSON.parse(JSON.parse(user));
        if (temp.userId !== null) {
            localStorage.setItem("User", user);
            window.location.reload();
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
        if (field === "Image" && logo) {
            user.image = logo;
            let xhr = new XMLHttpRequest();
            xhr.open('post', 'api/users/ChangeUserData/Image/');
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onload = function () {
                if (xhr.status === 200) {
                    let responsedUser = JSON.stringify(xhr.responseText);
                    saveUserToLocal(xhr, responsedUser);
                }
            };
            xhr.send(JSON.stringify(user));
            console.log(xhr)
        }
        else {
            let xhr = new XMLHttpRequest();
            xhr.open("put", "api/users/ChangeUserData/" + field + "/" + user.userId + ", " + value, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onload = function () {
                if (xhr.status === 200) {
                    let responsedUser = JSON.stringify(xhr.responseText);
                    saveUserToLocal(xhr, responsedUser);
                }
            };
            console.log(xhr);
            xhr.send();
        }
    }

    async function handleSubmit(line) {
        switch (line) {
            case "Avatar": {
                Change(user, "Image", logo);
                break;
            }
            case "Email": {
                let err = await errorsValidator(line);
                setErrorList(err);
                if (Object.keys(err).length === 0)
                    Change(user, "Email", EmailField.get());
                console.log(err);
                break;
            }
            case "Names": {
                let err = await errorsValidator(line);
                setErrorList(err);
                if (Object.keys(err).length === 0) {
                    Change(user, "FirstName", FirstNameField.get());
                    Change(user, "LastName", LastNameField.get());
                }
                console.log(err);
                break;
            }
            case "Password": {
                let err = await errorsValidator(line);
                setErrorList(err);
                if (Object.keys(err).length === 0) {
                    Change(user, "Password", PasswordNewField.get());
                    PasswordOldField.set("");
                    PasswordNewField.set("");
                    PasswordRField.set("");
                }
                console.log(err);

                break;
            }
            default: {
                break;
            }
        }
    }

    async function errorsValidator(line) {
        let errors = {};
        switch (line) {
            case "Email": {
                if (!EmailField.get().trim()) errors["EmailEmpty"] = true;
                return errors;
            }
            case "Names": {
                if (!FirstNameField.get().trim()) errors["FirstName"] = true;
                if (!LastNameField.get().trim()) errors["LastName"] = true;
                return errors;
            }
            case "Password": {
                if (!PasswordOldField.get().trim()) {
                    errors["OldEmpty"] = true
                } else {
                    let check = Boolean(JSON.parse(await OldPassCheck()).userId);
                    if (!check) errors["OldWrong"] = true
                    else {
                        if (!PasswordNewField.get().trim()) errors["NewEmpty"] = true;
                        if (!PasswordRField.get().trim()) errors["RepEmpty"] = true;

                        if (!errors["NewEmpty"] && !errors["RepEmpty"]) {
                            if (PasswordRField.get() !== PasswordNewField.get()) errors["PassDif"] = true;
                        }
                    }
                    return errors;
                }
            }
        }
        return errors;
    }

    console.log(user);

    return (
        <div className="settingsBlock">
            <div className="avatarSet">
                {
                    (() => {
                        if (logo)
                            return <img className="settingsAvatar" src={logo} alt="Logo" />
                        else if (user?.image)
                            return <img className="settingsAvatar" src={user?.image} alt="Logo" />
                        else {
                            return <img className="settingsAvatar" src={nophoto} alt="Logo" />
                        }
                    })()
                }
                <input className="fileInput" type="file" onChange={event => imageSelect(event)} accept="image/*" />
                <button onClick={() => {
                    handleSubmit("Avatar")
                }}>
                    ChangeAvatar
                </button>
            </div>
            <div className="EmailSet">
                Email
                <br />
                {/*className={errorList["Email"] ? "notSetValue" : ""}*/}
                <input name="Email"
                       type="email" {...EmailField.bind} />
                {errorList["EmailEmpty"] ? <div className="emptyErrorTitle">Field is empty</div> : null}
                <button onClick={async () => {
                    await handleSubmit("Email")
                }}>
                    Change Email
                </button>
            </div>
            <br />
            <div className="PasswordSet">
                Old Password
                <input name="PasswordOld"
                       type="password" {...PasswordOldField.bind} />
                {errorList["OldEmpty"] ? <div className="emptyErrorTitle">Field is empty</div> : null}
                {errorList["OldWrong"] ? <div className="emptyErrorTitle">Password is wrong</div> : null}
                New Password
                <input name="PasswordNew"
                       type="password" {...PasswordNewField.bind} />
                {errorList["NewEmpty"] ? <div className="emptyErrorTitle">Field is empty</div> : null}
                {errorList["PassDif"] ? <div className="emptyErrorTitle">Passwords is difference</div> : null}
                Repeat Password
                <input name="PasswordR"
                       type="password" {...PasswordRField.bind} />
                {errorList["RepEmpty"] ? <div className="emptyErrorTitle">Field is empty</div> : null}
                <button onClick={async () => {
                    await handleSubmit("Password")
                }}>
                    Change Password
                </button>
            </div>
            <div className="NamesSet">
                FirstName
                <input name="FirstName"
                       type="text" {...FirstNameField.bind} />
                {errorList["FirstName"] ? <div className="emptyErrorTitle">Field is empty</div> : null}
                SecondName
                <input name="LastName"
                       type="text" {...LastNameField.bind} />
                {errorList["LastName"] ? <div className="emptyErrorTitle">Field is empty</div> : null}
                <button onClick={async () => {
                    await handleSubmit("Names")
                }}>
                    Change Names
                </button>
            </div>

        </div>
    );
}
