using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Domain.Models;

namespace backend.Application.DTOs.Interviews
{
    public class InterviewResponse
    {
        public int Id { get; set; }

        public int ApplicationId { get; set; }

        public DateTime ScheduledAt { get; set; }

        public TimeSpan Duration { get; set; }

        public DateTime EndsAt => ScheduledAt.Add(Duration);

        public InterviewMode InterviewMode { get; set; }

        public InterviewStatus Status { get; set; } = InterviewStatus.Scheduled;
    }
}
