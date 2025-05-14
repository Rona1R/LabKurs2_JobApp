using backend.Application.DTOs.Users;
using backend.Application.Interfaces.UserProfileInterfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileService _userProfileService;

        public UserProfileController(IUserProfileService userProfileService)
        {
            _userProfileService = userProfileService;
        }

        [HttpGet("{userId}")]
        [Authorize]
        public async Task<IActionResult> GetProfileByUser(int userId)
        {
            var user = await _userProfileService.GetProfileDetails(userId); // detajet e userit (sql edhe mongo)
            //var user = await _userProfileService.GetProfileByUser(userId);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        //[HttpPost] // unused
        //[Authorize]
        //public virtual async Task<IActionResult> Create([FromBody] UserProfileRequest requestDto)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    await _userProfileService.CreateProfile(requestDto);
        //    return Ok();
        //}

        [HttpPut("{userId}")]
        [Authorize]
        public virtual async Task<IActionResult> Update(int userId, [FromBody] UserProfileRequest requestDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _userProfileService.UpdateProfile(userId, requestDto);
            return NoContent();
        }

        //[HttpDelete("{userId}")] // unused
        //public virtual async Task<IActionResult> Delete(int userId)
        //{
        //    var existingDto = await _userProfileService.GetProfileDetails(userId);
        //    if (existingDto == null)
        //    {
        //        return NotFound();
        //    }

        //    await _userProfileService.DeleteProfile(userId);
        //    return NoContent();
        //}
    }
}