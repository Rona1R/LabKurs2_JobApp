using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace backend.Domain.Models
{
    public class UserProfile
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public int UserId { get; set; }

        public List<string> Skills { get; set; } = new List<string>();

        public OpenToOptions OpenTo { get; set; } = new OpenToOptions();
    }

    public class OpenToOptions
    {

        public string OpenToWork { get; set; } = "";
        
        public string BusinessOpportunities { get; set; } = "";

        public string ProvidingServices { get; set; } = "";

        public string Networking { get; set; } = "";
    }

}
