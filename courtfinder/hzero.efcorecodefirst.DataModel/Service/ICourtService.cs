using System;
using System.Collections.Generic;

namespace hzero.efcorecodefirst.DataModel.Service
{
	public interface ICourtService
    {
		ICourtInfo GetCourtInfo(Guid uid);

		IEnumerable<ICourtReview> GetCourtReview(Guid uid, int page, int size, CourtReviewSortDirections sort);

		IEnumerable<ICourtInfo> FindCourts(decimal southWestLat, decimal southWestLng, decimal northEastLat, decimal northEastLng);

		byte[] GetCourtThumb(Guid uid, int index);

		byte[] GetCourtSnapshot(Guid uid, int index);

		int AddCourt(ICourtEntity entity, Guid playerUid);

		int AddReview(IReviewEntity entity, Guid playerUid);
	}
}
