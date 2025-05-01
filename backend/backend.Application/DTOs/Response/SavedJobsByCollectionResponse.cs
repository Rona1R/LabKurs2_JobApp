using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Application.DTOs.Response
{
    public class SavedJobsByCollectionResponse
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public IEnumerable<SavedPostByCollection> SavedPosts { get; set; } = new List<SavedPostByCollection>();
    }
}
