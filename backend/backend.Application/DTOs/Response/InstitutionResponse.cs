using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Application.DTOs.Response
{
    public class InstitutionResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public string Type { get; set; }
    }
}
