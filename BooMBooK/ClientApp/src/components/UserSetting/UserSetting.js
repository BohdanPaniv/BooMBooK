import React from "react";
import "./UserSetting.css"

export function UserSetting() {

    return(
        <div>{localStorage.getItem("User")}</div>
    );
}