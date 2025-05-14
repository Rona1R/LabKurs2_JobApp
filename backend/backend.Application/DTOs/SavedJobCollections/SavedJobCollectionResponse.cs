using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Application.DTOs.SavedJobCollections
{
    public class SavedJobCollectionResponse
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int UserId { get; set; }
    }
}
