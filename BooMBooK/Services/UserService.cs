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

        //public async Task<User> GetUser(string id)
        //{
        //    return await Users.Find(new BsonDocument("_id", new ObjectId(id))).FirstOrDefaultAsync();
        //}

        public async Task Create(User user)
        {
            string newId;

            while(true)
            {
                newId = Guid.NewGuid().ToString();
                List<User> foundUser = await Users.Find(x => x.UserId == newId).ToListAsync();

                if (foundUser.Count == 0)
                {
                    user.UserId = newId;
                    break;
                }
            }

            await Users.InsertOneAsync(user);
        }

        public async Task<bool> LogIn(User user)
        {
            List<User> foundUser = await Users.Find(x => x.Login == user.Login &&
                x.Password == user.Password).ToListAsync();

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
