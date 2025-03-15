using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using backend.Application.Interfaces;

namespace backend.Application.Services
{
    public class BaseService<TRepository, TEntity, TRequestDto, TResponseDto> /*: IBaseService<TEntity, TRequestDto, TResponseDto>*/
       where TRepository : IBaseRepository<TEntity>
        where TEntity : class
    {
        protected readonly TRepository _repository;
        protected readonly IMapper _mapper;

        public BaseService(TRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public virtual async Task<TResponseDto> CreateAsync(TRequestDto requestDto)
        {
            TEntity entity = _mapper.Map<TEntity>(requestDto);
            await _repository.AddAsync(entity);
            return _mapper.Map<TResponseDto>(entity);
        }

        public virtual async Task DeleteAsync(int id)
        {
            await _repository.DeleteAsync(id);
        }

        public virtual async Task<IEnumerable<TResponseDto>> GetAllAsync()
        {
            var entities = await _repository.GetAllAsync();
            return _mapper.Map<IEnumerable<TResponseDto>>(entities);
        }

        public virtual async Task<TResponseDto?> GetByIdAsync(int id)
        {
            var entity = await _repository.GetByIdAsync(id);
            return entity != null ? _mapper.Map<TResponseDto>(entity) : default;
        }

        public virtual async Task UpdateAsync(int id, TRequestDto requestDto)
        {
            var entity = await _repository.GetByIdAsync(id);
            if (entity != null)
            {
                _mapper.Map(requestDto, entity);
                await _repository.UpdateAsync(entity);
            }
        }
    }

}
