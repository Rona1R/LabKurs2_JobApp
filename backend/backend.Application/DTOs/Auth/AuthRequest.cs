using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Application.DTOs.Auth
{
    public class AuthRequest
    {
        public string email { get; set; }

        public string password { get; set; }
    }
}
