using backend.Application.DTOs.Request;
using backend.Application.DTOs.Request.Auth;
using backend.Application.DTOs.Response;
using backend.Application.Interfaces.TagInterfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = UserRoles.Admin)]
    public class TagController : BaseController<ITagService, TagRequest, TagResponse>
    {
        public TagController(ITagService service) : base(service)
        {
        }

        //[Authorize(Roles = $"{UserRoles.Admin},{UserRoles.Employer}")]
        [AllowAnonymous]
        public override Task<IActionResult> GetAll()
        {
            return base.GetAll();
        }

        [AllowAnonymous]
        //[Authorize(Roles = $"{UserRoles.Admin},{UserRoles.Employer}")]

        public override Task<IActionResult> GetById(int id)
        {
            return base.GetById(id);
        }
    }
}
