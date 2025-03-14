using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Domain.Models
{
    public class Interview
    {

        public int Id { get; set; } 

        public int ApplicationId { get; set; }

        public DateTime ScheduledAt { get; set; }

        public string InterviewMode { get; set; }

        [ForeignKey(nameof(ApplicationId))]
        public virtual JobApplication Application { get; set; } 
      
    }
}
