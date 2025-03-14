using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Domain.Models
{
    public class UserLanguage
    {

        public int Id { get; set; }

        public int UserId { get; set; }

        public int LanguageId { get; set; }

        public string ProficiencyLevel { get; set; }

        [ForeignKey(nameof(UserId))]
        public virtual User User { get; set; }

        [ForeignKey(nameof(LanguageId))]
        public virtual Language Language { get; set; }
    }
}
