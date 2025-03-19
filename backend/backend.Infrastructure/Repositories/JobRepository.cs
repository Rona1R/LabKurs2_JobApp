using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Application.DTOs.Request;
using backend.Application.Helpers;
using backend.Application.Interfaces.JobInterfaces;
using backend.Domain.Models;
using backend.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace backend.Infrastructure.Repositories
{
    public class JobRepository : BaseRepository<Job>, IJobRepository
    {
        public JobRepository(ApplicationDbContext context) : base(context)
        {
        }

        public override async Task DeleteAsync(int id)
        {
            var job = await GetByIdAsync(id);
            if (job != null)
            {
                job.IsDeleted = true;
                _context.Update(job);
                await _context.SaveChangesAsync();
            }
        }

        public override async Task<IEnumerable<Job>> GetAllAsync()
        {
            return await _context.Job.Include(u => u.Company).Include(u => u.Category).Where(u => u.IsDeleted == false).OrderByDescending(u => u.Id).ToListAsync();
        }

        public override async Task<Job?> GetByIdAsync(int id)
        {
            return await _context.Job.Include(u => u.Company).Include(u => u.Category).Where(u => u.Id == id && u.IsDeleted == false).FirstOrDefaultAsync();
        }


        public async Task<PaginatedResult<Job>> GetFilteredPosts(JobFilterRequest filters)
        {
            var query = _context.Job.Include(j => j.Company).Where(j => j.IsDeleted == false).OrderByDescending(u => u.Id).AsQueryable();

            if (!string.IsNullOrEmpty(filters.SearchTerm))
            {
                query = query.Where(p => p.Title.Contains(filters.SearchTerm));
            }

            if (filters.JobTypes.Any())
            {
                query = query.Where(job =>filters.JobTypes.Contains(job.EmploymentType));
            }

            if (filters.SalaryTypes.Any())
            {
                query = query.Where(job => filters.SalaryTypes.Contains(job.SalaryPeriod.ToString()));
            }

            if (!string.IsNullOrEmpty(filters.DatePosted) && filters.DatePosted != "Any time")
            {
                var referenceDate = DateTime.UtcNow;
                switch (filters.DatePosted)
                {
                    case "Past month":
                        referenceDate = DateTime.UtcNow.AddMonths(-1);
                        break;
                    case "Past week":
                        referenceDate = DateTime.UtcNow.AddDays(-7);
                        break;
                    case "Past 24 hours":
                        referenceDate = DateTime.UtcNow.AddDays(-1);
                        break;
                    default:
                        break;
                }
                query = query.Where(job => job.CreatedAt >= referenceDate);
            }
            return await query.PaginateAsync(filters.PageNumber, filters.PageSize);
        }

    }
}
