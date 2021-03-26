using BooMBooK.Models.ArticleComment;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BooMBooK.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ArticleCommentsController : Controller
    {
        static readonly List<ArticleComment> articleComments;
        static ArticleCommentsController()
        {
            articleComments = new List<ArticleComment>();
        }

        [HttpGet]
        public IEnumerable<ArticleComment> Get()
        {
            return articleComments;
        }

        [HttpPost]
        public IActionResult Post(ArticleComment articleComment)
        {
            articleComment.ArticleId = Guid.NewGuid().ToString();
            articleComments.Add(articleComment);
            return Ok(articleComment);
        }


        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            ArticleComment articleComment = articleComments.FirstOrDefault(x => x.ArticleId == id);

            if (articleComment == null)
            {
                return NotFound();
            }

            articleComments.Remove(articleComment);
            return Ok(articleComment);
        }
    }
}
