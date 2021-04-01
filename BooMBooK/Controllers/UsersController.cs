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

        //public IActionResult Create()
        //{
        //    return View();
        //}

        [HttpPost]
        public async Task<IActionResult> Create(User user)
        {
            if (ModelState.IsValid)
            {
                await userService.Create(user);
                return Ok(true);
            }

            return View(user);
        }

        [HttpGet]
        public async Task<IActionResult> Get(User user)
        {
            if(await userService.LogIn(user))
            {
                return Ok(true);
            }

            return Ok(false);
        }
    }
}