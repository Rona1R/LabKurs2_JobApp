using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using backend.Application.DTOs.Request;
using backend.Application.DTOs.Response;
using backend.Application.Interfaces.SavedJobCollectionInterfaces;
using backend.Domain.Models;

namespace backend.Application.Services
{
    public class SavedJobCollectionService : BaseService<ISavedJobCollectionRepository,SavedJobCollection,SavedJobCollectionRequest,SavedJobCollectionResponse>, ISavedJobCollectionService
    {
        public SavedJobCollectionService(ISavedJobCollectionRepository repository,IMapper mapper) : base(repository,mapper)
        {
        }
    }
}
