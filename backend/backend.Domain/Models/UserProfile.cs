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
        public string Headline { get; set; } = string.Empty; // psh React Developer | Typescript etj
        public List<SocialAccount> SocialAccounts { get; set; } = new List<SocialAccount>();

        public List<string> Skills { get; set; } = new List<string>();

        public OpenToOptions OpenTo { get; set; } = new OpenToOptions();
    }

    public class SocialAccount
    {
        public string Provider { get; set; } // psh linkedIn , Github ...
        public string Link { get; set; }
    }

    public class OpenToOptions
    {
        public bool IsActive { get; set; }
        public List<string> SelectedOptions { get; set; } = new List<string>();
        public string CustomDescription { get; set; } = string.Empty;   
        public List<string> OpenToJobTypes { get; set; } = new List<string>();
        public List<string> OpenToRoles { get; set; } = new List<string>();
        public List<string> OpenToIndustries { get; set; } = new List<string>();
    }
}
