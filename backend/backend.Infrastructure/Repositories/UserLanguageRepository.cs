using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Application.Interfaces.UserLanguageInterfaces;
using backend.Domain.Models;
using backend.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Infrastructure.Repositories
{
    public class UserLanguageRepository : BaseRepository<UserLanguage>, IUserLanguageRepository
    {
        public UserLanguageRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<UserLanguage>> GetByUser(int userId)
        {
            return await _context.UserLanguage.Where(u => u.UserId == userId).Include(u => u.Language).OrderByDescending(u => u.Id).ToListAsync();
        }
    }
}
