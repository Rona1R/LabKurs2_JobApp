using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Application.DTOs.SavedJobCollections
{
    public class CollectionsByUserResponse : SavedJobCollectionResponse
    {
        public int PostCount { get; set; } 

    }
}
