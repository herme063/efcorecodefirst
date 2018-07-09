using System;
using System.Collections.Generic;

namespace hzero.efcorecodefirst.DataModel.Service
{
	internal interface ICourtDataAccess
	{
		IEnumerable<BasketballCourt> GetCourtsInside(
			decimal swLat, 
			decimal swLng, 
			decimal neLat, 
			decimal neLng);

		BasketballCourt GetCourt(Guid uid);

		IEnumerable<Rating> GetRatingByCourt<TSortKey>(
			Guid courtUid,
			int take,
			int skip,
			Func<Rating, TSortKey> sortSelector,
			IComparer<TSortKey> sortComparer);

		byte[] GetThumb(Guid uid, int index);

		byte[] GetSnapshot(Guid uid, int index);

		int InsertCourt(BasketballCourt entity);

		int SaveReview(Rating newEntity);
	}
}