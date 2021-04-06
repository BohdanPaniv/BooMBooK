using MongoDB.Bson.Serialization.Attributes;
using System;

namespace BooMBooK.Models.Article
{
    public class Article
    {
        [BsonId]
        public string ArticleId { get; set; }

        public string UserId { get; set; }

        public DateTime DateTime { get; set; }

        [BsonIgnoreIfNull]
        public int Rating { get; set; }

        public string Body_Article { get; set; }

        public bool Status { get; set; }

        [BsonIgnoreIfNull]
        public string CategoryId { get; set; }

        public string Title { get; set; }
    }
}
