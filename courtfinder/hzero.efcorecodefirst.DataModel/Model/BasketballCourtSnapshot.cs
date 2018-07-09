using System;
using hzero.efcorecodefirst.Lib;
using Microsoft.EntityFrameworkCore;

namespace hzero.efcorecodefirst.DataModel
{
	internal class BasketballCourtSnapshot : IConfigureModel
	{
		public Guid CourtUid { get; set; }
		public BasketballCourt Court { get; set; }
		public int Index { get; set; }
		public byte[] Content { get; set; }

		void IConfigureModel.Configure(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<BasketballCourtSnapshot>()
				.HasKey(s => new { s.CourtUid, s.Index });
		}
	}
}