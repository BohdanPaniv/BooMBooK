using BooMBooK.Models.Image;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Threading.Tasks;

namespace BooMBooK.Services
{
    public class ImageService
    {
        IMongoCollection<Image> Images;
        public ImageService()
        {
            Images = DataBaseService.GetMongoCollection<Image>("Images");
        }
        public async Task<Image> GetComment(string id)
        {
            return await Images.Find(new BsonDocument("_id", new ObjectId(id))).FirstOrDefaultAsync();
        }

        public async Task Create(Image image)
        {
            await Images.InsertOneAsync(image);
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
