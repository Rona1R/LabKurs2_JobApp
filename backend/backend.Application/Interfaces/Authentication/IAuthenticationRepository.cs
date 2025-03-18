using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Application.DTOs.Request;
using Microsoft.AspNetCore.Identity;

namespace backend.Application.Interfaces.Authentication
{
    public interface IAuthenticationRepository
    {

        Task<IdentityUser?> GetUserByEmailAsync(string email);

        Task<IdentityUser?> GetUserByNameAsync(string name);
    }
}
