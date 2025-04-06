using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Application.Exceptions;
using backend.Application.Interfaces.Authentication;
using backend.Application.Interfaces.UserRoleInterfaces;
using backend.Domain.Models;
using Microsoft.AspNetCore.Identity;

namespace backend.Application.Services.Authentication
{
    public class TokenService : ITokenService
    {
        private readonly IAuthenticationRepository _authenticationRepository;
        private readonly IUserRoleRepository _userRoleRepository;

        public TokenService(IAuthenticationRepository authenticationRepository = null, IUserRoleRepository userRoleRepository = null)
        {
            _authenticationRepository = authenticationRepository;
            _userRoleRepository = userRoleRepository;
        }

        private void GenerateAccessToken(User user, IEnumerable<string> roles)
        {
            Console.WriteLine("Generating access token for user: "+user.Name);
            Console.WriteLine("Roles: " + string.Join(", ", roles));
        }

        public async Task GenerateTokens(IdentityUser identityUser)
        {
            var user = await _authenticationRepository.GetUserById(identityUser.Id);

            if(user == null)
            {
                throw new NotFoundException("User not found");
            }

            var roles = await _userRoleRepository.GetRolesByUserAsync(identityUser);
            
            GenerateAccessToken(user, roles);

            //await GenerateAccessToken(user);
        }
    }
}
