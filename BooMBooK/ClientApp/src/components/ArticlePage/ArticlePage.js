import React, { useState, useEffect } from "react";
import "./ArticlePage.css";
import { useParams } from "react-router-dom";

export function ArticlePage() {

    const [article, setArticle] = useState();
    const params = useParams().id;

    useEffect( ()=>{

        // const LoadArticle =  async () => {

        //     let headers = new Headers();
        //     headers.append("Content-type", "application/json");
        //     const response = await fetch("http://localhost:5001/api/articles/" + 0 + "," + 2, headers);
            
        //     //const json = await response.json();
        //     console.log(response);
        //     //setArticle(json);
        // }
        
        if(!article){
            let xhr = new XMLHttpRequest();

            xhr.open("get","api/articles/" + params, true);
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.onload = function () {
                if (xhr.status === 200) {
                    console.log(xhr);
                }
            };
            xhr.send();
        }
        
    },[]);

    return (
        <div>Hello</div>
    );
}