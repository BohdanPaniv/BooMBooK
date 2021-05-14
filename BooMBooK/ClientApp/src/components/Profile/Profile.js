import React, {useCallback, useEffect, useRef, useState} from "react";
import "./Profile.css"
import logo from './DefAvatar.jpg';
import {Spinner} from "reactstrap";
import {useHistory} from "react-router-dom";
import {Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@material-ui/core"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import CreateIcon from '@material-ui/icons/Create'


export function Profile() {
    const [articleList, setArticleList] = useState(null);
    const history = useHistory();
    const [user, setUser] = useState();

    const limit = useRef(10)
    const skip = useRef(0)
    const count = useRef(0)

    const getArticleArr = useCallback(async () => {

            try {
                let xhr = new XMLHttpRequest();
                xhr.open("GET", "api/articles/GetArticlesByUserIdInfo/" + user.userId + "," + skip.current + "," + limit.current, true);
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
        }, [user]
    )

    const handleAddArticle = useCallback(() => {
        history.push("/Redactor/")
    }, [history, user])

    const changeNewsHandler = useCallback(event => {
        const newsId = event.target.id || event.target.parentNode.id
        history.push("/Redactor/" + newsId)
    }, [history])

    const deleteNewsHandler = useCallback(async (event) => {
        const newsId = event.target.id || event.target.parentNode.id

        let xhr = new XMLHttpRequest();
        xhr.open("delete", "api/articles/DeleteArticle/" + newsId, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = () => {
            if (xhr.status === 200) {
                getArticleArr().then(data => setArticleList(JSON.parse(data)));
            }
        }
        xhr.send();

        // console.log(xhr)
    }, [getArticleArr])

    const backHandler = useCallback(async event => {
        event.preventDefault()
        if (skip.current - limit.current >= 0) skip.current = skip.current - limit.current
        await getArticleArr()
    }, [getArticleArr])

    const forwardHandler = useCallback(async event => {
        event.preventDefault()
        skip.current = skip.current + limit.current
        await getArticleArr()
    }, [getArticleArr])

    useEffect(() => {
        if (!user) setUser(JSON.parse(JSON.parse(localStorage.getItem('User'))));
    }, [user])

    useEffect(() => {
        if (user) getArticleArr();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    return (
        <>
            {user
                ? (
                    <div className="profile-box">
                        <div className="ProfileInfo">
                            <div className="heading">Profile</div>
                            <img className="avatar" src={user?.image ? user.image : logo} alt="Logo"/>
                            <div className="names">{user.firstName + ' ' + user.lastName}</div>
                            <button onClick={handleAddArticle}>Add news</button>
                        </div>
                        <div className="your-articles">Your article`s</div>
                        <div className="articles-box">
                            {
                                articleList
                                    ? (
                                        <>
                                            <div className="ArticlesTable">
                                                <Table>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>Title</TableCell>
                                                            <TableCell
                                                                className="dateCell">Date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</TableCell>
                                                            <TableCell>Action</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {
                                                            articleList.map((article, index) => {
                                                                return (
                                                                    <TableRow key={index}>
                                                                        <TableCell>
                                                                            <Typography>
                                                                                {article.Title.length >= 15 ? article.Title.slice(0, 10) : article.Title}
                                                                                {article.Title.length >= 15 && (
                                                                                    <label
                                                                                        className="article-title-dots">...</label>
                                                                                )}
                                                                            </Typography>
                                                                        </TableCell>
                                                                        <TableCell
                                                                            className="dateCell">{new Date(article.DateTime).toUTCString()}</TableCell>
                                                                        <TableCell>
                                                                            <div className="article-row-actions">
                                                                                <CreateIcon className="icon-clickable"
                                                                                            id={article.articleId}
                                                                                            fontSize={"small"}
                                                                                            onClick={changeNewsHandler}/>
                                                                                <DeleteForeverIcon
                                                                                    className="icon-clickable"
                                                                                    id={article.articleId}
                                                                                    onClick={deleteNewsHandler}
                                                                                    fontSize={"small"}/>
                                                                            </div>
                                                                        </TableCell>
                                                                    </TableRow>
                                                                )
                                                            })
                                                        }
                                                    </TableBody>
                                                </Table>
                                            </div>
                                            <div className="table-control">
                                                <button onClick={backHandler}
                                                        disabled={skip.current - limit.current < 0}>
                                                    <ChevronLeftIcon className="icon-clickable"
                                                                     fontSize={"large"}/>
                                                </button>
                                                <Typography>{skip.current + articleList?.length}</Typography>
                                                <button onClick={forwardHandler}
                                                        disabled={skip.current + limit.current >= count.current}>
                                                    <ChevronRightIcon className="icon-clickable"
                                                                      fontSize={"large"}/>
                                                </button>
                                            </div>

                                        </>

                                    )
                                    : (<Spinner/>)
                            }
                        </div>
                    </div>
                )
                : (
                    <div>loading</div>
                )
            }

        </>
    );
}