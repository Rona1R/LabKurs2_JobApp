using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Domain.Models;

namespace backend.Application.Interfaces.JobApplicationInterfaces
{
    public interface IJobApplicationRepository : IBaseRepository<JobApplication>
    {
        Task<bool> HasApplied(int userId, int jobId);
    }
}
