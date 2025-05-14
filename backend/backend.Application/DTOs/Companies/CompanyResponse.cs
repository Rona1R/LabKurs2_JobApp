using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Application.DTOs.Companies
{
    public class CompanyResponse
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string Logo { get; set; }

        public int EmployerId { get; set; }

        public string EmployerName { get; set; }

        public string EmployerLastName { get; set; }

        public bool IsDeleted { get; set; }
        public DateTime CreatedAt { get; set; }

        //public bool IsVerified { get; set; }
    }
}
