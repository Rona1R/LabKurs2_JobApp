using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using backend.Application.Interfaces.Files;
using Microsoft.AspNetCore.Http;

namespace backend.Application.Services
{
    public class DocumentHandler : IFileHandler
    {
        private readonly string _uploadsFolder;

        public DocumentHandler()
        {
            _uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "documents");
            if (!Directory.Exists(_uploadsFolder))
            {
                Directory.CreateDirectory(_uploadsFolder);
            }
        }

        public bool ValidateFile(IFormFile file)
        {
            var allowedExtensions = new[] { ".pdf", ".doc", ".docx" };
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

            return fileName;
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
