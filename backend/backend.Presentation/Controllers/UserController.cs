using backend.Application.DTOs.Request;
using backend.Application.Exceptions;
using backend.Application.Interfaces.UserInterfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("WithRoles")]
        public async Task<IActionResult> GetWithRoles()
        {
            return Ok(await _userService.GetAllUsersWithRolesAsync());
        }
    }
}
