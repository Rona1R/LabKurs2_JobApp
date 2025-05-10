using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Application.DTOs.Request;
using backend.Application.DTOs.Response;

namespace backend.Application.Interfaces.JobApplicationInterfaces
{
    public interface IJobApplicationService : IBaseService<JobApplicationRequest, JobApplicationResponse>
    {
        Task<bool> HasApplied(int userId, int jobId);
    }
}
