using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Application.DTOs.Request;
using backend.Application.DTOs.Request.Auth;
using Microsoft.AspNetCore.Identity;

namespace backend.Application.Interfaces.Authentication
{
    public interface IAuthenticationService
    {

        Task<IdentityResult> CreateAccount(Register register);

        Task<IdentityResult> CreateRole(string role);
        Task Login(AuthRequest authRequest);
        Task<IdentityResult> RemoveRole(string role);

    }
}
