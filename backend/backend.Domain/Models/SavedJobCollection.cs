﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Domain.Models
{
    public class SavedJobCollection
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int UserId { get; set; }

        [ForeignKey(nameof(UserId))]
        public virtual User User { get; set; }

        public virtual List<SavedJob> SavedJobs { get; set; } = new List<SavedJob>();
    }
}
