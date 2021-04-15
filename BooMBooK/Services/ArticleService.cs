using BooMBooK.Models.Article;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BooMBooK.Services
{
    public class ArticleService
    {
        private readonly IMongoCollection<Article> Articles;
        public ArticleService()
        {
            Articles = DataBaseService.GetMongoCollection<Article>("Article");
        }

        public async Task Create(Article article)
        {
            article.ArticleId = Guid.NewGuid().ToString();
            List<Article> findArticle = await Articles.Find(x => x.ArticleId == article.ArticleId).ToListAsync();

            if (findArticle.Count == 0)
            {
                await Articles.InsertOneAsync(article);
            }
        }

        public async Task<Article> GetArticleByArticleId(string articleId)
        {
            return await Articles.Find(x => x.ArticleId == articleId).FirstOrDefaultAsync();
        }

        public async Task<List<Article>> GetArticlesByUserId(string userId)
        {
            return await Articles.Find(x => x.UserId == userId).ToListAsync();
        }

        public async Task<List<Article>> GetArticlesByUserId(string userId, string firstNumber, string secondNumber)
        {
            int first = Convert.ToInt32(firstNumber);
            int second = Convert.ToInt32(secondNumber);

            return await Articles.Find(x => x.UserId == userId).Skip(first).Limit(second - first).ToListAsync();
        }

        public async Task<List<Article>> GetArticles()
        {
            return await Articles.Find(x => true).ToListAsync();
        }

        public async Task<List<Article>> GetArticles(string firstNumber, string secondNumber)
        {
            int first = Convert.ToInt32(firstNumber);
            int second = Convert.ToInt32(secondNumber);

            return await Articles.Find(x => true).Skip(first).Limit(second - first).ToListAsync();
        }

        public async Task UpdateArticle(Article article)
        {
            await Articles.ReplaceOneAsync(new BsonDocument("_id", new ObjectId(article.ArticleId)), article);
        }

        public async Task DeleteArticle(string id)
        {
            await Articles.DeleteOneAsync(new BsonDocument("_id", new ObjectId(id)));
        }
    }
}
