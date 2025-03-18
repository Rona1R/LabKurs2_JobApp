using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace backend.Application.Interfaces.UserRoleInterfaces
{
    public interface IUserRoleRepository
    {
        Task<IdentityResult> AddRoleAsync(IdentityUser user, string role);
        Task<IdentityResult> RemoveRoleAsync(IdentityUser user, string role);
        Task<IEnumerable<string>> GetRolesByUserAsync(IdentityUser user);

    }
}
