using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using backend.Application.DTOs.Request;
using backend.Application.DTOs.Response;
using backend.Application.Exceptions;
using backend.Application.Interfaces.JobApplicationInterfaces;
using backend.Domain.Models;

namespace backend.Application.Services
{
    public class JobApplicationService : BaseService<IJobApplicationRepository, JobApplication, JobApplicationRequest, JobApplicationResponse>, IJobApplicationService
    {
        public JobApplicationService(IJobApplicationRepository repository, IMapper mapper) : base(repository, mapper)
        {
        }

        public async Task<IEnumerable<ApplicationsByEmployer>> GetApplicationsByEmployer(int employerId,JobApplicationFilters filters)
        {
            return await _repository.GetApplicationsByEmployer(employerId, filters);
        }

        public async Task<IEnumerable<ApplicationsByApplicant>> GetApplicationsByApplicant(int applicantId, JobApplicationFilters filters)
        {
            return await _repository.GetApplicationsByApplicant(applicantId, filters);
        }

        public async Task<IEnumerable<JobDataResponse>> GetJobsAppliedByUser(int userId)
        {
            return await _repository.GetJobsAppliedByUser(userId);
        }

        public async Task<IEnumerable<CompanyResponse>> GetCompaniesUserAppliedTo(int applicantId)
        {
            return await _repository.GetCompaniesUserAppliedTo(applicantId);
        }

        public async override Task<JobApplicationResponse> CreateAsync(JobApplicationRequest requestDto)
        {
            if (await _repository.HasApplied(requestDto.ApplicantId, requestDto.JobId)) {
                throw new AlreadyAppliedException("You have already applied for this job !");
            }
            return await base.CreateAsync(requestDto);
        }

        public async Task<bool> HasApplied(int userId, int jobId)
        {
            return await _repository.HasApplied(userId,jobId);
        }
    }
}
