using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Domain.Models;

namespace backend.Application.Interfaces.JobTagInterfaces
{
    public interface IJobTagRepository : IBaseRepository<JobTag>
    {
        Task<IEnumerable<JobTag>> GetByJob(int jobId);

        Task AddJobTags(IEnumerable<JobTag> jobTags);
    }
}
