using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Application.DTOs.Response
{
    public class ExperienceResponse
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public int? CompanyId { get; set; }

        public string CompanyName { get; set; }

        public string ManualCompanyName { get; set; }

        public string JobTitle { get; set; }

        public string Description { get; set; }

        public DateOnly StartDate { get; set; }

        public DateOnly? EndDate { get; set; }
    }
}
