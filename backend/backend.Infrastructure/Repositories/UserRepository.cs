using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Application.Interfaces.UserInterfaces;
using backend.Domain.Models;
using backend.Infrastructure.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace backend.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<IdentityUser> _userManager;

        public UserRepository(ApplicationDbContext context,UserManager<IdentityUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public async Task<IEnumerable<User>> GeAllUsersAsync() // all users excluding employers
        {
            IEnumerable<IdentityUser> users = await _userManager.GetUsersInRoleAsync("Employer");
            var userIds = users.Select(e => e.Id);
            return await _context.User
                .Where(u => !userIds.Contains(u.AspNetUserId))
                .Include(u => u.AspNetUser)
                .OrderByDescending(u => u.Id)
                .ToListAsync();
        }

        public async Task<IEnumerable<User>> GetAllApplicationUsersAsync()
        {
            return await _context.User.Include(u=>u.AspNetUser).OrderByDescending(u=>u.Id).ToListAsync();
        }

        public async Task<User?> GetByIdAsync(int id)
        {
            return await _context.User.
                 Include(u => u.AspNetUser).
                 FirstOrDefaultAsync(u => u.Id == id);
        }

    }
}
