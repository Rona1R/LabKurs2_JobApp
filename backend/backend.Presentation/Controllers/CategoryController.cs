using backend.Application.DTOs.Request;
using backend.Application.DTOs.Response;
using backend.Application.Exceptions;
using backend.Application.Interfaces.CategoryInterfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : BaseController<ICategoryService,/*Category,*/ CategoryRequest, CategoryResponse>
    {
        public CategoryController(ICategoryService service) : base(service)
        {
        }

        //private readonly ICategoryService _categoryService;
        //public CategoryController(IBaseService<Category, CategoryRequest, CategoryResponse> service, ICategoryService categoryService) : base(service)
        //{
        //    _categoryService = categoryService;
        //}

        public override async Task<IActionResult> Create([FromBody] CategoryRequest requestDto)
        {
            try
            {
                return await base.Create(requestDto);
            }
            catch (ExistsException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        public override async Task<IActionResult> Update(int id, CategoryRequest requestDto)
        {
            try
            {
                return await base.Update(id, requestDto);
            }catch (ExistsException ex) {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("test")]
        public string Test()
        {
            return _service.TestService();
        }

    }
}
