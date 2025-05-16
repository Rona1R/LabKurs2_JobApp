using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Domain.Models;

namespace backend.Application.Interfaces.InterviewInterfaces
{
    public interface IInterviewRepository : IBaseRepository<Interview>
    {
        Task<IEnumerable<Interview>> GetInterviewsByEmployer(int userId);
    }
}
