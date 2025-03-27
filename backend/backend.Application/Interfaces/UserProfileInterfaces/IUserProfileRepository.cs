using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Domain.Models;

namespace backend.Application.Interfaces.UserProfileInterfaces
{
    public interface IUserProfileRepository 
    {
        Task AddAsync(UserProfile entity);
        Task DeleteAsync(int userId);
        Task<UserProfile?> GetByUserId(int userId);
        Task UpdateAsync(UserProfile entity);
    }
}
