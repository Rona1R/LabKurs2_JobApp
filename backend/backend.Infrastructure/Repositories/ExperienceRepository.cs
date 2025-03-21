using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Application.Interfaces.ExperienceInterfaces;
using backend.Domain.Models;
using backend.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Infrastructure.Repositories
{
    public class ExperienceRepository : BaseRepository<Experience>, IExperienceRepository
    {
        public ExperienceRepository(ApplicationDbContext context) : base(context)
        {
        }

        public override async Task<IEnumerable<Experience>> GetAllAsync()
        {
            return await _context.Experience.Include(e => e.Company).ToListAsync();
        }

        public override async Task<Experience?> GetByIdAsync(int id)
        {
            return await _context.Experience.Include(e => e.Company).FirstOrDefaultAsync(e => e.Id == id);
        }
        public async Task<IEnumerable<Experience>> GetByUserAsync(int userId)
        {
            return await _context.Experience.Include(e => e.Company).Where(e => e.UserId == userId).OrderByDescending(e => e.StartDate).ToListAsync();
        }


    }
}
