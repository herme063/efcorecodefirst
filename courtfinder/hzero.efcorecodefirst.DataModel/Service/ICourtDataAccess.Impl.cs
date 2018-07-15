using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace hzero.efcorecodefirst.DataModel.Service
{
	internal class CourtDataAccess :
		ICourtDataAccess
	{
		internal static IQueryable<BasketballCourt> GetCourts(
			DataModelDbContext dbContext)
			=> dbContext.BasketballCourts
				.Include(c => c.Ratings)
					.ThenInclude(c => c.Player);

		internal static IEnumerable<Rating> GetRatings(
			DataModelDbContext dbContext)
			=> dbContext.Ratings
				.Include(c => c.Court)
				.Include(c => c.Player);

		public BasketballCourt GetCourt(
			Guid uid)
		{
			using (var dbContext = new DataModelDbContext())
			{
				return GetCourts(dbContext)
					.Where(c => c.Uid == uid)
					.SingleOrDefault();
			}
		}

		public IEnumerable<BasketballCourt> GetCourtsInside(
			decimal swLat,
			decimal swLng,
			decimal neLat,
			decimal neLng)
		{
			using (var dbContext = new DataModelDbContext())
			{
				return GetCourts(dbContext)
					.Where(c =>
						swLat <= c.Latitude && c.Latitude <= neLat
						&& swLng <= c.Longitude && c.Longitude <= neLng)
					.ToList();
			}
		}

		public IEnumerable<Rating> GetRatingByCourt<TSortKey>(
			Guid courtUid,
			int take,
			int skip,
			Func<Rating, TSortKey> sortSelector,
			IComparer<TSortKey> sortComparer)
		{
			using (var dbContext = new DataModelDbContext())
			{
				return GetRatings(dbContext)
					.Where(r => r.Court.Uid == courtUid)
					.OrderBy(sortSelector, sortComparer)
					.Skip(skip)
					.Take(take)
					.ToList();
			}
		}

		public byte[] GetThumb(
			Guid uid,
			int index)
		{
			using (var dbContext = new DataModelDbContext())
			{
				return dbContext.Thumbs
					.Where(t => t.CourtUid == uid && t.Index == index)
					.Select(t => t.Content)
					.SingleOrDefault();
			}
		}

		public byte[] GetSnapshot(
			Guid uid,
			int index)
		{
			using (var dbContext = new DataModelDbContext())
			{
				return dbContext.Snapshots
					.Where(t => t.CourtUid == uid && t.Index == index)
					.Select(t => t.Content)
					.SingleOrDefault();
			}
		}

		public int InsertCourt(
			BasketballCourt entity)
		{
			using (var dbContext = new DataModelDbContext())
			{
				dbContext.BasketballCourts.Add(entity).Entity.Uid = Guid.NewGuid();

				return dbContext.SaveChanges();
			}
		}

		public int SaveReview(
			Rating entity)
		{
			using (var dbContext = new DataModelDbContext())
			{
				Rating existing = dbContext.Ratings.AsNoTracking()
					.Where(r => r.CourtUid == entity.CourtUid && r.PlayerUid == entity.PlayerUid)
					.SingleOrDefault();
				if (existing != null)
				{
					dbContext.Ratings.Update(entity);
				}
				else
				{
					dbContext.Ratings.Add(entity);
				}

				return dbContext.SaveChanges();
			}
		}
	}
}