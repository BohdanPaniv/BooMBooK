import React from "react";
import "./ArticleCard.css"
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
 function ArticleCard(props){

     console.log(props.article);

     return(
         <div className="box text-center">
             <div className="cardTitle">{props.index} {props.article.title}</div>
             <div className="cardText">{ReactHtmlParser(props.article.body_Article)}</div>
             <p>
                 <Link to="/ArticlePage">
                     <Button>Читати...</Button>
                 </Link>
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