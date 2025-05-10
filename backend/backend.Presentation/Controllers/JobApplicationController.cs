using backend.Application.DTOs.Request;
using backend.Application.DTOs.Response;
using backend.Application.Exceptions;
using backend.Application.Interfaces.JobApplicationInterfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobApplicationController : BaseController<IJobApplicationService, JobApplicationRequest, JobApplicationResponse>
    {
        public JobApplicationController(IJobApplicationService service) : base(service)
        {
        }

        public async override Task<IActionResult> Create([FromBody] JobApplicationRequest requestDto)
        {
            try
            {
                return await base.Create(requestDto);
            }catch(AlreadyAppliedException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("hasApplied/{userId}/{jobId}")]
        public async Task<IActionResult> HasApplied(int userId, int jobId)
        {
            return Ok(await _service.HasApplied(userId, jobId));    
        }
    }
}
