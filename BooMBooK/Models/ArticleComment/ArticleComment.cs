using MongoDB.Bson.Serialization.Attributes;

namespace BooMBooK.Models.ArticleComment
{
    public class ArticleComment
    {
        [BsonId]
        public string CommentId { get; set; }
        public string ArticleId { get; set; }
        
    }
}
