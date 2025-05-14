using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Application.DTOs.Employers;

namespace backend.Application.Interfaces.EmployerInterfaces
{
    public interface IEmployerService : IBaseService<EmployerRequest, EmployerResponse>
    {
    }
}
