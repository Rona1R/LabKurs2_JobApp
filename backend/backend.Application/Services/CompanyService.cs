using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using backend.Application.DTOs.Companies;
using backend.Application.Exceptions;
using backend.Application.Interfaces.CompanyInterfaces;
using backend.Domain.Models;

namespace backend.Application.Services
{
    public class CompanyService : BaseService<ICompanyRespository, Company, CompanyRequest, CompanyResponse>, ICompanyService
    {
        public CompanyService(ICompanyRespository repository, IMapper mapper) : base(repository, mapper)
        {
        }

        public async Task<bool> ValidateCompanyAsync(string companyName)
        {
            var exits = await _repository.GetByNameAsync(companyName);
            if (exits != null)
            {
                return false;
            }
            return true;
        }

        public async Task<bool> ValidateCompanyAsync(int id,string companyName)
        {
            var exists = await _repository.GetByNameAsync(companyName);
            if (exists != null && exists.Id != id)
            {
                return false;
            }
            return true;
        }

        public async Task<IEnumerable<CompanyResponse>> GetByUser(int userId)
        {
            var entities = await _repository.GetByUser(userId);
            return _mapper.Map<IEnumerable<CompanyResponse>>(entities);
        }
    }
}
