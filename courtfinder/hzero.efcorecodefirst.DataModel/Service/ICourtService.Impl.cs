using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;

namespace hzero.efcorecodefirst.DataModel.Service
{
	internal class CourtService : ICourtService
	{
		private readonly IMapper _mapper;
		private readonly ICourtDataAccess _dataAccess;

		public CourtService(
			ICourtDataAccess dataAccess,
			IMapper mapper)
		{
			_mapper = mapper;
			_dataAccess = dataAccess;
		}

		public IEnumerable<ICourtInfo> FindCourts(
			decimal southWestLat,
			decimal southWestLng,
			decimal northEastLat,
			decimal northEastLng)
		{
			List<CourtInfo> result = _dataAccess
				.GetCourtsInside(southWestLat, southWestLng, northEastLat, northEastLng)
				.Select(_mapper.Map<BasketballCourt, CourtInfo>)
				.ToList();

			return result;
		}

		public ICourtInfo GetCourtInfo(
			Guid uid)
		{
			BasketballCourt result = _dataAccess.GetCourt(uid);

			return result != null ? _mapper.Map<BasketballCourt, CourtInfo>(result) : null;
		}

		public IEnumerable<ICourtReview> GetCourtReview(
			Guid uid,
			int page,
			int size,
			CourtReviewSortDirections sort)
		{
			using (var dbContext = new DataModelDbContext())
			{
				var direction = (sort == CourtReviewSortDirections.HighestFirst ? -1 : 1);
				var comparer = Comparer<RatingScores>.Create((x, y) =>
					direction * ((int)x < (int)y ? -1 : (int)x > (int)y ? 1 : 0));
				List<CourtReview> result = _dataAccess.GetRatingByCourt(
						uid, size, (page - 1) * size,
						r => r.Score, comparer)
					.Select(_mapper.Map<Rating, CourtReview>)
					.ToList();

				return result;
			}
		}

		public byte[] GetCourtThumb(Guid uid, int index)
		{
			return _dataAccess.GetThumb(uid, index) ?? StaticData.NoThumb;
		}

		public byte[] GetCourtSnapshot(Guid uid, int index)
		{
			return _dataAccess.GetSnapshot(uid, index) ?? StaticData.NoThumb;
		}

		public int AddCourt(ICourtEntity entity, Guid playerUid)
		{
			BasketballCourt newEntity = _mapper.Map<ICourtEntity, BasketballCourt>(entity);
			newEntity.AddedByUid = playerUid;
			newEntity.AddedOn = DateTime.UtcNow;

			return _dataAccess.InsertCourt(newEntity);
		}

		public int AddReview(IReviewEntity entity, Guid playerUid)
		{
			Rating newEntity = _mapper.Map<IReviewEntity, Rating>(entity);
			newEntity.PlayerUid = playerUid;
			newEntity.Timestamp = DateTime.UtcNow;

			return _dataAccess.SaveReview(newEntity);
		}
	}
}