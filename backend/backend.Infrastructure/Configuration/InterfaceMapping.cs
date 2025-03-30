using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Application.Interfaces.Authentication;
using backend.Application.Interfaces.CategoryInterfaces;
using backend.Application.Interfaces.CompanyInterfaces;
using backend.Application.Interfaces.DepartamentInterfaces;
using backend.Application.Interfaces.EducationInterfaces;
using backend.Application.Interfaces.EmployerInterfaces;
using backend.Application.Interfaces.ExperienceInterfaces;
using backend.Application.Interfaces.InstitutionInterfaces;
using backend.Application.Interfaces.JobDetailsInterfaces;
using backend.Application.Interfaces.JobInterfaces;
using backend.Application.Interfaces.JobTagInterfaces;
using backend.Application.Interfaces.LanguageInterfaces;
using backend.Application.Interfaces.TagInterfaces;
using backend.Application.Interfaces.UserInterfaces;
using backend.Application.Interfaces.UserLanguageInterfaces;
using backend.Application.Interfaces.UserProfileInterfaces;
using backend.Application.Interfaces.UserRoleInterfaces;
using backend.Application.Services;
using backend.Application.Services.Factory;
using backend.Infrastructure.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace backend.Infrastructure.Configuration
{
    public static class InterfaceMapping
    {
        public static void MapInterfaces(this IServiceCollection services)
        {

            services.AddScoped<ICategoryRepository, CategoryRepository>();
            services.AddScoped<ICategoryService, CategoryService>();

            services.AddScoped<IAuthenticationRepository, AuthenticationRepository>();
            services.AddScoped<IAuthenticationService, AuthenticationService>();

            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IUserRepository, UserRepository>();

            services.AddScoped<ICompanyRespository, CompanyRepository>();
            services.AddScoped<ICompanyService, CompanyService>();

            services.AddScoped<IEmployerRepository, EmployerRepository>();
            services.AddScoped<IEmployerService, EmployerService>();

            services.AddScoped<IUserRoleRepository, UserRoleRepository>();
            services.AddScoped<IUserRoleService, UserRoleService>();

            services.AddScoped<IDepartamentRepository, DepartamentRepository>();
            services.AddScoped<IDepartamentService, DepartamentService>();

            services.AddScoped<ITagRepository, TagRepository>();
            services.AddScoped<ITagService, TagService>();

            services.AddScoped<IInstitutionRepository, InstitutionRepository>();
            services.AddScoped<IInstitutionService, InstitutionService>();

            services.AddScoped<ILanguageRepository, LanguageRepository>();  
            services.AddScoped<ILanguageService, LanguageService>();    

            services.AddScoped<IJobRepository, JobRepository>();
            services.AddScoped<IJobService, JobService>();

            services.AddScoped<IJobTagRepository, JobTagRepository>();  
            services.AddScoped<IJobTagService, JobTagService>();


            services.AddScoped<IEducationRepository,EducationRepository>();
            services.AddScoped<IEducationService, EducationService>();

            services.AddScoped<IExperienceRepository, ExperienceRepository>();
            services.AddScoped<IExperienceService, ExperienceService>();

            services.AddScoped<IUserLanguageRepository, UserLanguageRepository>();
            services.AddScoped<IUserLanguageService, UserLanguageService>();

            services.AddScoped<IUserProfileRepository, UserProfileRepository>();
            services.AddScoped<IUserProfileService, UserProfileService>();

            services.AddScoped<IJobDetailsRepository, JobDetailsRepository>();
            services.AddScoped<IJobDetailsService, JobDetailsService>();

            services.AddSingleton<FileFactory>();
        }
    }
}
