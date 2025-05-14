using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Domain.Models;

namespace backend.Application.DTOs.Jobs
{
    public class JobRequest
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public Country Country { get; set; }

        public string City { get; set; }

        public string EmploymentType { get; set; }

        public decimal MinimalSalary { get; set; }

        public decimal MaximalSalary { get; set; }

        public DateTime Deadline { get; set; }

       public string SalaryPeriod { get; set; }

       public string Currency { get; set; }


        public int CompanyId { get; set; }

        public int CategoryId { get; set; }
    }
}
