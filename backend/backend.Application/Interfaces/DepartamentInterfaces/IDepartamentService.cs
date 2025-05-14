using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Application.DTOs.Departaments;

namespace backend.Application.Interfaces.DepartamentInterfaces
{
    public interface IDepartamentService : IBaseService<DepartamentRequest, DepartamentResponse>
    {
    }
}
