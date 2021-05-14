import React from "react";
import "./ArticleCard.css";
import {Button} from "reactstrap";
import {useHistory} from "react-router-dom";

function ArticleCard(props) {

    // console.log(props.article);
    const history = useHistory();

    return (
        <div className="box text-center">
            <div className="cardTitle">{props.article.Title}</div>
            <div className="cardText">{props.article.Description}</div>
            <p>
                <Button onClick={() => {
                    history.push(`/ArticlePage/${props.article.ArticleId}`);
                }}>Читати...</Button>
            </p>
        </div>
    );

}

export default ArticleCard;