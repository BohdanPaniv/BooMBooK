using MongoDB.Driver;

namespace BooMBooK.Services
{
    public static class DataBaseService
    {
        public static IMongoCollection<T> GetMongoCollection<T>(string tableName)
        {
            string connectionString = "mongodb+srv://admin:qwe123@cluster1.wf06f.mongodb.net/test";
            MongoUrlBuilder connection = new MongoUrlBuilder(connectionString);
            MongoClient client = new MongoClient(connectionString);
            IMongoDatabase database = client.GetDatabase(connection.DatabaseName);
            return database.GetCollection<T>(tableName);
        }
    }
}
