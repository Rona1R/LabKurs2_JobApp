using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Domain.Models
{
    public class Institution
    {

        public int Id { get; set; } 


        public string Name { get; set; }    

        public string Type { get; set; } //highschool,university,college etc

        public virtual List<Education> Educations { get; set; } = new List<Education>();
    }
}
