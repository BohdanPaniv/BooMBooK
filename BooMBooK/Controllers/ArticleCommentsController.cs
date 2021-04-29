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

        [HttpPost("CreateArticleComment/")]
        public async Task<ArticleComment> CreateArticleComment(ArticleComment articleComment)
        {
            return await articleCommentsService.CreateArticleComment(articleComment);
        }

        [HttpGet("GetCommentsByArticleId/{articleId}")]
        public async Task<List<Comment>> GetCommentsByArticleId(string articleId)
        {
            List<ArticleComment> articleComment1 = await articleCommentsService.GetArticleComments(articleId);

            return await commentService.GetComments(articleComment1);
        }
    }
}
