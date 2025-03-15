using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Application.DTOs;
using Microsoft.Extensions.DependencyInjection;

namespace backend.Application.Configuration
{
    public static class DomainMappingConfigurator
    {
        public static IServiceCollection AddDomainMappings(this IServiceCollection services)
        {
            services.AddAutoMapper(typeof(MappingProfile).Assembly);
            return services;
        }
    }
}
