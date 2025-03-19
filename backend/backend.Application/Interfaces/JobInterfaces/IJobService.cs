using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Application.DTOs.Request;
using backend.Application.DTOs.Response;
using backend.Application.Helpers;

namespace backend.Application.Interfaces.JobInterfaces
{
    public interface IJobService : IBaseService<JobRequest, JobResponse>
    {
        Task<PaginatedResult<JobPostings>> GetFilteredPosts(JobFilterRequest filters);
    }
}
