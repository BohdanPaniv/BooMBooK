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
            ArticleComment findMatch = await ArticleComments.Find(x => x.ArticleId == articleComment.ArticleId).FirstOrDefaultAsync();

            if (findMatch == null)
            {
                await ArticleComments.InsertOneAsync(articleComment);
                return articleComment;
            }

            return new ArticleComment();
        }

        public async Task<List<ArticleComment>> GetArticleComments(string articleId)
        {
            return await ArticleComments.Find(x => x.ArticleId == articleId).ToListAsync();
        }
    }
}
