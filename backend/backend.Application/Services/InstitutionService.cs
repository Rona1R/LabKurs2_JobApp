using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using backend.Application.DTOs.Request;
using backend.Application.DTOs.Response;
using backend.Application.Interfaces.InstitutionInterfaces;
using backend.Domain.Models;

namespace backend.Application.Services
{
    public class InstitutionService : BaseService<IInstitutionRepository, Institution, InstitutionRequest, InstitutionResponse>, IInstitutionService
    {
        public InstitutionService(IInstitutionRepository repository, IMapper mapper) : base(repository, mapper)
        {
        }
    }
}
