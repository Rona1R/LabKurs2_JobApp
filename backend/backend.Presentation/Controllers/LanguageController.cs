using backend.Application.DTOs.Auth;
using backend.Application.DTOs.Languages;
using backend.Application.Exceptions;
using backend.Application.Interfaces.LanguageInterfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = UserRoles.Admin)]
    public class LanguageController : BaseController<ILanguageService, LanguageRequest, LanguageResponse>
    {
        public LanguageController(ILanguageService service) : base(service)
        {
        }

        //[Authorize]
        [AllowAnonymous]
        public override Task<IActionResult> GetAll()
        {
            return base.GetAll();
        }


        [AllowAnonymous]
        public override Task<IActionResult> GetById(int id)
        {
            return base.GetById(id);
        }

        public override async Task<IActionResult> Create([FromBody] LanguageRequest requestDto)
        {
            try
            {
                return await base.Create(requestDto);
            }catch (ExistsException ex) { 
                return BadRequest(ex.Message);
            }
        }


        public override async Task<IActionResult> Update(int id, [FromBody] LanguageRequest requestDto)
        {
            try
            {
                return await base.Update(id,requestDto);
            }
            catch (ExistsException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
