import React, { useEffect, useState } from "react";
// import ArticleCardList from "./../ArticleCard/ArticleCardList.js";
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

    // let val = 0;

    // function setArticle() {
    //     let xhr = new XMLHttpRequest();
    //     let date = new Date();
    //
    //     let news = JSON.stringify({
    //         ArticleId: "",
    //         UserId: "d12s",
    //         DateTime: date,
    //         Body_Article: "<div>Текст статі: " + val + "</div>",
    //         Status: false,
    //         Title: "Заголовок статі" + val
    //     });
    //
    //     xhr.open("post", "api/articles/", true);
    //     xhr.setRequestHeader("Content-Type", "application/json");
    //
    //     xhr.onload = function () {
    //         if (xhr.status === 200) {
    //             console.log(xhr.responseText);
    //             val = val + 1;
    //         }
    //     };
    //     xhr.send(news);
    //     console.log(xhr);
    // }

    useEffect(() => {
        if (articleList.length === 0) getArticles();

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