using BooMBooK.Models.Article;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BooMBooK.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ArticlesController : Controller
    {
        static readonly List<Article> articles;
        static ArticlesController()
        {
            articles = new List<Article>();
        }

        [HttpGet]
        public IEnumerable<Article> Get()
        {
            return articles;
        }

        [HttpPost]
        public IActionResult Post(Article article)
        {
            article.ArticleId = Guid.NewGuid().ToString();
            articles.Add(article);
            return Ok(article);
        }


        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            Article article = articles.FirstOrDefault(x => x.ArticleId == id);

            if (article == null)
            {
                return NotFound();
            }

            articles.Remove(article);
            return Ok(article);
        }
    }
}
