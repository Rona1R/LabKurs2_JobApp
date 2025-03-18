using backend.Application.Exceptions;
using backend.Application.Interfaces.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthenticationService _authenticationService;

        public AuthenticationController(IAuthenticationService authenticationService)
        {
            _authenticationService = authenticationService;
        }


        [HttpPost]
        [Route("add-role")]
        public async Task<IActionResult> AddRole(string roli)
        {
            try
            {
                var res = await _authenticationService.CreateRole(roli);
                if (res.Succeeded)
                {
                    return Ok("Roli u shtua me sukses!");
                }
                else
                {
                    return BadRequest($"Could not create role {roli}");
                }

            }
            catch (ExistsException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route("remove-role")]
        public async Task<IActionResult> RemoveRole(string roli)
        {
            var res = await _authenticationService.RemoveRole(roli);
            if (res.Succeeded)
            {
                return Ok("Roli u fshi me sukses!");
            }
            else
            {
                return BadRequest($"Could not role {roli}");
            }
        }
    }
}
