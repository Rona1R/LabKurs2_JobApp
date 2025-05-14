using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using backend.Application.DTOs.Jobs;
using backend.Application.DTOs.Tags;
using backend.Application.Helpers;
using backend.Application.Interfaces.JobDetailsInterfaces;
using backend.Application.Interfaces.JobInterfaces;
using backend.Application.Interfaces.JobTagInterfaces;
using backend.Domain.Models;


namespace backend.Application.Services
{
    public class JobService : BaseService<IJobRepository, Job, JobRequest, JobResponse>, IJobService
    {
        private readonly IJobTagRepository _jobTagRespository;
        private readonly IJobDetailsRepository _jobDetailsRepository;
        public JobService(IJobRepository repository, IMapper mapper, IJobTagRepository jobTagRespository, IJobDetailsRepository jobDetailsRepository) : base(repository, mapper)
        {
            _jobTagRespository = jobTagRespository;
            _jobDetailsRepository = jobDetailsRepository;
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
        public async Task<IEnumerable<JobPostings>> GetSimilarPostings(int job)
        {
            var recommandations = await _repository.GetSimilarPostings(job);
            var postingsDto = _mapper.Map<IEnumerable<JobPostings>>(recommandations);
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
            return postingsDto;
        }
       

        public async Task<JobWithDetailsResponse?> GetJobWithDetails(int jobId)
        {
            var postingDetails = await _repository.GetByIdAsync(jobId);
            if(postingDetails == null)
            {
                return null;
            }

            var postingsDto = _mapper.Map<JobGeneralData>(postingDetails);
            var daysLeft = CalculateDaysLeftUntilDeadline(postingsDto.Deadline);
            postingsDto.DaysLeft = daysLeft == 1 ? daysLeft + " day left" : daysLeft + " days left";

            var jobWithDetailsResponse = new JobWithDetailsResponse()
            {
                Job = postingsDto,
            };

            var tags = await _jobTagRespository.GetByJob(jobId);
            foreach (var tag in tags)
            {
                var tagDto = new TagResponse()
                {
                    Id = tag.TagId,
                    Name = tag.Tag.Name
                };
                jobWithDetailsResponse.Tags.Add(tagDto);
            }

            var jobDetails = await _jobDetailsRepository.GetByJobId(jobId);
            if(jobDetails == null)
            {
                return null;
            }

            jobWithDetailsResponse.Requirements = jobDetails.Requirements;
            jobWithDetailsResponse.RequiredSkills = jobDetails.RequiredSkills;
            jobWithDetailsResponse.NiceToHaveSkills = jobDetails.NiceToHaveSkills;

            return jobWithDetailsResponse;
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

        public async Task<PaginatedResult<JobPostings>> GetByCategory(int categoryId,JobFilterRequest filters)
        {
            var postings = await _repository.GetByCategory(categoryId,filters);
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
       
        public async Task<PaginatedResult<JobPostings>> GetByTag(int tagId,JobFilterRequest filters)
        {
            var postings = await _repository.GetByTag(tagId, filters);
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

        public async Task<decimal> GetMaxSalaryAsync()
        {
            return await _repository.GetMaxSalaryAsync();
        }

        public async Task<decimal> GetMaxSalaryByCategory(int categoryId)
        {
            return await _repository.GetMaxSalaryByCategory(categoryId);
        }

        public async Task<decimal> GetMaxSalaryByTag(int tagId)
        {
            return await _repository.GetMaxSalaryByTag(tagId);
        }
    }
}
