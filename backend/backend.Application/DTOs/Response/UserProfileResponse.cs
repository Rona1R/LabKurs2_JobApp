using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Domain.Models;

namespace backend.Application.DTOs.Response
{
    public class UserProfileResponse
    {
        public string Id { get; set; }

        public int UserId { get; set; }
        public string Headline { get; set; }
        public List<SocialAccount> SocialAccounts { get; set; } = new List<SocialAccount>();

        public List<string> Skills { get; set; } = new List<string>();

        public OpenToOptions OpenTo { get; set; } = new OpenToOptions();
    }
}