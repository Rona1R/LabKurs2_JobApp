using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Application.DTOs.Response
{
    public class UserProfileResponse
    {
        public string Id { get; set; }

        public int UserId { get; set; }

        public Dictionary<string, string> CustomFields { get; set; }
    }
}