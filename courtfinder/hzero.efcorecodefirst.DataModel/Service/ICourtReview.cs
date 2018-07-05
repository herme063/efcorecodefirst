using System;

namespace hzero.efcorecodefirst.DataModel.Service
{
	public interface ICourtReview
	{
		Guid CourtUid { get; }
		Guid ReviewerUid { get; }
		string Reviewer { get; }
		string Review { get; }
		int Rating { get; }
		DateTime TimestampUtc { get; }
	}
}