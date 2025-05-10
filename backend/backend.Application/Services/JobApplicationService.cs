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
