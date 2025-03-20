using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Application.DTOs.Response
{
    public class EducationResponse
    {
        public int Id { get; set; }
        public int UserId { get; set; }

        public int? InstitutionId { get; set; }

        public string InstitutionName { get; set; }

        public string ManualInstitutionName { get; set; }

        public string Degree { get; set; }

        public string FieldOfStudy { get; set; }

        public string Description { get; set; }

        public decimal? Grade { get; set; }

        public DateOnly StartDate { get; set; }

        public DateOnly? EndDate { get; set; }
    }
}
