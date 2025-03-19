using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using backend.Application.DTOs.Request;
using backend.Application.DTOs.Response;
using backend.Application.Interfaces.DepartamentInterfaces;
using backend.Domain.Models;

namespace backend.Application.Services
{
    public class DepartamentService : BaseService<IDepartamentRepository, Departament, DepartamentRequest, DepartamentResponse>, IDepartamentService
    {
        public DepartamentService(IDepartamentRepository repository, IMapper mapper) : base(repository, mapper)
        {
        }
    }
}
