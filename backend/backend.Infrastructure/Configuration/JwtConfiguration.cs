using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace backend.Infrastructure.Configuration
{
    public static class JwtConfiguration
    {
        public static void AddJwt(this IServiceCollection services, IConfiguration configuration)
        {
            var jwtSecretKey = configuration["JWT_SECRET_KEY"];
            if (string.IsNullOrEmpty(jwtSecretKey))
            {
                throw new InvalidOperationException("JWT secret key is missing from configuration.");
            }
            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecretKey));

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = "yourdomain.com",
                    ValidAudience = "yourdomain.com",
                    IssuerSigningKey = signingKey
                };
            });
        }
    }
}
