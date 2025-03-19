using backend.Application.DTOs.Request;
using backend.Application.DTOs.Response;
using backend.Application.Interfaces.JobTagInterfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobTagController : BaseController<IJobTagService, JobTagRequest, JobTagResponse>
    {
        public JobTagController(IJobTagService service) : base(service)
        {
        }

        [HttpGet]
        [Route("getByJob/{jobId}")]
        public async Task<IActionResult> GetByJob(int jobId)
        {
            return Ok(await _service.GetByJob(jobId));
        }

        [HttpPost]
        [Route("addJobTags")]
        public async Task<IActionResult> AddJobTags([FromBody] IEnumerable<JobTagRequest> jobTags)
        {
            await _service.AddJobTags(jobTags);
            return StatusCode(StatusCodes.Status201Created);
        }

    }
}
