using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.GridFS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BooMBooK.Models.Category
{
    public class CategoryService
    {
        IGridFSBucket gridFS;
        IMongoCollection<Category> Categories;
        public CategoryService()
        {
            string connectionString = "mongodb://127.0.0.1:27017";
            MongoUrlBuilder connection = new MongoUrlBuilder(connectionString);
            MongoClient client = new MongoClient(connectionString);
            IMongoDatabase database = client.GetDatabase(connection.DatabaseName);
            gridFS = new GridFSBucket(database);
            Categories = database.GetCollection<Category>("Categories");
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
