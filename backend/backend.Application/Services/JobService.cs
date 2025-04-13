using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using backend.Application.DTOs.Request;
using backend.Application.DTOs.Response;
using backend.Application.Helpers;
using backend.Application.Interfaces.JobInterfaces;
using backend.Domain.Models;


namespace backend.Application.Services
{
    public class JobService : BaseService<IJobRepository, Job, JobRequest, JobResponse>, IJobService
    {
        public JobService(IJobRepository repository, IMapper mapper) : base(repository, mapper)
        {
        }

        private int CalculateDaysLeftUntilDeadline(DateTime deadline)
        {
            DateTime today = DateTime.Now; 
            if (today > deadline)
            {
                return 0; 
            }
            else
            {
                TimeSpan timeSpan = deadline - today; 
                return (int)Math.Ceiling(timeSpan.TotalDays); 
            }
        }

        public async Task <IEnumerable<JobResponse>> GetByEmployer(int employerId)
        {
           var jobs = await _repository.GetByEmployer(employerId);
           return _mapper.Map<IEnumerable<JobResponse>>(jobs);
        }

        public async Task<PaginatedResult<JobPostings>> GetFilteredPosts(JobFilterRequest filters)
        {
            var postings = await _repository.GetFilteredPosts(filters);
            var postingsDto = _mapper.Map<IEnumerable<JobPostings>>(postings.Items);
            foreach (var posting in postingsDto)
            {
                var daysLeft = CalculateDaysLeftUntilDeadline(posting.Deadline);
                if (daysLeft == 1)
                {
                    posting.DaysLeft = daysLeft + " day left";
                }
                else
                {
                    posting.DaysLeft = daysLeft + " days left";
                }
            }

            return new PaginatedResult<JobPostings>
            {
                Items = postingsDto,
                TotalRecords = postings.TotalRecords,
                PageNumber = postings.PageNumber,
                PageSize = postings.PageSize,
                TotalPages = postings.TotalPages
            };

        }
    }
}
