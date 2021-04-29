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
    //const [logo,setLogo] = useState();
    const [logo, setImage] = useState();

    useEffect(()=>{
        if (!user) setUser(JSON.parse(JSON.parse(localStorage.getItem('User'))));
    },[user])


    let EmailField = useFormField("");
    let PasswordOldField = useFormField("");
    let PasswordNewField = useFormField("");
    let PasswordRField = useFormField("");
    let FirstNameField = useFormField("");
    let LastNameField = useFormField("");

    function saveUserToLocal(xhr,user){
        let temp = JSON.parse(JSON.parse(user));
        if (temp.userId !== null){
            localStorage.setItem("User", user);
            window.location.reload();
        }
        else {
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
            setImage(reader.result);
        }
    
        reader.readAsDataURL(file);
    }
 

    
    function errorsValidator(line){
        let errors = {};
        if (!EmailField.get().trim()) errors["Email"] = true;
        if (!PasswordOldField.get().trim()) errors["PassOld"] = true;
        if (!PasswordNewField.get().trim()) errors["PassNew"] = true;
        if (!PasswordRField.get().trim()) errors["PassR"] = true;
        if (!FirstNameField.get().trim()) errors["FirstName"] = true;
        if (!LastNameField.get().trim()) errors["LastName"] = true;
        return errors;
    }

    function OldPassCheck (oldpass)
    {
        let xhr = new XMLHttpRequest();
        let check = false;
        xhr.open("get","api/users/"+user.login+","+PasswordOldField.get(), false);
        xhr.setRequestHeader("Content-Type", "application/json");
        console.log(xhr);

        xhr.onload = function () {
            if (xhr.status === 200) {
                let checkuser = JSON.parse(xhr.responseText);
                console.log(checkuser);
                if (checkuser.userId !== null)
                {
                    console.log("check = true");
                    check = true;
                }
            }
        };
        xhr.send();
        console.log(check);
        return check;
    }

    
    function Change(user, field, value)
    {
        
        let xhr = new XMLHttpRequest();
        xhr.open("get","api/users/ChangeUserData/"+ field + "/" + user.userId + ", " + value, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function () {
            if (xhr.status === 200) {
                    let responsedUser = JSON.stringify(xhr.responseText);
                    saveUserToLocal(xhr,responsedUser);
            }
        };
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
                    Change(user,"FirstName", FirstNameField.get());
                    Change(user,"LastName", LastNameField.get());
                    break;
                }
                case "Password": {
                    let check = OldPassCheck();
                    console.log(check);
                    if (check && (PasswordNewField.get() === PasswordRField.get()))
                    {
                        Change(user,"Password", PasswordNewField.get());
                    }
                    break;
                }
                default:{
                    break;
                }
            }
    }


    return(
        <div className="SettingsForm">
            <div className="heading">Settings</div>
            <div className="avatarSet">
                <img className="avatar" src={logo} alt="Logo" />
                <p/>
                <input className="fileInput"
                                   type="file"
                                   onChange={event => imageSelect(event)}
                            /><br />
                            <p/>
                <p>
                <button onClick={()=>{handleSubmit("Email")}}>
                    Change avatar
                </button>
                </p>
            </div>
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
                <button onClick={()=>{handleSubmit("Password")}}>
                        Change Password
                    </button>
                </p>
            </div>
            <div className="NamesSet">
                FirstName
                <br/>
                    <input className={ errorList["FirstName"] ? "notSetValue" : ""}
                           name="FirstName"
                           type="text" {...FirstNameField.bind}/>
                <br/>
                SecondName
                <br/>
                    <input className={ errorList["LastName"] ? "notSetValue" : ""}
                           name="LastName"
                           type="text" {...LastNameField.bind}/>
                <br/>

                <p/>
                <p>
                <button onClick={()=>{handleSubmit("Names")}}>
                        Change Names
                    </button>
                </p>
            </div>


        </div>
    );
}