using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using backend.Application.DTOs.Request;
using backend.Application.DTOs.Response;
using backend.Application.Interfaces.ExperienceInterfaces;
using backend.Domain.Models;

namespace backend.Application.Services
{
    public class ExperienceService : BaseService<IExperienceRepository, Experience, ExperienceRequest, ExperienceResponse>, IExperienceService
    {
        public ExperienceService(IExperienceRepository repository, IMapper mapper) : base(repository, mapper)
        {
        }

        public async Task<IEnumerable<ExperienceResponse>> GetByUserAsync(int userId)
        {
            var experiences = await _repository.GetByUserAsync(userId);
            return _mapper.Map<IEnumerable<ExperienceResponse>>(experiences);
        }
    }
}
