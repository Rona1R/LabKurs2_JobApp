using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Domain.Models
{
    public class Employer
    {
        public int Id { get; set; } 

        public int UserId { get; set; }

        public int DepartamentId { get; set; }  

        public DateTime CreatedAt { get; set; }  = DateTime.UtcNow;

        [ForeignKey(nameof(UserId))]    
        public virtual User User { get; set; }

        [ForeignKey(nameof(DepartamentId))]
        public virtual Departament Departament { get; set; }


        public virtual List<Company> Companies { get; set; }  = new List<Company>();
    }
}
