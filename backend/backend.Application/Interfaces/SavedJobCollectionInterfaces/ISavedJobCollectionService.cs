﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Application.DTOs.Request;
using backend.Application.DTOs.Response;

namespace backend.Application.Interfaces.SavedJobCollectionInterfaces
{
    public interface ISavedJobCollectionService : IBaseService<SavedJobCollectionRequest, SavedJobCollectionResponse>
    {
        Task<IEnumerable<CollectionsByUserResponse>> GetCollectionsByUser(int userId);
        Task<SavedJobsByCollectionResponse?> GetSavedPostsByCollection(int collectionId);
    }
}
