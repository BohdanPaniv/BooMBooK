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
    public class ArticleCommentsController : Controller
    {
        private readonly ArticleCommentsService articleCommentsService;
        private readonly CommentService commentService;
        public ArticleCommentsController(ArticleCommentsService articleCommentsService, CommentService commentService)
        {
            this.articleCommentsService = articleCommentsService;
            this.commentService = commentService;
        }

        [HttpPost("CreateArticleComment/{articleId}")]
        public async Task<ArticleComment> CreateArticleComment(string articleId, Comment comment)
        {
            Comment createdComment = await commentService.Create(comment);
            return await articleCommentsService.CreateArticleComment(articleId, createdComment);
        }

        [HttpGet("GetCommentsByArticleId/{articleId}")]
        public async Task<List<Comment>> GetCommentsByArticleId(string articleId)
        {
            List<ArticleComment> articleComment1 = await articleCommentsService.GetArticleComments(articleId);

            return await commentService.GetComments(articleComment1);
        }
    }
}
