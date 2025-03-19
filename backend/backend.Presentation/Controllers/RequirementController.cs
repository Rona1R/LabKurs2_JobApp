using backend.Application.DTOs.Request;
using backend.Application.Interfaces.RequirementInterfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RequirementController : ControllerBase
    {
        private readonly IRequirementService _requirementService;

        public RequirementController(IRequirementService requirementService)
        {
            _requirementService = requirementService;
        }

        [HttpGet("byJob/{id}")]
        public virtual async Task<IActionResult> GetByJob(int id)
        {
            var dtos = await _requirementService.GetByJobAsync(id);
            return Ok(dtos);
        }

        [HttpPost]
        public virtual async Task<IActionResult> Create([FromBody] IEnumerable<RequirementRequest> requestDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createdDto = await _requirementService.CreateRequirementsAsync(requestDto);
            return Ok(createdDto);
        }

        [HttpGet("{id}")]
        public virtual async Task<IActionResult> GetById(string id)
        {
            var dto = await _requirementService.GetByIdAsync(id);
            if (dto == null)
            {
                return NotFound();
            }
            return Ok(dto);
        }

        [HttpPut("{id}")]
        public virtual async Task<IActionResult> Update(string id, [FromBody] RequirementRequest requestDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _requirementService.UpdateAsync(id, requestDto);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public virtual async Task<IActionResult> Delete(string id)
        {
            var existingDto = await _requirementService.GetByIdAsync(id);
            if (existingDto == null)
            {
                return NotFound();
            }

            await _requirementService.DeleteAsync(id);
            return NoContent();
        }

    }
}
