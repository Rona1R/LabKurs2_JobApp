using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Application.DTOs.Response;
using backend.Application.Interfaces.SavedJobInterfaces;
using backend.Domain.Models;
using backend.Infrastructure.Data;
using backend.Infrastructure.Utilities;
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
        
        public async Task<SavedJob?> GetByIdAsync(int id)
        {
            return await _context.SavedJob.FindAsync(id);
        }
        public async Task AddAsync(SavedJob savedJob)
        {
            await _context.SavedJob.AddAsync(savedJob);
            await _context.SaveChangesAsync();
        }   

        public async Task AddToCollection(SavedJob savedJob,int collectionId)
        {
            savedJob.SavedJobCollectionId = collectionId;   
            _context.SavedJob.Update(savedJob);
            await _context.SaveChangesAsync();
        }

        public async Task RemoveFromCollection(SavedJob savedJob)
        {
            savedJob.SavedJobCollectionId = null;
            _context.SavedJob.Update(savedJob);
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
                    SavedJobCollectionId = savedJob.SavedJobCollectionId,
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
                        DaysLeft = DateTimeHelper.CalculateDaysLeftUntilDeadline(savedJob.Job.Deadline)
                    }
                })
                .ToListAsync();
        }

        public async Task RemoveSavedJob(int savedJobId)
        {
            var savedJob = await _context.SavedJob.FindAsync(savedJobId);
            if (savedJob != null)
            {
                _context.SavedJob.Remove(savedJob);
                await _context.SaveChangesAsync();
            }
        }
    }
}
