using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using backend.Application.DTOs.Request;
using backend.Application.DTOs.Response;
using backend.Application.Interfaces.EducationInterfaces;
using backend.Domain.Models;

namespace backend.Application.Services
{
    public class EducationService : BaseService<IEducationRepository, Education, EducationRequest, EducationResponse>, IEducationService
    {
        public EducationService(IEducationRepository repository, IMapper mapper) : base(repository, mapper)
        {
        }

        public async Task<IEnumerable<EducationResponse>> GetByUserAsync(int userId)
        {
            var edu = await _repository.GetByUserAsync(userId);
            return _mapper.Map<IEnumerable<EducationResponse>>(edu);
        }
    }
}
