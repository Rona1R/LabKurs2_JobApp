using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Application.DTOs.Request;
using backend.Application.DTOs.Response;


namespace backend.Application.Interfaces.UserInterfaces
{
    public interface IUserService
    {
        Task<IEnumerable<UserResponse>> GetAllUsersAsync();
        Task<IEnumerable<UserWithRoles>> GetAllUsersWithRolesAsync();
        Task<UserResponse?> GetUserDetailsByIdAsync(int id);
        Task UpdateAsync(int id, UserRequest requestDto);
        Task UpdateUsernameAsync(int id, string newUsername);
    }
}
