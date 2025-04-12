using backend.Application.DTOs.Request;
using backend.Application.DTOs.Response;
using backend.Application.Interfaces.UserLanguageInterfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserLanguageController : BaseController<IUserLanguageService, UserLanguageRequest, UserLanguageResponse>
    {
        public UserLanguageController(IUserLanguageService service) : base(service)
        {
        }

        [HttpGet("byUser/{userId}")]
        public async Task<IActionResult> GetByUser(int userId)
        {
            return Ok(await _service.GetByUser(userId));    
        }

    }
}
