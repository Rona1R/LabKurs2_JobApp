using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Application.DTOs.Auth;
using Microsoft.AspNetCore.Identity;

namespace backend.Application.Interfaces.Authentication
{
    public interface IAuthenticationService
    {
        Task<IdentityUser> Login(AuthRequest authRequest);

        Task<IdentityResult> CreateAccount(Register register);

        Task<IdentityResult> CreateRole(string role);
        Task<IdentityResult> RemoveRole(string role);

    }
}
