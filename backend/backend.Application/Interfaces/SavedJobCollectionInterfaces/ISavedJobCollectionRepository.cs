using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Application.DTOs.Response;
using backend.Domain.Models;

namespace backend.Application.Interfaces.SavedJobCollectionInterfaces
{
    public interface ISavedJobCollectionRepository : IBaseRepository<SavedJobCollection>
    {
        Task<IEnumerable<SavedJobCollection>> GetCollectionsByUser(int userId);
        Task<SavedJobsByCollectionResponse?> GetSavedPostsByCollection(int collectionId);
    }
}
