using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Application.Interfaces.JobTagInterfaces;
using backend.Domain.Models;
using backend.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Infrastructure.Repositories
{
    public class JobTagRepository : BaseRepository<JobTag> , IJobTagRepository
    {
        public JobTagRepository(ApplicationDbContext context) : base(context)
        {
        }

        public override async Task<IEnumerable<JobTag>> GetAllAsync()
        {
            return await _context.JobTag.Include(j => j.Job).Include(j => j.Tag).OrderByDescending(j => j.Id).ToListAsync();
        }

        public override async Task<JobTag?> GetByIdAsync(int id)
        {
            return await _context.JobTag.Include(j => j.Job).Include(j => j.Tag).Where(j=>j.Id == id).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<JobTag>> GetByJob(int jobId)
        {
            return await _context.JobTag.Include(j => j.Job).Include(j => j.Tag).Where(j => j.JobId == jobId).ToListAsync();
        }

        public async Task AddJobTags(IEnumerable<JobTag> jobTags)
        {
            await _context.JobTag.AddRangeAsync(jobTags);
            await _context.SaveChangesAsync();
        }

    }
}
