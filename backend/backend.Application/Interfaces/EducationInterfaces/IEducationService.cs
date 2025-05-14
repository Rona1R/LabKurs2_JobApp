using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Application.DTOs.Educations;

namespace backend.Application.Interfaces.EducationInterfaces
{
    public interface IEducationService : IBaseService<EducationRequest, EducationResponse>
    {
        Task<IEnumerable<EducationResponse>> GetByUserAsync(int userId);
    }
}
