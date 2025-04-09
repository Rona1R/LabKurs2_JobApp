using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Application.DTOs.Request;
using backend.Domain.Models;
using Microsoft.AspNetCore.Identity;

namespace backend.Application.Interfaces.Authentication
{
    public interface IAuthenticationRepository
    {
        Task<bool> Authenticate(IdentityUser user, string password);

        Task<User?> GetUserById(string aspNetUserId);
        Task<IdentityResult> CreateAccountAsync(Register register);

        Task<IdentityUser?> GetUserByEmailAsync(string email);

        Task<IdentityUser?> GetUserByNameAsync(string name);

    }
}
