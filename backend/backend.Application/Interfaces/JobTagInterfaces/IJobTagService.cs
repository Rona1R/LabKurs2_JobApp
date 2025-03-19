using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Application.DTOs.Request;
using backend.Application.DTOs.Response;

namespace backend.Application.Interfaces.JobTagInterfaces
{
    public interface IJobTagService : IBaseService<JobTagRequest,JobTagResponse>
    {
        Task<IEnumerable<JobTagResponse>> GetByJob(int jobId);

        Task AddJobTags(IEnumerable<JobTagRequest> jobTags);
    }
}
