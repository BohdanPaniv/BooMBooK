using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.GridFS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BooMBooK.Models.Comment
{
    public class CommentService
    {
        IGridFSBucket gridFS;
        IMongoCollection<Comment> Comments;
        public CommentService()
        {
            string connectionString = "mongodb://127.0.0.1:27017";
            MongoUrlBuilder connection = new MongoUrlBuilder(connectionString);
            MongoClient client = new MongoClient(connectionString);
            IMongoDatabase database = client.GetDatabase(connection.DatabaseName);
            gridFS = new GridFSBucket(database);
            Comments = database.GetCollection<Comment>("Articles");
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

        public async Task<Comment> GetComment(string id)
        {
            return await Comments.Find(new BsonDocument("_id", new ObjectId(id))).FirstOrDefaultAsync();
        }

        public async Task AddComment(Comment comment)
        {
            await Comments.InsertOneAsync(comment);
        }

        public async Task UpdateComment(Comment comment)
        {
            await Comments.ReplaceOneAsync(new BsonDocument("_id", new ObjectId(comment.ArticleId)), comment);
        }

        public async Task DeleteComment(string id)
        {
            await Comments.DeleteOneAsync(new BsonDocument("_id", new ObjectId(id)));
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
