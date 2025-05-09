using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Domain.Models
{
    public class JobApplication
    {

        public int Id { get; set; }

        public int ApplicantId { get; set; }


        public int JobId { get; set; }
        public string ResumeUrl { get; set; }

        public ApplicationStatus ApplicationStatus { get; set; } = ApplicationStatus.Pending;

        public bool IsDeleted { get; set; } = false;

        public DateTime AppliedAt { get; set; } = DateTime.UtcNow;

        [ForeignKey(nameof(ApplicantId))]
        public virtual User User { get; set; }

        [ForeignKey(nameof(JobId))]
        public virtual Job Job { get; set; }

        public virtual List<Interview> Interviews { get; set;} = new List<Interview>();  
    }

    public enum ApplicationStatus
    {
        Pending,
        Approved,
        Rejected,
        InReview,
        Withdrawn
    }

}
