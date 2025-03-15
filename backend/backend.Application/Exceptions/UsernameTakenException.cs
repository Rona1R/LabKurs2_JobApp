using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Application.Exceptions
{
    public class UsernameTakenException : Exception
    {

        public UsernameTakenException() { }

        public UsernameTakenException(string message) : base(message) { }
    }
}
