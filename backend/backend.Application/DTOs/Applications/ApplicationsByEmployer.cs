using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Domain.Models;

namespace backend.Application.DTOs.Applications
{
    public class ApplicationsByEmployer // dto response - applications for jobs posted by specific employer
    {
        public int Id { get; set; }

        public int ApplicantId { get; set; }

        public string CompanyName { get; set; }

        public int JobId { get; set; }
        public string ResumeUrl { get; set; }

        public string ApplicationStatus { get; set; }

        public DateTime AppliedAt { get; set; } = DateTime.UtcNow;


        public ApplicantResponse Applicant {  get; set; }


        public JobDataResponse Job { get; set; }    
    }

    public class ApplicantResponse
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }
    }


    public class JobDataResponse
    {
        public int Id { get; set; }

        public string Title { get; set; }
    }

}
