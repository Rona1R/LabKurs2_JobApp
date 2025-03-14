using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using backend.Domain.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace backend.Infrastructure.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public ApplicationDbContext()
        {
        }

        public DbSet<User> User {  get; set; }

        public DbSet<Employer> Employer { get; set; }

        public DbSet<Departament> Departament { get; set; }

        public DbSet<Skill> Skill { get; set; }

        public DbSet<JobApplication> JobApplication { get; set; }

        public DbSet<Job> Job { get; set; }

        public DbSet<Interview> Interview { get; set; }  

        public DbSet<Institution> Institution { get; set; }

        public DbSet<Education> Education { get; set; }

        public DbSet<Category> Category { get; set; }   
        public DbSet<Company> Company { get; set; } 

        public DbSet<Experience> Experience { get; set; }

        public DbSet<Language> Language { get; set; }

        public DbSet<UserLanguage> UserLanguage { get; set; }

        public DbSet<Tag> Tag { get; set; }

        public DbSet<JobTag> JobTag { get; set; }

        public DbSet<SavedJob> SavedJob { get; set; }   

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Job>().OwnsOne(j => j.Country);

            modelBuilder.Entity<JobApplication>()
             .HasOne(ja => ja.User)  
             .WithMany(u => u.JobApplications)
             .HasForeignKey(ja => ja.ApplicantId)
             .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<SavedJob>()
            .HasOne(ja => ja.User)
            .WithMany(u => u.SavedJobs )
            .HasForeignKey(ja => ja.UserId)
            .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Experience>()
             .HasOne(ja => ja.User)
             .WithMany(u => u.Experiences)
             .HasForeignKey(ja => ja.UserId)
             .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Experience>()
             .HasOne(ex => ex.Company)  
             .WithMany(c => c.Experiences)
             .HasForeignKey(ex => ex.CompanyId)
             .OnDelete(DeleteBehavior.SetNull);  

            modelBuilder.Entity<Education>()
             .HasOne(ed => ed.Institution)  
             .WithMany(i => i.Educations)
             .HasForeignKey(ed => ed.InstitutionId)
             .OnDelete(DeleteBehavior.SetNull);
        }

    }
}
