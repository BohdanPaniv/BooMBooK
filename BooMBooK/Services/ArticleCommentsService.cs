using BooMBooK.Models.ArticleComment;
using BooMBooK.Models.Comment;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BooMBooK.Services
{
    public class ArticleCommentsService
    {
        IMongoCollection<ArticleComment> ArticleComments;

        public ArticleCommentsService()
        {
            ArticleComments = DataBaseService.GetMongoCollection<ArticleComment>("ArticleComments");
        }

        public async Task<ArticleComment> CreateArticleComment(string articleId, Comment comment)
        {
            ArticleComment articleComment = new ArticleComment();
            articleComment.ArticleId = articleId;
            articleComment.CommentId = comment.CommentId;
            await ArticleComments.InsertOneAsync(articleComment);

            return articleComment;
        }

        public async Task<List<ArticleComment>> GetArticleComments(string articleId)
        {
            List<ArticleComment> articleComments = await ArticleComments.Find(x => x.ArticleId == articleId).ToListAsync();

            if (articleComments != null)
            {
                return articleComments;
            }

            return new List<ArticleComment>();
        }

        public async Task<List<ArticleComment>> DeleteArticleComment(string articleId)
        {
            List<ArticleComment> articleComments = await ArticleComments.Find(x => x.ArticleId == articleId).ToListAsync();
            await ArticleComments.DeleteManyAsync(x => x.ArticleId == articleId);
            return articleComments;
        }
    }
}
