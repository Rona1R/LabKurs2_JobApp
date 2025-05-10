using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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
