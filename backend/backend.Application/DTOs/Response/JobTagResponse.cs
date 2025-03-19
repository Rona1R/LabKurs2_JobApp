using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Application.DTOs.Response
{
    public class JobTagResponse
    {
        public int Id { get; set; }

        public int TagId { get; set; }
        public int JobId { get; set; }

        public string Tag { get; set; }

        public string Job { get; set; }

    }
}
