using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Application.DTOs.Request;
using backend.Application.DTOs.Response;
using backend.Domain.Models;

namespace backend.Application.Interfaces.SavedJobInterfaces
{
    public interface ISavedJobService
    {
        Task<SavedJobResponse> AddAsync(SavedJobRequest savedJobRequest);
        //Task AddToCollection(int savedJobId, int collectionId);
        Task AddToCollection(int userId, int jobId, int collectionId);
        Task<SavedJobResponse?> GetByIdAsync(int id);
        Task<IEnumerable<SavedJobByUserResponse>> GetSavedJobsByUser(int userId);
        Task<bool> IsJobSaved(int userId, int jobId);
        Task RemoveByUserAndJob(int userId, int jobId);
        Task RemoveFromCollection(int savedJobId);
        Task RemoveSavedJob(int savedJobId);
    }
}
