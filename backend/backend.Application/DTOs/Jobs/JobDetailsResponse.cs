using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace backend.Application.DTOs.Jobs
{
    public class JobDetailsResponse
    {
        public string Id { get; set; }

        public int JobId { get; set; }

        public List<string> Requirements { get; set; } = new List<string>();
        public List<string> RequiredSkills { get; set; } = new List<string>();

        public List<string> NiceToHaveSkills { get; set; } = new List<string>();
    }
}
