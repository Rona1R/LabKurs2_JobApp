using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Application.DTOs.Categories;


namespace backend.Application.Interfaces.CategoryInterfaces
{
    public interface ICategoryService : IBaseService<CategoryRequest, CategoryResponse>
    {
    }
}
