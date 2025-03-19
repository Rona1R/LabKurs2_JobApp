using backend.Application.DTOs.Request;
using backend.Application.DTOs.Response;
using backend.Application.Interfaces.JobInterfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobController : BaseController<IJobService, JobRequest, JobResponse>
    {
        public JobController(IJobService service) : base(service)
        {
        }

        [HttpGet("filteredPosts")]
        public async Task<IActionResult> GetPostings([FromQuery] JobFilterRequest filters)
        {
            return Ok(await _service.GetFilteredPosts(filters));

        }
    }
}
