using BooMBooK.Models.ArticleComment;
using BooMBooK.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace BooMBooK.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ArticleCommentsController : Controller
    {
        private readonly ArticleCommentsService articleCommentsService;
        public ArticleCommentsController(ArticleCommentsService articleCommentsService)
        {
            this.articleCommentsService = articleCommentsService;
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(ArticleComment articleComment)
        {
            if (ModelState.IsValid)
            {
                await articleCommentsService.Create(articleComment);
                return RedirectToAction("Index");
            }
            return View(articleComment);
        }
    }
}
