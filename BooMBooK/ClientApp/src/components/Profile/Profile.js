import React, { useEffect, useState } from "react";
import "./Profile.css"
import logo from './DefAvatar.jpg';
// import ArticleCardList from "./ArticleCard/ArticleCardList";

export function Profile() {

    let user = JSON.parse(localStorage.getItem('User'));
    //console.log(user);


    return (

        <div className="profile-box">
            <div className ="heading">Profile</div>
            <img className="avatar" src={logo} alt="Logo" /><br />
            <div className="names">{user.FirstName + ' ' + user.LastName}</div>
            <div className="your-articles">Your article`s</div>
            <div className="articles-box">
            </div>
        </div>
    );

}