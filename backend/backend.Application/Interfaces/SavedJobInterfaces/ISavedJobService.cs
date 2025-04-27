using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Application.DTOs.Request;
using backend.Application.DTOs.Response;

namespace backend.Application.Interfaces.SavedJobInterfaces
{
    public interface ISavedJobService
    {
        Task<SavedJobResponse> AddAsync(SavedJobRequest savedJobRequest);
        Task<IEnumerable<SavedJobByUserResponse>> GetSavedJobsByUser(int userId);
    }
}
