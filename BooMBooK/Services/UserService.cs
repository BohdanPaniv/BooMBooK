using BooMBooK.Models.User;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.GridFS;
using System.Threading.Tasks;

namespace BooMBooK.Services
{
    public class UserService
    {
        IGridFSBucket gridFS;
        IMongoCollection<User> Users;
        public UserService()
        {
            string connectionString = "mongodb://127.0.0.1:27017";
            MongoUrlBuilder connection = new MongoUrlBuilder(connectionString);
            MongoClient client = new MongoClient(connectionString);
            IMongoDatabase database = client.GetDatabase(connection.DatabaseName);
            gridFS = new GridFSBucket(database);
            Users = database.GetCollection<User>("Users");
        }

        //public async Task<IEnumerable<User>> GetUsers(int? minPrice, int? maxPrice, string name)
        //{
        //    var builder = new FilterDefinitionBuilder<Product>();
        //    var filter = builder.Empty; // фильтр для выборки всех документов
        //    // фильтр по имени
        //    if (!String.IsNullOrWhiteSpace(name))
        //    {
        //        filter = filter & builder.Regex("Name", new BsonRegularExpression(name));
        //    }
        //    if (minPrice.HasValue)  // фильтр по минимальной цене
        //    {
        //        filter = filter & builder.Gte("Price", minPrice.Value);
        //    }
        //    if (maxPrice.HasValue)  // фильтр по максимальной цене
        //    {
        //        filter = filter & builder.Lte("Price", maxPrice.Value);
        //    }

        //    return await Products.Find(filter).ToListAsync();
        //}

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

        public async Task<byte[]> GetImage(string id)
        {
            return await gridFS.DownloadAsBytesAsync(new ObjectId(id));
        }

        //public async Task StoreImage(string id, Stream imageStream, string imageName)
        //{
        //    User p = await GetUser(id);

        //    if (p.HasImage())
        //    {
        //        await gridFS.DeleteAsync(new ObjectId(p.ImageId));
        //    }

        //    ObjectId imageId = await gridFS.UploadFromStreamAsync(imageName, imageStream);

        //    p.ImageId = imageId.ToString();
        //    var filter = Builders<User>.Filter.Eq("_id", new ObjectId(p.UserId));
        //    var update = Builders<User>.Update.Set("ImageId", p.UserId);
        //    await Users.UpdateOneAsync(filter, update);
        //}
    }
}
