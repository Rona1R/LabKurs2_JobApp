using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using backend.Application.DTOs.Request;
using backend.Application.DTOs.Response;
using backend.Application.Interfaces.RequirementInterfaces;
using backend.Domain.Models;

namespace backend.Application.Services
{
    public class RequirementService : IRequirementService
    {
        private readonly IRequirementRepository _requirementRepository;
        private readonly IMapper _mapper;

        public RequirementService(IMapper mapper, IRequirementRepository requirementRepository)
        {
            _mapper = mapper;
            _requirementRepository = requirementRepository;
        }

        public async Task<IEnumerable<RequirementResponse>> CreateRequirementsAsync(IEnumerable<RequirementRequest> dtos)
        {
            var requirements = _mapper.Map<IEnumerable<Requirement>>(dtos);
            await _requirementRepository.AddRequirementsAsync(requirements);
            return _mapper.Map<IEnumerable<RequirementResponse>>(requirements);
        }
        public async Task<IEnumerable<RequirementResponse>> GetByJobAsync(int jobId)
        {
            var requirements = await _requirementRepository.GetByJobAsync(jobId);
            return _mapper.Map<IEnumerable<RequirementResponse>>(requirements);
        }

        public async Task DeleteAsync(string id)
        {
            await _requirementRepository.DeleteAsync(id);
        }

        public async Task<RequirementResponse?> GetByIdAsync(string id)
        {
            var entity = await _requirementRepository.GetByIdAsync(id);
            return entity != null ? _mapper.Map<RequirementResponse>(entity) : default;
        }

        public async Task UpdateAsync(string id, RequirementRequest dto)
        {
            var entity = await _requirementRepository.GetByIdAsync(id);
            if (entity != null)
            {
                _mapper.Map(dto, entity);
                await _requirementRepository.UpdateAsync(entity);
            }
        }
    }
}

