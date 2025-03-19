using backend.Application.DTOs.Request;
using backend.Application.DTOs.Response;
using backend.Application.Interfaces.TagInterfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagController : BaseController<ITagService, TagRequest, TagResponse>
    {
        public TagController(ITagService service) : base(service)
        {
        }
    }
}
