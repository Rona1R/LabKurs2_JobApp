using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using backend.Application.DTOs.Request;
using backend.Application.DTOs.Response;
using backend.Application.Interfaces.JobDetailsInterfaces;
using backend.Domain.Models;

namespace backend.Application.Services
{
    public class JobDetailsService : IJobDetailsService
    {
        private readonly IJobDetailsRepository _jobDetailsRepository;
        private readonly IMapper _mapper;

        public JobDetailsService(IMapper mapper, IJobDetailsRepository jobDetailsRepository)
        {
            _mapper = mapper;
            _jobDetailsRepository = jobDetailsRepository;
        }

        public async Task CreateDetailsAsync(JobDetailsRequest request)
        {
            var details = _mapper.Map<JobDetails>(request);
            await _jobDetailsRepository.AddAsync(details);
        }

        public async Task UpdateDetailsAsync(int jobId, JobDetailsRequest request)
        {
            var details = await _jobDetailsRepository.GetByJobId(jobId);
            if (details != null)
            {
                _mapper.Map(request, details);
                await _jobDetailsRepository.UpdateAsync(details);
            }
        }

        public async Task<JobDetailsResponse?> GetDetailsByJob(int jobId)
        {
            var job = await _jobDetailsRepository.GetByJobId(jobId);
            return job != null ? _mapper.Map<JobDetailsResponse>(job) : default;
        }

        public async Task DeleteDetailsAsync(int jobId)
        {
            await _jobDetailsRepository.DeleteAsync(jobId);
        }
    }
}
