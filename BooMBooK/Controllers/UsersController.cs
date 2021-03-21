using BooMBooK.Models.User;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BooMBooK.Controllers
{
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        static readonly List<User> users;
        static UsersController()
        {
            users = new List<User>();
        }

        [HttpGet]
        public IEnumerable<User> Get()
        {
            return users;
        }

        [HttpPost]
        public IActionResult Post(User user)
        {
            user.UserId = Guid.NewGuid().ToString();
            users.Add(user);
            return Ok(user);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            User user = users.FirstOrDefault(x => x.UserId == id);
            
            if (user == null)
            {
                return NotFound();
            }
            users.Remove(user);
            return Ok(user);
        }
    }
}
