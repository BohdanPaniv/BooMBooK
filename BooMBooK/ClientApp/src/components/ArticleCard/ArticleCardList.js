import React from "react";
import "./AtricleCardList.css"
import ArticleCard from "./ArticleCard";
// import {Grid, makeStyles} from "@material-ui/core";
// import {Button, Card, CardBody, CardColumns, CardImg, CardSubtitle, CardText, CardTitle} from "reactstrap";


 function ArticleCardList({ArticleList}) {

     return (
         <div className="articleListArea">
             <div className="articleList">
                 {ArticleList.map((article, index) => {
                     return (
                         <ArticleCard key = {article.articleId}
                                      article = {article}
                                      index = {index}/>
                     )})}
                 <div className="list-showMore">Show more</div>
             </div>
         </div>

         // <div className="articleGrid">
         //     <Grid container
         //           spacing={2}
         //           justify={"center"}
         //           alignItems={"center"}>
         //         {ArticleList.map((article, index) => {
         //             return (
         //                 <Grid item
         //                       xs={12}
         //                       xl={4}
         //                       sm={12}
         //                       md={6}
         //                       key = {article.id}>
         //                     <ArticleCard key = {article.id}
         //                                  article = {article}
         //                                  index = {index}/>
         //                 </Grid>
         //             )
         //         })}
         //     </Grid>
         // </div>
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