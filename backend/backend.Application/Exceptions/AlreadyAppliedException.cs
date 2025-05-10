using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Application.Exceptions
{
    public class AlreadyAppliedException : Exception
    {
        public AlreadyAppliedException() { }


        public AlreadyAppliedException(string message) : base(message) { }

    }
}
