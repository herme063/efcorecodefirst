using System;

namespace hzero.efcorecodefirst.DataModel.Service
{
	public interface IReviewEntity
	{
		Guid CourtUid { get; }
		RatingScores Score { get; }
		string Review { get; }
	}
}