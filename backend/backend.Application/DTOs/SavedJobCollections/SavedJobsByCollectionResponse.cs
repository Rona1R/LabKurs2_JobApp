using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Application.DTOs.SavedJobs;

namespace backend.Application.DTOs.SavedJobCollections
{
    public class SavedJobsByCollectionResponse
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public IEnumerable<SavedPostByCollection> SavedPosts { get; set; } = new List<SavedPostByCollection>();
    }
}
