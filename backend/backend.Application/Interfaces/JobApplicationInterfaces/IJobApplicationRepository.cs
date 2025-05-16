using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Application.DTOs.Applications;
using backend.Application.DTOs.Companies;
using backend.Domain.Models;

namespace backend.Application.Interfaces.JobApplicationInterfaces
{
    public interface IJobApplicationRepository : IBaseRepository<JobApplication>
    {
        Task<IEnumerable<ApplicationsByApplicant>> GetApplicationsByApplicant(int applicantId, JobApplicationFilters filters);
        Task<IEnumerable<ApplicationsByEmployer>> GetApplicationsByEmployer(int employerId, JobApplicationFilters filters);
        Task<IEnumerable<ApplicationsByEmployer>> GetApplicationsByJob(int jobId);
        Task<IEnumerable<CompanyResponse>> GetCompaniesUserAppliedTo(int userId);
        Task<IEnumerable<JobDataResponse>> GetJobsAppliedByUser(int userId);
        Task<bool> HasApplied(int userId, int jobId);
    }
}
