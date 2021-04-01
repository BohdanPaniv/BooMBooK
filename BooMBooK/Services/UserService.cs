using BooMBooK.Models.User;
using MongoDB.Bson;
using MongoDB.Driver;
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

        public async Task<User> GetUser(string id)
        {
            return await Users.Find(new BsonDocument("_id", new ObjectId(id))).FirstOrDefaultAsync();
        }

        public User Create(User user)
        {
            Users.InsertOneAsync(user);
            return user;
        }

        public async Task AddUser(User user)
        {
            await Users.InsertOneAsync(user);
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
