using BooMBooK.Models.Comment;
using BooMBooK.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace BooMBooK.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentsController : Controller
    {
        private readonly CommentService commentService;
        public CommentsController(CommentService commentService)
        {
            this.commentService = commentService;
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(Comment comment)
        {
            if (ModelState.IsValid)
            {
                await commentService.Create(comment);
                return RedirectToAction("Index");
            }
            return View(comment);
        }
    }
}
