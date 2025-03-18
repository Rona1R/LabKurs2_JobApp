using backend.Application.DTOs.Request;
using backend.Application.DTOs.Response;
using backend.Application.Interfaces.EmployerInterfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployerController : BaseController<IEmployerService,EmployerRequest, EmployerResponse>
    {
        public EmployerController(IEmployerService service) : base(service)
        {
        }
    }
}
