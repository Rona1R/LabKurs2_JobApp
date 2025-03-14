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

        [ForeignKey(nameof(UserId))]
        public virtual User User { get; set; }

        [ForeignKey(nameof(JobId))]
        public virtual Job Job { get; set; }
    }
}
