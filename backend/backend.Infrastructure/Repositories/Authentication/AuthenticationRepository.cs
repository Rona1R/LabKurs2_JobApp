using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
using backend.Application.DTOs.Request;
using backend.Application.DTOs.Request.Auth;
using backend.Application.Interfaces.Authentication;
using backend.Application.Interfaces.UserProfileInterfaces;
using backend.Domain.Models;
using backend.Infrastructure.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace backend.Infrastructure.Repositories.Authentication
{
    public class AuthenticationRepository : IAuthenticationRepository
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IUserProfileRepository _userProfileRepository;
        private readonly UserManager<IdentityUser> _userManager;


        public AuthenticationRepository(ApplicationDbContext dbContext, UserManager<IdentityUser> userManager, IUserProfileRepository userProfileRepository)
        {
            _dbContext = dbContext;
            _userManager = userManager;
            _userProfileRepository = userProfileRepository;
        }
        private async Task CreateUserAsync(User user)
        {
            var entity = await _dbContext.AddAsync(user);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<bool> Authenticate(IdentityUser user,string password)
        {
            return await _userManager.CheckPasswordAsync(user, password);
        }
        private async Task CreateProfile(int userId)
        {
            var profile = new UserProfile()
            {
                UserId = userId,
            };
            await _userProfileRepository.AddAsync(profile);
        }

        public async Task<IdentityResult> CreateAccountAsync(Register register)
        {
            var newUser = new IdentityUser()
            {
                UserName = register.Username,
                Email = register.Email,
            };

            var accountCreation = await _userManager.CreateAsync(newUser, register.Password);

            if (accountCreation.Succeeded)
            {
                await _userManager.AddToRoleAsync(newUser, UserRoles.User);

                var entity = new User()
                {
                    Name = register.Name,
                    LastName = register.LastName,
                    AspNetUserId = newUser.Id,
                };

                await CreateUserAsync(entity); //  creating user account (sql)
                await CreateProfile(entity.Id); // creating user profile (mongoDb)

            }
            return accountCreation;
        }

        public async Task<IdentityUser?> GetUserByEmailAsync(string email)
        {
            return await _userManager.FindByEmailAsync(email);
        }

        public async Task<IdentityUser?> GetUserByNameAsync(string name)
        {
            return await _userManager.FindByNameAsync(name);
        }

        public async Task<User?> GetUserById(string aspNetUserId)
        {
            return await _dbContext.User
                .FirstOrDefaultAsync(u=>u.AspNetUserId == aspNetUserId);
        }
    }
}