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
        public async Task<bool> Create(User user)
        {
            if (ModelState.IsValid)
            {
                await userService.Create(user);
                return true;
            }

            return false;
        }
    }
}