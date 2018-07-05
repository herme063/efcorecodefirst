using System;

namespace hzero.efcorecodefirst.web.Models
{
	public class CourtReview
	{
		public Guid CourtUid { get; set; }
		public int Rating { get; set; }
		public string Reviewer { get; set; }
		public string Review { get; set; }
	}
}