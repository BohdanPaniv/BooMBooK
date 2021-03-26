using BooMBooK.Models.Image;
using BooMBooK.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace BooMBooK.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ImagesController : Controller
    {
        private readonly ImageService imageService;
        public ImagesController(ImageService imageService)
        {
            this.imageService = imageService;
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(Image image)
        {
            if (ModelState.IsValid)
            {
                await imageService.Create(image);
                return RedirectToAction("Index");
            }
            return View(image);
        }
    }
}
