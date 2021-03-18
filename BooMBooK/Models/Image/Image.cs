using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BooMBooK.Models.Image
{
    public class Image
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string ImageId { get; set; }
        [Display(Name = "ImageSource")]
        public string ImageSource { get; set; }
    }
}
