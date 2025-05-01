using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using backend.Application.DTOs.Request;
using backend.Application.DTOs.Response;
using backend.Application.Exceptions;
using backend.Application.Interfaces.SavedJobCollectionInterfaces;
using backend.Application.Interfaces.SavedJobInterfaces;
using backend.Domain.Models;

namespace backend.Application.Services
{
    public class SavedJobService : ISavedJobService
    {
        private readonly ISavedJobRepository _savedJobRepository;
        private readonly ISavedJobCollectionRepository _savedJobCollectionRepository;
        private readonly IMapper _mapper;

        public SavedJobService(ISavedJobRepository savedJobRepository, IMapper mapper, ISavedJobCollectionRepository savedJobCollectionRepository)
        {
            _savedJobRepository = savedJobRepository;
            _mapper = mapper;
            _savedJobCollectionRepository = savedJobCollectionRepository;
        }

        public async Task<bool> IsJobSaved(int userId,int jobId)
        {
            return await _savedJobRepository.IsJobSaved(userId, jobId);
        }

        public async Task<SavedJobResponse?> GetByIdAsync(int id)
        {
            var savedJob = await _savedJobRepository.GetByIdAsync(id);
            return savedJob != null ? _mapper.Map<SavedJobResponse>(savedJob) : default;
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

        //public async Task AddToCollection(int savedJobId, int collectionId)
        //{
        //    var collection = await _savedJobCollectionRepository.GetByIdAsync(collectionId);
        //    var savedJob = await _savedJobRepository.GetByIdAsync(savedJobId);
        //    if (collection == null)
        //    {
        //        throw new NotFoundException("Collection was not found !");
        //    }

        //    if(savedJob == null)
        //    {
        //        throw new NotFoundException("Saved job was not found !");
        //    }

        //    await _savedJobRepository.AddToCollection(savedJob, collectionId);
        //}

        public async Task AddToCollection(int userId,int jobId, int collectionId)
        {
            var savedJob = await _savedJobRepository.GetByUserAndJob(userId, jobId);
            if (savedJob == null) {
                throw new NotFoundException("Saved Job was not found !");
            }
            var collection = await _savedJobCollectionRepository.GetByIdAsync(collectionId);
            if (collection == null) {
                throw new NotFoundException("Collection was not found !");
            }

            await _savedJobRepository.AddToCollection(savedJob, collectionId);
        }

        public async Task RemoveFromCollection(int savedJobId)
        {
            var savedJob = await _savedJobRepository.GetByIdAsync(savedJobId);
            if (savedJob == null)
            {
                throw new NotFoundException("Saved job was not found !");
            }
            await _savedJobRepository.RemoveFromCollection(savedJob);
        }

        public async Task RemoveSavedJob(int savedJobId)
        { 
            await _savedJobRepository.RemoveSavedJob(savedJobId);
        }

        public async Task RemoveByUserAndJob(int userId,int jobId)
        {
            await _savedJobRepository.RemoveByUserAndJob(userId,jobId);
        }
    }
}
