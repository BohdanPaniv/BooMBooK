import React from "react";
import "./ArticleCard.css"
import {Button} from "reactstrap";

 function ArticleCard(props){

     return(
         <div className="box text-center">
             <div className="cardTitle">{props.article.id} {props.article.title}</div>
             <div className="cardText">{props.article.text}</div>
             <p><Button onClick={()=> {console.log(props.article.id)}}>Читати...</Button></p>
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