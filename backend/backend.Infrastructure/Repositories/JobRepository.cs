using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Application.DTOs.Jobs;
using backend.Application.Helpers;
using backend.Application.Interfaces.JobDetailsInterfaces;
using backend.Application.Interfaces.JobInterfaces;
using backend.Domain.Models;
using backend.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Infrastructure.Repositories
{
    public class JobRepository : BaseRepository<Job>, IJobRepository
    {
        private readonly IJobDetailsRepository jobDetailsRepository;
        public JobRepository(ApplicationDbContext context, IJobDetailsRepository jobDetailsRepository) : base(context)
        {
            this.jobDetailsRepository = jobDetailsRepository;
        }

        public async Task<IEnumerable<Job>> GetSimilarPostings(int jobId)
        {
            var job = await base.GetByIdAsync(jobId);
            if (job == null)
            {
                return Enumerable.Empty<Job>();
            }

            var jobTagIds = job.JobTags.Select(jt => jt.TagId).ToList();
            const int RecommendationLimit = 5;

            var recommandations = await _context.Job
                .Include(u => u.Company)
                .Include(u => u.Category)
                .Where(u => !u.IsDeleted && u.Id != jobId &&
                            (u.CompanyId == job.CompanyId ||
                             u.CategoryId == job.CategoryId ||
                             u.JobTags.Any(jt => jobTagIds.Contains(jt.TagId))))
                .OrderByDescending(u => u.Id)
                .Take(RecommendationLimit)
                .ToListAsync();

            return recommandations;

        }

        public override async Task DeleteAsync(int id)
        {
            var job = await GetByIdAsync(id);
            if (job != null)
            {
                job.IsDeleted = true;
                _context.Update(job);
                await _context.SaveChangesAsync();

                await jobDetailsRepository.DeleteAsync(id); // removing job details from Mongo
            }
        }

        public override async Task<IEnumerable<Job>> GetAllAsync()
        {
            return await _context.Job.Include(u => u.Company).Include(u => u.Category).Where(u => u.IsDeleted == false).OrderByDescending(u => u.Id).ToListAsync();
        }

        public async Task<IEnumerable<Job>> GetByEmployer(int employerId)
        {
            return await _context.Job.Include(u => u.Company).Include(u => u.Category).Where(u => u.IsDeleted == false && u.Company.Employer.UserId== employerId).OrderByDescending(u => u.Id).ToListAsync();
        }

        public override async Task<Job?> GetByIdAsync(int id)
        {
            return await _context.Job.Include(u => u.Company).Include(u => u.Category).Where(u => u.Id == id && u.IsDeleted == false).FirstOrDefaultAsync();
        }


        public async Task<PaginatedResult<Job>> GetFilteredPosts(JobFilterRequest filters)
        {
            var query = _context.Job.Include(j => j.Company).Include(j => j.Category).Where(j => j.IsDeleted == false).OrderByDescending(u => u.Id).AsQueryable();

            if (!string.IsNullOrEmpty(filters.SearchTerm))
            {
                query = query.Where(p => p.Title.ToLower().Contains(filters.SearchTerm.ToLower()) || p.Description.ToLower().Contains(filters.SearchTerm.ToLower()));
            }

            if (filters.JobTypes!=null && filters.JobTypes.Any())
            {
                query = query.Where(job => filters.JobTypes.Contains(job.EmploymentType));
            }

            if (filters.SalaryTypes!=null && filters.SalaryTypes.Any())
            {
                query = query.Where(job => filters.SalaryTypes.Contains(job.SalaryPeriod.ToString()));
            }


            if (filters.CategoryId > 0)
            {
                query = query.Where(job => job.CategoryId == filters.CategoryId);
            }

            if (filters.CompanyId > 0)
            {
                query = query.Where(job => job.CompanyId == filters.CompanyId);
            }

            if (!string.IsNullOrEmpty(filters.Country))
            {
                query = query.Where(job => job.Country.Value.ToLower() == filters.Country.ToLower());
            }

            if (!string.IsNullOrEmpty(filters.City))
            {
                query = query.Where(job => job.City.ToLower() == filters.City.ToLower());
            }

            if (filters.MinSalary !=null && filters.MaxSalary != null) { 
                query = query.Where(job=>(job.MinimalSalary >= filters.MinSalary && job.MinimalSalary <= filters.MaxSalary)
                || (job.MaximalSalary >= filters.MinSalary && job.MaximalSalary<=filters.MaxSalary));
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

        public async Task<PaginatedResult<Job>> GetByCategory(int categoryId,JobFilterRequest filters)
        {
            var query = _context.Job.Include(j => j.Company).Include(j => j.Category).Where(j => j.IsDeleted == false && j.CategoryId == categoryId).OrderByDescending(u => u.Id).AsQueryable();

            if (!string.IsNullOrEmpty(filters.SearchTerm))
            {
                query = query.Where(p => p.Title.ToLower().Contains(filters.SearchTerm.ToLower()) || p.Description.ToLower().Contains(filters.SearchTerm.ToLower()));
            }

            if (filters.JobTypes != null && filters.JobTypes.Any())
            {
                query = query.Where(job => filters.JobTypes.Contains(job.EmploymentType));
            }

            if (filters.SalaryTypes != null && filters.SalaryTypes.Any())
            {
                query = query.Where(job => filters.SalaryTypes.Contains(job.SalaryPeriod.ToString()));
            }

            if (filters.CompanyId > 0)
            {
                query = query.Where(job => job.CompanyId == filters.CompanyId);
            }

            if (!string.IsNullOrEmpty(filters.Country))
            {
                query = query.Where(job => job.Country.Value.ToLower() == filters.Country.ToLower());
            }

            if (!string.IsNullOrEmpty(filters.City))
            {
                query = query.Where(job => job.City.ToLower() == filters.City.ToLower());
            }

            if (filters.MinSalary != null && filters.MaxSalary != null)
            {
                query = query.Where(job => (job.MinimalSalary >= filters.MinSalary && job.MinimalSalary <= filters.MaxSalary)
                || (job.MaximalSalary >= filters.MinSalary && job.MaximalSalary <= filters.MaxSalary));
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

        public async Task<PaginatedResult<Job>> GetByTag(int tagId,JobFilterRequest filters)
        {
            var query = _context.Job.Include(j => j.Company).Include(j => j.Category).Where(j => !j.IsDeleted && j.JobTags.Any(jt => jt.TagId == tagId)).OrderByDescending(u => u.Id).AsQueryable();

            if (!string.IsNullOrEmpty(filters.SearchTerm))
            {
                query = query.Where(p => p.Title.ToLower().Contains(filters.SearchTerm.ToLower()) || p.Description.ToLower().Contains(filters.SearchTerm.ToLower()));
            }

            if (filters.JobTypes != null && filters.JobTypes.Any())
            {
                query = query.Where(job => filters.JobTypes.Contains(job.EmploymentType));
            }

            if (filters.SalaryTypes != null && filters.SalaryTypes.Any())
            {
                query = query.Where(job => filters.SalaryTypes.Contains(job.SalaryPeriod.ToString()));
            }


            if (filters.CategoryId > 0)
            {
                query = query.Where(job => job.CategoryId == filters.CategoryId);
            }

            if (filters.CompanyId > 0)
            {
                query = query.Where(job => job.CompanyId == filters.CompanyId);
            }

            if (!string.IsNullOrEmpty(filters.Country))
            {
                query = query.Where(job => job.Country.Value.ToLower() == filters.Country.ToLower());
            }

            if (!string.IsNullOrEmpty(filters.City))
            {
                query = query.Where(job => job.City.ToLower() == filters.City.ToLower());
            }

            if (filters.MinSalary != null && filters.MaxSalary != null)
            {
                query = query.Where(job => (job.MinimalSalary >= filters.MinSalary && job.MinimalSalary <= filters.MaxSalary)
                || (job.MaximalSalary >= filters.MinSalary && job.MaximalSalary <= filters.MaxSalary));
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

        public async Task<decimal> GetMaxSalaryAsync()
        {
            return await _context.Job.Where(j => j.IsDeleted == false).Select(j => (decimal?)j.MaximalSalary).MaxAsync() ?? 0;
        }

        public async Task<decimal> GetMaxSalaryByCategory(int categoryId)
        {
            return await _context.Job.Where(j => j.IsDeleted == false && j.CategoryId == categoryId)
                                     .Select(j => (decimal?)j.MaximalSalary)
                                     .MaxAsync() ?? 0;
        }

        public async Task<decimal> GetMaxSalaryByTag(int tagId)
        {
            return await _context.Job
            .Where(j => !j.IsDeleted && j.JobTags.Any(jt => jt.TagId == tagId))
            .Select(j => (decimal?)j.MaximalSalary)
            .MaxAsync() ?? 0;
        }
        
    }
}
