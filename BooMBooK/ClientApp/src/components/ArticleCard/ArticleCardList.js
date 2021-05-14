import React, {useCallback} from "react";
import "./AtricleCardList.css";
import ArticleCard from "./ArticleCard";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { Typography } from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

// import Button from "reactstrap/lib/Button";

// import {Grid, makeStyles} from "@material-ui/core";
// import {Button, Card, CardBody, CardColumns, CardImg, CardSubtitle, CardText, CardTitle} from "reactstrap";

function ArticleCardList({ ArticleList, getArticleArr, count, limit, skip }) {
    const backHandler = useCallback(async event => {
        event.preventDefault()
        if (skip - limit >= 0) skip = skip - limit
        await getArticleArr()
    }, [getArticleArr])
    
    const forwardHandler = useCallback(async event => {
        event.preventDefault()
        skip = skip + limit
        await getArticleArr()
    }, [getArticleArr])
    
    
    return (
        <div className="articleList">
            {ArticleList.map((article, index) => {
                // console.log(article)
                return (
                    <ArticleCard key={article.ArticleId}
                        article={article}
                        index={index} />
                )
            })}
            <div className="list-control">
                <button onClick={backHandler}
                    disabled={skip - limit < 0}>
                    <ChevronLeftIcon className="icon-clickable"
                        fontSize={"large"} />
                </button>
                <Typography>{skip + ArticleList?.length}</Typography>
                <button onClick={forwardHandler}
                    disabled={skip + limit >= count}>
                    <ChevronRightIcon className="icon-clickable"
                        fontSize={"large"} />
                </button>
            </div>
        </div>
    );
}




export default ArticleCardList;