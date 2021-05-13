import React, { useCallback, useEffect, useRef, useState } from "react";
import ArticleCardList from "./../ArticleCard/ArticleCardList.js";
import "./Profile.css"
import logo from './DefAvatar.jpg';
import { Spinner } from "reactstrap";
import { useHistory } from "react-router-dom";
import { CircularProgress, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@material-ui/core"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import CreateIcon from '@material-ui/icons/Create'


export function Profile() {
    const [articleList, setArticleList] = useState(null);
    const history = useHistory();
    const [user, setUser] = useState();
    const [newsArr, setNewsArr] = useState([])

    const limit = useRef(10)
    const skip = useRef(0)
    const count = useRef(0)

    const getNewsArr = useCallback(async () => {

        // return new Promise(async function (resolve, reject) {
        try {
            let xhr = new XMLHttpRequest();
            xhr.open("post", "api/articles/" + limit.current + "," + skip.current, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send();
            if (xhr.status === 200) {
                history.push("/Profile")
                //DOROBUTU RESPONSIVE
                //list i count (SetNewsArr)
            }
        } catch (error) {
            console.log("error" + error)
        }
        // })
    }, []
    )
    
    const handleAddnews = useCallback(() => {
        history.push("/admin/newsRedactor")
    }, [history])

    const changeNewsHandler = useCallback(event => {
        const newsId = event.target.id || event.target.parentNode.id
        history.push("/admin/newsRedactor/" + newsId)
    }, [history])

    const deleteNewsHandler = useCallback(async (event) => {
        const newsId = event.target.id || event.target.parentNode.id

        let xhr = new XMLHttpRequest();
        xhr.open("post", "api/articles/Delete" + newsId, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send();
        if (xhr.status === 200) {
        }

        //NJeponytna huyna
        // await request("api/news/deleteNews", "DELETE", {newsId})
        // await getNewsArr()
    }, [getNewsArr])

    const backHandler = useCallback(async event => {
        event.preventDefault()
        if (skip.current - limit.current >= 0) skip.current = skip.current - limit.current
        await getNewsArr()
    }, [getNewsArr])

    const forwardHandler = useCallback(async event => {
        event.preventDefault()
        skip.current = skip.current + limit.current
        await getNewsArr()
    }, [getNewsArr])

    useEffect(() => {
        getNewsArr()
    }, [])


    useEffect(() => {
        if (!user) setUser(JSON.parse(JSON.parse(localStorage.getItem('User'))));
    }, [user])


    return (
        <>
            {user
                ? (
                    <div className="profile-box">
                        <div className="ProfileInfo">
                            <div className="heading">Profile</div>
                            <img className="avatar" src={logo} alt="Logo" />
                            <div className="names">{user.firstName + ' ' + user.lastName}</div>
                            <button onClick={() => { history.push("/Redactor/" + user.userId) }}>AddNews</button>
                        </div>
                        <div className="your-articles">Your article`s</div>
                        <div className="articles-box">
                            {
                                articleList
                                    ? (
                                        <>
                                            <div className="NewsTable">
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
                                                            newsArr.map((news, index) => {
                                                                return (
                                                                    <TableRow key={index}>
                                                                        <TableCell>
                                                                            <Typography>
                                                                                {news.title.length >= 15 ? news.title.slice(0, 10) : news.title}
                                                                                {news.title.length >= 15 && (
                                                                                    <label className="news-title-dots">...</label>
                                                                                )}
                                                                            </Typography>
                                                                        </TableCell>
                                                                        <TableCell
                                                                            className="dateCell">{new Date(news.dateTime).toUTCString()}</TableCell>
                                                                        <TableCell>
                                                                            <div className="news-row-actions">
                                                                                <CreateIcon className="icon-clickable"
                                                                                    id={news._id}
                                                                                    fontSize={"small"}
                                                                                    onClick={changeNewsHandler} />
                                                                                <DeleteForeverIcon className="icon-clickable"
                                                                                    id={news._id}
                                                                                    onClick={deleteNewsHandler}
                                                                                    fontSize={"small"} />
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
                                                        fontSize={"large"} />
                                                </button>
                                                <Typography>{skip.current + newsArr?.length}</Typography>
                                                <button onClick={forwardHandler}
                                                    disabled={skip.current + limit.current >= count.current}>
                                                    <ChevronRightIcon className="icon-clickable"
                                                        fontSize={"large"} />
                                                </button>
                                            </div>

                                        </>

                                    )
                                    : (<Spinner />)
                            }
                        </div>
                    </div>
                )
                : (
                    <div>loading</div>
                )
            }

        </>

        /*<div className="profile-box">
            <div className ="heading">Profile</div>
            <img className="avatar" src={logo} alt="Logo" />
            <div className="names">{user.FirstName + ' ' + user.LastName}</div>
            <div className="your-articles">Your article`s</div>
            <div className="articleListArea">
                <ArticleCardList ArticleList={articleList} />
            </div>
        </div>*/
    );

}