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

            CreateMap<DepartamentRequest, Departament>();
            CreateMap<Departament, DepartamentResponse>();

            CreateMap<UserRequest, User>();
            CreateMap<User, UserResponse>()
            .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.AspNetUser.Email))
             .ForMember(dest => dest.Username, opt => opt.MapFrom(src => src.AspNetUser.UserName))
            .ForMember(dest => dest.PhoneNumber, opt => opt.MapFrom(src => src.AspNetUser.PhoneNumber));

            CreateMap<TagRequest, Tag>();
            CreateMap<Tag, TagResponse>();

            CreateMap<InstitutionRequest, Institution>();
            CreateMap<Institution, InstitutionResponse>();

            CreateMap<LanguageRequest, Language>();
            CreateMap<Language, LanguageResponse>();

            CreateMap<JobRequest, Job>();
            CreateMap<Job, JobResponse>().ForMember(dest => dest.Company, opt => opt.MapFrom(src => src.Company.Name))
                                         .ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.Category.Name))
                                         .ForMember(dest => dest.Location, opt => opt.MapFrom(src => src.Country.Label + "," + src.City))
                                         .ForMember(dest => dest.PayRange, opt => opt.MapFrom(src => src.MinimalSalary + " - " + src.MaximalSalary + " " + src.Currency));


            CreateMap<Job, JobPostings>().ForMember(dest => dest.CompanyLogo, opt => opt.MapFrom(src => src.Company.Logo))
                                          .ForMember(dest => dest.DaysLeft, opt => opt.Ignore());

            CreateMap<JobTagRequest, JobTag>();
            CreateMap<JobTag, JobTagResponse>().ForMember(dest => dest.Tag, opt => opt.MapFrom(src => src.Tag.Name))
                                               .ForMember(dest => dest.Job, opt => opt.MapFrom(src => src.Job.Title));

            CreateMap<EducationRequest, Education>().ForMember(dest => dest.InstitutionName, opt => opt.MapFrom(src => src.ManualInstitutionName));
            CreateMap<Education, EducationResponse>().ForMember(dest => dest.InstitutionName, opt => opt.MapFrom(src =>
            src.Institution != null ? src.Institution.Name : "")
            ).ForMember(dest => dest.ManualInstitutionName, opt => opt.MapFrom(src => src.InstitutionName));

            CreateMap<ExperienceRequest, Experience>().ForMember(dest => dest.CompanyName, opt => opt.MapFrom(src => src.ManualCompanyName));
            CreateMap<Experience, ExperienceResponse>()
                .ForMember(dest => dest.CompanyName, opt => opt.MapFrom(src =>
                src.Company != null ? src.Company.Name : ""))
                .ForMember(dest => dest.ManualCompanyName, opt => opt.MapFrom(src => src.CompanyName));

            CreateMap<SkillRequest, Skill>();
            CreateMap<Skill, SkillResponse>();

            CreateMap<UserLanguageRequest, UserLanguage>();
            CreateMap<UserLanguage, UserLanguageResponse>().ForMember(dest => dest.LanguageName, opt => opt.MapFrom(src => src.Language.Name));

            CreateMap<UserProfileRequest, UserProfile>();
            CreateMap<UserProfile,  UserProfileResponse>();

            CreateMap<JobDetailsRequest, JobDetails>();
            CreateMap < JobDetails, JobDetailsResponse>();

        }
    }
}
