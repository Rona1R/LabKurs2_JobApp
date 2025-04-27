using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Application.Interfaces.SavedJobCollectionInterfaces;
using backend.Domain.Models;
using backend.Infrastructure.Data;

namespace backend.Infrastructure.Repositories
{
    public class SavedJobCollectionRepository : BaseRepository<SavedJobCollection>, ISavedJobCollectionRepository
    {
        public SavedJobCollectionRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}
