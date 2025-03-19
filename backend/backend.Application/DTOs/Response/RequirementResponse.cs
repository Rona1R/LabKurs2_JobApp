using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Application.DTOs.Response
{
    public class RequirementResponse
    {
        public string Id { get; set; }

        public string Description { get; set; }

        public int JobId { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}
