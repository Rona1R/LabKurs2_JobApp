using backend.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend.Presentation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public abstract class BaseController<TService,/* TEntity,*/ TRequestDto, TResponseDto> : ControllerBase
        where TService : IBaseService</*TEntity,*/ TRequestDto, TResponseDto>
    //    where TEntity : class
    {
        protected readonly TService _service;

        public BaseController(TService service)
        {
            _service = service;
        }

        [HttpGet]
        public virtual async Task<IActionResult> GetAll()
        {
            var dtos = await _service.GetAllAsync();
            return Ok(dtos);
        }

        [HttpGet("{id}")]
        public virtual async Task<IActionResult> GetById(int id)
        {
            var dto = await _service.GetByIdAsync(id);
            if (dto == null)
            {
                return NotFound();
            }
            return Ok(dto);
        }

        [HttpPost]
        public virtual async Task<IActionResult> Create([FromBody] TRequestDto requestDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createdDto = await _service.CreateAsync(requestDto);
            return Ok(createdDto);
            //return CreatedAtAction(nameof(GetById), new { id = createdDto }, createdDto);
        }

        [HttpPut("{id}")]
        public virtual async Task<IActionResult> Update(int id, [FromBody] TRequestDto requestDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _service.UpdateAsync(id, requestDto);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public virtual async Task<IActionResult> Delete(int id)
        {
            var existingDto = await _service.GetByIdAsync(id);
            if (existingDto == null)
            {
                return NotFound();
            }

            await _service.DeleteAsync(id);
            return NoContent();
        }
    }
}
