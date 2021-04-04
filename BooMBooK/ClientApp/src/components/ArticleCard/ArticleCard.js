import React from "react";
import "./ArticleCard.css"
import {Card, CardBody, CardTitle} from "reactstrap";

 function ArticleCard(props){

     return(
         <Card className="articleBody">
             <CardTitle>
                 <p>{props.index}</p>
                 {props.article.title}
             </CardTitle>
            <CardBody>
                {props.article.text}
            </CardBody>
         </Card>
     );

}




export default ArticleCard;