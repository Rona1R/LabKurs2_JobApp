using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Application.Interfaces.CompanyInterfaces;
using backend.Domain.Models;
using backend.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Infrastructure.Repositories
{
    public class CompanyRepository : BaseRepository<Company>, ICompanyRespository
    {
        public CompanyRepository(ApplicationDbContext context) : base(context)
        {
        }

        public override async Task<IEnumerable<Company>> GetAllAsync()
        {
            return await _context.Company.Where(c=>c.IsDeleted==false).Include(c=>c.Employer.User).OrderByDescending(c=>c.Id).ToListAsync();
        }

        public override async Task<Company?> GetByIdAsync(int id)
        {
            return await _context.Company.Where(c=>c.IsDeleted == false && c.Id == id).Include(c => c.Employer.User).FirstOrDefaultAsync();    
        }

        // soft deletion
        public override async Task DeleteAsync(int id)
        {
            var company= await GetByIdAsync(id);
            if(company!= null)
            {
                company.IsDeleted = true;
                _context.Update(company);   
                await _context.SaveChangesAsync();
            }
        }

        public async Task<Company?> GetByNameAsync(string name)
        {
            return await _context.Company
          .Where(c => c.Name.ToLower().Equals(name.ToLower()) && c.IsDeleted == false).FirstOrDefaultAsync();
        }


        //kompanite e nje Employer specifik , (per te cilat ka te drejte me bo postime)
        public async Task<IEnumerable<Company>> GetByUser(int employerId)
        {
            return await _context.Company.Where(c=>c.EmployerId == employerId && c.IsDeleted == false).Include(c => c.Employer.User).OrderByDescending(c=>c.Id).ToListAsync();
        }


    }
}
