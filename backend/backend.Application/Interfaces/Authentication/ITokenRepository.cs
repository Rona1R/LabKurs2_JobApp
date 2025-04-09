using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Application.Interfaces.Authentication
{
    public interface ITokenRepository
    {
        Task<User?> GetUserByRefreshToken(string refreshToken);

        Task RemoveRefreshToken(User user);
        Task StoreRefreshToken(User user, string refreshToken, DateTime exp);
    }
}
