using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Domain.Models;

namespace backend.Application.Interfaces.LanguageInterfaces
{
    public interface ILanguageRepository : IBaseRepository<Language>
    {
        Task<Language?> GetByName(string name);
    }
}
