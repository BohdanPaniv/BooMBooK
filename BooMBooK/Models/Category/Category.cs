using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace BooMBooK.Models.Category
{
    public class Category
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string CategoryId { get; set; }

        public string CategoryName { get; set; }
    }
}
