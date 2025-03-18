using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using backend.Application.DTOs.Request;
using backend.Application.DTOs.Response;
using backend.Domain.Models;


namespace backend.Application.DTOs
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<CategoryRequest, Category>();

            CreateMap<Category, CategoryResponse>();

            CreateMap<User, UserWithRoles>()
               .ForMember(dest => dest.Username, opt => opt.MapFrom(src => src.AspNetUser.UserName))
               .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.AspNetUser.Email))
               .ForMember(dest => dest.PhoneNumber, opt => opt.MapFrom(src => src.AspNetUser.PhoneNumber))
               .ForMember(dest => dest.Roles, opt => opt.Ignore());
        }
    }
}
