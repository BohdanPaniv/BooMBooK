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

        [HttpPost]
        public async Task<User> Create(User user)
        {
            return await userService.Create(user);
        }

        [HttpGet("{login},{password}")]
        public async Task<User> GetUser(string login,string password)
        {
            return await userService.LogIn(login, password);
        }

        [HttpPut]
        public async Task DeleteUser(string id)
        {
            await userService.DeleteUser(id);
        }
    }
}