using BooMBooK.Models.User;
using BooMBooK.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using MongoDB.Bson;

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

        [HttpGet("{login},{password}")]
        public async Task<IActionResult> Get(string login,string password)
        {
            if (await userService.LogIn(login, password))
            {
                return Ok(true);
            }

            return Ok(false);
        }
    }
}