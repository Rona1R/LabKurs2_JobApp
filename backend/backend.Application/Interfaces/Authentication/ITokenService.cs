using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Application.DTOs.Response.Auth;
using Microsoft.AspNetCore.Identity;

namespace backend.Application.Interfaces.Authentication
{
    public interface ITokenService
    {
        Task<AuthResponse> GenerateTokens(IdentityUser identityUser);
    }
}
