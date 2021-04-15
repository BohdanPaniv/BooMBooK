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
            int first = Convert.ToInt32(firstNumber);
            int second = Convert.ToInt32(secondNumber);
            return await articleService.GetArticles(first, second);
        }

        [HttpGet("{articleId}")]
        public async Task<Article> GetArticleByArticleId(string articleId)
        {
            return await articleService.GetArticleByArticleId(articleId);
        }

        [HttpGet("{userId}")]
        public async Task<List<Article>> GetArticlesByUserId(string userId)
        {
            return await articleService.GetArticlesByUserId(userId);
        }
    }
}
