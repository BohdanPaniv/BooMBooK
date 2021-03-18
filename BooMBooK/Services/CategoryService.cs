using BooMBooK.Models.Category;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.GridFS;
using System.Threading.Tasks;

namespace BooMBooK.Services
{
    public class CategoryService
    {
        IMongoCollection<Category> Categories;
        public CategoryService()
        {
            string connectionString = "mongodb://127.0.0.1:27017";
            MongoUrlBuilder connection = new MongoUrlBuilder(connectionString);
            MongoClient client = new MongoClient(connectionString);
            IMongoDatabase database = client.GetDatabase(connection.DatabaseName);
            Categories = database.GetCollection<Category>("Categories");
        }

        public async Task<Category> GetCategories(string id)
        {
            return await Categories.Find(new BsonDocument("_id", new ObjectId(id))).FirstOrDefaultAsync();
        }

        public async Task AddCategory(Category category)
        {
            await Categories.InsertOneAsync(category);
        }

        public async Task UpdateCategory(Category category)
        {
            await Categories.ReplaceOneAsync(new BsonDocument("_id", new ObjectId(category.CategoryId)), category);
        }

        public async Task DeleteCategory(string id)
        {
            await Categories.DeleteOneAsync(new BsonDocument("_id", new ObjectId(id)));
        }
    }
}
