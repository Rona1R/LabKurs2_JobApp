using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Domain.Models;

namespace backend.Application.DTOs.Interviews
{
    public class InterviewRequest
    {
        public int ApplicationId { get; set; }

        public DateTime ScheduledAt { get; set; }

        public TimeSpan Duration { get; set; }

        public string InterviewMode { get; set; }

        public string? Status { get; set; }
    }
}
