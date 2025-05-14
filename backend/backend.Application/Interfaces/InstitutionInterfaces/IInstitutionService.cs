using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Application.DTOs.Institutions;

namespace backend.Application.Interfaces.InstitutionInterfaces
{
    public interface IInstitutionService : IBaseService<InstitutionRequest, InstitutionResponse>
    {
    }
}
