using backend.Application.DTOs.Request;
using backend.Application.Interfaces.SavedJobInterfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SavedJobController : ControllerBase
    {
        private readonly ISavedJobService _savedJobService;

        public SavedJobController(ISavedJobService savedJobService)
        {
            _savedJobService = savedJobService;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] SavedJobRequest savedJobRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createdDto = await _savedJobService.AddAsync(savedJobRequest);
            return Ok(createdDto);
        }

        [HttpGet("byUser/{userId}")]
        public async Task<IActionResult> GetByUser(int userId)
        {
            return Ok(await _savedJobService.GetSavedJobsByUser(userId));
        }

    }
}
