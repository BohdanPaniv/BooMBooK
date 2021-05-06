import React, {useEffect, useRef, useState} from "react"
import {TextField} from "@material-ui/core"
import "./CommentBlock.css"
import Comments from "./Comments/Comments";

const useFormField = (initialValue) => {
    const [value, setValue] = React.useState(initialValue);

    const onChange = React.useCallback((e) => setValue(e.target.value), []);

    return {
        bind: {
            value,
            onChange
        },
        set: (line) => setValue(line),
        get: () => value
    };
};

function CommentBlock({articleId}) {

    const [comments, setComments] = useState()
    const userId = useRef()
    const [rating, setRating] = useState(0)
    const commentText = useFormField()

    useEffect(() => {
        userId.current = JSON?.parse(JSON?.parse(localStorage?.getItem("User")))?.userId

        let xhr = new XMLHttpRequest()

        xhr.open("get", "api/articlecomments/GetCommentsByArticleId/" + articleId, true)
        xhr.setRequestHeader("Content-Type", "application/json")

        xhr.onload = function () {
            if (xhr.status === 200) {
                let response = JSON.parse(xhr.responseText)
                console.log(response)
                setComments(response)
            }
        }
        xhr.send()
        console.log(xhr)
    }, [])

    function updateList() {
        let xhr = new XMLHttpRequest()

        xhr.open("get", "api/articlecomments/GetCommentsByArticleId/" + articleId, true)
        xhr.setRequestHeader("Content-Type", "application/json")

        xhr.onload = function () {
            if (xhr.status === 200) {
                let response = JSON.parse(xhr.responseText)
                console.log(response)
                setComments(response)
            }
        }
        xhr.send()
    }

    function addComment() {

        if (commentText.get() && commentText.get().length > 1) {
            let xhr = new XMLHttpRequest()

            let comment = JSON.stringify({
                CommentId: "",
                UserId: userId.current,
                DateTime: new Date().toJSON(),
                Text: commentText.get(),
                Rating: rating
            })

            xhr.open("post", "api/articlecomments/CreateArticleComment/" + articleId, true)
            xhr.setRequestHeader("Content-Type", "application/json")

            xhr.onload = function () {
                if (xhr.status === 200) {
                    updateList()
                    let response = JSON.parse(xhr.responseText)
                    console.log(response)
                    setComments(response)
                }
            }
            xhr.send(comment)
            console.log(xhr)
        }
    }

    return (
        <div className="comments-block">
            {userId.current && (
                <div className="new-comment-container">
                    <TextField className="comment-input"
                               placeholder="Comment text"
                               multiline
                               rowsMax={4}
                               {...commentText.bind}/>

                    <div className="comment-rating">
                        <button className={rating === -1 ? "selected" : ""} onClick={() => {
                            setRating(-1)
                        }}>-
                        </button>
                        <button className={rating === 1 ? "selected" : ""} onClick={() => {
                            setRating(1)
                        }}>+
                        </button>
                    </div>
                    <button className="comment-add"
                            onClick={addComment}>
                        Add
                    </button>
                </div>
            )}
            <div className="comment-list-container">
                <Comments userId={userId.current} comments={comments} updateList={updateList}/>
            </div>
        </div>
    )
}

export default CommentBlock