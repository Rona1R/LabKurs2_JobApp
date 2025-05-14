using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Application.DTOs.Tags;
using backend.Domain.Models;

namespace backend.Application.DTOs.Jobs
{
    public class JobWithDetailsResponse
    {
        public JobGeneralData Job { get; set; }

        public List<TagResponse> Tags { get; set; } = new List<TagResponse>();

        public List<string> Requirements { get; set; } = new List<string>();
        public List<string> RequiredSkills { get; set; } = new List<string>();

        public List<string> NiceToHaveSkills { get; set; } = new List<string>();

    }

    public class JobGeneralData
    {
        public int Id { get; set; }

        public string Description { get; set; }
        public string Title { get; set; }

        public Country Country { get; set; }

        public string City { get; set; }

        public DateTime Deadline { get; set; }

        public string EmploymentType { get; set; }

        public string Category { get; set; }

        public DateTime CreatedAt { get; set; }

        public string DaysLeft { get; set; }

        public string PayRange { get; set; }

        public string SalaryPeriod { get; set; }

        public string Company { get; set; }
        public string CompanyLogo { get; set; }
    }
}
