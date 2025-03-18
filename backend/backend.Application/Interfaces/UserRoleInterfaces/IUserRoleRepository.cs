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
        Task<IEnumerable<string>> GetRolesByUserAsync(IdentityUser user);

    }
}
