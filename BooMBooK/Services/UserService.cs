using BooMBooK.Models.User;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.GridFS;
using System.Threading.Tasks;

namespace BooMBooK.Services
{
    public class UserService
    {
        IMongoCollection<User> Users;
        public UserService()
        {
            string connectionString = "mongodb://127.0.0.1:27017";
            MongoUrlBuilder connection = new MongoUrlBuilder(connectionString);
            MongoClient client = new MongoClient(connectionString);
            IMongoDatabase database = client.GetDatabase(connection.DatabaseName);
            Users = database.GetCollection<User>("Users");
        }

        public async Task<User> GetUser(string id)
        {
            return await Users.Find(new BsonDocument("_id", new ObjectId(id))).FirstOrDefaultAsync();
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
