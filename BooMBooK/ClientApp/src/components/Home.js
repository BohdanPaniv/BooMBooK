import React, {useEffect, useState} from "react";
import ArticleCardList from "./ArticleCard/ArticleCardList";
import "./Home.css";
import {Spinner} from "reactstrap";

// const useFormField = (initialValue= '') => {
//     const [value, setValue] = React.useState(initialValue);
//     const onChange = React.useCallback((e) => setValue(e.target.value), []);
//     return { value, onChange };
// };

export function Home() {


    const [articleList,setArticleList] = useState([]);


    useEffect(()=>{
        function getArticles(){
            let xhr = new XMLHttpRequest();

            xhr.open("get","api/articles/0,11", true);
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.onload = function () {
                if (xhr.status === 200) {
                    setArticleList(JSON.parse(xhr.responseText));
                }
            };
            xhr.send();
            console.log(xhr);
        }
        if (articleList.length === 0) getArticles();
    },[articleList])



    // let val = 0;

    // function setArticle() {
    //     let xhr = new XMLHttpRequest();
    //     let date =  new Date();
    //
    //     let news = JSON.stringify({
    //         ArticleId:"",
    //         UserId: "d12s",
    //         DateTime: date,
    //         Body_Article: "<div>Текст статі: "+val+"</div>",
    //         Status: false,
    //         Title: "Заголовок статі" + val
    //     });
    //
    //     xhr.open("post","api/articles/", true);
    //     xhr.setRequestHeader("Content-Type", "application/json");
    //
    //     xhr.onload = function () {
    //         if (xhr.status === 200) {
    //             console.log(xhr.responseText);
    //             val = val + 1;
    //         }
    //     };
    //     xhr.send(news);
    //     console.log(xhr);
    // }

    // window.onload = getArticles();

    return (
        <div className="Home">
            {
                articleList !== []
                    ? (<div className="articleListArea">
                            <ArticleCardList ArticleList={articleList} />
                        </div>)
                    : (<Spinner/>)
            }

        </div>


    );
}
