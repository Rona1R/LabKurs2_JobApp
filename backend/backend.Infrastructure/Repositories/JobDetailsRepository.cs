using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Application.Interfaces.JobDetailsInterfaces;
using backend.Domain.Models;
using backend.Infrastructure.Data;
using MongoDB.Driver;

namespace backend.Infrastructure.Repositories
{
    public class JobDetailsRepository : IJobDetailsRepository
    {
        private readonly IMongoCollection<JobDetails> _jobDetails;

        public JobDetailsRepository(MongoDBService mongoDBService)
        {
            _jobDetails = mongoDBService.Database.GetCollection<JobDetails>("JobDetails");
        }
        public async Task AddAsync(JobDetails entity)
        {
            await _jobDetails.InsertOneAsync(entity);
        }

        public async Task DeleteAsync(int jobId)
        {
            await _jobDetails.DeleteOneAsync(p => p.JobId == jobId);
        }

        public async Task<JobDetails?> GetByJobId(int jobId)
        {
            return await _jobDetails.Find(r => r.JobId == jobId).FirstOrDefaultAsync();
        }


        public async Task UpdateAsync(JobDetails entity)
        {
            var filter = Builders<JobDetails>.Filter.Eq(x => x.JobId, entity.JobId);

            var update = Builders<JobDetails>.Update
                .Set(u => u.Requirements, entity.Requirements)
                .Set(u => u.RequiredSkills, entity.RequiredSkills)
                .Set(u => u.NiceToHaveSkills, entity.NiceToHaveSkills);   
   
            await _jobDetails.UpdateOneAsync(filter, update);
        }
    }
}
