using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using backend.Application.DTOs.Request;
using backend.Application.DTOs.Response;
using backend.Application.Interfaces.EmployerInterfaces;
using backend.Domain.Models;

namespace backend.Application.Services
{
    public class EmployerService : BaseService<IEmployerRepository, Employer, EmployerRequest, EmployerResponse>, IEmployerService
    {
        public EmployerService(IEmployerRepository repository, IMapper mapper) : base(repository, mapper)
        {
        }
    }
}
