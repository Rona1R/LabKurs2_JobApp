using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using backend.Application.DTOs.Response;
using backend.Application.Interfaces.UserInterfaces;
using backend.Application.Interfaces.UserRoleInterfaces;


namespace backend.Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IUserRoleRepository _userRoleRepository;
        private readonly IMapper mapper;

        public UserService(IUserRepository userRepository, IMapper mapper, IUserRoleRepository userRoleRepository)
        {
            _userRepository = userRepository;
            this.mapper = mapper;
            _userRoleRepository = userRoleRepository;
        }

        public async Task<IEnumerable<UserWithRoles>> GetAllUsersWithRolesAsync()
        {
            var all = await _userRepository.GetAllApplicationUsersAsync();
            var usersWithRoles = new List<UserWithRoles>();

            foreach (var user in all)
            {
                var userWithRoles  = mapper.Map<UserWithRoles>(user);

                var userRoles = await _userRoleRepository.GetRolesByUserAsync(user.AspNetUser);

                userWithRoles.Roles = userRoles;

                usersWithRoles.Add(userWithRoles);
            }

            return usersWithRoles;
        }
    }
}
