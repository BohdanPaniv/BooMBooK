import React, {useCallback} from "react";
import "./AtricleCardList.css";
import ArticleCard from "./ArticleCard";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import {Typography} from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

// import Button from "reactstrap/lib/Button";

// import {Grid, makeStyles} from "@material-ui/core";
// import {Button, Card, CardBody, CardColumns, CardImg, CardSubtitle, CardText, CardTitle} from "reactstrap";

function ArticleCardList({ArticleList, getArticleArr, count, limit, skip, input}) {



    const backHandler = useCallback(async event => {
        event.preventDefault()
        if (skip.current - limit.current >= 0) skip.current = skip.current - limit.current
        console.log(skip.current, limit.current)
        await getArticleArr(input)
    }, [getArticleArr])

    const forwardHandler = useCallback(async event => {
        event.preventDefault()
        skip.current = skip.current + limit.current
        console.log(skip.current, limit.current)
        await getArticleArr(input)
    }, [getArticleArr])

    console.log(count)

    return (
        <>
            <div className="articleList">
                {ArticleList.map((article, index) => {
                    // console.log(article)
                    return (
                        <ArticleCard key={article.ArticleId}
                                     article={article}
                                     index={index}/>
                    )
                })}
            </div>
            <div className="list-control">
                <button onClick={backHandler}
                        disabled={skip.current - limit.current < 0}>
                    <ChevronLeftIcon className="icon-clickable"
                                     fontSize={"large"} />
                </button>
                <Typography>{skip.current + ArticleList?.length}</Typography>
                <button onClick={forwardHandler}
                        disabled={skip.current + limit.current >= count.current}>
                    <ChevronRightIcon className="icon-clickable"
                                      fontSize={"large"} />
                </button>
            </div>
        </>
    );
}


export default ArticleCardList;