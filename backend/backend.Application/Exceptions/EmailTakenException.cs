using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Application.Exceptions
{
    public class EmailTakenException : Exception
    {
        public EmailTakenException()
        {
        }

        public EmailTakenException(string message) : base(message) { }
    }
}
