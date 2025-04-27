using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using backend.Application.DTOs.Request;
using backend.Application.DTOs.Response;
using backend.Application.Interfaces.SavedJobInterfaces;
using backend.Domain.Models;

namespace backend.Application.Services
{
    public class SavedJobService : ISavedJobService
    {
        private readonly ISavedJobRepository _savedJobRepository;
        private readonly IMapper _mapper;

        public SavedJobService(ISavedJobRepository savedJobRepository, IMapper mapper)
        {
            _savedJobRepository = savedJobRepository;
            _mapper = mapper;
        }

        public async Task<SavedJobResponse> AddAsync(SavedJobRequest savedJobRequest)
        {
            var savedJob = _mapper.Map<SavedJob>(savedJobRequest);
            await _savedJobRepository.AddAsync(savedJob);
            return _mapper.Map<SavedJobResponse>(savedJob);
        }

        public async Task<IEnumerable<SavedJobByUserResponse>> GetSavedJobsByUser(int userId)
        {
            return await _savedJobRepository.GetSavedJobsByUserId(userId);       
        }
    }
}
