using backend.Application.DTOs.Request;
using backend.Application.DTOs.Response;
using backend.Application.Interfaces.DepartamentInterfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartamentController : BaseController<IDepartamentService,DepartamentRequest, DepartamentResponse>
    {
        public DepartamentController(IDepartamentService service) : base(service)
        {
        }
    }
}
