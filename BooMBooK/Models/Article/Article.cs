using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.ComponentModel.DataAnnotations;

namespace BooMBooK.Models.Article
{
    public class Article
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string ArticleId { get; set; }

        public string UserId { get; set; }

        public DateTime DateTime { get; set; }

        [BsonIgnoreIfNull]
        public int Rating { get; set; }

        public byte[] Body_Article { get; set; }

        public bool Status { get; set; }

        [BsonIgnoreIfNull]
        public string CategoryId { get; set; }

        public string Title { get; set; }
    }
}
