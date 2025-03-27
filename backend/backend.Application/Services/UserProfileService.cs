using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using backend.Application.DTOs.Request;
using backend.Application.DTOs.Response;
using backend.Application.Interfaces.UserProfileInterfaces;
using backend.Domain.Models;

namespace backend.Application.Services
{
    public class UserProfileService : IUserProfileService
    {

        private readonly IUserProfileRepository _profileRepository;
        private readonly IMapper _mapper;

        public UserProfileService(IMapper mapper, IUserProfileRepository profileRepository)
        {
            _mapper = mapper;
            _profileRepository = profileRepository;
        }

        public async Task CreateProfile(UserProfileRequest userProfileRequest)
        {
            var profile = _mapper.Map<UserProfile>(userProfileRequest);
            await _profileRepository.AddAsync(profile);
        }

        public async Task UpdateProfile(int userId, UserProfileRequest userProfileRequest)
        {
            var profile = await _profileRepository.GetByUserId(userId);
            if (profile != null)
            {
                _mapper.Map(userProfileRequest,profile);   
                await _profileRepository.UpdateAsync(profile);
            }
        }

        public async Task<UserProfileResponse?> GetProfileByUser(int userId)
        {
            var profile = await _profileRepository.GetByUserId(userId);
            return profile != null ? _mapper.Map<UserProfileResponse>(profile) : default;
        }

        public async Task DeleteProfile(int userId)
        {
            await _profileRepository.DeleteAsync(userId);
        }
    }
}
