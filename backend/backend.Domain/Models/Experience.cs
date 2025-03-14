using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Domain.Models
{
    public class Experience
    {

        public int Id { get; set; }


        public int UserId { get; set; }

        public int? CompanyId { get; set; }

        public string CompanyName { get; set; } = string.Empty;

        public string JobTitle { get; set; }

        public string? Description { get; set; }

        public DateOnly StartDate { get; set; }

        public DateOnly? EndDate { get; set; }


        [ForeignKey(nameof(UserId))]
        public virtual User User { get; set; }

        [ForeignKey(nameof(CompanyId))]
        public virtual Company? Company { get; set; }
    }
}
