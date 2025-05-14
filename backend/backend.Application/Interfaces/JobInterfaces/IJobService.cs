using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Application.DTOs.Jobs;
using backend.Application.Helpers;

namespace backend.Application.Interfaces.JobInterfaces
{
    public interface IJobService : IBaseService<JobRequest, JobResponse>
    {
        Task<PaginatedResult<JobPostings>> GetByCategory(int categoryId, JobFilterRequest filters);
        Task<IEnumerable<JobResponse>> GetByEmployer(int employerId);
        Task<PaginatedResult<JobPostings>> GetByTag(int tagId, JobFilterRequest filters);
        Task<PaginatedResult<JobPostings>> GetFilteredPosts(JobFilterRequest filters);
        Task<JobWithDetailsResponse?> GetJobWithDetails(int jobId);
        Task<decimal> GetMaxSalaryAsync();
        Task<decimal> GetMaxSalaryByCategory(int categoryId);
        Task<decimal> GetMaxSalaryByTag(int tagId);
        Task<IEnumerable<JobPostings>> GetSimilarPostings(int job);
    }
}
