using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using backend.Application.DTOs.Tags;
using backend.Application.Interfaces.TagInterfaces;
using backend.Domain.Models;

namespace backend.Application.Services
{
    public class TagService : BaseService<ITagRepository, Tag, TagRequest, TagResponse> , ITagService
    {
        public TagService(ITagRepository repository, IMapper mapper) : base(repository, mapper)
        {
        }
    }
}
