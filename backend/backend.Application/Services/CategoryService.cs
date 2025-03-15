using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using backend.Application.DTOs.Request;
using backend.Application.DTOs.Response;
using backend.Application.Exceptions;
using backend.Application.Interfaces.CategoryInterfaces;
using backend.Domain.Models;

namespace backend.Application.Services
{
    public class CategoryService : BaseService<ICategoryRepository,Category, CategoryRequest, CategoryResponse>, ICategoryService //implemented ICategoryService per metodat e shtuara qe sjane ne base class ...
    {

        public CategoryService(ICategoryRepository repository, IMapper mapper) : base(repository, mapper)
        {
        }

        public override async Task<CategoryResponse> CreateAsync(CategoryRequest requestDto)
        {
            // validimi para krijimit te kategorise :
            var exits = await _repository.GetByNameAsync(requestDto.Name);
            if(exits == null) { 

                 return await base.CreateAsync(requestDto);
            }
            else
            {
                throw new ExistsException("A Category with this name already exists!");
            }           
        }

        public override async Task UpdateAsync(int id, CategoryRequest requestDto)
        {
            var exists = await _repository.GetByNameAsync(requestDto.Name);
            if(exists!=null && exists.Id != id)
            {
                throw new ExistsException("A Category with this name already exists!");
            }

            await base.UpdateAsync(id, requestDto);    
        }
        // additional method in derived class (sa per testim)
        public string TestService()
        {
            return _repository.TestRepository() + ", test from service";
        }
    }
}
