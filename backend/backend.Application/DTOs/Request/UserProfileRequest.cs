using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Domain.Models;

namespace backend.Application.DTOs.Request
{
    public class UserProfileRequest
    {
        public int UserId { get; set; }
        public string Headline { get; set; } = string.Empty;
        public List<SocialAccount> SocialAccounts { get; set; } = new List<SocialAccount>();

        public List<string> Skills { get; set; } = new List<string>();

        public OpenToOptions OpenTo { get; set; } = new OpenToOptions();
    }
}
