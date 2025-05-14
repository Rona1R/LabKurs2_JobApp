using backend.Application.DTOs.Auth;
using backend.Application.DTOs.Employers;
using backend.Application.Interfaces.EmployerInterfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = UserRoles.Admin)]
    public class EmployerController : BaseController<IEmployerService,EmployerRequest, EmployerResponse>
    {
        public EmployerController(IEmployerService service) : base(service)
        {
        }
    }
}
