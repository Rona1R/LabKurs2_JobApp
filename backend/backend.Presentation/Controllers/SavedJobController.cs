using backend.Application.DTOs.Request;
using backend.Application.Exceptions;
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

        [HttpGet("isSaved/{userId}/{jobId}")]
        public async Task<IActionResult> GetIsSaved(int userId,int jobId)
        {
            return Ok(await _savedJobService.IsJobSaved(userId,jobId));
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

        //[HttpPut("addToCollection/{savedJobId}/{collectionId}")]
        //public async Task<IActionResult> AddToCollection(int savedJobId, int collectionId)
        //{
        //    try
        //    {
        //        await _savedJobService.AddToCollection(savedJobId, collectionId);
        //        return Ok("Job was saved to collection successfully !");

        //    }
        //    catch (NotFoundException ex)
        //    {
        //        return NotFound(ex.Message);
        //    }
        //}

        [HttpPut("addToCollection/{userId}/{jobId}/{collectionId}")]
        public async Task<IActionResult> AddToCollection(int userId, int jobId, int collectionId)
        {
            try
            {
                await _savedJobService.AddToCollection(userId, jobId, collectionId);
                return Ok("Job was saved to collection successfully !");
            }
            catch (NotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }


        [HttpPut("removeFromCollection/{savedJobId}")]
        public async Task<IActionResult> RemoveFromCollection(int savedJobId)
        {
            try
            {
                await _savedJobService.RemoveFromCollection(savedJobId);
                return Ok("Job was removed from collection successfully !");
            }
            catch (NotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("byUser/{userId}")]
        public async Task<IActionResult> GetByUser(int userId)
        {
            return Ok(await _savedJobService.GetSavedJobsByUser(userId));
        }

        [HttpDelete("{savedJobId}")]
        public async Task<IActionResult> Delete(int savedJobId)
        {
            var existingDto = await _savedJobService.GetByIdAsync(savedJobId);
            if (existingDto == null)
            {
                return NotFound();
            }

            await _savedJobService.RemoveSavedJob(savedJobId);
            return Ok("Job was successfully unsaved !");
        }

        [HttpDelete("byUserAndJob/{userId}/{jobId}")]
        public async Task<IActionResult> DeleteByUserAndJob(int userId, int jobId)
        {
            await _savedJobService.RemoveByUserAndJob(userId, jobId);
            return Ok("Job was successfully unsaved !");
        }
    }
}
