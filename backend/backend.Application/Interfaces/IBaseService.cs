using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Application.Interfaces
{
    //public interface IBaseService<T> where T : class
    //{
        public interface IBaseService</*TEntity,*/ TRequestDto, TResponseDto>
        {
            Task<IEnumerable<TResponseDto>> GetAllAsync();
            Task<TResponseDto?> GetByIdAsync(int id);
            Task<TResponseDto> CreateAsync(TRequestDto dto);
            Task UpdateAsync(int id,TRequestDto dto);
            Task DeleteAsync(int id);
        }

    //}
}
