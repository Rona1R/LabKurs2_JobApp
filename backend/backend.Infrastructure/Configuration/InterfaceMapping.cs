using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Application.Interfaces.Authentication;
using backend.Application.Interfaces.CategoryInterfaces;
using backend.Application.Interfaces.UserInterfaces;
using backend.Application.Interfaces.UserRoleInterfaces;
using backend.Application.Services;
using backend.Infrastructure.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace backend.Infrastructure.Configuration
{
    public static class InterfaceMapping
    {
        public static void MapInterfaces(this IServiceCollection services)
        {

            services.AddScoped<ICategoryRepository, CategoryRepository>();
            services.AddScoped<ICategoryService, CategoryService>();

            services.AddScoped<IAuthenticationRepository, AuthenticationRepository>();
            services.AddScoped<IAuthenticationService, AuthenticationService>();


            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IUserRepository, UserRepository>();

            services.AddScoped<IUserRoleRepository, UserRoleRepository>();

        }
    }
}
