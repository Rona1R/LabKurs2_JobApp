using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Application.DTOs.Request
{
    public class UserProfileRequest
    {
        public int UserId { get; set; }

        public Dictionary<string, string>? CustomFields { get; set; } 
    }
}
