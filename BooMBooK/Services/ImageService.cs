using BooMBooK.Models.Image;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.GridFS;
using System.Threading.Tasks;

namespace BooMBooK.Services
{
    public class ImageService
    {
        IMongoCollection<Image> Images;
        public ImageService()
        {
            string connectionString = "mongodb://127.0.0.1:27017";
            MongoUrlBuilder connection = new MongoUrlBuilder(connectionString);
            MongoClient client = new MongoClient(connectionString);
            IMongoDatabase database = client.GetDatabase(connection.DatabaseName);
            Images = database.GetCollection<Image>("Images");
        }
        public async Task<Image> GetComment(string id)
        {
            return await Images.Find(new BsonDocument("_id", new ObjectId(id))).FirstOrDefaultAsync();
        }

        public async Task AddComment(Image image)
        {
            await Images.InsertOneAsync(image);
        }

        public async Task UpdateComment(Image image)
        {
            await Images.ReplaceOneAsync(new BsonDocument("_id", new ObjectId(image.ImageId)), image);
        }

        public async Task DeleteComment(string id)
        {
            await Images.DeleteOneAsync(new BsonDocument("_id", new ObjectId(id)));
        }
    }
}
