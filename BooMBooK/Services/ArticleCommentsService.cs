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

        public async Task<ArticleComment> CreateArticleComment(ArticleComment articleComment)
        {
            articleComment.ArticleId = Guid.NewGuid().ToString();
            ArticleComment findMatch = await ArticleComments.Find(x => x.ArticleId == articleComment.ArticleId).FirstOrDefaultAsync();
            
            return findMatch != null ? articleComment : new ArticleComment();
        }

        public async Task<List<ArticleComment>> GetArticleComments(string articleId)
        {
            return await ArticleComments.Find(x => x.ArticleId == articleId).ToListAsync();
        }
    }
}
