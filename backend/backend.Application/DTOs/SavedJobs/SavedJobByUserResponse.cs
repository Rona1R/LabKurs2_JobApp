using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Application.DTOs.Jobs;

namespace backend.Application.DTOs.SavedJobs
{
    public class SavedJobByUserResponse
    {
        public int Id { get; set; }
        public int UserId { get; set; }

        public int? SavedJobCollectionId { get; set; }
        public int JobId { get; set; }
        public required JobPostings Job { get; set; }
    }
}
