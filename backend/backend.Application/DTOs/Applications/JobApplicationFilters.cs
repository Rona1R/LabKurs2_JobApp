using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Application.DTOs.Applications
{
    public class JobApplicationFilters
    {
        // optional filters
        public int? CompanyId { get; set; }

        public int? JobId { get; set; }

    }
}
