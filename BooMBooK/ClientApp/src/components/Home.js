import React, {useCallback, useEffect, useRef, useState} from "react";
import ArticleCardList from "./ArticleCard/ArticleCardList";
import "./Home.css";
import {Spinner} from "reactstrap";
import SearchBar from "./SearchBar/SearchBar";

export function Home() {

    const [input, setInput] = useState('');
    const [articleList, setArticleList] = useState(null);
    const limit = useRef(10)
    const skip = useRef(0)
    const count = useRef(0)

    const check = useRef(false)

    const getArticleArr = useCallback(async () => {
            try {
                let xhr = new XMLHttpRequest();
                console.log(`get->skip:${skip.current}, limit:${limit.current}`)
                xhr.open("GET", "api/articles/GetArticlesInfo/" + skip.current + "," + limit.current, true);
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.onload = () => {
                    if (xhr.status === 200) {
                        const data = JSON.parse(xhr.responseText)
                        count.current = data.Item1;
                        setArticleList(data.Item2);
                    }
                }
                xhr.send();

            } catch (error) {
                console.log("error" + error)
            }
        }, [check]
    )

    const getArticleArrByTitle = useCallback(async (input) => {
        if (!check.current) {
            limit.current = 10;
            skip.current = 0;
        }
        let xhr = new XMLHttpRequest();
        xhr.open("get", `api/articles/GetArticlesByTitleInfo/${input},${skip.current},${limit.current}`, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function () {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText)
                count.current = data.Item1;
                check.current = true;
                setArticleList(data.Item2);
            }
        };
        xhr.send();
    }, [])

    useEffect(() => {
        getArticleArr().then();
    }, [])

    const updateInput = async (input) => {
        if (input !== "") {
            await getArticleArrByTitle(input);
        } else {
            limit.current = 10;
            skip.current = 0;
            check.current = false;
            await getArticleArr();
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
                                         getArticleArr={input === "" ? getArticleArr : getArticleArrByTitle}
                                         count={count}
                                         limit={limit}
                                         skip={skip}
                                         input={input}
                        />
                    </div>)
                    : (<Spinner/>)
            }
        </div>
    );
}
