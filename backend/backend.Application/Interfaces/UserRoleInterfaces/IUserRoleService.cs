using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace backend.Application.Interfaces.UserRoleInterfaces
{
    public interface IUserRoleService
    {
        Task<IdentityResult> AddRoleAsync(int userId, string role);

        Task<IdentityResult> RemoveFromRoleAsync(int userId, string role);
    }
}
