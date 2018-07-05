using System;

namespace hzero.efcorecodefirst.DataModel.Service
{
	internal class CourtInfo : ICourtInfo
	{
		public Guid Uid { get; set; }
		public string Name { get; set; }
		public decimal AvgRating { get; set; }
		public decimal RatingCount { get; set; }
		public decimal Lat { get; set; }
		public decimal Lng { get; set; }
		public BasketballCourtFormats Format { get; set; }
		public BasketballCourtLocations Location { get; set; }
	}
}