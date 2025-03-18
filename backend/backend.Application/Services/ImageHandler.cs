using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Application.Interfaces.Files;
using Microsoft.AspNetCore.Http;


namespace backend.Application.Services
{
    public class ImageHandler : IFileHandler
    {
        public string _uploadsFolder;
        public ImageHandler()
        {
            _uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
            if (!Directory.Exists(_uploadsFolder))
            {
                Directory.CreateDirectory(_uploadsFolder);
            }
        }

        public bool ValidateFile(IFormFile file)
        {
            var allowedExtensions = new[] { ".jpg", ".jpeg", ".png" ,".webp"};
            var fileExtension = Path.GetExtension(file.FileName).ToLowerInvariant();
            return allowedExtensions.Contains(fileExtension);
        }

        public async Task<string> SaveFileAsync(IFormFile file)
        {
            var fileName = $"{Guid.NewGuid()}_{file.FileName}";
            var filePath = Path.Combine(_uploadsFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return $"{fileName}";
        }

        public bool DeleteFile(string fileName)
        {
            var filePath = Path.Combine(_uploadsFolder, fileName);
            if (File.Exists(filePath))
            {
                try
                {
                    File.Delete(filePath);
                    return true;
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error deleting file: {ex.Message}");
                }
            }
            return false;
        }
    }

}
