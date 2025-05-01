using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Application.DTOs.Response
{
    public class SavedPostByCollection : JobPostings
    {
        public int SavedJobId { get; set; }
    }
}
