using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Application.Interfaces.DepartamentInterfaces;
using backend.Domain.Models;
using backend.Infrastructure.Data;

namespace backend.Infrastructure.Repositories
{
    public class DepartamentRepository : BaseRepository<Departament>, IDepartamentRepository
    {
        public DepartamentRepository(ApplicationDbContext context) : base(context)
        {
        }

        public override Task UpdateAsync(Departament entity)
        {
            entity.UpdatedAt = DateTime.UtcNow;
            return base.UpdateAsync(entity);
        }
    }
}
