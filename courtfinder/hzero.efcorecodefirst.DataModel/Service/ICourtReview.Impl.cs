using System;

namespace hzero.efcorecodefirst.DataModel.Service
{
	internal class CourtReview : ICourtReview
	{
		public Guid CourtUid { get; set; }
		public Guid ReviewerUid { get; set; }
		public string Reviewer { get; set; }
		public string Review { get; set; }
		public int Rating { get; set; }
		public DateTime TimestampUtc { get; set; }
	}
}