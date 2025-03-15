using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Domain.Models;

namespace backend.Application.Interfaces.CategoryInterfaces
{
    public interface ICategoryRepository : IBaseRepository<Category>
    {

        string TestRepository();

        Task<Category?> GetByNameAsync(string name);
    }
}
