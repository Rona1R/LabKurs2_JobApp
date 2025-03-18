using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Application.Interfaces.EmployerInterfaces;
using backend.Domain.Models;
using backend.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Infrastructure.Repositories
{
    public class EmployerRepository : BaseRepository<Employer>, IEmployerRepository
    {
        public EmployerRepository(ApplicationDbContext context) : base(context)
        {
        }

        public override async Task<IEnumerable<Employer>> GetAllAsync()
        {
            return await _context.Employer.Include(u=>u.User).ThenInclude(u => u.AspNetUser).Include(u=>u.Departament).OrderByDescending(entity => EF.Property<object>(entity, "Id")).ToListAsync();
            //return base.GetAllAsync();
        }

        public override async Task<Employer?> GetByIdAsync(int id)
        {
            return await _context.Employer.Include(u => u.User).ThenInclude(u=>u.AspNetUser).Include(u => u.Departament).FirstOrDefaultAsync(e=>e.Id == id);
        }
    }
}
