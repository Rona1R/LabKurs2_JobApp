using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Domain.Models
{
    public class Tag
    {

        public int Id { get; set; }

        public string Name { get; set; }

        public virtual List<JobTag> JobTags { get; set; } = new List<JobTag>();
    }
}
