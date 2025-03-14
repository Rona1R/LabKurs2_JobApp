using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Domain.Models
{
    public class Departament
    {
        public int Id { get; set; } 

        public string Name { get; set; }    

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedAt { get; set;} = DateTime.UtcNow;

        public string Description { get; set; }

        public virtual List<Employer> Employers { get; set; } = new List<Employer>();
    }
}
