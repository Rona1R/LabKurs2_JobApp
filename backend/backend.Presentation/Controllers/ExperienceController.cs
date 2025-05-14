using backend.Application.DTOs.Experiences;
using backend.Application.Interfaces.ExperienceInterfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ExperienceController : BaseController<IExperienceService, ExperienceRequest, ExperienceResponse>
    {
        public ExperienceController(IExperienceService service) : base(service)
        {
        }

        [HttpGet("byUser/{id}")]
        public async Task<IActionResult> GetByUser(int id)
        {
            return Ok(await _service.GetByUserAsync(id));
        }

    }
}
