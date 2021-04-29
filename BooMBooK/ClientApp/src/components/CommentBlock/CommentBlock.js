import React, {useEffect, useState} from "react"
import "./CommentBlock.css"

function CommentBlock({articleId}) {

    

    const [comments,setComments] = useState()

    // useEffect(()=>{
    //     let xhr = new XMLHttpRequest()
    //
    //     xhr.open("post","api/comments", true)
    //     xhr.setRequestHeader("Content-Type", "application/json")
    //
    //     xhr.onload = function () {
    //         if (xhr.status === 200) {
    //             let response = JSON.stringify(xhr.responseText)
    //             console.log(response)
    //         }
    //     }
    //
    //     xhr.send()
    // },[])

    return (
        <div className="comments-block">
            <div className="new-comment-container">
                <textarea/>
                <button>Add</button>
            </div>
            <div className="comment-list-container">
                <div className="comment-list">

                </div>
            </div>
        </div>
    )

}

export default CommentBlock