using System;
using hzero.efcorecodefirst.DataModel;
using hzero.efcorecodefirst.DataModel.Service;

namespace hzero.efcorecodefirst.web.Models
{
	public class ReviewEntity : IReviewEntity
	{
		public Guid Uid { get; set; }
		public int Rating { get; set; }
		public string Review { get; set; }

		Guid IReviewEntity.CourtUid => Uid;
		RatingScores IReviewEntity.Score => (RatingScores)Rating;
	}
}