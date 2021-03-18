using BooMBooK.Models.Article;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Threading.Tasks;

namespace BooMBooK.Services
{
    public class ArticleService
    {
        IMongoCollection<Article> Articles;
        public ArticleService()
        {
            string connectionString = "mongodb://127.0.0.1:27017";
            MongoUrlBuilder connection = new MongoUrlBuilder(connectionString);
            MongoClient client = new MongoClient(connectionString);
            IMongoDatabase database = client.GetDatabase(connection.DatabaseName);
            Articles = database.GetCollection<Article>("Articles");
        }

        public async Task<Article> GetArticle(string id)
        {
            return await Articles.Find(new BsonDocument("_id", new ObjectId(id))).FirstOrDefaultAsync();
        }

        public async Task AddArticle(Article article)
        {
            await Articles.InsertOneAsync(article);
        }

        public async Task UpdateArticle(Article article)
        {
            await Articles.ReplaceOneAsync(new BsonDocument("_id", new ObjectId(article.ArticleId)), article);
        }

        public async Task DeleteArticle(string id)
        {
            await Articles.DeleteOneAsync(new BsonDocument("_id", new ObjectId(id)));
        }
    }
}
