using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Application.DTOs.Users
{
    public class UserProfileDetails
    {
        public UserResponse User { get; set; }

        public UserProfileResponse Profile { get; set; }    
    }
}
