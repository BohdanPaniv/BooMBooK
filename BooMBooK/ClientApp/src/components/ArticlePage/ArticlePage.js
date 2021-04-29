import React, {useState, useEffect, useRef} from "react"
import "./ArticlePage.css"
import {useParams} from "react-router-dom"
import {Spinner} from "reactstrap"
import ReactHtmlParser from "react-html-parser"
import CommentBlock from "../CommentBlock/CommentBlock";

export function ArticlePage() {

    const [article, setArticle] = useState()
    const params = useParams().id
    const [articleBody, setArticleBody] = useState()

    useEffect(() => {
        if (!article) {
            let xhr = new XMLHttpRequest()

            xhr.open("get", "api/articles/GetArticleByArticleId/" + params, true)
            xhr.setRequestHeader("Content-Type", "application/json")

            xhr.onload = function () {
                if (xhr.status === 200) {

                    let article = JSON.parse(xhr.responseText)

                    setArticle(JSON.parse(xhr.responseText))
                }
            }
            xhr.send()
        }
    }, [article, params])

    // useEffect(() => {
    //     if (!articleBody) setArticleBody(document.getElementById("article-dynamic-body"))
    // }, [articleBody, setArticleBody])
    //
    console.log(article)

    return (
        <>
            {article
                ? (
                        <div className="article-body">
                            <h1>
                                {article.title}
                            </h1>
                            <h4>
                                {article.description}
                            </h4>
                            {ReactHtmlParser(article.body_Article)}
                            <CommentBlock/>
                        </div>
                )
                : (
                    <>
                        <Spinner/>
                    </>
                )}
        </>
    )
}