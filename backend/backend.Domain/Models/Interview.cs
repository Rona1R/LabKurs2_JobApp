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

        public TimeSpan Duration { get; set; } 

        public DateTime EndsAt => ScheduledAt.Add(Duration); 

        public InterviewMode InterviewMode { get; set; }

        public InterviewStatus Status { get; set; } = InterviewStatus.Scheduled;

        [ForeignKey(nameof(ApplicationId))]
        public virtual JobApplication Application { get; set; }
    }

    public enum InterviewMode
    {
        Remote,
        OnSite
    }

    public enum InterviewStatus
    {
        Scheduled,
        Completed,
        Canceled,
        Rescheduled
    }
}
