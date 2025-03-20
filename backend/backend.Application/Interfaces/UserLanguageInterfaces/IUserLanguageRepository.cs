using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Domain.Models;

namespace backend.Application.Interfaces.UserLanguageInterfaces
{
    public interface IUserLanguageRepository : IBaseRepository<UserLanguage>
    {
        Task<IEnumerable<UserLanguage>> GetByUser(int userId);
    }
}
