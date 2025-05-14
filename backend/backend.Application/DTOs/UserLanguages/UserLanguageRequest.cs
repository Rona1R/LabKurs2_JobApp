using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Application.DTOs.UserLanguages
{
    public class UserLanguageRequest
    {
        public int UserId { get; set; }

        public int LanguageId { get; set; }

        public string ProficiencyLevel { get; set; }
    }
}
