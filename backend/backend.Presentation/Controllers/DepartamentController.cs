using backend.Application.DTOs.Request;
using backend.Application.DTOs.Response;
using backend.Application.Exceptions;
using backend.Application.Interfaces.DepartamentInterfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartamentController : BaseController<IDepartamentService,DepartamentRequest, DepartamentResponse>
    {
        public DepartamentController(IDepartamentService service) : base(service)
        {
        }

        public override async Task<IActionResult> Create([FromBody] DepartamentRequest requestDto)
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
    }

  
}
