using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Application.DTOs.Users
{
    public class UserWithRoles
    {

        public int Id { get; set; } 

        public string Name { get; set; }

        public string LastName { get; set; }

        public string Username { get; set; }
        public string Email { get; set; }

        public string PhoneNumber { get; set; }

        public IEnumerable<string> Roles { get; set; }


    }
}
