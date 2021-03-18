using BooMBooK.Models.ArticleComment;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.GridFS;
using System.Threading.Tasks;

namespace BooMBooK.Services
{
    public class ArticleCommentsService
    {
        IGridFSBucket gridFS;
        IMongoCollection<ArticleComment> ArticleComments;
        public ArticleCommentsService()
        {
            string connectionString = "mongodb://127.0.0.1:27017";
            MongoUrlBuilder connection = new MongoUrlBuilder(connectionString);
            MongoClient client = new MongoClient(connectionString);
            IMongoDatabase database = client.GetDatabase(connection.DatabaseName);
            gridFS = new GridFSBucket(database);
            ArticleComments = database.GetCollection<ArticleComment>("ArticleComments");
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

        public async Task<ArticleComment> GetArticleComment(string id)
        {
            return await ArticleComments.Find(new BsonDocument("_id", new ObjectId(id))).FirstOrDefaultAsync();
        }

        public async Task AddArticleComment(ArticleComment articleComment)
        {
            await ArticleComments.InsertOneAsync(articleComment);
        }

        public async Task UpdateArticleComments(ArticleComment articleComment)
        {
            await ArticleComments.ReplaceOneAsync(new BsonDocument("_id", new ObjectId(articleComment.ArticleId)), articleComment);
        }

        public async Task DeleteArticleComments(string id)
        {
            await ArticleComments.DeleteOneAsync(new BsonDocument("_id", new ObjectId(id)));
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
