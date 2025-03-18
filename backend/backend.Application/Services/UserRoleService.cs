using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Application.Exceptions;
using backend.Application.Interfaces.UserInterfaces;
using backend.Application.Interfaces.UserRoleInterfaces;
using Microsoft.AspNetCore.Identity;

namespace backend.Application.Services
{
    public class UserRoleService : IUserRoleService
    {
        private readonly IUserRoleRepository _repository;
        private readonly IUserRepository _userRepository;

        public UserRoleService(IUserRoleRepository repository, IUserRepository userRepository)
        {
            _repository = repository;
            _userRepository = userRepository;
        }

        public async Task<IdentityResult> AddRoleAsync(int userId, string role)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            if(user == null)
            {
                throw new NotFoundException("User was not found!");
            }
            return await _repository.AddRoleAsync(user.AspNetUser,role);
            
        }

        public async Task<IdentityResult> RemoveFromRoleAsync(int userId,string role)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null)
            {
                throw new NotFoundException("User was not found!");
            }
            return await _repository.RemoveRoleAsync(user.AspNetUser, role);
        }
    }
}
