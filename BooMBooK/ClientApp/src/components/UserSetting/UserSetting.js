import React from "react";
import "./UserSetting.css"

export function UserSetting() {

    let user = JSON.parse(localStorage.getItem("User"));

    return(
        <div>{user}</div>
    );
}