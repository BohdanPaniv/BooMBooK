import React from "react";
import "./AtricleCardList.css"
import {Button, Card, CardBody, CardColumns, CardImg, CardSubtitle, CardText, CardTitle} from "reactstrap";
import ArticleCard from "./ArticleCard";



 function ArticleCardList({ArticleList}) {

     function test(){
     }

    return (
            <CardColumns className="articleList">
                {ArticleList.map((article, index) => {
                    return (
                        <ArticleCard key = {article.id}
                                     article = {article}
                                     index = {index}/>
                    )
                })}
            </CardColumns>
    );
}




export default ArticleCardList;