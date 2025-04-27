using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Domain.Models;

namespace backend.Application.Interfaces.SavedJobCollectionInterfaces
{
    public interface ISavedJobCollectionRepository : IBaseRepository<SavedJobCollection>
    {
        Task<IEnumerable<SavedJobCollection>> GetCollectionsByUser(int userId);
    }
}
