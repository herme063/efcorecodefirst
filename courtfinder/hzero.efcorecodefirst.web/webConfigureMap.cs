using AutoMapper;
using hzero.efcorecodefirst.DataModel.Service;
using hzero.efcorecodefirst.Lib;
using hzero.efcorecodefirst.web.Models;

namespace hzero.efcorecodefirst.web
{
	public class webConfigureMap : IConfigureMap
	{
		public void Configure(IMapperConfigurationExpression cfg)
		{
			cfg.CreateMap<ICourtInfo, SearchResult>()
				.ForMember(sr => sr.Rating, opt => opt.MapFrom(ci => ci.AvgRating))
				.ForMember(sr => sr.Location, opt => opt.MapFrom(ci => ci.Name));
			cfg.CreateMap<ICourtReview, CourtReview>();
			cfg.CreateMap<ICourtInfo, CourtDetail>()
				.ForMember(cd => cd.CourtUid, opt => opt.MapFrom(ci => ci.Uid));
		}
	}
}
