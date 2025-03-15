using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Application.Interfaces.CategoryInterfaces;
using backend.Domain.Models;
using backend.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Infrastructure.Repositories
{
    public class CategoryRepository : BaseRepository<Category>, ICategoryRepository
    {
        public CategoryRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<Category?> GetByNameAsync(string name)
        {
            return await _context.Category
           .Where(c => c.Name.ToLower().Equals(name.ToLower())).FirstOrDefaultAsync();       
        }

        public override Task UpdateAsync(Category entity)
        {  
            entity.UpdatedAt = DateTime.UtcNow;
            return base.UpdateAsync(entity);
        }

        public string TestRepository()
        {
            return "String inside repository!";
        }
    }
}
