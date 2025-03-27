using backend.Application.DTOs.Request;
using backend.Application.Interfaces.JobDetailsInterfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobDetailsController : ControllerBase
    {
        private readonly IJobDetailsService _jobDetailsService;

        public JobDetailsController(IJobDetailsService jobDetailsService)
        {
            _jobDetailsService = jobDetailsService;
        }

        [HttpGet("{jobId}")]
        public async Task<IActionResult> GetDetailsByJob(int jobId)
        {
            var job = await _jobDetailsService.GetDetailsByJob(jobId);
            if (job == null)
            {
                return NotFound();
            }
            return Ok(job);
        }

        [HttpPost]
        public virtual async Task<IActionResult> Create([FromBody] JobDetailsRequest requestDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _jobDetailsService.CreateDetailsAsync(requestDto);
            return Ok();
        }

        [HttpPut("{jobId}")]
        public virtual async Task<IActionResult> Update(int jobId, [FromBody] JobDetailsRequest requestDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _jobDetailsService.UpdateDetailsAsync(jobId, requestDto);
            return NoContent();
        }

        [HttpDelete("{jobId}")]
        public virtual async Task<IActionResult> Delete(int jobId)
        {
            var existingDto = await _jobDetailsService.GetDetailsByJob(jobId);
            if (existingDto == null)
            {
                return NotFound();
            }

            await _jobDetailsService.GetDetailsByJob(jobId);
            return NoContent();
        }
    }
}
