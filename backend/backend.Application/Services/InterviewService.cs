using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using backend.Application.DTOs.Interviews;
using backend.Application.Interfaces.InterviewInterfaces;
using backend.Domain.Models;

namespace backend.Application.Services
{
    public class InterviewService : BaseService<IInterviewRepository, Interview, InterviewRequest, InterviewResponse>, IInterviewService
    {
        public InterviewService(IInterviewRepository repository, IMapper mapper) : base(repository, mapper)
        {
        }

        public async Task<IEnumerable<InterviewResponse>> GetInterviewsByEmployer(int userId)
        {
            var interviews = await _repository.GetInterviewsByEmployer(userId);
            return _mapper.Map<IEnumerable<InterviewResponse>>(interviews);
        }
    }
}
