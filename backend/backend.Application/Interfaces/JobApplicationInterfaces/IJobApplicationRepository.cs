using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Application.DTOs.Request;
using backend.Application.DTOs.Response;
using backend.Domain.Models;

namespace backend.Application.Interfaces.JobApplicationInterfaces
{
    public interface IJobApplicationRepository : IBaseRepository<JobApplication>
    {
        Task<IEnumerable<ApplicationsByEmployer>> GetApplicationsByEmployer(int employerId, JobApplicationFilters filters);
        Task<bool> HasApplied(int userId, int jobId);
    }
}
