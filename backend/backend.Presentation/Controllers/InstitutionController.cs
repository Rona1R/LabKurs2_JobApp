using backend.Application.DTOs.Auth;
using backend.Application.DTOs.Institutions;
using backend.Application.Interfaces.InstitutionInterfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = UserRoles.Admin)]
    public class InstitutionController : BaseController<IInstitutionService, InstitutionRequest, InstitutionResponse>
    {
        public InstitutionController(IInstitutionService service) : base(service)
        {
        }

        [AllowAnonymous]
        public override Task<IActionResult> GetAll()
        {
            return base.GetAll();
        }

        [AllowAnonymous]
        public override Task<IActionResult> GetById(int id)
        {
            return base.GetById(id);
        }
    }
}
