using System.Linq;
using AutoMapper;
using hzero.efcorecodefirst.DataModel.Service;
using hzero.efcorecodefirst.Lib;

namespace hzero.efcorecodefirst.DataModel
{
	public class DataModelConfigureMap : IConfigureMap
	{
		public void Configure(IMapperConfigurationExpression cfg)
		{
			cfg.CreateMap<BasketballCourt, CourtInfo>()
				.ForMember(ci => ci.Name, opt => opt.MapFrom(bc => bc.Address))
				.ForMember(ci => ci.AvgRating, opt => opt.MapFrom(bc => bc.Ratings.Any() ? decimal.Round(bc.Ratings.Average(r => (decimal)r.Score), 1) : 0.0m))
				.ForMember(ci => ci.RatingCount, opt => opt.MapFrom(bc => bc.Ratings.Count))
				.ForMember(ci => ci.Lat, opt => opt.MapFrom(bc => bc.Latitude))
				.ForMember(ci => ci.Lng, opt => opt.MapFrom(bc => bc.Longitude));
			cfg.CreateMap<Rating, CourtReview>()
				.ForMember(cr => cr.ReviewerUid, opt => opt.MapFrom(r => r.PlayerUid))
				.ForMember(cr => cr.Reviewer, opt => opt.MapFrom(r => r.Player.UserName))
				.ForMember(cr => cr.Rating, opt => opt.MapFrom(r => (int)r.Score))
				.ForMember(cr => cr.Review, opt => opt.MapFrom(r => r.Comment))
				.ForMember(cr => cr.TimestampUtc, opt => opt.MapFrom(r => r.Timestamp));
			cfg.CreateMap<ICourtEntity, BasketballCourt>()
				.ForMember(cr => cr.Address, opt => opt.MapFrom(r => r.Name))
				.ForMember(cr => cr.Latitude, opt => opt.MapFrom(r => r.Lat))
				.ForMember(cr => cr.Longitude, opt => opt.MapFrom(r => r.Lng));
			cfg.CreateMap<IReviewEntity, Rating>()
				.ForMember(cr => cr.Comment, opt => opt.MapFrom(r => r.Review));
		}
	}
}
