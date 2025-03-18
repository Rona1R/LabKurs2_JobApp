using backend.Application.Services.Factory;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadsController : ControllerBase
    {
        private readonly FileFactory _fileFactory;

        public UploadsController(FileFactory fileFactory) { 
            _fileFactory = fileFactory; 
        }


        [HttpPost("upload")]
        public async Task<IActionResult> UploadFile(IFormFile file, [FromQuery] string fileType)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            try
            {
                var fileHandler = _fileFactory.GetFileHandler(fileType);

                if (!fileHandler.ValidateFile(file))
                {
                    return BadRequest("Invalid file type or extension.");
                }

                var fileUrl = await fileHandler.SaveFileAsync(file);

                return Ok(new { fileUrl });
            }
            catch (NotSupportedException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(500, "An error occurred while uploading the file.");
            }
        }

        [HttpDelete("delete/{fileName}")]
        public IActionResult DeleteFile(string fileName, [FromQuery] string fileType)
        {
            try
            {
                var fileHandler = _fileFactory.GetFileHandler(fileType);
                bool deleted = fileHandler.DeleteFile(fileName);
                if (deleted)
                {
                     return Ok("File was successfully deleted!");
                }
                else
                {
                    return NotFound("This file was not found!");
                }
            }
            catch (NotSupportedException ex)
            {
                return BadRequest(ex.Message);
            }
            catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,ex.Message);
            }
        }


    }
}
