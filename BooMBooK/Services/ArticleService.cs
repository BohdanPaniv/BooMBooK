using BooMBooK.Models.Article;
using MongoDB.Bson;
using MongoDB.Driver;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Text.RegularExpressions;
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

        public async Task<Article> Create(Article article)
        {
            article.ArticleId = Guid.NewGuid().ToString();
            List<Article> findArticle = await Articles.Find(x => x.ArticleId == article.ArticleId).ToListAsync();

            if (findArticle.Count == 0)
            {
                await Articles.InsertOneAsync(article);
                return article;
            }

            return new Article();
        }

        public async Task<List<Article>> GetArticlesByTitle(string title)
        {
            Regex regex = new Regex(@$"[\s\S]*{title}[\s\S]*", RegexOptions.IgnoreCase);
            var filter = Builders<Article>.Filter.Regex(x => x.Title, new BsonRegularExpression(regex));
            List<Article> articles = await Articles.Find(filter).ToListAsync();
            return articles;

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

        public async Task<string> GetArticlesInfo(string firstNumber, string secondNumber)
        {
            int first = Convert.ToInt32(firstNumber);
            int second = Convert.ToInt32(secondNumber);

            List<Article> articles = await Articles.Find(x => true).Skip(first).Limit(second - first).ToListAsync();
            var articleCount = (int)await Articles.Find(x => true).CountDocumentsAsync();
            (int, List<Article>) tuple = (articleCount, articles);
            var test = JsonConvert.SerializeObject(tuple);
            return test;
        }

        public async Task UpdateArticle(Article article)
        {
            await Articles.ReplaceOneAsync(x => x.ArticleId == article.ArticleId, article);
        }

        public async Task DeleteArticle(string articleId)
        {
            await Articles.DeleteOneAsync(x => x.ArticleId == articleId);
        }
    }
}
