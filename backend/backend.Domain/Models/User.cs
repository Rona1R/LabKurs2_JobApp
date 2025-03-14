using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;


namespace backend.Domain.Models
{
    public class User
    {
        public int Id { get; set; } 

        public string Name { get; set; }    

        public string LastName { get; set; }

        public string ProfilePic {  get; set; } = String.Empty;

        public string ProfileBackground {  get; set; } = String.Empty;

        public string AboutMe {  get; set; } = String.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public string AspNetUserId { get; set; }


        [ForeignKey(nameof(AspNetUserId))]
        public virtual IdentityUser AspNetUser { get; set; }

        public String? RefreshToken { get; set; }
   

        public virtual List<JobApplication> JobApplications { get; set; } = new List<JobApplication>();

        public virtual List<SavedJob> SavedJobs { get; set; }   = new List<SavedJob>();


        public virtual List<Skill> Skills { get; set; }  = new List<Skill> ();

        public virtual List<Education> Educations { get; set; } = new List <Education> ();

        public virtual List<UserLanguage> UserLanguages { get; set; } = new List<UserLanguage> ();

        public virtual List<Experience> Experiences { get; set; } = new List<Experience> ();    

        public virtual Employer Employer { get; set; }

    }
}
