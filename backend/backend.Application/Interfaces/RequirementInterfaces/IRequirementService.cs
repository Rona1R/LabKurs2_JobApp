using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Application.DTOs.Request;
using backend.Application.DTOs.Response;

namespace backend.Application.Interfaces.RequirementInterfaces
{
    public interface IRequirementService 
    {
        Task<IEnumerable<RequirementResponse>> GetByJobAsync(int jobId);
        Task<RequirementResponse?> GetByIdAsync(string id);
        Task<IEnumerable<RequirementResponse>> CreateRequirementsAsync(IEnumerable<RequirementRequest> dtos);
        Task UpdateAsync(string id, RequirementRequest dto);
        Task DeleteAsync(string id);
    }
}
