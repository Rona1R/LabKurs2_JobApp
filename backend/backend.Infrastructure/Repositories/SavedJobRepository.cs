using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Application.DTOs.Response;
using backend.Application.Interfaces.SavedJobInterfaces;
using backend.Domain.Models;
using backend.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Infrastructure.Repositories
{
    public class SavedJobRepository : ISavedJobRepository
    {
        private readonly ApplicationDbContext _context;
        public SavedJobRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        
        public async Task AddAsync(SavedJob savedJob)
        {
            await _context.SavedJob.AddAsync(savedJob);
            await _context.SaveChangesAsync();
        }   

        public async Task<IEnumerable<SavedJobByUserResponse>> GetSavedJobsByUserId(int userId)
        {
            return await _context.SavedJob
                .Where(savedJob => savedJob.UserId == userId)
                .AsNoTracking()
                .Select(savedJob => new SavedJobByUserResponse
                {
                    Id = savedJob.Id,
                    UserId = savedJob.UserId,
                    JobId = savedJob.JobId,
                    Job = new JobPostings
                    {
                        Id = savedJob.Job.Id,
                        Title = savedJob.Job.Title,
                        CompanyLogo = savedJob.Job.Company.Logo,
                        Country = savedJob.Job.Country,
                        City = savedJob.Job.City,   
                        Category = savedJob.Job.Category.Name,
                        CreatedAt = savedJob.Job.CreatedAt,
                        Deadline = savedJob.Job.Deadline,
                        EmploymentType = savedJob.Job.EmploymentType,
                        DaysLeft = CalculateDaysLeftUntilDeadline(savedJob.Job.Deadline)
                    }
                })
                .ToListAsync();
        }

        private static string CalculateDaysLeftUntilDeadline(DateTime deadline)
        {
            var daysLeft = 0;
            DateTime today = DateTime.Now;
            if (today < deadline)
            {
                TimeSpan timeSpan = deadline - today;
                daysLeft = (int)Math.Ceiling(timeSpan.TotalDays);
            }

            if (daysLeft == 1)
            {
                return daysLeft + " day left";
            }
            else
            {
                return daysLeft + " days left";
            }
        }
    }
}
