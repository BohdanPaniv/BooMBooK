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

        [HttpPost]
        public async Task<IActionResult> Create(User user)
        {
            if (ModelState.IsValid)
            {
                return Ok(await userService.Create(user));
            }

            return Ok(false);
        }

        [HttpGet("{login},{password}")]
        public async Task<IActionResult> Get(string login,string password)
        {
            return Ok(await userService.LogIn(login, password));
        }
    }
}