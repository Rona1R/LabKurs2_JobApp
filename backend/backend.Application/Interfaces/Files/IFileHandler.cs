using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace backend.Application.Interfaces.Files
{

    public interface IFileHandler
    {
        Task<string> SaveFileAsync(IFormFile file);
        bool ValidateFile(IFormFile file);

        bool DeleteFile(string fileName);
    }
}
