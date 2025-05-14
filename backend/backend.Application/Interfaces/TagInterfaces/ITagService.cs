using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Application.DTOs.Tags;

namespace backend.Application.Interfaces.TagInterfaces
{
    public interface ITagService : IBaseService<TagRequest,TagResponse>
    {
    }
}
