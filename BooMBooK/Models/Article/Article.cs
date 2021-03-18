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
        [Display(Name = "UserId")]
        public string UserId { get; set; }

        [Display(Name = "DateTime")]
        public DateTime DateTime { get; set; }

        [Display(Name = "Rating")]
        public int Rating { get; set; }

        [Display(Name = "Body_Article")]
        public byte[] Body_Article { get; set; }

        [Display(Name = "Status")]
        public bool Status { get; set; }

        [Display(Name = "Role")]
        public string CategoryId { get; set; }

        [Display(Name = "Title")]
        public string Title { get; set; }
    }
}
