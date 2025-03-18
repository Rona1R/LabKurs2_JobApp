using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Domain.Models;
using Microsoft.AspNetCore.Identity;

namespace backend.Application.Interfaces.UserInterfaces
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetAllApplicationUsersAsync();
    }
}
