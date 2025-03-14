using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Infrastructure.Data;
using Microsoft.Extensions.DependencyInjection;

namespace backend.Infrastructure.Configuration
{
    public static class MongodbConfiguration
    {

        public static IServiceCollection AddMongoDb(this IServiceCollection services)
        {
            services.AddSingleton<MongoDBService>();

            return services;
        }
    }
}
