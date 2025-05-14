using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Application.DTOs.Jobs;

namespace backend.Application.DTOs.SavedJobs
{
    public class SavedPostByCollection : JobPostings
    {
        public int SavedJobId { get; set; }
    }
}
