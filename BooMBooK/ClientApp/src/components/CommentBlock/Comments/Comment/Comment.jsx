import React from "react"
import "./Comment.css"

function Comment({comment}){
    console.log(comment)
    return(
        <div className="comment">
            {comment?.text}
        </div>
    )

}

export default Comment