﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using backend.Application.DTOs.Request;
using backend.Application.DTOs.Response;
using backend.Application.Exceptions;
using backend.Application.Interfaces.Authentication;
using backend.Application.Interfaces.UserInterfaces;
using backend.Application.Interfaces.UserRoleInterfaces;


namespace backend.Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IUserRoleRepository _userRoleRepository;
        private readonly IAuthenticationRepository _authenticationRepository;
        private readonly IMapper mapper;

        public UserService(IUserRepository userRepository, IMapper mapper, IUserRoleRepository userRoleRepository, IAuthenticationRepository authenticationRepository)
        {
            _userRepository = userRepository;
            this.mapper = mapper;
            _userRoleRepository = userRoleRepository;
            _authenticationRepository = authenticationRepository;
        }
        public async Task<IEnumerable<UserResponse>> GetAllUsersAsync()
        {
            var users = await _userRepository.GeAllUsersAsync(); // all regular users (excluding employers)
            return mapper.Map<IEnumerable<UserResponse>>(users);
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

        public async Task<UserResponse?> GetUserDetailsByIdAsync(int id)
        {
            var user = await _userRepository.GetByIdAsync(id);
            return user != null ? mapper.Map<UserResponse>(user) : default;
        }

        public virtual async Task UpdateAsync(int id, UserRequest requestDto)
        {
            var entity = await _userRepository.GetByIdAsync(id);
            if (entity != null)
            {
                mapper.Map(requestDto, entity);
                await _userRepository.UpdateAsync(entity);
            }
        }

        public async Task UpdateUsernameAsync(int id, string newUsername)
        {
            var account = await _userRepository.GetByIdAsync(id);
            if (account != null)
            {
                var user = await _authenticationRepository.GetUserByNameAsync(newUsername);
                if (user != null && user.Id != account.AspNetUserId)
                {
                    throw new UsernameTakenException("This username is taken!");
                }
                else
                {
                    account.AspNetUser.UserName = newUsername;
                    await _userRepository.UpdateAspNetUser(account.AspNetUser);
                }
            }
        }

        public async Task UpdateEmailAsync(int id, string newEmail)
        {
            var account = await _userRepository.GetByIdAsync(id);
            if (account != null)
            {
                var user = await _authenticationRepository.GetUserByEmailAsync(newEmail);
                if (user != null && user.Id != account.AspNetUserId)
                {
                    throw new EmailTakenException("This email is taken!");
                }
                else
                {
                    account.AspNetUser.Email = newEmail;
                    await _userRepository.UpdateAspNetUser(account.AspNetUser);
                }
            }
        }
    }
}
