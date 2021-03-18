using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace BooMBooK.Models.User
{
    public class User
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string UserId { get; set; }
        [Display(Name = "FirstName")]
        public string FirstName { get; set; }

        [Display(Name = "LastName")]
        public string LastName { get; set; }

        [Display(Name = "Image")]
        public byte[] Image { get; set; }

        [Display(Name = "Email")]
        public string Email { get; set; }

        [Display(Name = "Password")]
        public string Password { get; set; }

        [Display(Name = "Role")]
        public bool Role { get; set; }

        [Display(Name = "Rating")]
        public double Rating { get; set; }

        //public bool HasImage()
        //{
        //    return !String.IsNullOrWhiteSpace(Image);
        //}
    }
}
