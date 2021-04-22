import React from "react";
import "./ArticleCard.css";
import { Button } from "reactstrap";
import {useHistory} from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';
 function ArticleCard(props){

     console.log(props.article);
     const history = useHistory();

     return(
         <div className="box text-center">
             <div className="cardTitle">{props.article.title}</div>
             <div className="cardText">{props.article.description}</div>
             <p>
                <Button onClick={() => { history.push(`/ArticlePage/${props.article.articleId}`);}}>Читати...</Button>
             </p>
         </div>
         // <Card className="articleBody">
         //     <CardTitle>
         //         <p>{props.index}</p>
         //         {props.article.title}
         //     </CardTitle>
         //    <CardBody>
         //        {props.article.text}
         //    </CardBody>
         // </Card>
     );

}

export default ArticleCard;