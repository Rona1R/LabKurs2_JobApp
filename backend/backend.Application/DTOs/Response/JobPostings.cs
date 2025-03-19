using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Domain.Models;

namespace backend.Application.DTOs.Response
{
    public class JobPostings
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public Country Country { get; set; }

        public string City { get; set; }

        public DateTime Deadline { get; set; }

        public string DaysLeft { get; set; }

        public string CompanyLogo { get; set; }

    }
}
