using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Application.Interfaces.EducationInterfaces;
using backend.Domain.Models;
using backend.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Infrastructure.Repositories
{
    public class EducationRepository : BaseRepository<Education>, IEducationRepository
    {
        public EducationRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async override Task<IEnumerable<Education>> GetAllAsync()
        {
            return await _context.Education.Include(e => e.Institution).ToListAsync();
        }

        public async override Task<Education?> GetByIdAsync(int id)
        {
            return await _context.Education.Include(e => e.Institution).FirstOrDefaultAsync(e => e.Id == id);
        }

        public async Task<IEnumerable<Education>> GetByUserAsync(int userId)
        {
            return await _context.Education.Include(e => e.Institution).Where(e => e.UserId == userId).OrderByDescending(e => e.StartDate).ToListAsync();
        }
    }
}
