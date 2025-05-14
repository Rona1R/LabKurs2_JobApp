using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Application.DTOs.JobTags
{
    public class JobTagRequest
    {
        public int TagId { get; set; }
        public int JobId { get; set; }
    }
}
