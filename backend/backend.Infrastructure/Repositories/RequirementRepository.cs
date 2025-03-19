using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Application.Interfaces.RequirementInterfaces;
using backend.Domain.Models;
using backend.Infrastructure.Data;
using MongoDB.Driver;

namespace backend.Infrastructure.Repositories
{
    public class RequirementRepository : IRequirementRepository
    {
        private readonly IMongoCollection<Requirement> _requirements;

        public RequirementRepository(MongoDBService mongoDBService)
        {
            _requirements = mongoDBService.Database.GetCollection<Requirement>("JobRequirements");
        }
        public async Task AddRequirementsAsync(IEnumerable<Requirement> requirements)
        {
            await _requirements.InsertManyAsync(requirements);
        }
        public async Task<IEnumerable<Requirement>> GetByJobAsync(int jobId)
        {
            return await _requirements.Find(r=>r.JobId == jobId).SortByDescending(r=>r.CreatedAt).ToListAsync();
        }
        public async Task<Requirement?> GetByIdAsync(string id)
        {
         return await _requirements.Find(r => r.Id == id).FirstOrDefaultAsync(); 
        }

        public async Task DeleteAsync(string id)
        {
          await _requirements.DeleteOneAsync(r=> r.Id == id);
        }

        public async Task UpdateAsync(Requirement entity)
        {
          await _requirements.ReplaceOneAsync(r=>r.Id == entity.Id, entity);
        }

        //public async Task DeleteByJob(int jobId)
        //{
        //    await _requirements.DeleteManyAsync(r=>r.JobId == jobId);   
        //}
    }
}
