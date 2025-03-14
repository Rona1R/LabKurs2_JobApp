using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Domain.Models
{
    public class Job
    {

        public int Id { get; set; } 

        public string Title { get; set; }    

        public string Description { get; set; }

        public Country Country { get; set; }

        public string City { get; set; }

        public string EmploymentType { get; set; }

        public Decimal MinimalSalary { get; set; }

        public Decimal MaximalSalary { get; set; }

        public SalaryType SalaryPeriod { get; set; }
        public string Currency { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime Deadline { get; set; }
        public bool IsDeleted { get; set; } = false;

        public int CompanyId { get; set; }

        public int CategoryId { get; set; }
 

        [ForeignKey(nameof(CompanyId))] 
        public virtual Company Company { get; set; }

        [ForeignKey(nameof(CategoryId))]    
        public virtual Category Category { get; set; }  

        public virtual List<JobApplication> JobApplications { get; set; }= new List<JobApplication>();

        public virtual List<SavedJob> SavedJobs { get; set; } = new List<SavedJob>();

        public virtual List<JobTag> JobTags { get; set; } = new List<JobTag>();
    }

    public enum SalaryType
    {
        Hourly,
        Monthly,
        Yearly
    }

    public class Country
    {
        public string Value { get; set; }
        public string Label { get; set; }
    }


}
