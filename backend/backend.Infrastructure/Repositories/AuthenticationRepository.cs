using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
using backend.Application.DTOs.Request;
using backend.Application.Interfaces.Authentication;
using backend.Domain.Models;
using backend.Infrastructure.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.Win32;

namespace backend.Infrastructure.Repositories
{
    public class AuthenticationRepository : IAuthenticationRepository
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly UserManager<IdentityUser> _userManager;


        public AuthenticationRepository(ApplicationDbContext dbContext, UserManager<IdentityUser> userManager)
        {
            _dbContext = dbContext;
            _userManager = userManager;
        }
  
    }
}
