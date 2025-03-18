using backend.Application.Exceptions;
using backend.Application.Interfaces.UserRoleInterfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserRoleController : ControllerBase
    {
        private readonly IUserRoleService _userRoleService;
        public UserRoleController(IUserRoleService userRoleService)
        {
            _userRoleService = userRoleService;
        }

        [HttpPost]
        public async Task<IActionResult> Create(int userId, string role)
        {
            try
            {
               var roleCreation = await _userRoleService.AddRoleAsync(userId, role);
                if(roleCreation.Succeeded)
                {
                    return Ok("Role was successfully added!");
                }
                else
                {
                    return BadRequest("Something went wrong while adding Role !");
                }
            }catch(NotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int userId,string role)
        {
            try
            {
                var roleCreation = await _userRoleService.RemoveFromRoleAsync(userId, role);
                if (roleCreation.Succeeded)
                {
                    return Ok("Role was successfully removed!");
                }
                else
                {
                    return BadRequest("Something went wrong while removing from Role !");
                }
            }
            catch (NotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }


    }
}
