using BooMBooK.Models.Image;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BooMBooK.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ImagesController : Controller
    {
        static readonly List<Image> images;
        static ImagesController()
        {
            images = new List<Image>();
        }

        [HttpGet]
        public IEnumerable<Image> Get()
        {
            return images;
        }

        [HttpPost]
        public IActionResult Post(Image image)
        {
            image.ImageId = Guid.NewGuid().ToString();
            images.Add(image);
            return Ok(image);
        }


        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            Image image = images.FirstOrDefault(x => x.ImageId == id);

            if (image == null)
            {
                return NotFound();
            }

            images.Remove(image);
            return Ok(image);
        }
    }
}
