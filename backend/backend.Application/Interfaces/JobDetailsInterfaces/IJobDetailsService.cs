using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Application.DTOs.Jobs;

namespace backend.Application.Interfaces.JobDetailsInterfaces
{
    public interface IJobDetailsService
    {
        Task CreateDetailsAsync(JobDetailsRequest request);
        //Task DeleteDetailsAsync(int jobId);
        Task<JobDetailsResponse?> GetDetailsByJob(int jobId);
        Task UpdateDetailsAsync(int jobId, JobDetailsRequest request);
    }
}
