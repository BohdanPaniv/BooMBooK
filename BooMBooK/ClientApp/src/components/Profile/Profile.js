import React, { useEffect, useState } from "react";
import "./Profile.css"
import logo from './DefAvatar.jpg';
// import ArticleCardList from "./ArticleCard/ArticleCardList";

export function Profile() {

    const [user,setUser] = useState();

    useEffect(()=>{
        setUser(JSON.parse(JSON.parse(localStorage.getItem('User'))));
    },[])

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
    );

}