using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Application.Interfaces.Files;


namespace backend.Application.Services.Factory
{
    public class FileFactory
    {
        // RIP Design Pattern
        private readonly Dictionary<string, Func<IFileHandler>> _handlers = [];

        public FileFactory()
        {
            _handlers = new Dictionary<string, Func<IFileHandler>>
            {
              { "image", () => new ImageHandler() },
            };
        }
        public IFileHandler GetFileHandler(string fileType)
        {
            if (_handlers.TryGetValue(fileType, out var handlerFactory))
            {
                return handlerFactory();
            }

            throw new NotSupportedException($"File type '{fileType}' is not supported.");
        }
        //public IFileHandler GetFileHandler(string fileType)
        //{
        //    return fileType switch
        //    {

        //        "image" => new ImageHandler(),
        //        _ => throw new NotSupportedException("File type not supported.")
        //    };
        //}
    }
}
