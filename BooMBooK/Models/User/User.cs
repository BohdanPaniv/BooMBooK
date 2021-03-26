using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace BooMBooK.Models.User
{
    public class User
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string UserId { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        [BsonIgnoreIfNull]
        public byte[] Image { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        [BsonIgnoreIfNull]
        public bool Role { get; set; }

        [BsonIgnoreIfNull]
        public double Rating { get; set; }

        //public bool HasImage()
        //{
        //    return !String.IsNullOrWhiteSpace(Image);
        //}
    }
}
