using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace backend.Infrastructure.Data
{
    public class MongoDBService
    {
        private readonly IMongoDatabase _database; 
        public MongoDBService(IConfiguration configuration) { 

            var client = new MongoClient(configuration.GetSection("MongoDB:ConnectionString").Value); 
            _database = client.GetDatabase(configuration.GetSection("MongoDB:DatabaseName").Value); 
        }
        public IMongoDatabase Database => _database;
    
    }
}
