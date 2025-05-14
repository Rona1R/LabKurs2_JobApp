using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Application.DTOs.SavedJobs
{
    public class SavedJobRequest
    {
        public int UserId { get; set; }
        public int JobId { get; set; }

        public int? SavedJobCollectionId { get; set; }
    }
}
