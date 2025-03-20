using backend.Application.DTOs.Request;
using backend.Application.DTOs.Response;
using backend.Application.Exceptions;
using backend.Application.Interfaces.LanguageInterfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LanguageController : BaseController<ILanguageService, LanguageRequest, LanguageResponse>
    {
        public LanguageController(ILanguageService service) : base(service)
        {
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
