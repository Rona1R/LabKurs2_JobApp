using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Application.DTOs.Request;
using backend.Application.Helpers;
using backend.Domain.Models;

namespace backend.Application.Interfaces.JobInterfaces
{
    public interface IJobRepository : IBaseRepository<Job>
    {
        Task<PaginatedResult<Job>> GetFilteredPosts(JobFilterRequest filters);
    }
}
