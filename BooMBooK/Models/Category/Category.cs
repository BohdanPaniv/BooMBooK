using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace BooMBooK.Models.Category
{
    public class Category
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string CategoryId { get; set; }

        [Display(Name = "CategoryName")]
        public string CategoryName { get; set; }
    }
}
