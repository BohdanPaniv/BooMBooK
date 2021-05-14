using BooMBooK.Models.ArticleComment;
using BooMBooK.Models.Comment;
using BooMBooK.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BooMBooK.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentsController : Controller
    {
        private readonly CommentService commentService;
        public CommentsController(CommentService commentService)
        {
            this.commentService = commentService;
        }

        [HttpPut("DeleteComment/{commentId}")]
        public async Task DeleteComment(string commentId)
        {
            await commentService.DeleteComment(commentId);
        }
    }
}