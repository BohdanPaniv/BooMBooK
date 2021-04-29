import React from "react"
import "./Comment.css"

function Comment({comment}){
    console.log(comment)
    return(
        <div className="comment">
            {comment?.comentId}
        </div>
    )

}

export default Comment