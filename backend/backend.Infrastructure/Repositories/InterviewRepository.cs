using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Application.Interfaces.InterviewInterfaces;
using backend.Domain.Models;
using backend.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Infrastructure.Repositories
{
    public class InterviewRepository : BaseRepository<Interview>, IInterviewRepository
    {
        public InterviewRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Interview>> GetInterviewsByEmployer(int userId)
        {
            return await _context.Interview.Where(i=>i.Application.Job.Company.Employer.UserId == userId).ToListAsync();
        }
    }
}
