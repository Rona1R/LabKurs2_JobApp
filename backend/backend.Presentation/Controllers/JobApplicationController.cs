using backend.Application.DTOs.Request;
using backend.Application.DTOs.Response;
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
    }
}
