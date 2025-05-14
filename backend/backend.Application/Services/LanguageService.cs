using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using backend.Application.DTOs.Languages;
using backend.Application.Exceptions;
using backend.Application.Interfaces.LanguageInterfaces;
using backend.Domain.Models;

namespace backend.Application.Services
{
    public class LanguageService : BaseService<ILanguageRepository, Language, LanguageRequest, LanguageResponse>, ILanguageService
    {
        public LanguageService(ILanguageRepository repository, IMapper mapper) : base(repository, mapper)
        {
        }

        public override async Task<LanguageResponse> CreateAsync(LanguageRequest requestDto)
        {
            var lang = await _repository.GetByName(requestDto.Name);
            if (lang == null)
            {
                return await base.CreateAsync(requestDto);
            }


            throw new ExistsException("This Language already exists!");
        }

        public override async Task UpdateAsync(int id, LanguageRequest requestDto)
        {
            var lang = await _repository.GetByName(requestDto.Name);
            if (lang != null && lang.Id != id)
            {
                throw new ExistsException("A Language with this name already exists!");
            }
            await base.UpdateAsync(id, requestDto);
        }
    }
}
