using BooMBooK.Models.Category;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BooMBooK.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriesController : Controller
    {
        static readonly List<Category> categories;
        static CategoriesController()
        {
            categories = new List<Category>();
        }

        [HttpGet]
        public IEnumerable<Category> Get()
        {
            return categories;
        }

        [HttpPost]
        public IActionResult Post(Category category)
        {
            category.CategoryId = Guid.NewGuid().ToString();
            categories.Add(category);
            return Ok(category);
        }


        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            Category category = categories.FirstOrDefault(x => x.CategoryId == id);

            if (category == null)
            {
                return NotFound();
            }

            categories.Remove(category);
            return Ok(category);
        }
    }
}
