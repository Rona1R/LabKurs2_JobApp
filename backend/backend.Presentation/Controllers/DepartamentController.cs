using backend.Application.DTOs.Auth;
using backend.Application.DTOs.Departaments;
using backend.Application.Exceptions;
using backend.Application.Interfaces.DepartamentInterfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = UserRoles.Admin)]
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

        public override async Task<IActionResult> Update(int id, [FromBody] DepartamentRequest requestDto)
        {
            try
            {
                return await base.Update(id, requestDto);
            }
            catch (ExistsException ex) {
                return BadRequest(ex.Message);
            }
        }
    }

  
}
