using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using backend.Application.DTOs.Response.Auth;
using backend.Application.Exceptions;
using backend.Application.Interfaces.Authentication;
using backend.Application.Interfaces.UserRoleInterfaces;
using backend.Domain.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace backend.Application.Services.Authentication
{
    public class TokenService : ITokenService
    {
        private readonly IAuthenticationRepository _authenticationRepository;
        private readonly ITokenRepository _tokenRepository;
        private readonly IUserRoleRepository _userRoleRepository;
        private readonly IConfiguration _configuration;

        public TokenService(IAuthenticationRepository authenticationRepository, IUserRoleRepository userRoleRepository, IConfiguration configuration, ITokenRepository tokenRepository)
        {
            _authenticationRepository = authenticationRepository;
            _userRoleRepository = userRoleRepository;
            _configuration = configuration;
            _tokenRepository = tokenRepository;
        }


        public async Task<AuthResponse> GenerateTokens(IdentityUser identityUser)
        {
            var user = await _authenticationRepository.GetUserById(identityUser.Id);

            if(user == null)
            {
                throw new NotFoundException("User not found");
            }

            var roles = await _userRoleRepository.GetRolesByUserAsync(identityUser);
            
            var accessToken = GenerateAccessToken(identityUser,user, roles);
            var refreshToken = GenerateRefreshToken();

            var refresh_validity = _configuration["REFRESH_TOKEN_VALIDITY_IN_DAYS"] ?? throw new InvalidOperationException("Refresh token validity is not set");
            if (!int.TryParse(refresh_validity, out int tokenValidityInDays))
            {
                throw new InvalidOperationException("Refresh token validity is not a valid integer");
            }

            await _tokenRepository.StoreRefreshToken(user, refreshToken, DateTime.UtcNow.AddDays(tokenValidityInDays));

            return new AuthResponse()
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken
            };
            //await GenerateAccessToken(user);
        }
        private string GenerateAccessToken(IdentityUser identityUser,User user, IEnumerable<string> roles)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub,identityUser.UserName?? user.Name),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, identityUser.Email?? "")
            };

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var token = CreateToken(claims);
            return token;
            //Console.WriteLine("Generating access token for user: "+user.Name);
            //Console.WriteLine("Roles: " + string.Join(", ", roles));
        }

        private static string GenerateRefreshToken()
        {
            var randomNumber = new byte[64];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }

        private string CreateToken(List<Claim> claims) // gjenerimi i access tokenit
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT_SECRET_KEY"] ?? throw new InvalidOperationException("Jwt Secret key is not set")));
            _ = int.TryParse(_configuration["ACCESS_TOKEN_VALIDITY_IN_MINUTES"], out int tokenValidityInMinutes);

            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                //Issuer = _configuration["JWT_ISSUER"],
                //Audience = _configuration["JWT_AUDIENCE"],
                Expires = DateTime.UtcNow.AddMinutes(tokenValidityInMinutes),
                Subject = new ClaimsIdentity(claims),
                SigningCredentials = new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
