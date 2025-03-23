using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using backend.Application.DTOs.Request;
using backend.Application.DTOs.Response;
using backend.Application.Interfaces.SkillInterfaces;
using backend.Domain.Models;

namespace backend.Application.Services
{
    public class SkillService : BaseService<ISkillRepository, Skill, SkillRequest, SkillResponse>, ISkillService
    {
        public SkillService(ISkillRepository repository, IMapper mapper) : base(repository, mapper)
        {
        }

        public async Task<IEnumerable<SkillResponse>> GetByUserAsync(int id)
        {
            var skills = await _repository.GetAllByUserAsync(id);
            return _mapper.Map<IEnumerable<SkillResponse>>(skills);
        }
    }
}
