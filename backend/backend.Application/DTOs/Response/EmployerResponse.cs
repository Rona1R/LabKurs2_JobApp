using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Application.DTOs.Response
{
    public class EmployerResponse
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public int DepartamentId { get; set; }

        public string Name { get; set; }

        public string LastName { get; set; }

        public string Departament { get; set; }

        public string Email { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}
