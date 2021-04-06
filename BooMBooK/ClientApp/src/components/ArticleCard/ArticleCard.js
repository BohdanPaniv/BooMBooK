import React from "react";
import "./ArticleCard.css"
import {Card, CardBody, CardTitle} from "reactstrap";

 function ArticleCard(props){

     return(
         <div className="box">
             <p>{props.article.id} {props.article.title}</p>
             <p>{props.article.text}</p>
             <p><button onClick={()=> {console.log(props.article.id)}}>Залупа</button></p>
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