import React, {useCallback, useEffect, useState} from "react";
import ArticleCardList from "./ArticleCard/ArticleCardList";
import "./Home.css";
import {Spinner} from "reactstrap";
import SearchBar from "./SearchBar/SearchBar";


// const useFormField = (initialValue= '') => {
//     const [value, setValue] = React.useState(initialValue);
//     const onChange = React.useCallback((e) => setValue(e.target.value), []);
//     return { value, onChange };
// };


export function Home() {

    const [input, setInput] = useState('');

    const [articleList,setArticleList] = useState();

    const getArticles = useCallback(()=>{
        let xhr = new XMLHttpRequest();
        let string;
        if (articleList && articleList?.length !== 0)
        {
            string = "api/articles/0," + (parseInt(articleList.length,10) + 10);

        }else
        {
            string = "api/articles/0,11";
        }
        xhr.open("get",string, true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onload = function () {
            if (xhr.status === 200) {
                setArticleList(JSON.parse(xhr.responseText));
            }
        };
        xhr.send();
        console.log(xhr);
    },[articleList])

    useEffect(()=>{
        if (!articleList) getArticles();
    },[articleList,getArticles])

    const updateInput = async (input) => {
        if (input !== ""){
            let xhr = new XMLHttpRequest();
            xhr.open("get", "api/articles/GetArticlesByTitle/" + input, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onload = function () {
                if (xhr.status === 200) {
                    setArticleList(JSON.parse(xhr.responseText));
                }
            };
            xhr.send();

            console.log(xhr);
        }
        else {
            getArticles();
        }
        setInput(input);
    }

    return (
        <div className="Home">
            <SearchBar
                keyword={input}
                setKeyword={updateInput}
            />
            {
                articleList 
                    ? (<div className="articleListArea">
                            <ArticleCardList ArticleList={articleList}
                                             getArticles={getArticles}
                            />
                        </div>)
                    : (<Spinner/>)
            }

        </div>


    );
}
