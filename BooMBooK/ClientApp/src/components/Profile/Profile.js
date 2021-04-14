import React, { useEffect, useState } from "react";
import "./Profile.css"
import logo from './DefAvatar.jpg';
import ArticleCardList from "./ArticleCard/ArticleCardList";

export function Profile() {

    let user = JSON.parse(localStorage.getItem('User'));
    //console.log(user);


    function getArticles() {
        let xhr = new XMLHttpRequest();

        xhr.open("get", "api/articles/0,12", true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onload = function () {
            if (xhr.status === 200) {
                setArticleList(JSON.parse(xhr.responseText));
            }
        };
        xhr.send();
        console.log(xhr);
    }
    useEffect(() => {
        if (articleList.length === 0) getArticles();

        console.log(1)
    })
    return (

        <div className="profile-box">
            <div className ="heading">Profile</div>
            <img className="avatar" src={logo} alt="Logo" /><br />
            <div className="names">{user.FirstName + ' ' + user.LastName}</div>
            <div className="your-articles">Your article`s</div>
            <div className="articles-box">
                <ArticleCardList ArticleList={articleList} />
            </div>
        </div>
    );

}