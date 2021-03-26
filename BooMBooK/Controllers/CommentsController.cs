using BooMBooK.Models.Comment;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BooMBooK.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentsController : Controller
    {
        static readonly List<Comment> comments;
        static CommentsController()
        {
            comments = new List<Comment>();
        }

        [HttpGet]
        public IEnumerable<Comment> Get()
        {
            return comments;
        }

        [HttpPost]
        public IActionResult Post(Comment comment)
        {
            comment.CommentId = Guid.NewGuid().ToString();
            comments.Add(comment);
            return Ok(comment);
        }


        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            Comment comment = comments.FirstOrDefault(x => x.CommentId == id);

            if (comment == null)
            {
                return NotFound();
            }

            comments.Remove(comment);
            return Ok(comment);
        }
    }
}
