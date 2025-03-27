using backend.Application.Interfaces.UserProfileInterfaces;
using backend.Domain.Models;
using backend.Infrastructure.Data;
using MongoDB.Driver;

namespace backend.Infrastructure.Repositories
{
    public class UserProfileRepository : IUserProfileRepository
    {
        private readonly IMongoCollection<UserProfile> _profile;

        public UserProfileRepository(MongoDBService mongoDBService)
        {
            _profile = mongoDBService.Database.GetCollection<UserProfile>("UserProfile");
        }
        public async Task AddAsync(UserProfile entity)
        {
            await _profile.InsertOneAsync(entity);
        }

        public async Task DeleteAsync(int userId)
        {
            await _profile.DeleteOneAsync(p => p.UserId == userId);
        }

        public async Task<UserProfile?> GetByUserId(int userId)
        {
            return await _profile.Find(r => r.UserId == userId).FirstOrDefaultAsync();
        }


        public async Task UpdateAsync(UserProfile entity)
        {
            var filter = Builders<UserProfile>.Filter.Eq(x => x.UserId, entity.UserId);

            var update = Builders<UserProfile>.Update
                .Set(u => u.CustomFields, entity.CustomFields);

            await _profile.UpdateOneAsync(filter, update);
        }
    }
}
