using backend.Application.DTOs.Request;
using backend.Application.DTOs.Request.Auth;
using backend.Application.DTOs.Response;
using backend.Application.Exceptions;
using backend.Application.Interfaces.CompanyInterfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = UserRoles.Admin)]
    public class CompanyController : BaseController<ICompanyService,/* Company, */CompanyRequest, CompanyResponse>
    {
        public CompanyController(ICompanyService service) : base(service)
        {
        }

        [AllowAnonymous]
        public override Task<IActionResult> GetAll()
        {
            return base.GetAll();
        }

        [AllowAnonymous]

        public override Task<IActionResult> GetById(int id)
        {
            return base.GetById(id);
        }

        [HttpGet("validate")]
        public async Task<IActionResult> Validate(string name)
        {
            return Ok(await _service.ValidateCompanyAsync(name));
        }

        [HttpGet("validate/{id}")]
        public async Task<IActionResult> Validate(int id,string name)
        {
            return Ok(await _service.ValidateCompanyAsync(id,name));
        }

        public override async Task<IActionResult> Update(int id, CompanyRequest requestDto)
        {
            try
            {
                return await base.Update(id, requestDto);
            }
            catch (ExistsException ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpGet]
        [Route("byEmployer/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetByUser(int id)
        {
           return Ok(await _service.GetByUser(id));
        }

    }
}
