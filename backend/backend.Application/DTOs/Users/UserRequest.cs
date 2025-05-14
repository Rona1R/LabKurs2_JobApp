using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Application.DTOs.Users
{
    public class UserRequest
    {
        public string Name { get; set; }

        public string LastName { get; set; }

        public string ProfileBackground { get; set; }

        public string AboutMe { get; set; }

        public string ProfilePic { get; set; }

    }
}
