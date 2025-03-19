using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Domain.Models;

namespace backend.Application.Interfaces.RequirementInterfaces
{
    public interface IRequirementRepository 
    {
        Task AddRequirementsAsync(IEnumerable<Requirement> requirement);
        Task<IEnumerable<Requirement>> GetByJobAsync(int jobId);
        Task DeleteAsync(string id);
        Task<Requirement?> GetByIdAsync(string id);
        Task UpdateAsync(Requirement entity);
    }
}
