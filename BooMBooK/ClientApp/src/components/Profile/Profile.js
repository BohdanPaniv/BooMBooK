import React, { useCallback, useEffect, useState } from "react";
import ArticleCardList from "./../ArticleCard/ArticleCardList.js";
import "./Profile.css"
import logo from './DefAvatar.jpg';
import { Spinner } from "reactstrap";
import { useHistory } from "react-router-dom";

export function Profile() {
    const [articleList, setArticleList] = useState(null);
    const history = useHistory();
    const [user, setUser] = useState();

    useEffect(() => {
        if (!user) setUser(JSON.parse(JSON.parse(localStorage.getItem('User'))));
    }, [user])

    const getArticles = useCallback(() => {
        let xhr = new XMLHttpRequest();
        let string = "";
        if (articleList && articleList?.length !== 0) {
            string = "api/articles/GetArticlesByUserId/" + user.userId + ",0," + (parseInt(articleList.length, 10) + 10);

        } else {
            string = "api/articles/GetArticlesByUserId/" + user.userId + ",0,10";
        }

        xhr.open("get", string, true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onload = function () {
            if (xhr.status === 200) {
                setArticleList(JSON.parse(xhr.responseText));
            }
        };
        xhr.send();
        console.log(xhr);
    }, [articleList, user])


    useEffect(() => {
        if (!articleList && user) getArticles();
    }, [articleList, user, getArticles])

    return (
        <>
            {user
                ? (
                    <div className="profile-box">
                        <div className="ProfileInfo">
                            <div className="heading">Profile</div>
                            <img className="avatar" src={ user?.image ? user.image : logo} alt="Logo" />
                            <div className="names">{user.firstName + ' ' + user.lastName}</div>
                            <button onClick={() => { history.push("/Redactor/" + user.userId) }}>Add news</button>
                        </div>
                        <div className="your-articles">Your article`s</div>
                        <div className="articles-box">
                            {
                                articleList
                                    ? (<div className="articleListArea">
                                        <ArticleCardList ArticleList={articleList} getArticles={getArticles} />
                                    </div>)
                                    : (<Spinner />)
                            }
                        </div>
                    </div>
                )
                : (
                    <div>loading</div>
                )
            }

        </>
    );
}