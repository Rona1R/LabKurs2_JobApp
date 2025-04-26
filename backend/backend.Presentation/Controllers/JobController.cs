using backend.Application.DTOs.Request;
using backend.Application.DTOs.Request.Auth;
using backend.Application.DTOs.Response;
using backend.Application.Interfaces.JobInterfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = UserRoles.Employer)]
    public class JobController : BaseController<IJobService, JobRequest, JobResponse>
    {
        public JobController(IJobService service) : base(service)
        {
        }

        [HttpGet("details/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetDetails(int id)
        {
            var job = await _service.GetJobWithDetails(id);
            if (job == null)
            {
                return NotFound();
            }
            return Ok(job);
        }

        [HttpGet("byEmployer/{id}")]
        public async Task<IActionResult> GetByEmployer(int id)
        {
            var jobs = await _service.GetByEmployer(id);
            return Ok(jobs);
        }


        [HttpGet("filteredPosts")]
        [AllowAnonymous]
        public async Task<IActionResult> GetPostings([FromQuery] JobFilterRequest filters)
        {
            return Ok(await _service.GetFilteredPosts(filters));

        }

        [HttpGet("maxSalary")]
        [AllowAnonymous]
        public async Task<IActionResult> GetMaxSalary()
        {
            return Ok(await _service.GetMaxSalaryAsync());
        }

        [HttpGet("byCategory/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetPostingsByCategory(int id,[FromQuery] JobFilterRequest filters)
        {
            return Ok(await _service.GetByCategory(id,filters));
        }

        [HttpGet("maxSalary/byCategory/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetMaxSalaryByCategory(int id)
        {
            return Ok(await _service.GetMaxSalaryByCategory(id));
        }

        [HttpGet("byTag/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetPostingsByTag(int id ,[FromQuery] JobFilterRequest filters)
        {
            return Ok(await _service.GetByTag(id,filters)); 
        }

        [HttpGet("maxSalary/byTag/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetMaxSalaryByTag(int id)
        {
            return Ok(await _service.GetMaxSalaryByTag(id));
        }

    }
}
