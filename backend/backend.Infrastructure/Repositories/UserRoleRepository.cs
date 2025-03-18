using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Application.Interfaces.UserRoleInterfaces;
using Microsoft.AspNetCore.Identity;

namespace backend.Infrastructure.Repositories
{
    public class UserRoleRepository : IUserRoleRepository
    {   
        private readonly UserManager<IdentityUser> _userManager;
        public UserRoleRepository(UserManager<IdentityUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<IEnumerable<string>> GetRolesByUserAsync(IdentityUser user)
        {
            return await _userManager.GetRolesAsync(user);
        }
    }
}
