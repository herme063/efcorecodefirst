using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;

namespace hzero.efcorecodefirst.DataModel.Service
{
	internal class CourtService : ICourtService
	{
		private readonly IMapper _mapper;

		public CourtService(IMapper mapper)
		{
			_mapper = mapper;
		}

		public IEnumerable<ICourtInfo> FindCourts(
			decimal southWestLat, 
			decimal southWestLng, 
			decimal northEastLat, 
			decimal northEastLng)
		{
			List<CourtInfo> result = MockData.Courts.Where(c =>
				southWestLat <= c.Latitude && c.Latitude <= northEastLat
				&& southWestLng <= c.Longitude && c.Longitude <= northEastLng
			).Select(_mapper.Map<BasketballCourt, CourtInfo>).ToList();

			return result;
		}

		public ICourtInfo GetCourtInfo(
			Guid uid)
		{
			CourtInfo result = MockData.Courts
				.Where(c => c.Uid == uid)
				.Select(_mapper.Map<BasketballCourt, CourtInfo>)
				.SingleOrDefault();

			return result;
		}

		public IEnumerable<ICourtReview> GetCourtReview(
			Guid uid, 
			int page, 
			int size, 
			CourtReviewSortDirections sort)
		{
			var query = MockData.Ratings
				.Where(r => r.CourtUid == uid);
			if (sort == CourtReviewSortDirections.HighestFirst)
			{
				query.OrderByDescending(r => (int)r.Score);
			}
			else
			{
				query.OrderBy(r => (int)r.Score);
			}

			List<CourtReview> result = query.Skip(page - 1).Take(size)
				.Select(_mapper.Map<Rating, CourtReview>).ToList();

			return result;
		}

		public byte[] GetCourtThumb(Guid uid, int index)
		{
			return MockData.Thumbs
				.SingleOrDefault(t => t.CourtUid == uid && t.Index == index)
				?.Content ?? new byte[0];
		}

		public byte[] GetCourtSnapshot(Guid uid, int index)
		{
			return MockData.Snapshots
				.SingleOrDefault(t => t.CourtUid == uid && t.Index == index)
				?.Content ?? new byte[0];
		}
	}
}
