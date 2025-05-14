using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using backend.Application.DTOs.UserLanguages;
using backend.Application.Interfaces.UserLanguageInterfaces;
using backend.Domain.Models;

namespace backend.Application.Services
{
    public class UserLanguageService : BaseService<IUserLanguageRepository, UserLanguage, UserLanguageRequest, UserLanguageResponse>, IUserLanguageService
    {
        public UserLanguageService(IUserLanguageRepository repository, IMapper mapper) : base(repository, mapper)
        {
        }

        public async Task<IEnumerable<UserLanguageResponse>> GetByUser(int userId)
        {
            var languages = await _repository.GetByUser(userId);
            return _mapper.Map<IEnumerable<UserLanguageResponse>>(languages);
        }
    }
}
