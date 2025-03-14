using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Domain.Models
{
    public class Language
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public virtual List<UserLanguage> UserLanguages { get; set; } = new List<UserLanguage>();
    }
}
