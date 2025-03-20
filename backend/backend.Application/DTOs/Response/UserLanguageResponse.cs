using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Application.DTOs.Response
{
    public class UserLanguageResponse
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public int LanguageId { get; set; }

        public string LanguageName { get; set; }

        public string ProficiencyLevel { get; set; }
    }
}
