using backend.Application.DTOs.Applications;
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

        [HttpGet("byEmployer/{employerId}")]
        public async Task<IActionResult> GetApplicationsByEmplyoer(int employerId,[FromQuery] JobApplicationFilters filters)
        {
          return Ok(await _service.GetApplicationsByEmployer(employerId,filters));
        }

        [HttpGet("byApplicant/{applicantId}")]
        public async Task<IActionResult> GetApplicantsByApplicant(int applicantId, [FromQuery] JobApplicationFilters filters)
        {
            return Ok(await _service.GetApplicationsByApplicant(applicantId, filters));
        }

        [HttpGet("jobs/{applicantId}")]
        public async Task<IActionResult> GetJobsAppliedByUser(int applicantId)
        {
            return Ok(await _service.GetJobsAppliedByUser(applicantId));
        }

        [HttpGet("companies/{applicantId}")]
        public async Task<IActionResult> GetCompaniesUserAppliedTo(int applicantId)
        {
            return Ok(await _service.GetCompaniesUserAppliedTo(applicantId));
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
