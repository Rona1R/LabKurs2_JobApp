using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Domain.Models;

namespace backend.Application.Interfaces.CompanyInterfaces
{
    public interface ICompanyRespository : IBaseRepository<Company>
    {
        Task<Company?> GetByNameAsync(string name);

        Task<IEnumerable<Company>> GetByUser(int userId);
    }
}
