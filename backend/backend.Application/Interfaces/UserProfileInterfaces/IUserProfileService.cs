using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Application.DTOs.Request;
using backend.Application.DTOs.Response;

namespace backend.Application.Interfaces.UserProfileInterfaces
{
    public interface IUserProfileService
    {
        Task CreateProfile(UserProfileRequest userProfileRequest);
        Task DeleteProfile(int userId);

        Task<UserProfileDetails?> GetProfileDetails(int userId);
        //Task<UserProfileResponse?> GetProfileByUser(int userId);
        Task UpdateProfile(int userId, UserProfileRequest userProfileRequest);
    }
}
