using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Application.DTOs.Response;
using backend.Domain.Models;

namespace backend.Application.Interfaces.SavedJobInterfaces
{
    public interface ISavedJobRepository
    {
        Task AddAsync(SavedJob savedJob);
        Task AddToCollection(SavedJob savedJob, int collectionId);
        Task<SavedJob?> GetByIdAsync(int id);
        Task<IEnumerable<SavedJobByUserResponse>> GetSavedJobsByUserId(int userId);
        Task RemoveFromCollection(SavedJob savedJob);
    }
}
