using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using backend.Application.DTOs.Request;
using backend.Application.DTOs.Response;
using backend.Application.Exceptions;
using backend.Application.Interfaces.DepartamentInterfaces;
using backend.Domain.Models;

namespace backend.Application.Services
{
    public class DepartamentService : BaseService<IDepartamentRepository, Departament, DepartamentRequest, DepartamentResponse>, IDepartamentService
    {
        public DepartamentService(IDepartamentRepository repository, IMapper mapper) : base(repository, mapper)
        {
        }


        public override async Task<DepartamentResponse> CreateAsync(DepartamentRequest requestDto)
        {
            // validimi para krijimit te kategorise :
            var exits = await _repository.GetByNameAsync(requestDto.Name);
            if (exits == null)
            {

                return await base.CreateAsync(requestDto);
            }
            else
            {
                throw new ExistsException("A Departament with this name already exists!");
            }
        }

        public override async Task UpdateAsync(int id, DepartamentRequest requestDto)
        {
            var exists = await _repository.GetByNameAsync(requestDto.Name);

            if (exists != null && exists.Id != id)
            {
                throw new ExistsException("A Department with this name already exists!");
            }

            await base.UpdateAsync(id, requestDto);
        }
    }

    


}
