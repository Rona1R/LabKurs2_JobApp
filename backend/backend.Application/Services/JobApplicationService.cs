using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using backend.Application.DTOs.Request;
using backend.Application.DTOs.Response;
using backend.Application.Interfaces.JobApplicationInterfaces;
using backend.Domain.Models;

namespace backend.Application.Services
{
    public class JobApplicationService : BaseService<IJobApplicationRepository, JobApplication, JobApplicationRequest, JobApplicationResponse>, IJobApplicationService
    {
        public JobApplicationService(IJobApplicationRepository repository, IMapper mapper) : base(repository, mapper)
        {
        }
    }
}
