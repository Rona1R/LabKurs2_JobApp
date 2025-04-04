using backend.Infrastructure.Configuration;
using backend.Application.Configuration;
using System.Text.Json.Serialization;
using System.Text.Json;
using backend.Infrastructure.Data;
using Microsoft.AspNetCore.Identity;
using DotNetEnv;


internal class Program
{
    private static void Main(string[] args)
    {
        Env.Load();
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddDomainMappings();
        builder.Services.AddDbContext(builder.Configuration);
        builder.Services.AddMongoDb();
        builder.Services.MapInterfaces();

        var frontendUrl = builder.Configuration["FRONTEND_URL"];

        if (string.IsNullOrEmpty(frontendUrl))
        {
            throw new InvalidOperationException("Frontend URL must be configured for CORS.");
        }

        //builder.Services.AddControllers();
        builder.Services.AddCors(opt =>
        {
            opt.AddPolicy(name: "CorsPolicy", builder =>
            {
                builder.WithOrigins(frontendUrl)
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
            });
        });

        builder.Services.AddControllers().AddJsonOptions(options =>
        {
            options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
            options.JsonSerializerOptions.WriteIndented = true;
        }).AddJsonOptions(x =>
        x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);


        builder.Services.AddIdentity<IdentityUser, IdentityRole>().AddEntityFrameworkStores<ApplicationDbContext>()
         .AddDefaultTokenProviders();

        builder.Services.Configure<IdentityOptions>(options =>
        {
            options.Password.RequireDigit = true;
            options.Password.RequireLowercase = true;
            options.Password.RequireUppercase = true;
            options.Password.RequireNonAlphanumeric = true;
            options.Password.RequiredLength = 6;
            options.Password.RequiredUniqueChars = 1; // Minimum number of unique characters in the password
        });


        //builder.Services.AddControllers().AddJsonOptions(x =>
        //x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);


        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        var app = builder.Build();

        app.UseStaticFiles();
        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();

        app.UseCors("CorsPolicy");

        app.UseAuthentication();

        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}