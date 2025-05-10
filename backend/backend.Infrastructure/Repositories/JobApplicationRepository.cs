using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Application.DTOs.Request;
using backend.Application.DTOs.Response;
using backend.Application.Helpers;
using backend.Application.Interfaces.JobApplicationInterfaces;
using backend.Domain.Models;
using backend.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Infrastructure.Repositories
{
    public class JobApplicationRepository : BaseRepository<JobApplication>, IJobApplicationRepository
    {
        public JobApplicationRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<ApplicationsByEmployer>> GetApplicationsByEmployer(int employerId, JobApplicationFilters filters)
        {
            var query = _context.JobApplication
                .Include(j => j.Job)
                .ThenInclude(job => job.Company)
                .Include(j => j.User)
                .Where(j => !j.IsDeleted && j.Job.Company.Employer.UserId == employerId)
                .OrderByDescending(j => j.Id)
                .AsQueryable();

            if (filters.CompanyId > 0)
            {
                query = query.Where(j => j.Job.CompanyId == filters.CompanyId);
            }

            if (filters.JobId > 0)
            {
                query = query.Where(j => j.JobId == filters.JobId);
            }

            var result = await query.Select(j => new ApplicationsByEmployer
            {
                Id = j.Id,
                ApplicantId = j.ApplicantId,
                JobId = j.JobId,
                CompanyName = j.Job.Company.Name,
                ResumeUrl = j.ResumeUrl,
                ApplicationStatus = j.ApplicationStatus,
                AppliedAt = j.AppliedAt,
                Applicant = new ApplicantResponse
                {
                    Id = j.User.Id,
                    Name = j.User.Name,
                    LastName = j.User.LastName,
                    Email = j.User.AspNetUser.Email ?? "Not Provided"
                },
                Job = new JobDataResponse
                {
                    Id = j.Job.Id,
                    Title = j.Job.Title
                }
            }).ToListAsync();

            return result;
        }

        public async Task<bool> HasApplied(int userId,int jobId)
        {
            return await _context.JobApplication.Where(j=>!j.IsDeleted && j.ApplicantId == userId && j.JobId == jobId).AnyAsync();
        }

        public override async Task<IEnumerable<JobApplication>> GetAllAsync()
        {
            return await _context.JobApplication.Where(j=> !j.IsDeleted).OrderByDescending(j=>j.Id).ToListAsync();
        }

        public override async Task<JobApplication?> GetByIdAsync(int id)
        {
            return await _context.JobApplication.Where(j=>j.Id == id && !j.IsDeleted).FirstOrDefaultAsync();
        }
    }
}
