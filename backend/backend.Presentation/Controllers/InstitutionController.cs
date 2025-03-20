using backend.Application.DTOs.Request;
using backend.Application.DTOs.Response;
using backend.Application.Interfaces.InstitutionInterfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InstitutionController : BaseController<IInstitutionService, InstitutionRequest, InstitutionResponse>
    {
        public InstitutionController(IInstitutionService service) : base(service)
        {
        }
    }
}
