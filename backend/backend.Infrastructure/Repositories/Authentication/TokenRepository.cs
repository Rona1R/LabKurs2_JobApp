using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Application.Interfaces.Authentication;
using backend.Domain.Models;
using backend.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Infrastructure.Repositories.Authentication
{
    public class TokenRepository : ITokenRepository
    {
        private readonly ApplicationDbContext _context;

        public TokenRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<User?> GetUserByRefreshToken(string refreshToken)
        {
            return await _context.User.Include(u=>u.AspNetUser).FirstOrDefaultAsync(x => x.RefreshToken == refreshToken);
        }

        public async Task StoreRefreshToken(User user,string refreshToken,DateTime exp)
        {
            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = exp;

            await _context.SaveChangesAsync();
        }

        public async Task RemoveRefreshToken(User user)
        {
            user.RefreshToken = null;
            user.RefreshTokenExpiryTime = null;
            await _context.SaveChangesAsync();
        }
    }
}
