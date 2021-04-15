import React, {useState, useEffect} from "react";
import "./ArticlePage.css";
import {useParams} from "react-router-dom";
import {Spinner} from "reactstrap"

export function ArticlePage() {

    const [article, setArticle] = useState();
    const params = useParams().id;

    useEffect(() => {
        if (!article) {
            let xhr = new XMLHttpRequest();

            xhr.open("get", "api/articles/" + params, true);
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.onload = function () {
                if (xhr.status === 200) {
                    setArticle(JSON.parse(xhr.responseText));
                }
            };
            xhr.send();
        }
    }, [article, params]);

    console.log(article);

    return (
        <>
            {article
                ? (
                    <>
                        {article.body_Article}
                    </>
                )
                : (
                    <>
                        <Spinner/>
                    </>
                )}
        </>
    );
}