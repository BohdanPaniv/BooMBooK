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
        public async Task<IActionResult> Create(Article article)
        {
            if (ModelState.IsValid)
            {
                await articleService.Create(article);
                return Ok(true);
            }

            return Ok(false);
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

        [HttpGet("GetArticlesByUserId/{userId}{firstNumber},{secondNumber}")]
        public async Task<List<Article>> GetArticlesByUserId(string userId, string firstNumber, string secondNumber)
        {
            return await articleService.GetArticlesByUserId(userId, firstNumber, secondNumber);
        }
    }
}
