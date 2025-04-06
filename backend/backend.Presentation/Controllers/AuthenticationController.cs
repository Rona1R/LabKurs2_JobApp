using backend.Application.DTOs.Request;
using backend.Application.DTOs.Request.Auth;
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
        private readonly ITokenService _tokenService;

        public AuthenticationController(IAuthenticationService authenticationService, ITokenService tokenService)
        {
            _authenticationService = authenticationService;
            _tokenService = tokenService;
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] AuthRequest authRequest)
        {
            try
            {
                var user = await _authenticationService.Login(authRequest);
                var tokenResponse = await _tokenService.GenerateTokens(user);
                return Ok(tokenResponse);
            }
            catch (InvalidCredentialsException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (NotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }


        [HttpPost]
        [Route("create-account")]
        public async Task<IActionResult> Register([FromBody] Register register)
        {
            try
            {
                var accountCreation = await _authenticationService.CreateAccount(register);

                if (accountCreation.Succeeded)
                {
                    return Ok("Your Account has been successfully created!");
                }
                else
                {
                    return BadRequest("Something went wrong with account creation!");
                }
            }
            catch (EmailTakenException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (UsernameTakenException ex)
            {
                return BadRequest(ex.Message);
            }
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
