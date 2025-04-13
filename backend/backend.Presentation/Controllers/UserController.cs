using backend.Application.DTOs.Request;
using backend.Application.DTOs.Request.Auth;
using backend.Application.Exceptions;
using backend.Application.Interfaces.UserInterfaces;
using Microsoft.AspNetCore.Authorization;
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

        [HttpGet]
        [Authorize(Roles = UserRoles.Admin)]
        public async Task<IActionResult> Get() // all regular users 
        {
            return Ok(await _userService.GetAllUsersAsync());
        }

        [HttpGet("WithRoles")]
        [Authorize(Roles = UserRoles.Admin)]
        public async Task<IActionResult> GetWithRoles()
        {
            return Ok(await _userService.GetAllUsersWithRolesAsync());
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetById(int id)
        {
            var user = await _userService.GetUserDetailsByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpPut("{id}")]
        [Authorize]
        public virtual async Task<IActionResult> Update(int id, [FromBody] UserRequest requestDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _userService.UpdateAsync(id, requestDto);
            return NoContent();
        }

        [HttpPut("UpdateUsername/{id}")]
        [Authorize]
        public virtual async Task<IActionResult> Update(int id,[FromQuery] string newUsername)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                await _userService.UpdateUsernameAsync(id, newUsername);
                return NoContent();
            }
            catch (UsernameTakenException ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPut("UpdateEmail/{id}")]
        [Authorize]
        public virtual async Task<IActionResult> UpdateEmail(int id,[FromQuery] string newEmail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                await _userService.UpdateEmailAsync(id, newEmail);
                return NoContent();
            }
            catch (EmailTakenException ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
