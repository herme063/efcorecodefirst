using System;
using hzero.efcorecodefirst.Lib;
using Microsoft.EntityFrameworkCore;

namespace hzero.efcorecodefirst.DataModel
{
	internal class Rating : IConfigureModel
	{
		public Guid CourtUid { get; set; }
		public BasketballCourt Court { get; set; }
		public Guid PlayerUid { get; set; }
		public Player Player { get; set; }
		public RatingScores Score { get; set; }
		public string Comment { get; set; }
		public DateTime Timestamp { get; set; }

		void IConfigureModel.Configure(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<Rating>().HasKey(r => new { r.CourtUid, r.PlayerUid });
		}
	}
}