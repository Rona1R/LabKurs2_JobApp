using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Application.DTOs.Applications
{
    public class JobApplicationRequest
    {
        public int ApplicantId { get; set; }

        public int JobId { get; set; }
        public string ResumeUrl { get; set; }

        public string ApplicationStatus { get; set; } = "Pending";

    }
}
