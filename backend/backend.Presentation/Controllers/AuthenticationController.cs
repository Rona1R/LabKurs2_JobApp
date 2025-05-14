using System.Text;
using System.Threading.Tasks;
using backend.Application.DTOs.Auth;
using backend.Application.Exceptions;
using backend.Application.Interfaces.Authentication;
using backend.Infrastructure.Migrations;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace backend.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthenticationService _authenticationService;
        private readonly ITokenService _tokenService;
        private readonly IConfiguration _configuration;

        public AuthenticationController(IAuthenticationService authenticationService, ITokenService tokenService, IConfiguration configuration)
        {
            _authenticationService = authenticationService;
            _tokenService = tokenService;
            _configuration = configuration;
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] AuthRequest authRequest)
        {
            try
            {
                var user = await _authenticationService.Login(authRequest);
                var tokenResponse = await _tokenService.GenerateTokens(user);

                var refresh_validity = _configuration["REFRESH_TOKEN_VALIDITY_IN_DAYS"] ?? throw new InvalidOperationException("Refresh token validity is not set");
                if (!int.TryParse(refresh_validity, out int tokenValidityInDays))
                {
                    throw new InvalidOperationException("Refresh token validity is not a valid integer");
                }

                Response.Cookies.Append("refreshToken", tokenResponse.RefreshToken, new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.None,
                    //SameSite = SameSiteMode.Strict,
                    //Expires = DateTimeOffset.UtcNow.AddMinutes(2)
                    Expires = DateTimeOffset.UtcNow.AddDays(tokenValidityInDays)
                });

                return Ok(tokenResponse.AccessToken);
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

        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh()
        {
            var refreshToken = Request.Cookies["refreshToken"];
            if (string.IsNullOrEmpty(refreshToken))
            {
                return Unauthorized("Refresh token is missing or invalid.");
            }

            var user = await _tokenService.GetUserFromRefreshToken(refreshToken);
            if (user == null || user.RefreshTokenExpiryTime <= DateTime.UtcNow)
            {
                return Unauthorized();
            }

            var tokenResponse = await _tokenService.GenerateTokens(user.AspNetUser);

            var refreshValidity = _configuration["REFRESH_TOKEN_VALIDITY_IN_DAYS"]
                                  ?? throw new InvalidOperationException("Refresh token validity is not set");
            if (!int.TryParse(refreshValidity, out int tokenValidityInDays))
            {
                throw new InvalidOperationException("Refresh token validity is not a valid integer");
            }

            Response.Cookies.Append("refreshToken", tokenResponse.RefreshToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                //SameSite = SameSiteMode.Strict,
                //Expires = DateTimeOffset.UtcNow.AddMinutes(2)
                Expires = DateTimeOffset.UtcNow.AddDays(tokenValidityInDays)
            });
            return Ok(tokenResponse.AccessToken);
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
            catch (UsernameTakenException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (EmailTakenException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            var refreshToken = Request.Cookies["refreshToken"];
            if (string.IsNullOrEmpty(refreshToken))
            {
                return BadRequest("No refresh token found in cookies.");
            }

            var user = await _tokenService.GetUserFromRefreshToken(refreshToken);
            if (user == null)
            {
                return Unauthorized("Invalid refresh token.");
            }

            await _tokenService.RemoveRefreshToken(user);
            Response.Cookies.Delete("refreshToken");

            return Ok("Successfully logged out.");
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
