using BooMBooK.Models.ArticleComment;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.GridFS;
using System.Threading.Tasks;

namespace BooMBooK.Services
{
    public class ArticleCommentsService
    {
        IMongoCollection<ArticleComment> ArticleComments;
        public ArticleCommentsService()
        {
            string connectionString = "mongodb://127.0.0.1:27017";
            MongoUrlBuilder connection = new MongoUrlBuilder(connectionString);
            MongoClient client = new MongoClient(connectionString);
            IMongoDatabase database = client.GetDatabase(connection.DatabaseName);
            ArticleComments = database.GetCollection<ArticleComment>("ArticleComments");
        }

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
    }
}
