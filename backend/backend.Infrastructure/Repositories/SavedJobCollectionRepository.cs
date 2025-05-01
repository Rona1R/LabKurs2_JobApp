using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Application.DTOs.Response;
using backend.Application.Interfaces.SavedJobCollectionInterfaces;
using backend.Domain.Models;
using backend.Infrastructure.Data;
using backend.Infrastructure.Utilities;
using Microsoft.EntityFrameworkCore;

namespace backend.Infrastructure.Repositories
{
    public class SavedJobCollectionRepository : BaseRepository<SavedJobCollection>, ISavedJobCollectionRepository
    {
        public SavedJobCollectionRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<CollectionsByUserResponse>> GetCollectionsByUser(int userId)
        {
            return await _context.SavedJobCollection
                .Where(collection => collection.UserId == userId)
                .Select(collection => new CollectionsByUserResponse
                {
                    Id = collection.Id,
                    Name = collection.Name,
                    PostCount = collection.SavedJobs.Count() 
                })
                .ToListAsync();
        }


        public async Task<SavedJobsByCollectionResponse?> GetSavedPostsByCollection(int collectionId)
        {
            return await _context.SavedJobCollection
                .Where(collection => collection.Id == collectionId)
                .AsNoTracking()
                .Select(collection => new SavedJobsByCollectionResponse
                {
                    Id = collection.Id,
                    Name = collection.Name,
                    SavedPosts = collection.SavedJobs.Select(savedJob => new SavedPostByCollection
                    {
                        SavedJobId = savedJob.Id,
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
                    }).ToList()

                }).FirstOrDefaultAsync();
        }
    }
}
