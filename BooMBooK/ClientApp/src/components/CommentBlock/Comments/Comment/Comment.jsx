import React, {useCallback, useEffect, useState} from "react";
import "./Comment.css";

function Comment({comment, userId, updateList}) {

    const [userIcon, setUserIcon] = useState();

    console.log(comment.userId, userId)

    useEffect(() => {
        let xhr = new XMLHttpRequest();
        xhr.open("get", "api/users/GetUserById/" + comment.userId, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = () => {
            if (xhr.status === 200) {
                let responseUser = JSON.parse(xhr.responseText);
                setUserIcon(responseUser.image)
            }
        };
        xhr.send();
    }, [comment]);

    const deleteCommentHandler = useCallback(() => {
        let xhr = new XMLHttpRequest();
        xhr.open("put", "api/comments/DeleteComment/" + comment.commentId, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function () {
            if (xhr.status === 200) {
                updateList();
            }
        };
        xhr.send(comment.commentId);
    }, [comment.commentId, updateList]);

    return (
        <div className="comment">
            <img className="comment-user-icon" src={userIcon} alt="img" style={{margin: 0}}/>
            {comment?.text}
            {userId === comment.userId && (
                <label className="comment-remove" onClick={deleteCommentHandler}>&#128465;</label>
            )}
        </div>
    )
}

export default Comment