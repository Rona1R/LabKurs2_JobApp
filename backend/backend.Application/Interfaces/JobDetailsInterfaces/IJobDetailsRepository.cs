using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Domain.Models;

namespace backend.Application.Interfaces.JobDetailsInterfaces
{
    public interface IJobDetailsRepository
    {
        Task AddAsync(JobDetails entity);
        Task DeleteAsync(int jobId);
        Task<JobDetails?> GetByJobId(int jobId);
        Task UpdateAsync(JobDetails entity);
    }
}
