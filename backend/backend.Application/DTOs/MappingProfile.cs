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

            CreateMap<CompanyRequest, Company>();
            CreateMap<Company, CompanyResponse>()
                .ForMember(dest => dest.EmployerName, opt => opt.MapFrom(src => src.Employer.User.Name))
                .ForMember(dest => dest.EmployerLastName, opt => opt.MapFrom(src => src.Employer.User.LastName));

            CreateMap<EmployerRequest, Employer>();
            CreateMap<Employer, EmployerResponse>().ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.User.Name))
                .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.User.LastName))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.User.AspNetUser.Email))
                .ForMember(dest => dest.Departament, opt => opt.MapFrom(src => src.Departament.Name));
        }
    }
}
