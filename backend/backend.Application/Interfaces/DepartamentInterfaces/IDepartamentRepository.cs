﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Domain.Models;

namespace backend.Application.Interfaces.DepartamentInterfaces
{
    public interface IDepartamentRepository : IBaseRepository<Departament>
    {
        Task<Departament?> GetByNameAsync(string name);
    }

}
