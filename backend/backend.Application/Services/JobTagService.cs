using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using backend.Application.DTOs.JobTags;
using backend.Application.Interfaces.JobTagInterfaces;
using backend.Domain.Models;

namespace backend.Application.Services
{
    public class JobTagService : BaseService<IJobTagRepository, JobTag, JobTagRequest, JobTagResponse> , IJobTagService
    {
        public JobTagService(IJobTagRepository repository, IMapper mapper) : base(repository, mapper)
        {
        }

        public async Task<IEnumerable<JobTagResponse>> GetByJob(int jobId)
        {
            var tags = await _repository.GetByJob(jobId);
            return _mapper.Map<IEnumerable<JobTagResponse>>(tags);
        }

        public async Task AddJobTags(IEnumerable<JobTagRequest> jobTags)
        {
            var tags = _mapper.Map<IEnumerable<JobTag>>(jobTags);
            await _repository.AddJobTags(tags);
        }
    }
}
