using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Application.DTOs.Request
{
    public class JobFilterRequest
    {

        public IEnumerable<string> JobTypes { get; set; } = new List<string>();

        public IEnumerable<string> SalaryTypes { get; set; } = new List<string>();

        public string DatePosted { get; set; } = string.Empty;
        public string SearchTerm {  get; set; } = string.Empty;
        
        public int PageNumber { get; set; } = 1;    

        public int PageSize { get; set; } 
    }
}
