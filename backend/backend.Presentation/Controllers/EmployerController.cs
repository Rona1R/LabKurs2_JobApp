using backend.Application.DTOs.Request;
using backend.Application.DTOs.Request.Auth;
using backend.Application.DTOs.Response;
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
