using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using backend.Application.DTOs.Users;
using backend.Application.Interfaces.UserInterfaces;
using backend.Application.Interfaces.UserProfileInterfaces;
using backend.Domain.Models;

namespace backend.Application.Services
{
    public class UserProfileService : IUserProfileService
    {

        private readonly IUserProfileRepository _profileRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UserProfileService(IMapper mapper, IUserProfileRepository profileRepository, IUserRepository userRepository)
        {
            _mapper = mapper;
            _profileRepository = profileRepository;
            _userRepository = userRepository;
        }

        //public async Task CreateProfile(UserProfileRequest userProfileRequest)
        //{
        //    var profile = _mapper.Map<UserProfile>(userProfileRequest);
        //    await _profileRepository.AddAsync(profile);
        //}

        public async Task UpdateProfile(int userId, UserProfileRequest userProfileRequest)
        {
            var profile = await _profileRepository.GetByUserId(userId);
            if (profile != null)
            {
                _mapper.Map(userProfileRequest,profile);   
                await _profileRepository.UpdateAsync(profile);
            }
        }

        public async Task<UserProfileDetails?> GetProfileDetails(int userId)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            var profile = await _profileRepository.GetByUserId(userId);

            if(user !=null && profile != null)
            {
                var userResponse = _mapper.Map<UserResponse>(user);
                var profileResponse = _mapper.Map<UserProfileResponse>(profile);

                var profileDetails = new UserProfileDetails()
                {
                    User = userResponse,
                    Profile = profileResponse
                };
                return profileDetails;
            }
            return null;
        }

        //public async Task<UserProfileResponse?> GetProfileByUser(int userId)
        //{
        //    var profile = await _profileRepository.GetByUserId(userId);
        //    return profile != null ? _mapper.Map<UserProfileResponse>(profile) : default;
        //}

        public async Task DeleteProfile(int userId)
        {
            await _profileRepository.DeleteAsync(userId);
        }
    }
}
