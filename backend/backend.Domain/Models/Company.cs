using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Domain.Models
{
    public class Company
    {

        public int Id { get; set; } 

        public string Name { get; set;}

        public string Description { get; set;}  

        public string Logo { get; set;}

        public int EmployerId { get; set; }

        public bool IsDeleted { get; set; } = false;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;


        [ForeignKey(nameof(EmployerId))]
        public virtual Employer Employer { get; set; }

        public virtual List<Job> Jobs { get; set; } = new List<Job>();

        public virtual List<Experience> Experiences { get; set; } = new List<Experience>();

    }
}
