using System;
using System.ComponentModel.DataAnnotations;

namespace hzero.efcodefirst.DataModel
{
    public class Rating
    {
        [Key]
        public Guid Uid { get; set; }

        public RatingScores Score { get; set; }
        public string Comment { get; set; }
        public Guid PlayerId { get; set; }
        public Player Player { get; set; }
    }
}