using backend.Application.DTOs.Request;
using backend.Application.DTOs.Response;
using backend.Application.Interfaces.SavedJobCollectionInterfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SavedJobCollectionController : BaseController<ISavedJobCollectionService, SavedJobCollectionRequest, SavedJobCollectionResponse>
    {
        public SavedJobCollectionController(ISavedJobCollectionService service) : base(service)
        {
        }

        [HttpGet("byUser/{userId}")]
        public async Task<IActionResult> GetCollectionsByUser(int userId)
        {
            return Ok(await _service.GetCollectionsByUser(userId));     
        }

        [HttpGet("savedPostsByCollection/{collectionId}")]
        public async Task<IActionResult> GetSavedPostsByCollection(int collectionId)
        {
            var response = await _service.GetSavedPostsByCollection(collectionId);
            if (response == null)
            {
                return NotFound("Collection was not found !");
            }
            return Ok(response);
        }
    }
}
