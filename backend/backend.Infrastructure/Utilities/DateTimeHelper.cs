using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Infrastructure.Utilities
{
    public static class DateTimeHelper
    {
        public static string CalculateDaysLeftUntilDeadline(DateTime deadline)
        {
            var daysLeft = 0;
            DateTime today = DateTime.Now;
            if (today < deadline)
            {
                TimeSpan timeSpan = deadline - today;
                daysLeft = (int)Math.Ceiling(timeSpan.TotalDays);
            }

            if (daysLeft == 1)
            {
                return daysLeft + " day left";
            }
            else
            {
                return daysLeft + " days left";
            }
        }
    }
}
