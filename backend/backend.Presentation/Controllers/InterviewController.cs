using backend.Application.DTOs.Interviews;
using backend.Application.Interfaces.InterviewInterfaces;
using backend.Application.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InterviewController : BaseController<IInterviewService, InterviewRequest, InterviewResponse>
    {
        public InterviewController(IInterviewService service) : base(service)
        {
        }

        [HttpGet]
        [Route("byEmployer/{userId}")]
        public async Task<IActionResult> GetInterviewsByEmployer(int userId)
        {
            return Ok(await _service.GetInterviewsByEmployer(userId));
        }

    }
}
