import React from "react";
import "./AtricleCardList.css"
import ArticleCard from "./ArticleCard";
import {Grid, makeStyles} from "@material-ui/core";
import {Button, Card, CardBody, CardColumns, CardImg, CardSubtitle, CardText, CardTitle} from "reactstrap";

const useStyles = makeStyles({

});

 function ArticleCardList({ArticleList}) {
    const classes = useStyles();

     return (
         <div className="articleGrid">
             <Grid container  spacing={1}
             justify={"center"}>
                 {ArticleList.map((article, index) => {
                     return (
                         <Grid item xs={12} xl={2}  sm={6} md={4}>
                             <ArticleCard key = {article.id}
                                          article = {article}
                                          index = {index}/>
                         </Grid>
                     )
                 })}
             </Grid>
         </div>
         // <CardColumns className="articleList">
         //     {ArticleList.map((article, index) => {
         //         return (
         //             <ArticleCard key = {article.id}
         //                          article = {article}
         //                          index = {index}/>
         //         )
         //     })}
         // </CardColumns>
     );
}




export default ArticleCardList;