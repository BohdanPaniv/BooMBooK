import React, { useEffect, useState } from "react";
import ArticleCardList from "./../ArticleCard/ArticleCardList.js";
import "./Profile.css"
import logo from './DefAvatar.jpg';

export function Profile() {
    const [articleList, setArticleList] = useState([]);

    const [user,setUser] = useState();

    useEffect(()=>{
        setUser(JSON.parse(JSON.parse(localStorage.getItem('User'))));
    },[])

    function getArticles() {
        let xhr = new XMLHttpRequest();

        console.log(user);
        xhr.open("get", "api/articles/GetArticlesByUserId/" + user.userId, true);
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
        if (articleList.length === 0 && user) getArticles();

        console.log(1)
    })


    return (
        <>
            {user
                ? (
                    <div className="profile-box">
                        <div className ="heading">Profile</div>
                        <img className="avatar" src={logo} alt="Logo" /><br />
                        <div className="names">{user.firstName + ' ' + user.lastName}</div>
                        <div className="your-articles">Your article`s</div>
                        <div className="articles-box">
                        <div className="articleListArea">
                            <ArticleCardList ArticleList={articleList} />
                        </div>)
                        </div>
                    </div>
                )
                : (
                    <div>loading</div>
                )
            }

        </>

        /*<div className="profile-box">
            <div className ="heading">Profile</div>
            <img className="avatar" src={logo} alt="Logo" />
            <div className="names">{user.FirstName + ' ' + user.LastName}</div>
            <div className="your-articles">Your article`s</div>
            <div className="articleListArea">
                <ArticleCardList ArticleList={articleList} />
            </div>
        </div>*/
    );

}