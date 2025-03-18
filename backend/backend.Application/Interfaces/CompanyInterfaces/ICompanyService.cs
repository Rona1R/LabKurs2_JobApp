using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Application.DTOs.Request;
using backend.Application.DTOs.Response;

namespace backend.Application.Interfaces.CompanyInterfaces
{
    public interface ICompanyService : IBaseService<CompanyRequest, CompanyResponse>
    {
        Task<bool> ValidateCompanyAsync(string companyName);

        Task<bool> ValidateCompanyAsync(int id, string companyName);
        Task<IEnumerable<CompanyResponse>> GetByUser(int userId);

    }
}
