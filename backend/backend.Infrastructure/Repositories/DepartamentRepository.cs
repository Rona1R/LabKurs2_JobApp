using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Application.Interfaces.DepartamentInterfaces;
using backend.Domain.Models;
using backend.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Infrastructure.Repositories
{
    public class DepartamentRepository : BaseRepository<Departament>, IDepartamentRepository
    {
        public DepartamentRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<Departament?> GetByNameAsync(string name)
        {
            return await _context.Departament
           .Where(c => c.Name.ToLower().Equals(name.ToLower())).FirstOrDefaultAsync();
        }

        public override Task UpdateAsync(Departament entity)
        {
            entity.UpdatedAt = DateTime.UtcNow;
            return base.UpdateAsync(entity);
        }
    }
}
