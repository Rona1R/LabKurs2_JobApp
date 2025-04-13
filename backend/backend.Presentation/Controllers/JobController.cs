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
    }
}
