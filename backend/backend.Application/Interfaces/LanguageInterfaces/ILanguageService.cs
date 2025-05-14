using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Application.DTOs.Languages;

namespace backend.Application.Interfaces.LanguageInterfaces
{
    public interface ILanguageService : IBaseService<LanguageRequest, LanguageResponse>
    {
    }
}
