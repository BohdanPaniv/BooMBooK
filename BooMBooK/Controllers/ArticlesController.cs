using BooMBooK.Models.Article;
using BooMBooK.Services;
using Microsoft.AspNetCore.Mvc;
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

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(Article article)
        {
            if (ModelState.IsValid)
            {
                await articleService.Create(article);
                return RedirectToAction("Index");
            }
            return View(article);
        }
    }
}
