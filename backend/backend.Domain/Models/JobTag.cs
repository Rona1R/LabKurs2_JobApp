using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Domain.Models
{
    public class JobTag
    {
        public int Id { get; set; }

        public int TagId { get; set; }
        public int JobId { get; set; }

        [ForeignKey(nameof(TagId))]
        public virtual Tag Tag { get; set; }

        [ForeignKey(nameof(JobId))]
        public virtual Job  Job { get; set; }
    }
}
