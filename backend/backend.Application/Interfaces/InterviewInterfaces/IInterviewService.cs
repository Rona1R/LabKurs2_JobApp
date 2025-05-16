using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Application.DTOs.Interviews;

namespace backend.Application.Interfaces.InterviewInterfaces
{
    public interface IInterviewService : IBaseService<InterviewRequest, InterviewResponse>
    {
        Task<IEnumerable<InterviewResponse>> GetInterviewsByEmployer(int userId);
    }
}
