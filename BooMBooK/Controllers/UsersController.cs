using BooMBooK.Models.User;
using BooMBooK.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace BooMBooK.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private readonly UserService userService;
        public UsersController(UserService userService)
        {
            this.userService = userService;
        }

        public IActionResult Create()
        {
            return View();
        }

        //[HttpPost]
        //public async Task<IActionResult> Create(User user)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        await userService.Create(user);
        //        return RedirectToAction("Index");
        //    }
        //    return View(user);
        //}

        [HttpPost]
        public  ActionResult<User> Create(User user)
        {
            userService.Create(user);

            return CreatedAtRoute("GetUser", new { id = user.UserId.ToString() }, user);
        }
    }
}