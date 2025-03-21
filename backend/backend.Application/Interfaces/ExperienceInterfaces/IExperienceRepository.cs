using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Domain.Models;

namespace backend.Application.Interfaces.ExperienceInterfaces
{
    public interface IExperienceRepository : IBaseRepository<Experience>
    {

        Task<IEnumerable<Experience>> GetByUserAsync(int userId);
    }
}
