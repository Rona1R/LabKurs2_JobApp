using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Domain.Models;

namespace backend.Application.DTOs.Response
{
    public class JobResponse
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public Country Country { get; set; }

        public string City { get; set; }

        public string Location { get; set; }

        public string EmploymentType { get; set; }

        public Decimal MinimalSalary { get; set; }

        public Decimal MaximalSalary { get; set; }

        public string Currency { get; set; }

        public string PayRange { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime Deadline { get; set; }

        public string SalaryPeriod { get; set; }

        public string Company {  get; set; }
        public int CompanyId { get; set; }

        public string Category { get; set; }

        public int CategoryId { get; set; }
    }
}
