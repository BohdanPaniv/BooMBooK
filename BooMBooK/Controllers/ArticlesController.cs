using BooMBooK.Models.Article;
using BooMBooK.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BooMBooK.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ArticlesController : Controller
    {
        private readonly ArticleService articleService;
        public ArticlesController(ArticleService articleService)
        {
            this.articleService = articleService;
        }

        [HttpPost]
        public async Task<Article> Create(Article article)
        {
            return await articleService.Create(article);
        }

        [HttpGet]
        public async Task<List<Article>> GetArticles()
        {
            return await articleService.GetArticles();
        }

        [HttpGet("{firstNumber},{secondNumber}")]
        public async Task<List<Article>> GetArticles(string firstNumber, string secondNumber)
        {
            return await articleService.GetArticles(firstNumber, secondNumber);
        }

        [HttpGet("GetArticleByArticleId/{articleId}")]
        public async Task<Article> GetArticleByArticleId(string articleId)
        {
            return await articleService.GetArticleByArticleId(articleId);
        }

        [HttpGet("GetArticlesByUserId/{userId}")]
        public async Task<List<Article>> GetArticlesByUserId(string userId)
        {
            return await articleService.GetArticlesByUserId(userId);
        }

        [HttpGet("GetArticlesByUserId/{userId},{firstNumber},{secondNumber}")]
        public async Task<List<Article>> GetArticlesByUserId(string userId, string firstNumber, string secondNumber)
        {
            return await articleService.GetArticlesByUserId(userId, firstNumber, secondNumber);
        }

        [HttpGet("GetArticlesByTitle/{title}")]
        public async Task<List<Article>> GetArticlesByTitle(string title)
        {
            return await articleService.GetArticlesByTitle(title);
        }

        [HttpPut("UpdateArticle/")]
        public async Task UpdateArticle(Article article)
        {
            await articleService.UpdateArticle(article);
        }

        [HttpDelete("DeleteArticle/")]
        public async Task DeleteArticle(string articleId)
        {
            await articleService.DeleteArticle(articleId);
        }

        [HttpGet("GetArticlesInfo/{firstNumber},{secondNumber}")]
        public async Task GetArticlesInfo(string firstNumber, string secondNumber)
        {
            await articleService.GetArticlesInfo(firstNumber, secondNumber);
        }
    }
}
