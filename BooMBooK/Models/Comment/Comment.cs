using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.ComponentModel.DataAnnotations;

namespace BooMBooK.Models.Comment
{
    public class Comment
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string CommentId { get; set; }
        [Display(Name = "UserId")]
        public string UserId { get; set; }

        [Display(Name = "ArticleId")]
        public string ArticleId { get; set; }

        [Display(Name = "DateTime")]
        public DateTime DateTime { get; set; }

        [Display(Name = "Text")]
        public string Text { get; set; }

        [Display(Name = "Rating")]
        public double Rating { get; set; }
    }
}
