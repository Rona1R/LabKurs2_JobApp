using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Domain.Models
{
    public class SavedJob
    {
        public int Id { get; set; }

        public int UserId { get; set; }
        public int JobId { get; set; }

        public int? SavedJobCollectionId { get; set; } // optional fk constraint cause jobs can be saved without belonging to a collection 

        [ForeignKey(nameof(UserId))]
        public virtual User User { get; set; }

        [ForeignKey(nameof(JobId))]
        public virtual Job Job { get; set; }

        [ForeignKey(nameof(SavedJobCollectionId))]  
        public virtual SavedJobCollection? SavedJobCollection { get; set; } 
    }
}
