using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Domain.Models
{
    public class Education
    {

        public int Id { get; set; } 


        public int UserId { get; set; }

        public int? InstitutionId { get; set; }

        public string InstitutionName { get; set; } = string.Empty;

        public string Degree { get; set; }

        public string FieldOfStudy { get; set; }

        public string? Description { get; set; }

        public decimal? Grade { get; set; }      

        public DateOnly StartDate { get; set; }

        public DateOnly? EndDate { get; set;} 


        [ForeignKey(nameof(UserId))]
        public virtual User User { get; set; }

        [ForeignKey(nameof(InstitutionId))]
        public virtual Institution? Institution { get; set; }    
    }
}
