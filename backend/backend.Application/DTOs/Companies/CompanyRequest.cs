using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Application.DTOs.Companies
{
    public class CompanyRequest
    { 
        public string Name { get; set; }

        public string Description { get; set; }

        public string Logo { get; set; }

        public int EmployerId { get; set; } // userId
    }
}
