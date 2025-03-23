using backend.Application.DTOs.Request;
using backend.Application.DTOs.Response;
using backend.Application.Interfaces.SkillInterfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SkillController : BaseController<ISkillService, SkillRequest, SkillResponse>
    {
        public SkillController(ISkillService service) : base(service)
        {
        }


        [HttpGet("byUser/{id}")]
        public async Task<IActionResult> GetByUser(int id)
        {
            return Ok(await _service.GetByUserAsync(id));
        }

    }
}
