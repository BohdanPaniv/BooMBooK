using BooMBooK.Models.User;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BooMBooK.Services
{
    public class UserService
    {
        private readonly IMongoCollection<User> Users;
        public UserService()
        {
            Users = DataBaseService.GetMongoCollection<User>("Users");
        }

        public async Task<bool> Create(User user)
        {
            user.UserId = Guid.NewGuid().ToString();
            List<User> foundUser = await Users.Find(x => x.Login == user.Login ||
                x.Email == user.Email).ToListAsync();
            
            if (foundUser.Count == 0)
            {
                await Users.InsertOneAsync(user);
                return true;
            }

            return false;
        }

        public async Task<bool> LogIn(string login, string password)
        {
            List<User> foundUser = await Users.Find(x => x.Login == login &&
                x.Password == password).ToListAsync();

            if (foundUser.Count == 0)
            {
                return false;
            }

            return true;
        }

        public async Task UpdateUser(User user)
        {
            await Users.ReplaceOneAsync(new BsonDocument("_id", new ObjectId(user.UserId)), user);
        }

        public async Task DeleteUser(string id)
        {
            await Users.DeleteOneAsync(new BsonDocument("_id", new ObjectId(id)));
        }
    }
}
