using backend.Application.DTOs.Educations;
using backend.Application.Interfaces.EducationInterfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class EducationController : BaseController<IEducationService, EducationRequest, EducationResponse>
    {
        public EducationController(IEducationService service) : base(service)
        {
        }

        [HttpGet("byUser/{id}")]
        public async Task<IActionResult> GetByUser(int id)
        {
            return Ok(await _service.GetByUserAsync(id));
        }

    }
}
